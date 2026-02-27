const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const brokenTopics = await Topic.countDocuments({
        "content.starterCodes.javascript": { $regex: /Error/ }
    });
    const missingTopics = await Topic.countDocuments({
        "content.starterCodes.javascript": { $exists: false }
    });

    console.log('--- REFRESH STATUS ---');
    console.log(`Broken Topics (Old Errors): ${brokenTopics}`);
    console.log(`Missing Boilerplates: ${missingTopics}`);

    if (brokenTopics > 0) {
        const sample = await Topic.findOne({ "content.starterCodes.javascript": { $regex: /Error/ } });
        console.log(`Example Broken: ${sample.title}`);
    }

    process.exit(0);
}
check();
