const mongoose = require('mongoose');
require('dotenv').config();
const Domain = require('./models/Domain');

const domains = [
    {
        name: "Web Development",
        description: "Master frontend and backend technologies to build modern, responsive web applications.",
        scope: "Extremely High",
        estimatedTime: "3-6 months",
        levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
        name: "Data Science",
        description: "Learn to extract insights from data using Python, statistics, and machine learning models.",
        scope: "Very High",
        estimatedTime: "4-8 months",
        levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
        name: "Cyber Security",
        description: "Understand networks, cryptography, and ethical hacking to protect digital assets.",
        scope: "High",
        estimatedTime: "4-6 months",
        levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
        name: "Cloud Computing",
        description: "Deploy, manage, and scale applications on platforms like AWS, Azure, and GCP.",
        scope: "Very High",
        estimatedTime: "3-5 months",
        levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
        name: "Mobile App Development",
        description: "Build native or cross-platform applications for iOS and Android devices.",
        scope: "High",
        estimatedTime: "3-6 months",
        levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
        name: "Artificial Intelligence",
        description: "Dive into deep learning, neural networks, and NLP to build intelligent systems.",
        scope: "Extremely High",
        estimatedTime: "6-12 months",
        levels: ["Beginner", "Intermediate", "Advanced"]
    }
];

const seedDomains = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Use upsert — update if exists, insert if not. NEVER deletes Core CS domain.
        for (const domain of domains) {
            await Domain.updateOne(
                { name: domain.name },
                { $set: domain },
                { upsert: true }
            );
            console.log(`✅ Upserted: ${domain.name}`);
        }

        console.log("Successfully seeded domains");
        process.exit();
    } catch (error) {
        console.error("Error seeding domains:", error);
        process.exit(1);
    }
};

seedDomains();
