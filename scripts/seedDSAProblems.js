const mongoose = require('mongoose');
require('dotenv').config();
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');

const seedDSAProblems = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        // Find or create DSA domain
        let dsaDomain = await Domain.findOne({ name: 'DSA' });
        if (!dsaDomain) {
            dsaDomain = await Domain.findOne({ name: 'Web Development' }); // Fallback if DSA not found
            console.log('DSA domain not found, using fallback or skipping seeding for specific domain');
        }

        const problems = [
            {
                title: "Two Sum",
                type: "Topic-wise",
                domainId: dsaDomain ? dsaDomain._id : null,
                questions: [{
                    questionText: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
                    type: "coding",
                    difficulty: "Easy",
                    explanation: "Use a hash map to store the complement of each number and its index."
                }]
            },
            {
                title: "Palindrome Number",
                type: "Topic-wise",
                domainId: dsaDomain ? dsaDomain._id : null,
                questions: [{
                    questionText: "Given an integer x, return true if x is a palindrome, and false otherwise.",
                    type: "coding",
                    difficulty: "Easy",
                    explanation: "Reverse the number and compare it with the original."
                }]
            },
            {
                title: "Sqrt(x)",
                type: "Topic-wise",
                domainId: dsaDomain ? dsaDomain._id : null,
                questions: [{
                    questionText: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.",
                    type: "coding",
                    difficulty: "Medium",
                    explanation: "Use binary search to find the integer square root efficiently."
                }]
            },
            {
                title: "Maximum Sum with K elements",
                type: "Topic-wise",
                domainId: dsaDomain ? dsaDomain._id : null,
                questions: [{
                    questionText: "You are given a 0-indexed integer array nums and an integer k. Your task is to perform exactly k operations on the array.",
                    type: "coding",
                    difficulty: "Easy",
                    explanation: "Focus on greedy approach by picking the maximum element repeatedly."
                }]
            }
        ];

        for (const prob of problems) {
            const existing = await Exam.findOne({ title: prob.title });
            if (!existing) {
                await new Exam(prob).save();
                console.log(`Seeded problem: ${prob.title}`);
            }
        }

        console.log('DSA Problems seeding completed');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDSAProblems();
