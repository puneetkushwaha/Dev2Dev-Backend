const mongoose = require('mongoose');

const MockStatSchema = new mongoose.Schema({
    mockId: { type: String, required: true, unique: true },
    totalAttempts: { type: Number, default: 0 },
    successfulAttempts: { type: Number, default: 0 }
});

module.exports = mongoose.model('MockStat', MockStatSchema);
