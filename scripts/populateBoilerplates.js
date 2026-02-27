const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateBoilerplates(title, description) {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/generate_boilerplates`, {
            title,
            description
        });
        await sleep(3000);
        return response.data;
    } catch (error) {
        console.error(`Failed to generate boilerplates for ${title}:`, error.message);
        await sleep(5000);
        return null;
    }
}

async function generateTestCases(title, description) {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/generate_test_cases`, {
            title,
            description
        });
        await sleep(3000);
        return response.data;
    } catch (error) {
        console.error(`Failed to generate test cases for ${title}:`, error.message);
        await sleep(5000);
        return null;
    }
}

async function populate() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        // 1. Process Topics
        const interviewDomain = await Domain.findOne({ name: "Interview Preparation" });
        const topics = await Topic.find({
            $or: [
                { lessonType: 'practice' },
                { domainId: interviewDomain?._id }
            ]
        });

        console.log(`Processing ${topics.length} topics...`);
        for (const topic of topics) {
            console.log(`FORCE Generating for Topic: ${topic.title}`);
            const description = topic.content.problemStatement || topic.content.description || topic.title;

            const boilerplates = await generateBoilerplates(topic.title, description);
            if (boilerplates) {
                await Topic.updateOne({ _id: topic._id }, { $set: { "content.starterCodes": boilerplates } });
                console.log(`Updated codes for ${topic.title}`);
            }

            const testCases = await generateTestCases(topic.title, description);
            if (testCases) {
                await Topic.updateOne({ _id: topic._id }, { $set: { "content.testCases": testCases } });
                console.log(`Updated test cases for ${topic.title}`);
            }
        }

        // 2. Process Exams
        const exams = await Exam.find({ 'questions.type': 'coding' });
        console.log(`Processing ${exams.length} exams...`);
        for (const exam of exams) {
            for (let i = 0; i < exam.questions.length; i++) {
                const q = exam.questions[i];
                if (q.type === 'coding') {
                    console.log(`FORCE Generating for Exam: ${exam.title} - Q${i}`);

                    const boilerplates = await generateBoilerplates(exam.title, q.questionText);
                    if (boilerplates) {
                        await Exam.updateOne(
                            { _id: exam._id },
                            { $set: { [`questions.${i}.starterCodes`]: boilerplates } }
                        );
                        console.log(`Updated codes for Exam: ${exam.title}`);
                    }

                    const testCases = await generateTestCases(exam.title, q.questionText);
                    if (testCases) {
                        await Exam.updateOne(
                            { _id: exam._id },
                            { $set: { [`questions.${i}.testCases`]: testCases } }
                        );
                        console.log(`Updated test cases for Exam: ${exam.title}`);
                    }
                }
            }
        }

        console.log('Finished populating boilerplates and test cases.');
        process.exit(0);
    } catch (error) {
        console.error('Error in population script:', error);
        process.exit(1);
    }
}

populate();
