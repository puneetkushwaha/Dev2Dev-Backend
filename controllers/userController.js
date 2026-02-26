const mongoose = require('mongoose');
const User = require('../models/User');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');
const MockStat = require('../models/MockStat');
const axios = require('axios');

// Helper to update User Stats (Streak, Heatmap, Difficulty counts)
const updateUserStats = async (user, isPassed, difficulty, language, tags) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // 1. Update Heatmap
    if (!user.submissionHeatmap) {
        user.submissionHeatmap = new Map();
    }
    const todayCount = user.submissionHeatmap.get(today) || 0;
    user.submissionHeatmap.set(today, todayCount + 1);

    // 2. Update Streak
    if (user.lastSubmissionDate) {
        const lastDate = new Date(user.lastSubmissionDate).toISOString().split('T')[0];
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
            user.streak += 1;
        } else if (lastDate !== today) {
            // Only reset if they missed a day. If they already submitted today, keep streak.
            user.streak = 1;
        }
    } else {
        user.streak = 1;
    }
    user.lastSubmissionDate = now;

    // 3. Update Solved Stats if passed
    if (isPassed && difficulty) {
        const diffKey = difficulty.toLowerCase(); // easy, medium, hard
        if (user.solvedStats && user.solvedStats[diffKey] !== undefined) {
            // Note: We might want to check if they solved this specific problem before
            // but for now we increment on every pass for simplicity or "Total AC"
            user.solvedStats[diffKey] += 1;
        }
    }
};

// ... (existing code from getUserProfile down to just before getExams or the end) ...

const getMockStats = async (req, res) => {
    try {
        const stats = await MockStat.find({});
        const statsMap = {};
        stats.forEach(stat => {
            statsMap[stat.mockId] = {
                attempts: stat.totalAttempts,
                successRate: stat.totalAttempts > 0
                    ? ((stat.successfulAttempts / stat.totalAttempts) * 100).toFixed(1) + "%"
                    : "0%"
            };
        });
        res.json(statsMap);
    } catch (error) {
        console.error("Get mock stats error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const submitMock = async (req, res) => {
    try {
        const { mockId, answers, timeSpent, title, language, isRun } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Usage Limit Enforcement
        const now = new Date();
        const hasProAccess = user.proExpiry && user.proExpiry > now;

        let codingScore = 0;
        let totalCount = answers.length;

        // Call AI Service for coding evaluation
        let codingResults = [];
        if (answers.length > 0) {
            try {
                const aiRes = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/evaluate_exam_coding`, {
                    domain: 'Programming',
                    answers: answers.map(ans => ({ questionText: ans.questionText, userAnswer: ans.userAnswer })),
                    language: language || 'javascript'
                });
                codingResults = aiRes.data.results || [];

                codingResults.forEach((result, idx) => {
                    if (result.isCorrect) codingScore++;
                    codingResults[idx] = {
                        ...result,
                        questionText: answers[idx].questionText,
                        userAnswer: answers[idx].userAnswer,
                        score: result.isCorrect ? 100 : 0
                    };
                });
            } catch (err) {
                console.error("AI Evaluation error in Mock:", err);
                codingResults = answers.map((ans) => ({
                    questionText: ans.questionText,
                    userAnswer: ans.userAnswer,
                    aiFeedback: "Could not evaluate code. (AI Service Error)",
                    isCorrect: false,
                    score: 0
                }));
            }
        }

        const passed = (codingScore / totalCount) >= 0.5;

        const newAttempt = {
            examName: title || `Mock Assessment ${mockId}`,
            score: codingScore,
            totalMarks: totalCount,
            mcqScore: 0,
            codingScore: codingScore,
            passed: passed,
            difficulty: 'Hard', // Mock interviews are typically hard
            language: language || 'javascript',
            tags: ['Interview', 'Full Mock'],
            detailedAnalysis: {
                mcqResults: [],
                codingResults
            }
        };

        if (!isRun) {
            user.progress.examScores.push(newAttempt);
            await updateUserStats(user, passed, 'Hard', language || 'javascript', ['Interview', 'Full Mock']);
            await user.save();

            await MockStat.findOneAndUpdate(
                { mockId },
                { $inc: { totalAttempts: 1, successfulAttempts: passed ? 1 : 0 } },
                { upsert: true }
            );
        }

        res.json({
            message: isRun ? 'Code executed successfully' : 'Mock evaluated successfully',
            result: newAttempt
        });

    } catch (error) {
        console.error("Submit mock error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserProfile = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Profile data is temporarily unavailable.' });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const now = new Date();
        const hasProAccess = user.proExpiry && user.proExpiry > now;

        // Calculate progress percentage dynamically
        let totalTopicsInDomain = 0;
        if (user.selectedDomain) {
            const domain = await Domain.findOne({ name: user.selectedDomain });
            if (domain) {
                totalTopicsInDomain = await Topic.countDocuments({ domainId: domain._id });
            }
        }

        const progressPercentage = totalTopicsInDomain > 0 ? (user.progress.completedTopics.length / totalTopicsInDomain) * 100 : 0;
        const totalScore = user.progress.examScores.reduce((acc, curr) => acc + (curr.score || 0), 0);
        const avgScore = user.progress.examScores.length > 0 ? (totalScore / user.progress.examScores.length).toFixed(1) : 0;

        // 1. Fetch current curriculum (Source of Truth for difficulty and existence)
        const [currExams, currTopics] = await Promise.all([
            Exam.find({ 'questions.type': 'coding', type: 'Topic-wise' }, '_id questions'),
            Topic.find({ isCoreCS: true, subject: 'DSA', lessonType: 'practice' }, '_id difficulty')
        ]);

        const curriculumMap = new Map();
        currExams.forEach(e => {
            const diff = e.questions.find(q => q.type === 'coding')?.difficulty || 'Medium';
            curriculumMap.set(e._id.toString(), diff.toLowerCase());
        });
        currTopics.forEach(t => {
            curriculumMap.set(t._id.toString(), (t.difficulty || 'Medium').toLowerCase());
        });

        // 2. Aggregate counts and points ONLY for valid curriculum items
        const solvedStats = { easy: 0, medium: 0, hard: 0 };
        const solvedProblemIds = new Set();

        user.progress.examScores.forEach(exam => {
            if (exam.passed && exam.examId) {
                const pid = exam.examId.toString();
                if (curriculumMap.has(pid) && !solvedProblemIds.has(pid)) {
                    solvedProblemIds.add(pid);
                    const currentDiff = curriculumMap.get(pid);
                    if (solvedStats[currentDiff] !== undefined) solvedStats[currentDiff]++;
                }
            }
        });

        const totalPoints = (solvedStats.easy * 10) + (solvedStats.medium * 20) + (solvedStats.hard * 50);
        console.log(`[DEBUG] Syncing: User ${user.email}, Solved ${solvedProblemIds.size}, Points ${totalPoints}`);

        const validTutorials = user.unlockedTutorials ? user.unlockedTutorials.filter(t => t.expiry && t.expiry > now).map(t => t.tutorialId) : [];

        // 2. Language Breakdown
        const languageStats = {};
        user.progress.examScores.forEach(score => {
            if (score.passed) {
                const lang = score.language || 'javascript';
                languageStats[lang] = (languageStats[lang] || 0) + 1;
            }
        });

        // 3. Skill Breakdown
        const skillStats = {};
        user.progress.examScores.forEach(score => {
            if (score.passed && score.tags) {
                score.tags.forEach(tag => {
                    skillStats[tag] = (skillStats[tag] || 0) + 1;
                });
            }
        });

        // 4. Activity Heatmap
        const activityHeatmap = {};
        if (user.submissionHeatmap) {
            user.submissionHeatmap.forEach((count, date) => {
                activityHeatmap[date] = count;
            });
        }

        // 4. Total Available Questions Aggregation (Reusing curriculumMap)
        const totalAvailableStats = { easy: 0, medium: 0, hard: 0 };
        curriculumMap.forEach(diff => {
            if (totalAvailableStats[diff] !== undefined) totalAvailableStats[diff]++;
        });

        res.json({
            name: user.name,
            email: user.email,
            selectedDomain: user.selectedDomain || null,
            isPro: hasProAccess,
            hasProAccess: hasProAccess,
            proExpiry: user.proExpiry,
            freeAiInterviewCount: user.freeAiInterviewCount,
            unlockedTutorials: validTutorials,
            progressPercentage: progressPercentage,
            avgScore: user.progress.examScores.length > 0 ? avgScore : 0,
            totalPoints: totalPoints, // Dynamic Points
            interviewReadiness: user.progress.interviewReadinessScore > 0 ? user.progress.interviewReadinessScore : "Needs Practice",
            education: user.education,
            experience: user.experience,
            skills: user.skills, // User's manual skills
            username: user.username || `@${user.name.toLowerCase().replace(/\s+/g, '')}_${user._id.toString().slice(-8)}`,
            bio: user.bio,
            company: user.company,
            jobTitle: user.jobTitle,
            location: user.location,
            institution: user.institution,
            website: user.website,
            socials: user.socials || {},
            completedTopics: user.progress.completedTopics,
            examScores: user.progress.examScores,
            aiRecommendation: user.aiRecommendation,
            // LeetCode Stats
            streak: user.streak || 0,
            solvedStats,
            totalAvailableStats, // Backend counts
            languageStats,
            skillStats,
            activityHeatmap,
            totalPoints, // Return total points
            lastSubmissionDate: user.lastSubmissionDate
        });

    } catch (error) {
        console.error("Dashboard error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const selectDomain = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Cannot update domain track.' });
    }
    try {
        const { domainName } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.selectedDomain = domainName;
        await user.save();

        res.json({ message: 'Domain updated successfully', selectedDomain: user.selectedDomain });
    } catch (error) {
        console.error("Select domain error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const saveRecommendation = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Cannot save AI recommendation.' });
    }
    try {
        const { recommendation } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.aiRecommendation = recommendation;
        await user.save();

        res.json({ message: 'Recommendation saved successfully', aiRecommendation: user.aiRecommendation });
    } catch (error) {
        console.error("Save recommendation error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const completeTopic = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Progress saving failed.' });
    }
    try {
        const { topic } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.progress.completedTopics.includes(topic)) {
            user.progress.completedTopics.push(topic);
            await user.save();
        }

        res.json({ message: 'Topic marked as complete', completedTopics: user.progress.completedTopics });
    } catch (error) {
        console.error("Complete topic error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const submitExam = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Exam submission failed.' });
    }
    try {
        const { examName, answers, language } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the actual exam to compare answers
        let exam = await Exam.findOne({ title: examName }).populate('domainId', 'name');
        let isTopic = false;
        let sourceTopicId = null;
        let sourceExamId = null;

        if (!exam) {
            const topic = await Topic.findOne({ title: examName });
            if (!topic) {
                return res.status(404).json({ message: 'Exam not found' });
            }
            isTopic = true;
            sourceTopicId = topic._id;
            exam = {
                _id: topic._id,
                title: topic.title,
                domainId: { name: topic.subject || 'Programming' },
                questions: [{
                    questionText: topic.content?.problemStatement || topic.content?.description || topic.title,
                    type: 'coding',
                    correctAnswer: ''
                }]
            };
        } else {
            sourceExamId = exam._id;
        }

        let mcqScore = 0;
        let codingScore = 0;
        let mcqCount = 0;
        let codingCount = 0;
        const mcqResults = [];
        const codingAnswersForAI = [];

        exam.questions.forEach((q, idx) => {
            const userAnswer = answers[idx] || "";
            if (q.type === 'mcq') {
                mcqCount++;
                const isCorrect = userAnswer === q.correctAnswer;
                if (isCorrect) mcqScore++;
                mcqResults.push({
                    questionText: q.questionText,
                    userAnswer,
                    correctAnswer: q.correctAnswer,
                    isCorrect,
                    explanation: q.explanation || "No explanation provided."
                });
            } else {
                codingCount++;
                codingAnswersForAI.push({
                    questionText: q.questionText,
                    userAnswer
                });
            }
        });

        // Call AI Service for coding evaluation if there are coding questions
        let codingResults = [];
        if (codingAnswersForAI.length > 0) {
            try {
                const aiRes = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/evaluate_exam_coding`, {
                    domain: exam.domainId?.name || 'Programming',
                    answers: codingAnswersForAI,
                    language: language || 'javascript'
                });
                codingResults = aiRes.data.results;
                codingResults.forEach(res => {
                    if (res.isCorrect) codingScore++;
                });
            } catch (aiErr) {
                console.error("AI Evaluation failed", aiErr);
                // Fallback: mark as unread/zero if AI fails
                codingResults = codingAnswersForAI.map(q => ({
                    ...q,
                    aiFeedback: "AI Evaluation unavailable at the moment.",
                    score: 0,
                    isCorrect: false
                }));
            }
        }

        const totalScore = mcqScore + codingScore;
        const totalMarks = mcqCount + codingCount;
        const passedPercentage = (totalScore / totalMarks) * 100;
        const passed = passedPercentage >= 50;

        const newAttempt = {
            examId: exam._id,
            examName,
            score: totalScore,
            totalMarks,
            mcqScore,
            codingScore,
            passed,
            difficulty: isTopic ? (exam.difficulty || 'Medium') : (exam.questions[0]?.difficulty || 'Medium'),
            language: language || 'javascript',
            tags: exam.tags || [],
            detailedAnalysis: {
                mcqResults,
                codingResults
            }
        };

        user.progress.examScores.push(newAttempt);
        await updateUserStats(user, passed, newAttempt.difficulty, newAttempt.language, newAttempt.tags);
        await user.save();

        // Atomically increment the real acceptance rate counters
        const counterUpdate = { $inc: { totalAttempts: 1, ...(passed && { totalPassed: 1 }) } };
        if (isTopic && sourceTopicId) {
            await Topic.findByIdAndUpdate(sourceTopicId, counterUpdate);
        } else if (!isTopic && sourceExamId) {
            await Exam.findByIdAndUpdate(sourceExamId, counterUpdate);
        }

        res.json({
            message: 'Exam evaluated successfully',
            result: newAttempt
        });
    } catch (error) {
        console.error("Submit exam error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateUserProfile = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Cannot update profile.' });
    }
    try {
        const {
            name, education, experience, skills,
            bio, company, jobTitle, location, institution, website, socials
        } = req.body;

        const sanitize = (str) => typeof str === 'string' ? str.replace(/<[^>]*>?/gm, '') : str;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = sanitize(name);
        if (education) user.education = sanitize(education);
        if (experience) user.experience = sanitize(experience);
        if (skills) user.skills = Array.isArray(skills) ? skills.map(s => sanitize(s)) : skills;

        if (bio !== undefined) user.bio = sanitize(bio);
        if (company !== undefined) user.company = sanitize(company);
        if (jobTitle !== undefined) user.jobTitle = sanitize(jobTitle);
        if (location !== undefined) user.location = sanitize(location);
        if (institution !== undefined) user.institution = sanitize(institution);
        if (website !== undefined) user.website = sanitize(website);
        if (socials) {
            const sanitizedSocials = {};
            for (let key in socials) {
                sanitizedSocials[key] = sanitize(socials[key]);
            }
            user.socials = { ...user.socials.toObject(), ...sanitizedSocials };
        }

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error("Update profile error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getExams = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Cannot fetch exams.' });
    }
    try {
        const exams = await Exam.find({}).populate('domainId', 'name');
        res.json(exams);
    } catch (error) {
        console.error("Get exams error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProblems = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Cannot fetch problems.' });
    }
    try {
        const user = await User.findById(req.user.id);
        const attemptedIds = new Set(
            (user?.progress?.examScores || [])
                .filter(score => score.passed) // Only count passed attempts as "Solved"
                .map(score => score.examId?.toString())
                .filter(Boolean)
        );

        // 1. Fetch coding-exclusive topic-wise exams
        const examProblems = await Exam.find({
            'questions.type': 'coding',
            type: 'Topic-wise'
        }).populate('domainId', 'name');

        // 2. Fetch DSA practice topics (Core CS challenges)
        const topicProblems = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            lessonType: 'practice'
        });

        // 3. Normalize and combine
        const normalizedExams = examProblems.map(p => ({
            _id: p._id,
            title: p.title,
            difficulty: p.questions.find(q => q.type === 'coding')?.difficulty || 'Medium',
            category: p.domainId?.name || 'Algorithms',
            source: 'exam',
            isAttempted: attemptedIds.has(p._id.toString()),
            acceptanceRate: p.totalAttempts > 0
                ? ((p.totalPassed / p.totalAttempts) * 100).toFixed(1)
                : null,
            questions: p.questions
        }));

        const normalizedTopics = topicProblems.map(p => ({
            _id: p._id,
            title: p.title,
            difficulty: p.difficulty || 'Medium',
            category: p.topicGroup || 'DSA',
            source: 'topic',
            isAttempted: attemptedIds.has(p._id.toString()),
            acceptanceRate: p.totalAttempts > 0
                ? ((p.totalPassed / p.totalAttempts) * 100).toFixed(1)
                : null,
            questions: [{
                questionText: p.content?.problemStatement || p.content?.description || p.title,
                type: 'coding',
                difficulty: p.difficulty,
                explanation: p.content?.explanation,
                testCases: p.content?.testCases,
                starterCode: p.content?.starterCode,
                constraints: p.content?.constraints || "",
                hints: p.content?.keyPoints || [],
                tags: p.content?.tags || []
            }]
        }));

        res.json([...normalizedExams, ...normalizedTopics]);
    } catch (error) {
        console.error("Get problems error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProblemById = async (req, res) => {
    try {
        let problem = await Exam.findById(req.params.id).populate('domainId', 'name');

        if (problem) {
            // Return normalized exam
            return res.json({
                ...problem._doc,
                source: 'exam'
            });
        }

        // Try Topic collection
        const topic = await Topic.findById(req.params.id);
        if (topic) {
            // Convert Topic to Exam-like structure for the frontend
            return res.json({
                _id: topic._id,
                title: topic.title,
                source: 'topic',
                questions: [{
                    questionText: topic.content?.problemStatement || topic.content?.description || topic.title,
                    type: 'coding',
                    difficulty: topic.difficulty,
                    explanation: topic.content?.explanation,
                    testCases: topic.content?.testCases,
                    starterCode: topic.content?.starterCode,
                    constraints: topic.content?.constraints || "",
                    hints: topic.content?.keyPoints || [],
                    tags: topic.content?.tags || []
                }]
            });
        }

        res.status(404).json({ message: 'Problem not found' });
    } catch (error) {
        console.error("Get problem by ID error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error("Delete account error", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMockSet = async (req, res) => {
    try {
        const { type } = req.query; // 'Online Assessment', 'Phone Interview', 'Onsite Interview'

        let count = 2;
        if (type === 'Phone Interview') count = 1;
        if (type === 'Onsite Interview') count = 3;

        const domain = await Domain.findOne({ name: "Interview Preparation" });
        if (!domain) return res.status(404).json({ message: 'Interview domain not found' });

        const pool = await Topic.find({ domainId: domain._id });

        if (pool.length === 0) return res.status(404).json({ message: 'No questions in pool' });

        // Simple shuffle
        const shuffled = pool.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count).map(q => ({
            id: q._id,
            title: q.title,
            description: q.content?.description || q.description,
            starterCode: q.content?.starterCode || "// Start coding here",
            difficulty: q.content?.difficulty || q.difficulty
        }));

        res.json(selected);
    } catch (error) {
        console.error("Get mock set error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    selectDomain,
    saveRecommendation,
    completeTopic,
    submitExam,
    getExams,
    getProblems,
    getProblemById,
    deleteAccount,
    getMockStats,
    submitMock,
    getMockSet
};
