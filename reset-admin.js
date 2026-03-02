require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const resetAdminPassword = async (email, newPassword) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const result = await User.findOneAndUpdate(
            { email, role: 'admin' },
            { password: hashedPassword },
            { new: true }
        );

        if (result) {
            console.log(`✅ Password successfully reset for: ${email}`);
            console.log(`🔑 New Password: ${newPassword}`);
        } else {
            console.log(`❌ Admin user not found with email: ${email}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const email = process.argv[2];
const pass = process.argv[3];

if (!email || !pass) {
    console.log('Usage: node reset-admin.js <email> <new_password>');
    process.exit(1);
}

resetAdminPassword(email, pass);
