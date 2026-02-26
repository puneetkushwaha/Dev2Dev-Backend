const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '148. Sort List',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Linked List',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given the head of a linked list, return the list after sorting it in ascending order.",
        problemStatement: [
            '## 148. Sort List',
            '',
            'Given the `head` of a linked list, return the list after sorting it in ascending order.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: head = [4,2,1,3]',
            'Output: [1,2,3,4]',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: head = [-1,5,3,4,0]',
            'Output: [-1,0,3,4,5]',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: head = []',
            'Output: []',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* The number of nodes in the list is in the range `[0, 5 * 10^4]`.',
            '* `-10^5 <= Node.val <= 10^5`',
            '',
            '### 💡 Follow up:',
            '> Can you sort the linked list in **O(n logn)** time and **O(1)** memory (i.e. constant space)?'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * Definition for singly-linked list.',
            ' * function ListNode(val, next) {',
            ' *     this.val = (val===undefined ? 0 : val)',
            ' *     this.next = (next===undefined ? null : next)',
            ' * }',
            ' */',
            '/**',
            ' * @param {ListNode} head',
            ' * @return {ListNode}',
            ' */',
            'var sortList = function(head) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"[4,2,1,3]"',
                expected: '"[1,2,3,4]"',
                description: 'Unsorted list with four elements.'
            },
            {
                input: '"[-1,5,3,4,0]"',
                expected: '"[-1,0,3,4,5]"',
                description: 'Unsorted list with negative values.'
            },
            {
                input: '[]',
                expected: '[]',
                description: 'Empty list.'
            },
        ],
        tags: ['Linked List', 'Two Pointers', 'Divide and Conquer', 'Sorting', 'Merge Sort'],
        hints: [
            "You can use Merge Sort for a stable O(n log n) solution.",
            "Use the slow and fast pointer approach to find the middle of the list."
        ]
    },
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
