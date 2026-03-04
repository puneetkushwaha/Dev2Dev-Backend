const mongoose = require('mongoose');
const User = require('./models/User');
const Exam = require('./models/Exam');
const Topic = require('./models/Topic');
const { checkAndAwardBadges } = require('./controllers/userController');
require('dotenv').config();

async function sync() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Build DSA curriculum map (same logic as getUserProfile)
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

        console.log(`DSA curriculum loaded: ${curriculumMap.size} problems`);

        console.log('Fetching users...');
        const users = await User.find();
        console.log(`Found ${users.length} users. Syncing...`);

        for (const user of users) {
            try {
                process.stdout.write(`Syncing ${user.email}... `);
                const scores = (user.progress && user.progress.examScores) ? user.progress.examScores : [];

                // Only count unique DSA problems that were passed
                const solvedStats = { easy: 0, medium: 0, hard: 0 };
                const solvedProblemIds = new Set();

                scores.forEach(exam => {
                    if (exam.passed && exam.examId) {
                        const pid = exam.examId.toString();
                        if (curriculumMap.has(pid) && !solvedProblemIds.has(pid)) {
                            solvedProblemIds.add(pid);
                            const diff = curriculumMap.get(pid);
                            if (solvedStats[diff] !== undefined) solvedStats[diff]++;
                        }
                    }
                });

                const count = solvedProblemIds.size;
                user.totalSolved = count;
                user.solvedStats = solvedStats;
                user.markModified('solvedStats');

                checkAndAwardBadges(user);
                await user.save();
                console.log(`✅ (${count} DSA solved | Easy:${solvedStats.easy} Med:${solvedStats.medium} Hard:${solvedStats.hard})`);
            } catch (userErr) {
                console.log(`❌ Error: ${userErr.message}`);
            }
        }

        console.log('Total Solved synchronization complete (DSA only).');
        mongoose.connection.close();
    } catch (err) {
        console.error('Sync Error:', err);
        process.exit(1);
    }
}

sync();
