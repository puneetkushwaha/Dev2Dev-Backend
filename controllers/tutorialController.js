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

        let hasFullAccess = false;

        // Access Control Logic
        if (!tutorial.isPremium) {
            hasFullAccess = true;
        } else if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                const now = new Date();
                const isPro = (user.proExpiry && user.proExpiry > now) || user.isPremium === true;
                const isPurchased = user.unlockedTutorials && user.unlockedTutorials.some(t =>
                    t.tutorialId?.toString() === tutorial._id.toString() && (!t.expiry || t.expiry > now)
                );

                if (user.role === 'admin' || isPro || isPurchased) {
                    hasFullAccess = true;
                }
            }
        }

        // Strip ytId if user doesn't have full access
        if (!hasFullAccess) {
            const sanitizedLessons = tutorial.lessons.map(lesson => {
                const { ytId, ...rest } = lesson.toObject();
                return rest;
            });
            tutorial.lessons = sanitizedLessons;
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
