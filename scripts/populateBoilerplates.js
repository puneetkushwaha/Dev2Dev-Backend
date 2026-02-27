const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
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
        await sleep(3000); // 3 second delay to avoid rate limits
        return response.data;
    } catch (error) {
        console.error(`Failed to generate boilerplates for ${title}:`, error.message);
        await sleep(5000); // Longer sleep on error
        return null;
    }
}

async function populate() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        // 1. Process Topics
        const topics = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            lessonType: 'practice'
        });

        console.log(`Processing ${topics.length} topics...`);
        for (const topic of topics) {
            console.log(`Generating boilerplates for Topic: ${topic.title}`);
            const description = topic.content.problemStatement || topic.content.description || topic.title;
            const boilerplates = await generateBoilerplates(topic.title, description);
            if (boilerplates) {
                console.log(`AI returned boilerplates for ${topic.title}`);
                await Topic.updateOne(
                    { _id: topic._id },
                    { $set: { "content.starterCodes": boilerplates } }
                );
                console.log(`Updated codes for Topic: ${topic.title}`);
            }
        }

        // 2. Process Exams (Coding exclusive)
        const exams = await Exam.find({ 'questions.type': 'coding' });
        console.log(`Processing ${exams.length} exams...`);
        for (const exam of exams) {
            for (let i = 0; i < exam.questions.length; i++) {
                const q = exam.questions[i];
                if (q.type === 'coding') {
                    console.log(`Generating boilerplates for Exam: ${exam.title}`);
                    const boilerplates = await generateBoilerplates(exam.title, q.questionText);
                    if (boilerplates) {
                        console.log(`AI returned boilerplates for Exam: ${exam.title}`);
                        const updatePath = `questions.${i}.starterCodes`;
                        await Exam.updateOne(
                            { _id: exam._id },
                            { $set: { [updatePath]: boilerplates } }
                        );
                        console.log(`Updated codes for Exam: ${exam.title} (Question ${i})`);
                    }
                }
            }
        }

        console.log('Finished populating boilerplates.');
        process.exit(0);
    } catch (error) {
        console.error('Error in population script:', error);
        process.exit(1);
    }
}

populate();
