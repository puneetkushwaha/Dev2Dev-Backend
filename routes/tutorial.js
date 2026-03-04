const express = require('express');
const router = express.Router();
const {
    getTutorials,
    getTutorialById,
    getTutorialProgress,
    markLessonComplete
} = require('../controllers/tutorialController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

// Get all tutorials
router.get('/', optionalAuth, getTutorials);

// Get single tutorial
router.get('/:id', optionalAuth, getTutorialById);

// Get user's progress for a tutorial (authenticated)
router.get('/:id/progress', protect, getTutorialProgress);

// Mark a lesson as completed (authenticated)
router.post('/:id/complete-lesson', protect, markLessonComplete);

module.exports = router;
