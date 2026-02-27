const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fix() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected for Hotfix');

    const targetTopics = await Topic.find({
        $or: [
            { "content.starterCodes.javascript": { $regex: /Error generating/ } },
            { "content.starterCodes.javascript": { $exists: false } }
        ]
    });

    console.log(`Hotfixing ${targetTopics.length} topics...`);

    for (const topic of targetTopics) {
        console.log(`Fixing Boilerplate & Testcases for: ${topic.title}`);
        const description = topic.content.problemStatement || topic.content.description || topic.title;

        try {
            // Generate Boilerplates
            const bResp = await axios.post(`${AI_SERVICE_URL}/generate_boilerplates`, {
                title: topic.title,
                description
            });
            if (bResp.data) {
                await Topic.updateOne({ _id: topic._id }, { $set: { "content.starterCodes": bResp.data } });
                console.log(`  [OK] Boilerplate for ${topic.title}`);
            }
            await sleep(2000);

            // Generate Test Cases
            const tResp = await axios.post(`${AI_SERVICE_URL}/generate_test_cases`, {
                title: topic.title,
                description
            });
            if (tResp.data) {
                await Topic.updateOne({ _id: topic._id }, { $set: { "content.testCases": tResp.data } });
                console.log(`  [OK] Testcases for ${topic.title}`);
            }
            await sleep(2000);
        } catch (e) {
            console.error(`  [FAIL] ${topic.title}: ${e.message}`);
            await sleep(5000);
        }
    }

    console.log('Hotfix Complete');
    process.exit(0);
}

fix();
