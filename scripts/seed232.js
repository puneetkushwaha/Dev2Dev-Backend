const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '232. Implement Queue using Stacks',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Stack',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Implement a first in first out (FIFO) queue using only two stacks.",
        problemStatement: [
            '## 232. Implement Queue using Stacks',
            '',
            'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).',
            '',
            'Implement the `MyQueue` class:',
            '',
            '*   `void push(int x)` Pushes element `x` to the back of the queue.',
            '*   `int pop()` Removes the element from the front of the queue and returns it.',
            '*   `int peek()` Returns the element at the front of the queue.',
            '*   `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.',
            '',
            '**Notes:**',
            '*   You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.',
            '*   Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack\'s standard operations.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:**',
            '["MyQueue", "push", "push", "peek", "pop", "empty"]',
            '[[], [1], [2], [], [], []]',
            '**Output:**',
            '[null, null, null, 1, 1, false]',
            '',
            '**Explanation:**',
            'MyQueue myQueue = new MyQueue();',
            'myQueue.push(1); // queue is: [1]',
            'myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)',
            'myQueue.peek(); // return 1',
            'myQueue.pop(); // return 1, queue is [2]',
            'myQueue.empty(); // return false',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= x <= 9`',
            '* At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.',
            '* All the calls to `pop` and `peek` are valid.',
            '',
            '**Follow-up:** Can you implement the queue such that each operation is amortized `O(1)` time complexity?'
        ].join('\n'),
        starterCode: [
            '',
            'var MyQueue = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} x',
            ' * @return {void}',
            ' */',
            'MyQueue.prototype.push = function(x) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'MyQueue.prototype.pop = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'MyQueue.prototype.peek = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {boolean}',
            ' */',
            'MyQueue.prototype.empty = function() {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
                expected: '[null,null,null,1,1,false]',
                description: 'Standard FIFO operations.'
            }
        ],
        tags: ['Stack', 'Design', 'Queue'],
        hints: [
            "Use two stacks: one for pushing elements (input) and one for popping/peeking elements (output).",
            "When popping or peeking, if the output stack is empty, transfer all elements from the input stack to the output stack to reverse their order."
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
