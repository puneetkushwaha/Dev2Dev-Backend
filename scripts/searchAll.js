const mongoose = require('mongoose');
require('dotenv').config();

async function searchAll() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const id = '69a0247c557b4cac735ff392';

        for (const col of collections) {
            const found = await db.collection(col.name).findOne({ _id: new mongoose.Types.ObjectId(id) });
            if (found) {
                console.log(`FOUND in collection ${col.name}:`, JSON.stringify(found, null, 2));
                process.exit(0);
            }
        }

        console.log('ID not found in any collection');
        process.exit(0);
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
}

searchAll();
