const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../models/Topic');

async function clearCoreCS() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const result = await Topic.deleteMany({ isCoreCS: true });
        console.log(`Successfully deleted ${result.deletedCount} Core CS topics.`);

        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing Core CS data:', error);
        process.exit(1);
    }
}

clearCoreCS();
