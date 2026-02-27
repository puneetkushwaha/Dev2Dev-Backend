const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');
const fs = require('fs');

async function debug() {
    try {
        mongoose.set('debug', true);
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const exams = await Exam.find({ 'questions.type': 'coding' });
        const topics = await Topic.find({ isCoreCS: true, subject: 'DSA', lessonType: 'practice' });

        let output = "EXAMS WITH STARTING CODES:\n";
        exams.forEach(e => {
            const hasCodes = e.questions.some(q => (q.starterCodes && Object.keys(q.starterCodes).length > 0) || (q.testCases && q.testCases.length > 0));
            if (hasCodes) {
                output += `Exam: ${e.title}\nCodes: ${JSON.stringify(e.questions.map(q => q.starterCodes), null, 2)}\nTestCases: ${JSON.stringify(e.questions.map(q => q.testCases), null, 2)}\n\n`;
            } else {
                output += `Exam: ${e.title} (No codes/testcases)\n`;
            }
        });

        output += "\nTOPICS WITH STARTING CODES:\n";
        topics.forEach(t => {
            const hasCodes = (t.content.starterCodes && Object.keys(t.content.starterCodes).length > 0) || (t.content.testCases && t.content.testCases.length > 0);
            if (hasCodes) {
                output += `Topic: ${t.title}\nCodes: ${JSON.stringify(t.content.starterCodes, null, 2)}\nTestCases: ${JSON.stringify(t.content.testCases, null, 2)}\n\n`;
            } else {
                output += `Topic: ${t.title} (No codes/testcases)\n`;
            }
        });

        fs.writeFileSync('debug_all_output.txt', output);
        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

debug();
