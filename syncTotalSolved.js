const mongoose = require('mongoose');
const User = require('./models/User');
const { checkAndAwardBadges } = require('./controllers/userController');
require('dotenv').config();

async function sync() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        console.log('Fetching users...');
        const users = await User.find();
        console.log(`Found ${users.length} users. Syncing...`);

        for (const user of users) {
            try {
                process.stdout.write(`Syncing ${user.email}... `);
                let count = 0;
                const scores = (user.progress && user.progress.examScores) ? user.progress.examScores : [];

                count = scores.filter(score => score.passed === true).length;
                user.totalSolved = count;

                if (!user.solvedStats) user.solvedStats = { easy: 0, medium: 0, hard: 0 };

                user.solvedStats.easy = scores.filter(s => s.passed && s.difficulty === 'Easy').length;
                user.solvedStats.medium = scores.filter(s => s.passed && s.difficulty === 'Medium').length;
                user.solvedStats.hard = scores.filter(s => s.passed && s.difficulty === 'Hard').length;

                user.markModified('solvedStats');
                checkAndAwardBadges(user);
                await user.save();
                console.log(`✅ (${count})`);
            } catch (userErr) {
                console.log(`❌ Error: ${userErr.message}`);
            }
        }

        console.log('Total Solved synchronization complete.');
        mongoose.connection.close();
    } catch (err) {
        console.error('Sync Error:', err);
        process.exit(1);
    }
}

sync();
