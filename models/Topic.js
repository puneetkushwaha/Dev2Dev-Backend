const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    domainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' }, // Optional for Core CS
    subject: { type: String }, // For Core CS: DSA, OS, DBMS, CN, OOP
    topicGroup: { type: String }, // For Core CS: 'Arrays', 'Trees', 'Sorting' etc.
    title: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    isCoreCS: { type: Boolean, default: false },
    lessonType: { type: String, enum: ['theory', 'practice'], default: 'theory' },
    content: {
        explanation: String,  // Full theory in markdown
        editorial: String,    // Solution logic/explanation (hidden from user)
        description: String,  // Problem brief
        problemStatement: String,  // Detailed problem statement
        inputFormat: String,
        outputFormat: String,
        sampleInput: String,
        sampleOutput: String,
        constraints: String,
        starterCode: String,
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
        }],
        tags: [String],
        codeExamples: [String],
        keyPoints: [String],
        videoUrl: String,
    },
    quiz: [{
        question: String,
        options: [String],
        correctAnswer: Number,
        answer: Number,     // backward compat
        explanation: String,
    }],
    totalAttempts: { type: Number, default: 0 },
    totalPassed: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', TopicSchema);
