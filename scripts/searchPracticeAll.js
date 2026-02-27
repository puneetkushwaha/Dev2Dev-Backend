const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function searchPractice() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const allPractice = await Topic.countDocuments({ lessonType: 'practice' });
        const coreCSDSA = await Topic.countDocuments({
            lessonType: 'practice',
            isCoreCS: true,
            subject: 'DSA'
        });

        console.log(`Total Practice Topics: ${allPractice}`);
        console.log(`Core CS DSA Practice Topics: ${coreCSDSA}`);
        console.log(`Others: ${allPractice - coreCSDSA}`);

        if (allPractice > coreCSDSA) {
            const others = await Topic.find({
                lessonType: 'practice',
                $or: [
                    { isCoreCS: { $ne: true } },
                    { subject: { $ne: 'DSA' } }
                ]
            }, 'title subject lessonType isCoreCS').limit(10);
            console.log('Sample of others:', JSON.stringify(others, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
searchPractice();
