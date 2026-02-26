const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidateName: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    role: { type: String, required: true },
    domain: { type: String },

    // Evaluation Results
    score: { type: Number, required: true, default: 0 },
    technicalScore: { type: Number, default: 0 },
    communicationScore: { type: Number, default: 0 },
    hireProbability: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },

    feedback: { type: String },
    improvements: [{ type: String }],
    studyPlan: [{ type: String }],

    // Detailed Context
    transcript: [{
        role: { type: String, enum: ['user', 'interviewer'] },
        text: { type: String }
    }],

    dateRun: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', InterviewSchema);
