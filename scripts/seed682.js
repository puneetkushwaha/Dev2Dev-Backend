const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '682. Baseball Game',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Stack',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Simulate a baseball scoring game using a stack to keep track of previous scores.",
        problemStatement: [
            '## 682. Baseball Game',
            '',
            'You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.',
            '',
            'You are given a list of strings `operations`, where `operations[i]` is the `i`th operation you must apply to the record and is one of the following:',
            '',
            '1. **An integer `x`:** Record a new score of `x`.',
            '2. **\'+\'**: Record a new score that is the sum of the previous two scores.',
            '3. **\'D\'**: Record a new score that is the double of the previous score.',
            '4. **\'C\'**: Invalidate the previous score, removing it from the record.',
            '',
            'Return the sum of all the scores on the record after applying all the operations.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** ops = ["5","2","C","D","+"]',
            '**Output:** 30',
            '**Explanation:**',
            '* "5" - Add 5 to record: [5]',
            '* "2" - Add 2 to record: [5, 2]',
            '* "C" - Invalidate previous: [5]',
            '* "D" - Double previous (5*2=10): [5, 10]',
            '* "+" - Sum previous two (5+10=15): [5, 10, 15]',
            '* Sum of scores: 5 + 10 + 15 = 30.',
            '',
            '### Example 2:',
            '**Input:** ops = ["5","-2","4","C","D","9","+","+"]',
            '**Output:** 27',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= operations.length <= 1000`',
            '* `operations[i]` is "C", "D", "+", or an integer string.',
            '* Correct count of operands is guaranteed for each operation.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string[]} operations',
            ' * @return {number}',
            ' */',
            'var calPoints = function(operations) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '["5","2","C","D","+"]',
                expected: '30',
                description: 'Various operations applied to scores.'
            },
            {
                input: '["5","-2","4","C","D","9","+","+"]',
                expected: '27',
                description: 'Longer sequence with negatives.'
            }
        ],
        tags: ['Array', 'Stack', 'Simulation'],
        hints: [
            "Use a stack to store the valid scores as you process each operation.",
            "Sum up all elements in the stack at the end for the final result."
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
