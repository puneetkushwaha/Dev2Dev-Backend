const Feedback = require('../models/Feedback');
const { sendFeedbackReceivedEmail, sendFeedbackResolvedEmail } = require('../utils/emailService');
const User = require('../models/User');
const crypto = require('crypto');

// Submit Feedback
const submitFeedback = async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }

        // Generate unique reference number (FB-XXXXXX)
        const refNumber = `FB-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

        let screenshotPath = null;
        if (req.file) {
            screenshotPath = `/uploads/feedback/${req.file.filename}`;
        }

        const feedback = new Feedback({
            user: userId,
            description,
            refNumber,
            screenshotPath
        });

        await feedback.save();

        // Send confirmation email (non-blocking)
        sendFeedbackReceivedEmail(user.email, user.name, refNumber, description)
            .catch(err => console.error('Feedback email failed:', err));

        res.status(201).json({
            message: 'Feedback submitted successfully',
            refNumber,
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

// Get Feedback Status by Ref Number (Public)
const getFeedbackStatusByRef = async (req, res) => {
    try {
        const { refNumber } = req.params;
        const feedback = await Feedback.findOne({ refNumber: refNumber.toUpperCase() })
            .select('status description createdAt refNumber');

        if (!feedback) {
            return res.status(404).json({ message: 'Reference number not found' });
        }

        res.json(feedback);
    } catch (error) {
        console.error('Get Feedback Status Error:', error);
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
        ).populate('user', 'name email');

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // If status is changed to resolved, send email
        if (status === 'resolved') {
            sendFeedbackResolvedEmail(feedback.user.email, feedback.user.name, feedback.refNumber)
                .catch(err => console.error('Resolution email failed:', err));
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
    getFeedbackStatusByRef,
    updateFeedbackStatus
};
