const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

async function searchExact() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const exams = await Exam.find({ title: /Two Sum/ });
        console.log('Exams found:', exams.map(e => ({ id: e._id, title: e.title })));

        const topics = await Topic.find({ title: /Two Sum/ });
        console.log('Topics found:', topics.map(t => ({ id: t._id, title: t.title })));

        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

searchExact();
