const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMinutes: { type: Number, default: 60 },
    questions: [{
        questionText: String,
        type: { type: String, enum: ['mcq', 'coding'], default: 'mcq' },
        options: [String],
        correctAnswer: String,
        difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
        explanation: String,
        starterCodes: {
            javascript: String,
            python: String,
            java: String,
            cpp: String,
            c: String
        },
        testCases: [{
            input: String,
            expected: String,
            description: String
        }]
    }],
    participants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number, default: 0 },
        completedAt: { type: Date },
        answers: [{
            questionIndex: Number,
            userAnswer: String,
            isCorrect: Boolean,
            score: Number
        }]
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contest', ContestSchema);
