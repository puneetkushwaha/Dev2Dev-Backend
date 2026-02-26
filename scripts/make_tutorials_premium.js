require('dotenv').config();
const mongoose = require('mongoose');
const Tutorial = require('./models/Tutorial');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB.");
        const result = await Tutorial.updateMany({}, {
            $set: { isPremium: true, price: 69 }
        });
        console.log("Updated tutorials to 69:", result);
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
};

run();
