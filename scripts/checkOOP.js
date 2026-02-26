const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        const t = await Topic.findOne({ subject: 'OOP', lessonType: 'theory' });
        if (t) {
            console.log('--- OOP Topic Verified ---');
            console.log('Title:', t.title);
            console.log('Subject:', t.subject);
            console.log('TopicGroup:', t.topicGroup || 'NULL');
            console.log('isCoreCS:', t.isCoreCS);
            console.log('Quiz Count:', t.quiz.length);
        } else {
            console.log('No OOP theory topic found.');
        }
        await mongoose.connection.close();
    } catch (e) {
        console.error(e);
    }
}
check();
