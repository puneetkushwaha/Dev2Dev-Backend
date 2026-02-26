const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '22. Generate Parentheses',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Dynamic Programming',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Generate all combinations of well-formed parentheses.",
        problemStatement: [
            '## 22. Generate Parentheses',
            '',
            'Given `n` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** n = 3',
            '**Output:** ["((()))","(()())","(())()","()(())","()()()"]',
            '',
            '### Example 2:',
            '**Input:** n = 1',
            '**Output:** ["()"]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= n <= 8`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} n',
            ' * @return {string[]}',
            ' */',
            'var generateParenthesis = function(n) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '3',
                expected: '["((()))","(()())","(())()","()(())","()()()"]',
                description: 'Various well-formed permutations for n=3.'
            },
            {
                input: '1',
                expected: '["()"]',
                description: 'Base case n=1.'
            }
        ],
        tags: ['String', 'Dynamic Programming', 'Backtracking'],
        hints: [
            "You can use backtracking to generate valid strings. Keep track of the number of open and close parentheses you have placed so far.",
            "You can only add a close parenthesis if its count is less than the count of open parentheses currently in the string.",
            "Alternatively, try defining the generation with a dynamic programming relationship using closure numbers."
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
