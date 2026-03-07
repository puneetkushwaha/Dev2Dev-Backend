const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Get all contests (User/Admin)
router.get('/', verifyToken, contestController.getContests);

// Get single contest
router.get('/:id', verifyToken, contestController.getContestById);

// Create contest (Admin)
router.post('/', verifyToken, isAdmin, contestController.createContest);

// Update contest (Admin)
router.put('/:id', verifyToken, isAdmin, contestController.updateContest);

// Delete contest (Admin)
router.delete('/:id', verifyToken, isAdmin, contestController.deleteContest);

// Participate (User)
router.post('/:id/participate', verifyToken, contestController.participate);

// AI Structure (Admin)
router.post('/ai-structure', verifyToken, isAdmin, contestController.structureContent);

module.exports = router;
