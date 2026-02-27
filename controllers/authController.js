const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '542753851215-79kaaj2d9sn21l5169fcugk3cis59jbb.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const registerUser = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Please try again in 30 seconds or switch to local MongoDB.' });
    }
    const { name, email, password, education, experience, skills } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            education: education || "",
            experience: experience || "",
            skills: skills || []
        });

        if (user) {
            const now = new Date();
            const hasProAccess = user.proExpiry && user.proExpiry > now;
            const validTutorials = user.unlockedTutorials ? user.unlockedTutorials.filter(t => t.expiry && t.expiry > now).map(t => t.tutorialId) : [];

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                selectedDomain: user.selectedDomain,
                isPro: hasProAccess,
                hasProAccess: hasProAccess,
                proExpiry: user.proExpiry,
                freeAiInterviewCount: user.freeAiInterviewCount,
                unlockedTutorials: validTutorials,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Registration Error Details:", error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const loginUser = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database Connection Issue. Please try again in 30 seconds or switch to local MongoDB.' });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const now = new Date();
            const hasProAccess = user.proExpiry && user.proExpiry > now;
            const validTutorials = user.unlockedTutorials ? user.unlockedTutorials.filter(t => t.expiry && t.expiry > now).map(t => t.tutorialId) : [];

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                selectedDomain: user.selectedDomain,
                isPro: hasProAccess,
                hasProAccess: hasProAccess,
                proExpiry: user.proExpiry,
                freeAiInterviewCount: user.freeAiInterviewCount,
                unlockedTutorials: validTutorials,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error Details:", error);
        res.status(500).json({ message: 'Error during login' });
    }
};

const googleLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                name,
                email,
                role: 'user',
                education: "",
                experience: "",
                skills: []
            });
        }

        const now = new Date();
        const hasProAccess = user.proExpiry && user.proExpiry > now;
        const validTutorials = user.unlockedTutorials ? user.unlockedTutorials.filter(t => t.expiry && t.expiry > now).map(t => t.tutorialId) : [];

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            selectedDomain: user.selectedDomain,
            isPro: hasProAccess,
            hasProAccess: hasProAccess,
            proExpiry: user.proExpiry,
            freeAiInterviewCount: user.freeAiInterviewCount,
            unlockedTutorials: validTutorials,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("Google Login Error Details:", {
            message: error.message,
            stack: error.stack,
            token: token ? (token.substring(0, 10) + "...") : "missing"
        });
        res.status(500).json({ message: "Internal Server Error during Google Login", details: error.message });
    }
};

const getUserProfile = async (req, res) => {
    // Mocked for now - needs middleware to extract user from token
    res.status(200).json({ message: 'User profile data' });
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // Create reset URL
        const FRONTEND_URL = (process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:5173').replace(/\/$/, '');
        const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}`;
        console.log("-----------------------------------------");
        console.log("PASSOWRD RESET SYSTEM (DEV MODE)");
        console.log("Email to:", user.email);
        console.log("Reset URL:", resetUrl);
        console.log("-----------------------------------------");

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>This link will expire in 10 minutes.</p>
        `;

        // Only attempt to send actual email if credentials exist
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                await transporter.sendMail({
                    to: user.email,
                    subject: 'Password Reset Request',
                    html: message
                });

                return res.status(200).json({ message: 'Email sent' });
            } catch (err) {
                console.error("Email Sending Failed:", err.message);
                // Don't fail the request in dev if the link is in the console
                return res.status(200).json({
                    message: 'Recovery link generated (Check server console for link in Dev Mode)',
                    devMode: true
                });
            }
        } else {
            return res.status(200).json({
                message: 'Recovery link generated (Check server console for link in Dev Mode)',
                devMode: true
            });
        }
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: 'Error processing forgot password request' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password reset successful',
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};

// Generate JWT
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    getUserProfile,
    forgotPassword,
    resetPassword
};
