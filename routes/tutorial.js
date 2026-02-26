const express = require('express');
const router = express.Router();
const { getTutorials, getTutorialById } = require('../controllers/tutorialController');
const { protect } = require('../middleware/authMiddleware');

// Get all tutorials
router.get('/', protect, getTutorials);

// Get single tutorial
router.get('/:id', protect, getTutorialById);

module.exports = router;
