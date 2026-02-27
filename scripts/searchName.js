const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

async function searchName() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const titleQuery = /Two Sum/i;

        const exams = await Exam.find({ title: titleQuery });
        console.log('Found in Exams:', JSON.stringify(exams.map(e => ({ id: e._id, title: e.title, type: e.type })), null, 2));

        const topics = await Topic.find({ title: titleQuery });
        console.log('Found in Topics:', JSON.stringify(topics.map(t => ({ id: t._id, title: t.title, lessonType: t.lessonType })), null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

searchName();
