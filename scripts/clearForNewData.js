const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../models/Topic');
const Domain = require('../models/Domain');

async function cleanEverythingExceptAptitude() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        // 1. Identify Aptitude Domain to protect it
        const aptitudeDomain = await Domain.findOne({ name: /Aptitude/i });
        const aptitudeDomainId = aptitudeDomain ? aptitudeDomain._id : null;

        console.log(`Aptitude Domain ID found: ${aptitudeDomainId || 'None'}`);

        // 2. Clear subjects: DSA, OOP, OS, DBMS, CN
        const subjectsToRemove = ['DSA', 'OOP', 'OS', 'DBMS', 'CN'];
        const res1 = await Topic.deleteMany({
            subject: { $in: subjectsToRemove }
        });
        console.log(`Deleted ${res1.deletedCount} topics for subjects: ${subjectsToRemove.join(', ')}`);

        // 3. Clear Interview Preparation (unless it's Aptitude)
        const interviewDomain = await Domain.findOne({ name: /Interview/i });
        if (interviewDomain) {
            const res2 = await Topic.deleteMany({ domainId: interviewDomain._id });
            console.log(`Deleted ${res2.deletedCount} topics from Interview Preparation domain.`);
        }

        // 4. Double check: Any topic with isCoreCS: true that isn't already deleted
        const res3 = await Topic.deleteMany({ isCoreCS: true });
        console.log(`Deleted ${res3.deletedCount} general Core CS topics.`);

        console.log('--- Cleanup Finished (Aptitude Preserved) ---');

        await mongoose.connection.close();
        process.exit(0);
    } catch (e) {
        console.error('Cleanup Error:', e);
        process.exit(1);
    }
}

cleanEverythingExceptAptitude();
