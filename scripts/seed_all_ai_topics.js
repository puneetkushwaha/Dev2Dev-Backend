require('dotenv').config();
const mongoose = require('mongoose');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');

const seedAITopics = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'Artificial Intelligence' });
        if (!domain) {
            console.error('Artificial Intelligence domain not found!');
            process.exit(1);
        }

        const topics = [
            { title: 'Working with Pre-trained Models (OpenAI, Gemini, Claude)', level: 'Intermediate', difficulty: 'Medium' },
            { title: 'Mastering APIs & Token Management (OpenAI API)', level: 'Intermediate', difficulty: 'Hard' },
            { title: 'Prompt Engineering Mastery (Injection, Bias & Security)', level: 'Advanced', difficulty: 'Hard' },
            { title: 'OpenSource AI & Local Models (Hugging Face, Ollama)', level: 'Advanced', difficulty: 'Hard' },
            { title: 'AI Safety, Ethics & Moderation (Adversarial Testing)', level: 'Intermediate', difficulty: 'Medium' },
            { title: 'Embeddings & Vector Databases (Semantic Search)', level: 'Advanced', difficulty: 'Hard' },
            { title: 'RAG & AI Agent Architectures (LangChain, LlamaIndex)', level: 'Advanced', difficulty: 'Hard' }
        ];

        for (const topicData of topics) {
            const fullTopicData = {
                domainId: domain._id,
                title: topicData.title,
                level: topicData.level,
                difficulty: topicData.difficulty,
                isCoreCS: false,
                lessonType: 'theory',
                content: {
                    explanation: `# ${topicData.title}\n\nThis content is being professionally developed. Stay tuned for the deep dive into ${topicData.title}!`,
                    description: `Master the art of ${topicData.title}.`,
                    problemStatement: "What is the primary goal of this module?",
                    solutionCode: "echo 'To learn AI'",
                    tags: ['AI', 'Future']
                },
                quiz: [
                    {
                        question: 'Is this module important?',
                        options: ['Yes', 'No'],
                        correctAnswer: 0,
                        explanation: 'All modules are important for a comprehensive AI Engineering foundation.'
                    }
                ]
            };

            await Topic.findOneAndUpdate(
                { domainId: domain._id, title: topicData.title },
                fullTopicData,
                { upsert: true, new: true }
            );
            console.log(`Seeded placeholder for: ${topicData.title}`);
        }

        console.log('Successfully seeded AI Engineering roadmap placeholders!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding AI topics:', error);
        process.exit(1);
    }
};

seedAITopics();
