const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Contest = require('../models/Contest');

const verifyDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        const count = await Contest.countDocuments({ tags: "TCS NQT" });
        console.log(`✅ Found ${count} TCS NQT contests in the database.`);
        
        const contests = await Contest.find({ tags: "TCS NQT" }).select('title questions');
        contests.forEach(c => {
            console.log(`- ${c.title} (${c.questions.length} questions)`);
        });
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Verification Error:', err.message);
        process.exit(1);
    }
};

verifyDB();
