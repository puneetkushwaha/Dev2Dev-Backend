const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

async function debugId() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const id = '69a0247c557b4cac735ff392';

        const exam = await Exam.findById(id);
        if (exam) {
            console.log('Found in Exams:', JSON.stringify(exam, null, 2));
        } else {
            const topic = await Topic.findById(id);
            if (topic) {
                console.log('Found in Topics:', JSON.stringify(topic, null, 2));
            } else {
                console.log('ID not found in Exams or Topics');
            }
        }
        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

debugId();
