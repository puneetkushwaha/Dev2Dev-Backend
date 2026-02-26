const mongoose = require('mongoose');
require('dotenv').config();

const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const seedExams = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('MongoDB Connected...');

        // Clear existing exams just in case
        await Exam.deleteMany({});
        console.log('Cleared existing exams.');

        // Try to get a domain to link to (optional, but good for foreign keys)
        const domain = await Domain.findOne({ name: 'Full Stack Web Development' });
        const domainId = domain ? domain._id : null;

        const exams = [
            {
                title: 'Topic-wise Test',
                type: 'Topic-wise',
                durationMinutes: 30,
                domainId: domainId,
                questions: [
                    { questionText: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correctAnswer: "Hypertext Markup Language", difficulty: "Easy" }
                ]
            },
            {
                title: 'Role-wise Mock',
                type: 'Role-wise',
                durationMinutes: 60,
                domainId: domainId,
                questions: [
                    { questionText: "Explain the virtual DOM.", options: ["A physical DOM", "A lightweight Javascript representation of the DOM", "A shadow DOM"], correctAnswer: "A lightweight Javascript representation of the DOM", difficulty: "Medium" }
                ]
            },
            {
                title: 'Full Stack Dev Exam',
                type: 'Full-length Mock',
                durationMinutes: 180,
                domainId: domainId,
                questions: [
                    { questionText: "Which HTTP method is idempotent?", options: ["POST", "PUT", "PATCH"], correctAnswer: "PUT", difficulty: "Hard" }
                ]
            }
        ];

        await Exam.insertMany(exams);
        console.log('Successfully seeded 3 default exams to the database.');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed exams:');
        require('fs').writeFileSync('seed_err.json', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        console.error('Error written to seed_err.json');
        process.exit(1);
    }
};

seedExams();
