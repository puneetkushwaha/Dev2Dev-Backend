const mongoose = require('mongoose');
const Tutorial = require('./models/Tutorial');
const User = require('./models/User');
const { getTutorialById } = require('./controllers/tutorialController');
require('dotenv').config();

async function testAccess() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        // Find a premium tutorial
        const premiumTutorial = await Tutorial.findOne({ isPremium: true });
        if (!premiumTutorial) {
            console.log("No premium tutorial found to test.");
            return;
        }
        console.log(`Testing with Premium Tutorial: ${premiumTutorial.title} (${premiumTutorial._id})`);

        // Mock Request and Response for Unauthenticated User
        const reqUnauth = { params: { id: premiumTutorial._id }, user: null };
        const resUnauth = {
            json: (data) => {
                const hasYtId = data.lessons.some(l => l.ytId);
                console.log(`Unauthenticated access - Has ytId: ${hasYtId} (Expected: false)`);
                if (hasYtId) console.error("FAILED: Unauthenticated user saw ytId");
            },
            status: (code) => {
                console.log(`Unauthenticated access - Status: ${code}`);
                return resUnauth;
            }
        };

        await getTutorialById(reqUnauth, resUnauth);

        // Mock Request for Admin User (assuming there's an admin)
        const adminUser = await User.findOne({ role: 'admin' });
        if (adminUser) {
            const reqAdmin = { params: { id: premiumTutorial._id }, user: { id: adminUser._id } };
            const resAdmin = {
                json: (data) => {
                    const hasYtId = data.lessons.some(l => l.ytId);
                    console.log(`Admin access - Has ytId: ${hasYtId} (Expected: true)`);
                    if (!hasYtId) console.error("FAILED: Admin user did not see ytId");
                },
                status: (code) => {
                    console.log(`Admin access - Status: ${code}`);
                    return resAdmin;
                }
            };
            await getTutorialById(reqAdmin, resAdmin);
        }

    } catch (err) {
        console.error("Test error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

testAccess();
