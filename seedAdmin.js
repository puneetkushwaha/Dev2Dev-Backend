require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');

        const email = 'puneetkushwaha88@gmail.com';
        const password = '123123';

        const adminExists = await User.findOne({ email });

        if (adminExists) {
            console.log('Admin user already exists. Updating role to admin...');
            adminExists.role = 'admin';
            // Also update password to ensure it matches the user request
            const salt = await bcrypt.genSalt(10);
            adminExists.password = await bcrypt.hash(password, salt);
            await adminExists.save();
            console.log('Admin user updated successfully.');
        } else {
            console.log('Creating new Admin user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                name: 'Puneet Kushwaha',
                email: email,
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user created successfully.');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
