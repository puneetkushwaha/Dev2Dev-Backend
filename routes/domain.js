const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const { getDomains, getTopicsByDomain, getTopicsByDomainName, cacheTopicContent } = require('../controllers/domainController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getDomains);

// IMPORTANT: specific routes must come before parameterized ones
// IMPORTANT: specific routes must come before parameterized ones

router.get('/topics/corecs', async (req, res) => {
    try {
        const query = { isCoreCS: true, topicGroup: { $ne: null } };
        if (req.query.subject) query.subject = req.query.subject;
        if (req.query.lessonType) query.lessonType = req.query.lessonType;
        const topics = await Topic.find(query)
            .sort({ subject: 1, topicGroup: 1, createdAt: 1 });
        res.json(topics);
    } catch (e) { res.status(500).json({ message: 'Internal Server Error' }); }
});

// Cache AI-generated lesson content - ADMIN ONLY
router.post('/topics/cache-content', protect, admin, cacheTopicContent);

// Protected: get topics for a domain by domain ID
router.get('/topics/by-domain/:domainId', async (req, res) => {
    try {
        const topics = await Topic.find(
            { domainId: req.params.domainId }
        ).sort({ createdAt: 1 });
        res.json(topics);
    } catch (e) { res.status(500).json({ message: 'Internal Server Error' }); }
});

// Protected: get single topic content by ID
router.get('/topics/detail/:topicId', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topicId);
        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.json(topic);
    } catch (e) { res.status(500).json({ message: 'Internal Server Error' }); }
});

router.get('/topics/name/:domainName', getTopicsByDomainName);
router.get('/topics/:domainId', getTopicsByDomain);

module.exports = router;
