const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const domain = await Domain.findOne({ name: "Interview Preparation" });
    const populatedCount = await Topic.countDocuments({
        domainId: domain._id,
        "content.starterCodes": { $exists: true }
    });
    console.log(`Interview Topics Populated: ${populatedCount} / 7`);
    process.exit(0);
}
check();
