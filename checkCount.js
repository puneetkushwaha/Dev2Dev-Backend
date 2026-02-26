const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const Exam = require('./models/Exam');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        const topicCount = await Topic.countDocuments();
        const examCount = await Exam.countDocuments();
        const dsaTopics = await Topic.countDocuments({ subject: 'DSA' });
        const oopTopics = await Topic.countDocuments({ subject: 'OOP' });

        console.log('--- Database Stats ---');
        console.log('Total Topics:', topicCount);
        console.log('Total Exams:', examCount);
        console.log('DSA Topics:', dsaTopics);
        console.log('OOP Topics:', oopTopics);

        await mongoose.connection.close();
    } catch (e) {
        console.error(e);
    }
}
check();
