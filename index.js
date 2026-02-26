require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const domainRoutes = require('./routes/domain');
const adminRoutes = require('./routes/admin');
const interviewRoutes = require('./routes/interview');
const tutorialRoutes = require('./routes/tutorial');
const notificationRoutes = require('./routes/notification');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://dev2dev-beryl.vercel.app',
    'https://dev2dev.online',
    'https://www.dev2dev.online'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON Parser (Must be before mongoSanitize)
app.use(express.json());

// Security Middlewares
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));
app.use(mongoSanitize());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter); // Apply rate limiting to all API routes

const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Only 5 requests per 15 mins
    message: 'Too many recovery attempts. Please try again after 15 minutes.'
});
app.use('/api/auth/forgot-password', strictLimiter);
app.use('/api/auth/reset-password', strictLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/tutorials', tutorialRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payment', paymentRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.get('/', (req, res) => {
    res.send('AI IT Platform API is running');
});

// Database connection (Asynchronous)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️  Tip: If using Atlas, check your IP whitelist. Falling back to local might be required.');
    }
};

connectDB();

// Start Server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;
