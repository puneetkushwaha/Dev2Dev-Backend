const express = require('express');
const router = express.Router();
const {
    getUserProfile, updateUserProfile, selectDomain,
    saveRecommendation, completeTopic, submitExam,
    getExams, getProblems, getProblemById, deleteAccount,
    getMockStats, submitMock, getMockSet
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.get('/exams', protect, getExams);
router.get('/mock-stats', protect, getMockStats);
router.get('/mock-set', protect, getMockSet);
router.get('/problems', protect, getProblems);
router.get('/problems/:id', protect, getProblemById);
router.post('/select-domain', protect, selectDomain);
router.post('/save-recommendation', protect, saveRecommendation);
router.post('/complete-topic', protect, completeTopic);
router.put('/update-profile', protect, updateUserProfile);
router.post('/submit-exam', protect, submitExam);
router.post('/submit-mock', protect, submitMock);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
