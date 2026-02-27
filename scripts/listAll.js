const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

async function listAll() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const exams = await Exam.find({}, '_id title');
        console.log('All Exams:', JSON.stringify(exams, null, 2));

        const topics = await Topic.find({}, '_id title');
        console.log('All Topics:', JSON.stringify(topics, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

listAll();
