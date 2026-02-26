require('dotenv').config();
const mongoose = require('mongoose');
const Domain = require('./models/Domain');

const seedCoreCS = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');

        const coreCS = await Domain.findOne({ name: 'Core Computer Science' });

        if (!coreCS) {
            console.log('Core Computer Science domain not found. Creating...');
            await Domain.create({
                name: "Core Computer Science",
                description: "Master the fundamentals of Computer Science: DSA, OS, DBMS, Networks, and System Design.",
                scope: "Foundation",
                estimatedTime: "6-12 months",
                levels: ["Beginner", "Intermediate", "Advanced"]
            });
            console.log('Core Computer Science domain created successfully.');
        } else {
            console.log('Core Computer Science domain already exists.');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding Core CS:', error);
        process.exit(1);
    }
};

seedCoreCS();
