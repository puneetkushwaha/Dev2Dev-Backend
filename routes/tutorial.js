const express = require('express');
const router = express.Router();
const { getTutorials, getTutorialById } = require('../controllers/tutorialController');
const { protect } = require('../middleware/authMiddleware');

// Get all tutorials
router.get('/', getTutorials);

// Get single tutorial
router.get('/:id', getTutorialById);

module.exports = router;
