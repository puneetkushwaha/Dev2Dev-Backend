const mongoose = require('mongoose');
require('dotenv').config();

async function checkDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to Database:', mongoose.connection.name);
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
}

checkDb();
