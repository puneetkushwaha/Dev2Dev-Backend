const mongoose = require('mongoose');
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/develevate_db';

async function checkCounts() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Check Exam counts by Domain
        const examCounts = await Exam.aggregate([
            { $match: { 'questions.type': 'coding' } },
            { $lookup: { from: 'domains', localField: 'domainId', foreignField: '_id', as: 'domain' } },
            { $unwind: '$domain' },
            { $group: { _id: '$domain.name', count: { $sum: 1 } } }
        ]);
        console.log('Exam Counts by Domain:', examCounts);

        // Check Topic counts by TopicGroup (Core CS / DSA)
        const topicCounts = await Topic.aggregate([
            { $match: { isCoreCS: true, subject: 'DSA' } },
            { $group: { _id: '$topicGroup', count: { $sum: 1 } } }
        ]);
        console.log('Topic Counts by TopicGroup:', topicCounts);

        // Check Sample Topic
        const sampleTopic = await Topic.findOne({ subject: 'DSA' });
        console.log('Sample DSA Topic:', JSON.stringify(sampleTopic, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkCounts();
