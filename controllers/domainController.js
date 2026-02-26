const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

const getDomains = async (req, res) => {
    try {
        const domains = await Domain.find({});
        res.json(domains);
    } catch (error) {
        console.error("Error fetching domains:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getTopicsByDomain = async (req, res) => {
    try {
        const { domainId } = req.params;
        const topics = await Topic.find({ domainId });
        res.json(topics);
    } catch (error) {
        console.error("Error fetching topics", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getTopicsByDomainName = async (req, res) => {
    try {
        const { domainName } = req.params;
        const domain = await Domain.findOne({ name: domainName });
        if (!domain) return res.status(404).json({ message: 'Domain not found' });
        const topics = await Topic.find({ domainId: domain._id });
        res.json(topics);
    } catch (error) {
        console.error("Error fetching topics by name", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Cache AI-generated content for a topic.
 * This ensures that once content is generated for a topic, it remains consistent.
 */
const cacheTopicContent = async (req, res) => {
    try {
        const { domainName, topicTitle, content, quiz } = req.body;

        // Find the topic by title and domain name
        // First find the domain
        const domain = await Domain.findOne({ name: domainName });

        const query = domain
            ? { title: topicTitle, domainId: domain._id }
            : { title: topicTitle, isCoreCS: true };

        const topic = await Topic.findOne(query);

        if (!topic) {
            // UPSERT LOGIC: Create the topic if it doesn't exist (e.g. AI generated it dynamically)
            console.log(`Topic "${topicTitle}" not found. Creating new topic record.`);
            const newTopic = new Topic({
                title: topicTitle,
                domainId: domain?._id,
                description: content.description || 'AI Generated Topic',
                content: {
                    explanation: content.theory || '',
                    editorial: content.editorial || '',
                    description: content.description || '',
                    starterCode: content.solution_stub || '',
                    testCases: content.testCases || [],
                    examples: content.examples || ''
                }
            });
            if (quiz && Array.isArray(quiz)) {
                newTopic.quiz = quiz.map(q => ({
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.answer,
                    answer: q.answer
                }));
            }
            await newTopic.save();
            return res.json({ message: 'Topic created and content cached successfully', topicId: newTopic._id });
        }

        // Only update if content isn't already there (or force update)
        // For simplicity, we'll always update if called, as it's triggered by generate_lesson
        topic.content = {
            explanation: content.theory || '',
            editorial: content.editorial || '',
            description: content.description || '',
            starterCode: content.solution_stub || '',
            testCases: content.testCases || [],
            examples: content.examples || ''
        };

        if (quiz && Array.isArray(quiz)) {
            topic.quiz = quiz.map(q => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.answer,
                answer: q.answer
            }));
        }

        await topic.save();
        res.json({ message: 'Content cached successfully', topicId: topic._id });

    } catch (error) {
        console.error("Error caching topic content:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getDomains, getTopicsByDomain, getTopicsByDomainName, cacheTopicContent
};
