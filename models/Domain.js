const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., 'Web Development', 'Cyber Security'
    description: { type: String },
    scope: { type: String }, // High, Very High
    estimatedTime: { type: String }, // 3-6 months
    levels: {
        type: [String],
        default: ['Beginner', 'Intermediate', 'Advanced']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Domain', DomainSchema);
