const mongoose = require('mongoose');
require('dotenv').config();
const Tutorial = require('../models/Tutorial');

const tutorials = [
    {
        title: 'DevOps Mastery Series',
        category: 'DevOps',
        thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1000',
        description: 'Comprehensive guide from Linux basics to Cloud automation. Mastering CI/CD, Docker, and Infrastructure as Code.',
        lessons: [
            {
                title: 'Introduction to DevOps & Core Concepts',
                ytId: 'gUV2jOsvmsM',
                duration: '15:20',
                description: 'Understanding the DevOps lifecycle, culture, and the role of an engineer.',
                order: 1
            },
            {
                title: 'Mastering Version Control with Git',
                ytId: 'kW1x2Q5a5AY',
                duration: '22:45',
                description: 'Workflow, branching strategies, and collaboration in professional environments.',
                order: 2
            },
            {
                title: 'CI/CD Pipelines: Jenkins & Automation',
                ytId: 'zLlguwl5NN8',
                duration: '35:10',
                description: 'Building automated testing and deployment pipelines from scratch.',
                order: 3
            },
            {
                title: 'Containerization with Docker',
                ytId: 'seigq97SBgc',
                duration: '28:30',
                description: 'Essential Docker commands, images, and container orchestration basics.',
                order: 4
            },
            {
                title: 'Infrastructure as Code (IaC) - Terraform',
                ytId: 'RqIzdXaWR78',
                duration: '42:15',
                description: 'Managing cloud infrastructure using code and scalable patterns.',
                order: 5
            }
        ]
    },
    {
        title: 'Aptitude & Quantitative Reasoning',
        category: 'Placement Prep',
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1000',
        description: 'Boost your problem-solving skills with core aptitude concepts. Essential for technical interviews and placement drives.',
        lessons: [
            {
                title: 'Quantitative Aptitude - Part 1',
                ytId: 'TAsxgS9Undw',
                duration: '18:40',
                description: 'Master basic number systems and arithmetic logic.',
                order: 1
            },
            {
                title: 'Quantitative Aptitude - Part 2',
                ytId: 'gY5eEnQkdUw',
                duration: '21:15',
                description: 'Advanced percentage and ratio proportions for competitive exams.',
                order: 2
            },
            {
                title: 'Quantitative Aptitude - Part 3',
                ytId: 'YLhazwHc3zg',
                duration: '24:50',
                description: 'Master Percentage concepts and shortcuts.',
                order: 3
            },
            {
                title: 'Quantitative Aptitude - Part 4',
                ytId: 'c3nIqXLy5GE',
                duration: '19:20',
                description: 'Profit and Loss masterclass for placement exams.',
                order: 4
            },
            {
                title: 'Quantitative Aptitude - Part 5',
                ytId: 'AIDOlFJq1zc',
                duration: '26:10',
                description: 'Time and Work - Logic and formula-free methods.',
                order: 5
            }
        ]
    }
];

const seedTutorials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('✅ Connected to MongoDB');

        // Clear existing tutorials to avoid duplicates during seeding
        await Tutorial.deleteMany({});
        console.log('🗑️  Cleared existing tutorials');

        await Tutorial.insertMany(tutorials);
        console.log('🚀 Tutorials seeded successfully!');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding tutorials:', error.message);
        process.exit(1);
    }
};

seedTutorials();
