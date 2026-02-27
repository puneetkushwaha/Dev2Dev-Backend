const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

async function generateBoilerplates(title, description) {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/generate_boilerplates`, {
            title,
            description
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to generate boilerplates for ${title}:`, error.message);
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
            if (!topic.content.starterCodes || Object.keys(topic.content.starterCodes).length < 5) {
                console.log(`Generating boilerplates for Topic: ${topic.title}`);
                const description = topic.content.problemStatement || topic.content.description || topic.title;
                const boilerplates = await generateBoilerplates(topic.title, description);
                if (boilerplates) {
                    topic.content.starterCodes = boilerplates;
                    await topic.save();
                    console.log(`Updated codes for ${topic.title}`);
                }
            }
        }

        // 2. Process Exams (Coding exclusive)
        const exams = await Exam.find({ 'questions.type': 'coding' });
        console.log(`Processing ${exams.length} exams...`);
        for (const exam of exams) {
            let updated = false;
            for (let q of exam.questions) {
                if (q.type === 'coding' && (!q.starterCodes || Object.keys(q.starterCodes).length < 5)) {
                    console.log(`Generating boilerplates for Exam: ${exam.title}`);
                    const boilerplates = await generateBoilerplates(exam.title, q.questionText);
                    if (boilerplates) {
                        q.starterCodes = boilerplates;
                        updated = true;
                    }
                }
            }
            if (updated) {
                exam.markModified('questions');
                await exam.save();
                console.log(`Updated codes for Exam: ${exam.title}`);
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
