const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

async function checkInterview() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const domain = await Domain.findOne({ name: "Interview Preparation" });
        if (!domain) {
            console.log('Domain "Interview Preparation" not found');
            process.exit(0);
        }
        console.log(`Domain ID: ${domain._id}`);

        const count = await Topic.countDocuments({ domainId: domain._id });
        console.log(`Topics in "Interview Preparation": ${count}`);

        if (count > 0) {
            const topics = await Topic.find({ domainId: domain._id }).limit(5);
            console.log('Sample Topics:', JSON.stringify(topics.map(t => ({ title: t.title, id: t._id, lessonType: t.lessonType })), null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
checkInterview();
