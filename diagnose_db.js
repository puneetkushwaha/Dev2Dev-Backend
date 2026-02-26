const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function check() {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/develevate';
        console.log('Target URI:', uri.substring(0, 30) + '...');

        await mongoose.connect(uri);
        const db = mongoose.connection;
        console.log('Connected to DB:', db.name);
        console.log('Host:', db.host);

        const Topic = require('./models/Topic');
        const subjects = ['OOP', 'OS', 'DBMS', 'CN'];
        console.log('--- Database Check ---');
        for (const s of subjects) {
            const count = await Topic.countDocuments({ subject: s });
            console.log(`${s}: ${count} records`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}
check();
