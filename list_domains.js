const mongoose = require('mongoose');
const Domain = require('./models/Domain');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function listDomains() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        const domains = await Domain.find({}, 'name');
        console.log('Domains:', JSON.stringify(domains, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listDomains();
