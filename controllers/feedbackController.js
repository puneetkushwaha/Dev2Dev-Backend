const Feedback = require('../models/Feedback');
const path = require('path');
const fs = require('fs');

// Submit Feedback
const submitFeedback = async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.user.id;

        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }

        let screenshotPath = null;
        if (req.file) {
            // Store relative path to be served statically
            screenshotPath = `/uploads/feedback/${req.file.filename}`;
        }

        const feedback = new Feedback({
            user: userId,
            description,
            screenshotPath
        });

        await feedback.save();

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback
        });
    } catch (error) {
        console.error('Submit Feedback Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get All Feedback (Admin Only)
const getAllFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
            
        res.json(feedbackList);
    } catch (error) {
        console.error('Get All Feedback Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update Feedback Status (Admin Only)
const updateFeedbackStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'reviewed', 'resolved'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const feedback = await Feedback.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json({
            message: 'Feedback status updated',
            feedback
        });
    } catch (error) {
        console.error('Update Feedback Status Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    submitFeedback,
    getAllFeedback,
    updateFeedbackStatus
};
