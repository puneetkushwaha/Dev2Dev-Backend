const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    submitFeedback,
    getAllFeedback,
    getFeedbackStatusByRef,
    updateFeedbackStatus
} = require('../controllers/feedbackController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/feedback');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'feedback-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports images (jpeg, jpg, png, webp)!'));
    }
});

// User routes
router.post('/', protect, upload.single('screenshot'), submitFeedback);
router.get('/status/:refNumber', getFeedbackStatusByRef);

// Admin routes
router.get('/admin', protect, admin, getAllFeedback);
router.put('/admin/:id/status', protect, admin, updateFeedbackStatus);

module.exports = router;
