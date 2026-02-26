const express = require('express');
const router = express.Router();
const Domain = require('../models/Domain');
const {
    addDomain, updateDomain, deleteDomain,
    addTopic, updateTopic, deleteTopic,
    getCoreCSTopics, getTopicsByDomain,
    getUsers, toggleAdminRole, deleteUser,
    getExams, addExam, updateExam, deleteExam,
    getDashboardStats
} = require('../controllers/adminController');
const {
    getTutorials, addTutorial, updateTutorial, deleteTutorial
} = require('../controllers/tutorialController');
const {
    createNotification, deleteNotification
} = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');

// All admin routes are protected
router.use(protect);
router.use(admin);

// Domain Routes
router.get('/domains', async (req, res) => {
    try {
        const domains = await Domain.find({});
        res.json(domains);
    } catch (e) {
        console.error("Fetch Domains Admin Error:", e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.post('/domains', addDomain);
router.put('/domains/:id', updateDomain);
router.delete('/domains/:id', deleteDomain);

// Topic / Content Routes
router.get('/topics/domain/:id', getTopicsByDomain);
router.post('/topics', addTopic);
router.put('/topics/:id', updateTopic);
router.delete('/topics/:id', deleteTopic);

// Core CS Topics Route
router.get('/corecs', getCoreCSTopics);

// User Management Routes
router.get('/users', getUsers);
router.put('/users/role/:id', toggleAdminRole);
router.delete('/users/:id', deleteUser);

// Exam Management Routes
router.get('/exams', getExams);
router.post('/exams', addExam);
router.put('/exams/:id', updateExam);
router.delete('/exams/:id', deleteExam);

// Dashboard Stats Route
router.get('/stats', getDashboardStats);

// Dashboard Stats Route
router.get('/stats', getDashboardStats);

// Tutorial Management Routes
router.get('/tutorials', getTutorials);
router.post('/tutorials', addTutorial);
router.put('/tutorials/:id', updateTutorial);
router.delete('/tutorials/:id', deleteTutorial);

// Notification Management Routes
router.post('/notifications', createNotification);
router.delete('/notifications/:id', deleteNotification);

module.exports = router;
