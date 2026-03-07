const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all contests (User/Admin)
router.get('/', protect, contestController.getContests);

// Get single contest
router.get('/:id', protect, contestController.getContestById);

// Create contest (Admin)
router.post('/', protect, admin, contestController.createContest);

// Update contest (Admin)
router.put('/:id', protect, admin, contestController.updateContest);

// Delete contest (Admin)
router.delete('/:id', protect, admin, contestController.deleteContest);

// Participate (User)
router.post('/:id/participate', protect, contestController.participate);

// AI Structure (Admin)
router.post('/ai-structure', protect, admin, contestController.structureContent);

module.exports = router;
