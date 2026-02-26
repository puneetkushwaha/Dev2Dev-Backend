const mongoose = require('mongoose');
const path = require('path');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/develevate';

async function check() {
    await mongoose.connect(MONGO_URI);
    const domains = await Domain.find({ name: { $in: ['Interview Preparation', 'Aptitude & Reasoning', 'Core Computer Science'] } });
    for (const d of domains) {
        console.log(`\nDomain: ${d.name} (${d._id})`);
        const topics = await Topic.find({ domainId: d._id });
        topics.forEach(t => console.log(` - Topic: ${t.title} [Subject: ${t.subject}, Group: ${t.topicGroup}, Type: ${t.lessonType}]`));
    }
    process.exit(0);
}

check();
