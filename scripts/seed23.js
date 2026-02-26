const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '23. Merge k Sorted Lists',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Divide and Conquer',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Merge k sorted linked lists and return it as one sorted list.",
        problemStatement: [
            '## 23. Merge k Sorted Lists',
            '',
            'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.',
            '',
            'Merge all the linked-lists into one sorted linked-list and return it.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** lists = [[1,4,5],[1,3,4],[2,6]]',
            '**Output:** [1,1,2,3,4,4,5,6]',
            '**Explanation:** The linked-lists are:',
            '[',
            '  1->4->5,',
            '  1->3->4,',
            '  2->6',
            ']',
            'merging them into one sorted linked list:',
            '1->1->2->3->4->4->5->6',
            '',
            '### Example 2:',
            '**Input:** lists = []',
            '**Output:** []',
            '',
            '### Example 3:',
            '**Input:** lists = [[]]',
            '**Output:** []',
            '',
            '---',
            '',
            '### Constraints:',
            '* `k == lists.length`',
            '* `0 <= k <= 10^4`',
            '* `0 <= lists[i].length <= 500`',
            '* `-10^4 <= lists[i][j] <= 10^4`',
            '* `lists[i]` is sorted in ascending order.',
            '* The sum of `lists[i].length` will not exceed `10^4`.'
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
            ' * @param {ListNode[]} lists',
            ' * @return {ListNode}',
            ' */',
            'var mergeKLists = function(lists) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[[1,4,5],[1,3,4],[2,6]]',
                expected: '[1,1,2,3,4,4,5,6]',
                description: 'Merge 3 lists.'
            },
            {
                input: '[]',
                expected: '[]',
                description: 'Empty input.'
            }
        ],
        tags: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)', 'Merge Sort'],
        hints: [
            "Divide and Conquer: You can merge two lists at a time to reduce the problem size.",
            "Alternatively, use a Priority Queue to always extract the minimum element among the heads of the k lists."
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
