const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   POST /api/interviews
// @desc    Save a new interview result
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const {
            role,
            domain,
            score,
            technicalScore,
            communicationScore,
            hireProbability,
            feedback,
            improvements,
            studyPlan,
            transcript
        } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const now = new Date();
        const hasProAccess = user.proExpiry && user.proExpiry > now;

        if (!hasProAccess && user.freeAiInterviewCount >= 3) {
            return res.status(403).json({ message: 'Free limit of 3 AI interviews reached. Please upgrade to Pro.' });
        }

        const interview = new Interview({
            userId: req.user._id,
            candidateName: req.user.name,
            candidateEmail: req.user.email,
            role,
            domain,
            score,
            technicalScore,
            communicationScore,
            hireProbability,
            feedback,
            improvements,
            studyPlan,
            transcript
        });

        const savedInterview = await interview.save();

        if (!hasProAccess) {
            user.freeAiInterviewCount += 1;
            await user.save();
        }

        res.status(201).json(savedInterview);
    } catch (error) {
        console.error('Save Interview Error:', error);
        res.status(500).json({ message: 'Server Error saving interview' });
    }
});

// @route   GET /api/interviews/my
// @desc    Get logged in user's interviews
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const interviews = await Interview.find({ userId: req.user._id }).sort({ dateRun: -1 });
        res.json(interviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching interviews' });
    }
});

// @route   GET /api/interviews/all
// @desc    Get all interviews (Admin only)
// @access  Private/Admin
router.get('/all', protect, admin, async (req, res) => {
    try {
        const interviews = await Interview.find({}).sort({ dateRun: -1 });
        res.json(interviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching all interviews' });
    }
});

module.exports = router;
