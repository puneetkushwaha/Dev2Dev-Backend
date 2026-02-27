const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const titles = ['Array With Majority Element', 'Array With Majority Element I', 'Flipping an Image'];
    for (const title of titles) {
        const t = await Topic.findOne({ title: new RegExp(title, 'i') });
        if (t) {
            console.log(`--- ${t.title} ---`);
            console.log(`JS Scope: ${t.content?.starterCodes?.javascript?.slice(0, 100)}...`);
        } else {
            console.log(`--- ${title} NOT FOUND ---`);
        }
    }
    process.exit(0);
}
check();
