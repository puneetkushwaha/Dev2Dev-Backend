const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function checkTopics() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const topics = await Topic.find({ lessonType: 'practice' });

        const results = topics.map(t => ({
            title: t.title,
            id: t._id,
            hasCodes: !!t.content.starterCodes && Object.keys(t.content.starterCodes).length > 0,
            hasTests: !!t.content.testCases && t.content.testCases.length > 0,
            errorBoilerplate: t.content.starterCodes?.javascript?.includes('Error generating boilerplate') || false
        }));

        console.log(JSON.stringify(results, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
checkTopics();
