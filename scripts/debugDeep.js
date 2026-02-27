const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

async function debugDeep() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const id = '69a0247c557b4cac735ff392';
        const topic = await Topic.findById(id);
        if (topic) {
            console.log('ID:', id);
            console.log('Title:', topic.title);
            console.log('Has StarterCodes:', !!topic.content.starterCodes && Object.keys(topic.content.starterCodes).length > 0);
            console.log('StarterCodes Keys:', Object.keys(topic.content.starterCodes || {}));
            console.log('Has TestCases:', !!topic.content.testCases && topic.content.testCases.length > 0);
            if (topic.content.testCases) console.log('TestCases Count:', topic.content.testCases.length);
        } else {
            console.log('ID not found');
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
debugDeep();
