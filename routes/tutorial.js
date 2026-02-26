const express = require('express');
const router = express.Router();
const { getTutorials, getTutorialById } = require('../controllers/tutorialController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

// Get all tutorials
router.get('/', optionalAuth, getTutorials);

// Get single tutorial
router.get('/:id', optionalAuth, getTutorialById);

module.exports = router;
