const Domain = require('../models/Domain');
const Topic = require('../models/Topic');
const User = require('../models/User');
const Exam = require('../models/Exam');

// --- Domain Management ---

const addDomain = async (req, res) => {
    try {
        const { name, description, scope, estimatedTime, levels } = req.body;
        const domain = new Domain({ name, description, scope, estimatedTime, levels });
        await domain.save();
        res.status(201).json(domain);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateDomain = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDomain = await Domain.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedDomain);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteDomain = async (req, res) => {
    try {
        const { id } = req.params;
        await Domain.findByIdAndDelete(id);
        // Also delete associated topics
        await Topic.deleteMany({ domainId: id });
        res.json({ message: 'Domain and associated topics deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// --- Topic / Content Management ---

const addTopic = async (req, res) => {
    try {
        const { domainId, subject, topicGroup, title, level, difficulty, isCoreCS, lessonType, content, quiz } = req.body;
        const topic = new Topic({
            domainId, subject, topicGroup, title, level, difficulty, isCoreCS, lessonType, content, quiz
        });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTopic = await Topic.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTopic) return res.status(404).json({ message: 'Topic not found' });
        res.json(updatedTopic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        await Topic.findByIdAndDelete(id);
        res.json({ message: 'Topic deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get Core CS topics (all isCoreCS=true), optionally filtered by subject
const getCoreCSTopics = async (req, res) => {
    try {
        const filter = { isCoreCS: true };
        if (req.query.subject) filter.subject = req.query.subject;
        const topics = await Topic.find(filter).sort({ subject: 1, level: 1, createdAt: 1 });
        res.json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all topics for a specific domain by domainId
const getTopicsByDomain = async (req, res) => {
    try {
        const { id } = req.params;
        const topics = await Topic.find({ domainId: id }).sort({ createdAt: 1 });
        res.json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const toggleAdminRole = async (req, res) => {
    try {
        const { id } = req.params;

        // Security fix: Prevent demoting self
        if (id === req.user.id.toString()) {
            return res.status(400).json({ message: 'Cannot demote yourself to prevent complete administrative lockout.' });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = user.role === 'admin' ? 'user' : 'admin';
        await user.save();
        res.json({ message: `User role updated to ${user.role}`, role: user.role });
    } catch (error) {
        console.error("Toggle Role Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Security fix: Prevent deleting self
        if (id === req.user.id.toString()) {
            return res.status(400).json({ message: 'Cannot delete your own admin account. Please have another admin perform this action.' });
        }

        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// --- Exam Management ---

const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({}).populate('domainId', 'name');
        res.json(exams);
    } catch (error) {
        console.error("Fetch Exams Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        console.error("Add Exam Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExam = await Exam.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedExam);
    } catch (error) {
        console.error("Update Exam Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        await Exam.findByIdAndDelete(id);
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        console.error("Delete Exam Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Tutorial = require('../models/Tutorial');

// --- Dashboard Stats ---

const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const domainCount = await Domain.countDocuments();
        const topicCount = await Topic.countDocuments();
        const examCount = await Exam.countDocuments();
        const tutorialCount = await Tutorial.countDocuments();

        res.json({
            users: userCount,
            domains: domainCount,
            topics: topicCount,
            exams: examCount,
            tutorials: tutorialCount
        });
    } catch (error) {
        console.error("Get Stats Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addDomain, updateDomain, deleteDomain,
    addTopic, updateTopic, deleteTopic,
    getCoreCSTopics, getTopicsByDomain,
    getUsers, toggleAdminRole, deleteUser,
    getExams, addExam, updateExam, deleteExam,
    getDashboardStats
};
