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

// GET /api/tutorials/:id/progress
// Returns which lessons the authenticated user has completed for a tutorial
const getTutorialProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('tutorialProgress earnedCertificates');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const tutorialId = req.params.id;
        const progress = user.tutorialProgress.find(
            p => p.tutorialId?.toString() === tutorialId
        );

        const alreadyCertified = user.earnedCertificates.some(
            c => c.tutorialId?.toString() === tutorialId
        );

        res.json({
            completedLessonIds: progress ? progress.completedLessonIds : [],
            isCompleted: progress ? !!progress.completedAt : false,
            alreadyCertified
        });
    } catch (error) {
        console.error('Get Tutorial Progress Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// POST /api/tutorials/:id/complete-lesson
// Body: { lessonId }
// Marks a lesson as watched. When all lessons are done, awards the certificate.
const markLessonComplete = async (req, res) => {
    try {
        const { lessonId } = req.body;
        if (!lessonId) return res.status(400).json({ message: 'lessonId is required' });

        const tutorialId = req.params.id;

        // Fetch the tutorial to know total lesson count
        const tutorial = await Tutorial.findById(tutorialId).select('lessons title');
        if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find or create the progress entry for this tutorial
        let progressEntry = user.tutorialProgress.find(
            p => p.tutorialId?.toString() === tutorialId
        );

        if (!progressEntry) {
            user.tutorialProgress.push({ tutorialId, completedLessonIds: [], completedAt: null });
            progressEntry = user.tutorialProgress[user.tutorialProgress.length - 1];
        }

        // Add lessonId if not already there
        if (!progressEntry.completedLessonIds.includes(lessonId)) {
            progressEntry.completedLessonIds.push(lessonId);
        }

        const totalLessons = tutorial.lessons.length;
        const completedCount = progressEntry.completedLessonIds.length;
        const allDone = completedCount >= totalLessons;
        let justCompleted = false;

        // If all lessons done and not already marked as completed
        if (allDone && !progressEntry.completedAt) {
            progressEntry.completedAt = new Date();
            justCompleted = true;

            // Award certificate if not already given
            const alreadyCertified = user.earnedCertificates.some(
                c => c.tutorialId?.toString() === tutorialId
            );
            if (!alreadyCertified) {
                user.earnedCertificates.push({
                    tutorialId,
                    tutorialTitle: tutorial.title,
                    earnedAt: new Date()
                });
            }
        }

        user.markModified('tutorialProgress');
        user.markModified('earnedCertificates');
        await user.save();

        res.json({
            completedLessonIds: progressEntry.completedLessonIds,
            isCompleted: allDone,
            justCompleted,
            totalLessons,
            completedCount
        });
    } catch (error) {
        console.error('Mark Lesson Complete Error:', error);
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
    getTutorialProgress,
    markLessonComplete,
    addTutorial,
    updateTutorial,
    deleteTutorial
};
