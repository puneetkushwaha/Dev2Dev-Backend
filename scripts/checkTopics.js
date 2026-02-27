const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function checkTopics() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const topics = await Topic.find({ lessonType: 'practice' });
        console.log(`Found ${topics.length} practice topics.`);

        topics.forEach(t => {
            const hasStarterCodes = !!t.content.starterCodes && Object.keys(t.content.starterCodes).length > 0;
            const hasTestCases = !!t.content.testCases && t.content.testCases.length > 0;
            console.log(`Topic: ${t.title} [ID: ${t._id}]`);
            console.log(`  - Has StarterCodes: ${hasStarterCodes}`);
            console.log(`  - Has TestCases: ${hasTestCases}`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
checkTopics();
