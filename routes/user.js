const express = require('express');
const router = express.Router();
const {
    getUserProfile, updateUserProfile, selectDomain,
    saveRecommendation, completeTopic, submitExam,
    getExams, getProblems, getProblemById, deleteAccount,
    getMockStats, submitMock, getMockSet, parseResume, analyzeResume,
    interviewChat, mockInterviewEval, recommendDomain, generateLesson, aiChat, generateRoadmap
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure multer to store files in memory for quick proxying
const upload = multer({ storage: multer.memoryStorage() });

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

// Removed protected resume routes

// Public AI Proxy Routes (Original AI service had no authentication layer)
router.post('/interview-chat', interviewChat);
router.post('/mock-interview-eval', mockInterviewEval);
router.post('/recommend-domain', recommendDomain);
router.post('/generate-lesson', generateLesson);
router.post('/ai-chat', aiChat);
router.post('/generate-roadmap', generateRoadmap);
router.post('/parse-resume', upload.single('file'), parseResume);
router.post('/analyze-resume', analyzeResume);


module.exports = router;
