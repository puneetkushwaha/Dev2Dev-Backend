const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // will hash later, optional for Google users
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    username: { type: String, unique: true, sparse: true },
    bio: { type: String, default: 'N/A' },
    company: { type: String, default: 'N/A' },
    jobTitle: { type: String, default: 'N/A' },
    location: { type: String, default: 'N/A' },
    institution: { type: String, default: 'N/A' },
    website: { type: String, default: 'N/A' },

    socials: {
        github: { type: String, default: 'N/A' },
        linkedin: { type: String, default: 'N/A' },
        twitter: { type: String, default: 'N/A' },
        youtube: { type: String, default: 'N/A' },
        instagram: { type: String, default: 'N/A' },
        leetcode: { type: String, default: 'N/A' }
    },

    education: { type: String }, // e.g. "B.Tech Computer Science" 
    experience: { type: String }, // e.g. "Fresher", "1-3 years"
    skills: { type: [String] }, // e.g. ["JavaScript", "Python", "React"]
    selectedDomain: { type: String, default: null },
    aiRecommendation: { type: Object, default: null },

    // Premium Features
    proExpiry: { type: Date, default: null }, // For interview prep Pro access valid until this date
    unlockedTutorials: [{
        tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' },
        expiry: { type: Date }
    }], // specific purchased tutorials with expiration
    freeAiInterviewCount: { type: Number, default: 0 }, // Tracks free AI mock interviews (max 3)

    // LeetCode-style Stats
    streak: { type: Number, default: 0 },
    lastSubmissionDate: { type: Date, default: null },
    submissionHeatmap: { type: Map, of: Number, default: {} },
    solvedStats: {
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 }
    },

    progress: {
        completedTopics: [{ type: String }],
        examScores: [{
            examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
            examName: { type: String },
            score: Number,
            totalMarks: Number,
            mcqScore: { type: Number, default: 0 },
            codingScore: { type: Number, default: 0 },
            passed: { type: Boolean, default: false },
            difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
            language: { type: String, default: 'javascript' },
            tags: [{ type: String }],
            dateRun: { type: Date, default: Date.now },
            detailedAnalysis: {
                mcqResults: [{
                    questionText: String,
                    userAnswer: String,
                    correctAnswer: String,
                    isCorrect: Boolean,
                    explanation: String
                }],
                codingResults: [{
                    questionText: String,
                    userAnswer: String,
                    aiFeedback: String,
                    isCorrect: Boolean,
                    score: Number // Score for this specific coding question
                }]
            }
        }],
        interviewReadinessScore: { type: Number, default: 0 }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
