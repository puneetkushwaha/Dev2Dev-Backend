const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function check() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
    const subjects = await Topic.aggregate([
        { $group: { _id: { subj: "$subject", grp: "$topicGroup" }, count: { $sum: 1 } } }
    ]);
    console.log('Topic Distribution:', subjects);
    mongoose.connection.close();
}
check();
