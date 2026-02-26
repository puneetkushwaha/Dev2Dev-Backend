const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    domainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
    title: { type: String, required: true },
    type: { type: String, enum: ['Topic-wise', 'Role-wise', 'Full-length Mock'], required: true },
    questions: [{
        questionText: String,
        type: { type: String, enum: ['mcq', 'coding'], default: 'mcq' },
        options: [String],
        correctAnswer: String,
        difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
        explanation: String
    }],
    durationMinutes: { type: Number, default: 30 },
    totalAttempts: { type: Number, default: 0 },
    totalPassed: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', ExamSchema);
