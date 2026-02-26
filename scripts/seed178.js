const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '178. Rank Scores',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Database',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the rank of the scores, with tied scores receiving the same rank.",
        problemStatement: [
            '## 178. Rank Scores',
            '',
            '**Table: Scores**',
            '```',
            '+-------------+---------+',
            '| Column Name | Type    |',
            '+-------------+---------+',
            '| id          | int     |',
            '| score       | decimal |',
            '+-------------+---------+',
            '```',
            '`id` is the primary key (column with unique values) for this table.',
            'Each row of this table contains the score of a game. Score is a floating point value with two decimal places.',
            '',
            'Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:',
            '',
            '* The scores should be ranked from the highest to the lowest.',
            '* If there is a tie between two scores, both should have the same ranking.',
            '* After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.',
            '',
            'Return the result table ordered by `score` in descending order.',
            '',
            'The result format is in the following example.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:**',
            'Scores table:',
            '```',
            '+----+-------+',
            '| id | score |',
            '+----+-------+',
            '| 1  | 3.50  |',
            '| 2  | 3.65  |',
            '| 3  | 4.00  |',
            '| 4  | 3.85  |',
            '| 5  | 4.00  |',
            '| 6  | 3.65  |',
            '+----+-------+',
            '```',
            '**Output:**',
            '```',
            '+-------+------+',
            '| score | rank |',
            '+-------+------+',
            '| 4.00  | 1    |',
            '| 4.00  | 1    |',
            '| 3.85  | 2    |',
            '| 3.65  | 3    |',
            '| 3.65  | 3    |',
            '| 3.50  | 4    |',
            '+-------+------+',
            '```'
        ].join('\n'),
        starterCode: [
            '# Write your MySQL query statement below',
            'SELECT ',
            '    ',
            ';'
        ].join('\n'),
        testCases: [
            {
                input: 'Scores = [[1, 3.5], [2, 3.65], [3, 4], [4, 3.85], [5, 4], [6, 3.65]]',
                expected: '[[4, 1], [4, 1], [3.85, 2], [3.65, 3], [3.65, 3], [3.5, 4]]',
                description: 'Dense ranking rules apply.'
            }
        ],
        tags: ['Database', 'SQL', 'Window Function'],
        hints: [
            "You can use the DENSE_RANK() window function to give tied scores the same rank and not skip ranks."
        ]
    }
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate').then(async () => {
    console.log('Connected to MongoDB');
    const existing = await Topic.findOne({ title: problem.title, subject: 'DSA' });
    if (existing) {
        await Topic.findByIdAndUpdate(existing._id, problem);
        console.log('Updated:', problem.title);
    } else {
        await new Topic(problem).save();
        console.log('Added:', problem.title);
    }
    mongoose.connection.close();
}).catch(e => { console.error(e); process.exit(1); });
