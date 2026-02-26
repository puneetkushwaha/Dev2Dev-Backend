const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../models/Topic');

async function clean() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const subjectsToRemove = ['OS', 'DBMS', 'CN', 'OOP'];
        const result = await Topic.deleteMany({
            isCoreCS: true,
            subject: { $in: subjectsToRemove }
        });

        console.log(`Successfully removed ${result.deletedCount} topics for subjects: ${subjectsToRemove.join(', ')}`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

clean();
