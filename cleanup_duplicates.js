const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

async function cleanup() {
    await mongoose.connect(process.env.MONGO_URI);
    const Topic = require('./models/Topic');
    const Exam = require('./models/Exam');

    console.log('Cleaning up duplicate Topics...');
    const allTopics = await Topic.find({});
    const seenTopics = new Set();
    const toDeleteTopics = [];

    const getCore = (t) => {
        const match = t.match(/^(\d+)\.\s*(.*)$/);
        return match ? match[2].toLowerCase().trim() : t.toLowerCase().trim();
    };

    for (const t of allTopics) {
        const core = getCore(t.title);
        if (seenTopics.has(core)) {
            toDeleteTopics.push(t._id);
            console.log(`Marking Topic for deletion: "${t.title}" (ID: ${t._id})`);
        } else {
            seenTopics.add(core);
        }
    }

    if (toDeleteTopics.length > 0) {
        await Topic.deleteMany({ _id: { $in: toDeleteTopics } });
        console.log(`Deleted ${toDeleteTopics.length} duplicate Topics.`);
    } else {
        console.log('No duplicate Topics found.');
    }

    console.log('\nCleaning up duplicate Exams...');
    const allExams = await Exam.find({});
    const seenExams = new Set();
    const toDeleteExams = [];

    for (const e of allExams) {
        const core = getCore(e.title);
        // Exclude generic names that might be valid duplicates across domains if they exist
        // But here we want to deduplicate by title
        if (seenExams.has(core)) {
            toDeleteExams.push(e._id);
            console.log(`Marking Exam for deletion: "${e.title}" (ID: ${e._id})`);
        } else {
            seenExams.add(core);
        }
    }

    if (toDeleteExams.length > 0) {
        await Exam.deleteMany({ _id: { $in: toDeleteExams } });
        console.log(`Deleted ${toDeleteExams.length} duplicate Exams.`);
    } else {
        console.log('No duplicate Exams found.');
    }

    mongoose.connection.close();
}

cleanup().catch(err => console.error(err));
