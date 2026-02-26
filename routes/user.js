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

// Resume Analyzer Proxy Routes (Protected)
router.post('/parse-resume', protect, upload.single('file'), parseResume);
router.post('/analyze-resume', protect, analyzeResume);

// Additional AI Proxy Routes (Protected)
router.post('/interview-chat', protect, interviewChat);
router.post('/mock-interview-eval', protect, mockInterviewEval);
router.post('/recommend-domain', protect, recommendDomain);
router.post('/generate-lesson', protect, generateLesson);
router.post('/ai-chat', protect, aiChat);

// Public AI Routes
router.post('/generate-roadmap', generateRoadmap);

module.exports = router;
