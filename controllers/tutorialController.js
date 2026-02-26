const Tutorial = require('../models/Tutorial');
const User = require('../models/User');

// Get all tutorials (listing)
const getTutorials = async (req, res) => {
    try {
        const tutorials = await Tutorial.find({}).sort({ createdAt: -1 });
        res.json(tutorials);
    } catch (error) {
        console.error('Fetch Tutorials Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a single tutorial by ID with all lessons
const getTutorialById = async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

        // Access Control: Check if tutorial is premium
        if (tutorial.isPremium) {
            if (!req.user) return res.status(401).json({ message: 'Login required for premium tutorials' });
            const user = await User.findById(req.user.id);
            if (!user) return res.status(401).json({ message: 'User not found' });

            const now = new Date();
            const hasProAccess = user.proExpiry && user.proExpiry > now;
            const hasPurchased = user.unlockedTutorials && user.unlockedTutorials.some(t =>
                t.tutorialId?.toString() === tutorial._id.toString() && t.expiry > now
            );

            if (user.role !== 'admin' && !hasProAccess && !hasPurchased) {
                return res.status(403).json({ message: 'Access denied. Premium tutorial requires Pro membership or purchase.' });
            }
        }

        res.json(tutorial);
    } catch (error) {
        console.error('Fetch Tutorial Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// --- Admin Controllers ---

const addTutorial = async (req, res) => {
    try {
        const tutorial = new Tutorial(req.body);
        await tutorial.save();
        res.status(201).json(tutorial);
    } catch (error) {
        console.error('Add Tutorial Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateTutorial = async (req, res) => {
    try {
        const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTutorial) return res.status(404).json({ message: 'Tutorial not found' });
        res.json(updatedTutorial);
    } catch (error) {
        console.error('Update Tutorial Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteTutorial = async (req, res) => {
    try {
        await Tutorial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tutorial deleted successfully' });
    } catch (error) {
        console.error('Delete Tutorial Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getTutorials,
    getTutorialById,
    addTutorial,
    updateTutorial,
    deleteTutorial
};
