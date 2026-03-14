require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');

const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const domainRoutes = require('./routes/domain');
const adminRoutes = require('./routes/admin');
const interviewRoutes = require('./routes/interview');
const tutorialRoutes = require('./routes/tutorial');
const notificationRoutes = require('./routes/notification');
const paymentRoutes = require('./routes/payment');
const leaderboardRoutes = require('./routes/leaderboard');
const contestRoutes = require('./routes/contestRoutes');
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Render load balancer)
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'https://dev2dev-beryl.vercel.app',
    'https://dev2dev-backend.onrender.com',
    'https://dev2dev-ai.onrender.com',
    'https://dev2dev.online',
    'https://cron-job.org',
    'https://console.cron-job.org',
    'http://localhost:5173',
    'http://localhost:5000',
    (process.env.FRONTEND_URL || process.env.CORS_ORIGIN || '').replace(/\/$/, '')
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`⚠️ CORS blocked for origin: ${origin}`);
            // Return 'null' instead of an Error to avoid a 500 error, instead it will just block the browser.
            callback(null, false);
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
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'", "https://*.google.com"],
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "img-src": ["'self'", "data:", "blob:", "https://*.onrender.com", "http://localhost:5000", (process.env.FRONTEND_URL || '').replace(/\/$/, '')],
            "connect-src": ["'self'", "https://*.onrender.com", "http://localhost:5000", "http://localhost:8000"],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "object-src": ["'none'"],
            "media-src": ["'self'"],
            "frame-src": ["'self'", "https://*.google.com"]
        }
    }
}));

// Ensure uploads directory exists at startup
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads/feedback');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory at startup');
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Balanced for development and production
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});
const trackVisit = require('./middleware/trackVisit');
app.use('/api/', trackVisit); // Track all API calls as visits
app.use('/api/', limiter); // Apply rate limiting to all API routes

const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, // Increased for testing
    message: { message: 'Too many attempts. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
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
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/feedback', feedbackRoutes);

// Static files for uploads
app.use('/uploads', (req, res, next) => {
    console.log(`[Static] Request for ${req.url}`);
    next();
}, express.static(path.join(__dirname, 'uploads')));

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
    console.log(`📧 Email Service: ${process.env.EMAIL_USER ? 'Configured (' + process.env.EMAIL_USER + ')' : 'MISSING'}`);
    console.log(`💳 Razorpay: ${process.env.RAZORPAY_KEY_ID ? 'Configured' : 'MISSING'}`);
});

// Keep-alive mechanism for Render Free Tier
const keepAlive = () => {
    const urls = [
        'https://dev2dev-backend.onrender.com/health',
        'https://dev2dev-ai.onrender.com/health'
    ];
    
    console.log("⏱️ Starting Keep-Alive mechanism...");
    
    setInterval(async () => {
        urls.forEach(async (url) => {
            try {
                const response = await axios.get(url);
                console.log(`✅ Keep-Alive: Pinged ${url} - Status ${response.status}`);
            } catch (error) {
                console.error(`❌ Keep-Alive: Error pinging ${url} - ${error.message}`);
            }
        });
    }, 14 * 60 * 1000); // Every 14 minutes
};

// Start keep-alive (Recommended to run only in production/Render)
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    keepAlive();
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;
