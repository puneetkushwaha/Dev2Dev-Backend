const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ytId: { type: String, required: true },
    duration: { type: String },
    description: { type: String },
    order: { type: Number, default: 0 }
});

const TutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String },
    description: { type: String },
    isPremium: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    lessons: [LessonSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
