const mongoose = require('mongoose');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');
require('dotenv').config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to DB');

        let domain = await Domain.findOne({ name: 'Interview Preparation' });
        if (!domain) {
            domain = await Domain.create({
                name: 'Interview Preparation',
                description: 'Technical and behavioral interview practice sets.',
                icon: 'Briefcase',
                color: '#6366f1'
            });
            console.log('Created Interview Preparation Domain');
        } else {
            console.log('Domain already exists');
        }

        const sampleTopics = [
            {
                title: 'LRU Cache Implementation',
                domainId: domain._id,
                subject: 'Programming',
                difficulty: 'Hard',
                content: {
                    problemStatement: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
                    testCases: [
                        { input: 'put(1, 1), put(2, 2), get(1)', expected: '1' }
                    ],
                    starterCode: 'class LRUCache {\n    /**\n     * @param {number} capacity\n     */\n    constructor(capacity) {\n        \n    }\n\n    /**\n     * @param {number} key\n     * @return {number}\n     */\n    get(key) {\n        \n    }\n\n    /**\n     * @param {number} key\n     * @param {number} value\n     * @return {void}\n     */\n    put(key, value) {\n        \n    }\n}'
                }
            },
            {
                title: 'Merge K Sorted Lists',
                domainId: domain._id,
                subject: 'Programming',
                difficulty: 'Hard',
                content: {
                    problemStatement: 'Merge K sorted linked lists and return it as one sorted list.',
                    testCases: [
                        { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' }
                    ],
                    starterCode: '/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n    \n};'
                }
            },
            {
                title: 'Number of Islands',
                domainId: domain._id,
                subject: 'Programming',
                difficulty: 'Medium',
                content: {
                    problemStatement: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
                    testCases: [
                        { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1' }
                    ],
                    starterCode: '/**\n * @param {character[][]} grid\n * @return {number}\n */\nvar numIslands = function(grid) {\n    \n};'
                }
            }
        ];

        for (const t of sampleTopics) {
            const exists = await Topic.findOne({ title: t.title, domainId: domain._id });
            if (!exists) {
                await Topic.create(t);
                console.log(`Created topic: ${t.title}`);
            }
        }

        console.log('Seeding complete');
        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seed();
