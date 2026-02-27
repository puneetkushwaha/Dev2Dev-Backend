const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Exam = require('../models/Exam');

async function searchExams() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const exams = await Exam.find({}, 'title type questions_count');
        console.log(`Total Exams: ${exams.length}`);

        const summary = exams.reduce((acc, e) => {
            acc[e.type] = (acc[e.type] || 0) + 1;
            return acc;
        }, {});
        console.log('Exams by type:', JSON.stringify(summary, null, 2));

        const samples = exams.map(e => ({ title: e.title, type: e.type }));
        console.log('Sample Exams:', JSON.stringify(samples.slice(0, 20), null, 2));

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
searchExams();
