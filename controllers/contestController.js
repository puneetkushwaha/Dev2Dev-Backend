const Contest = require('../models/Contest');
const axios = require('axios');

// Create Contest
exports.createContest = async (req, res) => {
    try {
        const contest = new Contest(req.body);
        await contest.save();
        res.status(201).json(contest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all contests
exports.getContests = async (req, res) => {
    try {
        const contests = await Contest.find().sort({ startTime: -1 });
        res.json(contests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single contest
exports.getContestById = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        if (!contest) return res.status(404).json({ message: 'Contest not found' });
        res.json(contest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update contest
exports.updateContest = async (req, res) => {
    try {
        const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(contest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete contest
exports.deleteContest = async (req, res) => {
    try {
        await Contest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contest deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// AI Structuring of content
exports.structureContent = async (req, res) => {
    const { rawText, targetType } = req.body;
    try {
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
        const response = await axios.post(`${aiServiceUrl}/structure_content`, {
            raw_text: rawText,
            target_type: targetType // 'contest' or 'exam'
        });
        res.json(response.data);
    } catch (err) {
        console.error("AI Structuring failed:", err.message);
        res.status(500).json({ message: "Failed to structure content with AI" });
    }
};

// Participating in a contest
exports.participate = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        const { answers } = req.body;
        const participant = {
            userId: req.user.id,
            answers: answers,
            completedAt: new Date()
        };
        
        // Calculate score
        let totalScore = 0;
        contest.questions.forEach((q, idx) => {
            const userAns = answers.find(a => a.questionIndex === idx);
            if (userAns && userAns.userAnswer === q.correctAnswer) {
                totalScore += 10; // Basic scoring, can be more complex
                userAns.isCorrect = true;
            }
        });
        
        participant.score = totalScore;
        contest.participants.push(participant);
        await contest.save();
        res.json({ score: totalScore, participant });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
