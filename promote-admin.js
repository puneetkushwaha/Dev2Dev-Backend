require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const promoteToAdmin = async (email) => {
    try {
        if (!email) {
            console.error('❌ Please provide an email address.');
            process.exit(1);
        }

        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/develevate';
        await mongoose.connect(mongoUri);
        console.log('📡 Connected to MongoDB...');

        const user = await User.findOne({ email });

        if (!user) {
            console.error(`❌ User not found with email: ${email}`);
            process.exit(1);
        }

        if (user.role === 'admin') {
            console.log(`ℹ️ User ${email} is already an admin.`);
            process.exit(0);
        }

        user.role = 'admin';
        await user.save();

        console.log(`✅ Success! User ${user.name} (${email}) has been promoted to admin.`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error promoting user:', err.message);
        process.exit(1);
    }
};

const emailArg = process.argv[2];
promoteToAdmin(emailArg);
