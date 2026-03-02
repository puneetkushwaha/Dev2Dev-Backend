const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function diagnose() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
    const oops = await Topic.find({ subject: 'OOP' });
    console.log("OOPs records:", oops.length);
    if (oops.length > 0) {
        console.log("First OOPs title:", oops[0].title);
        console.log("Has explanation content?", !!oops[0].content?.explanation);
        console.log("Content length:", oops[0].content?.explanation?.length);
        console.log("First MCQ explanation:", oops[0].quiz[0]?.explanation);
    }

    process.exit(0);
}
diagnose();
