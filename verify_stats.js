const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const testStats = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");

        const user = await User.findOne({ email: 'puneettkushwaha@gmail.com' });
        if (!user) {
            console.log("User not found");
            return;
        }

        console.log("Initial Streak:", user.streak);
        console.log("Initial Solved Stats:", user.solvedStats);

        // Simulate a pass
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        // Heatmap update
        if (!user.submissionHeatmap) user.submissionHeatmap = new Map();
        user.submissionHeatmap.set(today, (user.submissionHeatmap.get(today) || 0) + 1);

        // Streak logic simulation
        if (user.lastSubmissionDate) {
            const lastDate = new Date(user.lastSubmissionDate).toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastDate === yesterdayStr) {
                user.streak += 1;
            } else if (lastDate !== today) {
                user.streak = 1;
            }
        } else {
            user.streak = 1;
        }
        user.lastSubmissionDate = now;
        user.solvedStats.easy += 1;

        await user.save();
        console.log("Updated Streak:", user.streak);
        console.log("Updated Solved Stats:", user.solvedStats);
        console.log("Heatmap for today:", user.submissionHeatmap.get(today));

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
};

testStats();
