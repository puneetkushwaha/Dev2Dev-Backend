const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const domain = await Domain.findOne({ name: "Interview Preparation" });
    const practiceCount = await Topic.countDocuments({ domainId: domain._id, lessonType: 'practice' });
    const totalCount = await Topic.countDocuments({ domainId: domain._id });
    console.log(`Domain: Interview Preparation (${domain?._id})`);
    console.log(`Practice Topics: ${practiceCount}`);
    console.log(`Total Topics: ${totalCount}`);
    process.exit(0);
}
check();
