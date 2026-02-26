const Notification = require('../models/Notification');

// @desc    Get all notifications (Global for all users)
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error("Fetch Notifications Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Create a new notification
// @route   POST /api/admin/notifications
// @access  Private/Admin
const createNotification = async (req, res) => {
    try {
        const { title, message, type } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: 'Title and message are required' });
        }

        const notification = new Notification({
            title,
            message,
            type: type || 'info'
        });

        const createdNotification = await notification.save();
        res.status(201).json(createdNotification);
    } catch (error) {
        console.error("Create Notification Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Delete a notification
// @route   DELETE /api/admin/notifications/:id
// @access  Private/Admin
const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.deleteOne();
        res.json({ message: 'Notification removed' });
    } catch (error) {
        console.error("Delete Notification Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    deleteNotification
};
