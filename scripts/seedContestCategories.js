const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Contest = require('../models/Contest');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedContests = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const sampleContests = [
            {
                title: "Daily DSA Challenge #42",
                description: "Quick 30-minute algorithm practice.",
                durationMinutes: 30,
                startTime: new Date(),
                endTime: new Date(Date.now() + 86400000), // 1 day later
                contestType: "daily",
                isActive: true,
                questions: [{ questionText: "Solve Two Sum", options: ["A", "B", "C", "D"], correctAnswer: "0" }]
            },
            {
                title: "Weekly Frontend Marathon",
                description: "Deep dive into React and CSS patterns.",
                durationMinutes: 120,
                startTime: new Date(),
                endTime: new Date(Date.now() + 86400000 * 7), // 1 week later
                contestType: "weekly",
                isActive: true,
                questions: [{ questionText: "Explain closures", options: ["A", "B", "C", "D"], correctAnswer: "1" }]
            },
            {
                title: "Microsoft Prep: Dynamic Programming",
                description: "Master DP problems frequently asked at Microsoft interviews.",
                durationMinutes: 90,
                startTime: new Date(),
                endTime: new Date(Date.now() + 86400000 * 10),
                contestType: "special",
                tags: ["Microsoft"],
                image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                isActive: true,
                questions: [{ questionText: "Solve Knapsack", options: ["A", "B", "C", "D"], correctAnswer: "2" }]
            },
            {
                title: "Google SDE Intern Mock",
                description: "Experience the rigorous Google interview process.",
                durationMinutes: 60,
                startTime: new Date(),
                endTime: new Date(Date.now() + 86400000 * 14),
                contestType: "special",
                tags: ["Google"],
                image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                isActive: true,
                questions: [{ questionText: "System Design: TinyURL", options: ["A", "B", "C", "D"], correctAnswer: "3" }]
            }
        ];

        await Contest.insertMany(sampleContests);
        console.log("Sample contests seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err.message);
        process.exit(1);
    }
};

seedContests();
