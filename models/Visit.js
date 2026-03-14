const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
    totalHits: { type: Number, default: 0 },
    uniqueIPs: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Visit', VisitSchema);
