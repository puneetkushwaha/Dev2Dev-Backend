const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '1670. Design Front Middle Back Queue',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Linked List',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Design a queue that supports push and pop operations in the front, middle, and back.",
        problemStatement: [
            '## 1670. Design Front Middle Back Queue',
            '',
            'Design a queue that supports push and pop operations in the front, middle, and back.',
            '',
            'Implement the `FrontMiddleBack` class:',
            '',
            '* `FrontMiddleBack()` Initializes the queue.',
            '* `void pushFront(int val)` Adds `val` to the **front** of the queue.',
            '* `void pushMiddle(int val)` Adds `val` to the **middle** of the queue.',
            '* `void pushBack(int val)` Adds `val` to the **back** of the queue.',
            '* `int popFront()` Removes the **front** element of the queue and returns it. If the queue is empty, return `-1`.',
            '* `int popMiddle()` Removes the **middle** element of the queue and returns it. If the queue is empty, return `-1`.',
            '* `int popBack()` Removes the **back** element of the queue and returns it. If the queue is empty, return `-1`.',
            '',
            '**Notice** that when there are **two** middle position choices, the operation is performed on the **frontmost** middle position choice. For example:',
            '',
            '* Pushing `6` into the middle of `[1, 2, 3, 4, 5]` results in `[1, 2, 6, 3, 4, 5]`.',
            '* Popping the middle from `[1, 2, 3, 4, 5, 6]` returns `3` and results in `[1, 2, 4, 5, 6]`.',
            '',
            '---',
            '',
            '### Example 1:',
            '',
            '**Input:**',
            '`["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]`',
            '`[[], [1], [2], [3], [4], [], [], [], [], []]`',
            '',
            '**Output:**',
            '`[null, null, null, null, null, 1, 3, 4, 2, -1]`',
            '',
            '**Explanation:**',
            '```java',
            'FrontMiddleBackQueue q = new FrontMiddleBackQueue();',
            'q.pushFront(1);   // [1]',
            'q.pushBack(2);    // [1, 2]',
            'q.pushMiddle(3);  // [1, 3, 2]',
            'q.pushMiddle(4);  // [1, 4, 3, 2]',
            'q.popFront();     // return 1 -> [4, 3, 2]',
            'q.popMiddle();    // return 3 -> [4, 2]',
            'q.popMiddle();    // return 4 -> [2]',
            'q.popBack();      // return 2 -> []',
            'q.popFront();     // return -1 -> [] (The queue is empty)',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= val <= 10^9`',
            '* At most `1000` calls will be made to `pushFront`, `pushMiddle`, `pushBack`, `popFront`, `popMiddle`, and `popBack`.'
        ].join('\n'),
        starterCode: [
            'var FrontMiddleBackQueue = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {void}',
            ' */',
            'FrontMiddleBackQueue.prototype.pushFront = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {void}',
            ' */',
            'FrontMiddleBackQueue.prototype.pushMiddle = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {void}',
            ' */',
            'FrontMiddleBackQueue.prototype.pushBack = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'FrontMiddleBackQueue.prototype.popFront = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'FrontMiddleBackQueue.prototype.popMiddle = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'FrontMiddleBackQueue.prototype.popBack = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your FrontMiddleBackQueue object will be instantiated and called as such:',
            ' * var obj = new FrontMiddleBackQueue()',
            ' * obj.pushFront(val)',
            ' * obj.pushMiddle(val)',
            ' * obj.pushBack(val)',
            ' * var param_4 = obj.popFront()',
            ' * var param_5 = obj.popMiddle()',
            ' * var param_6 = obj.popBack()',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]\n[[], [1], [2], [3], [4], [], [], [], [], []]',
                expected: '[null, null, null, null, null, 1, 3, 4, 2, -1]',
                description: 'Various queue operations acting on front, middle, and back.'
            }
        ],
        tags: ['Array', 'Linked List', 'Design', 'Queue', 'Doubly-Linked List', 'Data Stream'],
        hints: [
            "The constraints are low enough for a brute force, single array approach.",
            "For an O(1) per method approach, use 2 double-ended queues (or two doubly-linked lists): one for the first half and one for the second half."
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
