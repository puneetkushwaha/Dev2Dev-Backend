const mongoose = require('mongoose');
require('dotenv').config();

async function listDbs() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('Databases:', JSON.stringify(dbs.databases, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

listDbs();
