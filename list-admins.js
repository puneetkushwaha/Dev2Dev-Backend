require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        const admins = await User.find({ role: 'admin' }).select('email name password');
        console.log('--- Admin Users Found ---');
        admins.forEach(a => console.log(`Name: ${a.name}, Email: ${a.email}, HasPassword: ${!!a.password}`));
        console.log('-------------------------');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAdmins();
