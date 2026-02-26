const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '382. Linked List Random Node',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Linked List',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given a singly linked list, return a random node's value from the linked list. Each node must have the same probability of being chosen.",
        problemStatement: [
            '## 382. Linked List Random Node',
            '',
            'Given a singly linked list, return a random node\'s value from the linked list. Each node must have the same probability of being chosen.',
            '',
            'Implement the `Solution` class:',
            '',
            '* `Solution(ListNode head)` Initializes the object with the head of the singly-linked list `head`.',
            '* `int getRandom()` Chooses a node randomly from the list and returns its value. All the nodes of the list should be equally likely to be chosen.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input',
            '["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"]',
            '[[[1, 2, 3]], [], [], [], [], []]',
            'Output',
            '[null, 1, 3, 2, 2, 3]',
            '',
            'Explanation:',
            'Solution solution = new Solution([1, 2, 3]);',
            'solution.getRandom(); // return 1',
            'solution.getRandom(); // return 3',
            'solution.getRandom(); // return 2',
            'solution.getRandom(); // return 2',
            'solution.getRandom(); // return 3',
            '// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* The number of nodes in the linked list will be in the range `[1, 10^4]`.',
            '* `-10^4 <= Node.val <= 10^4`',
            '* At most `10^4` calls will be made to `getRandom`.',
            '',
            '---',
            '',
            '### 💡 Follow up:',
            '* What if the linked list is extremely large and its length is unknown to you?',
            '* Could you solve this efficiently without using extra space?'
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
            ' */',
            'var Solution = function(head) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'Solution.prototype.getRandom = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your Solution object will be instantiated and called as such:',
            ' * var obj = new Solution(head)',
            ' * var param_1 = obj.getRandom()',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["Solution","getRandom","getRandom","getRandom","getRandom","getRandom"], [[[1,2,3]],[],[],[],[],[]]',
                expected: '[null,1,2,3,2,1]',
                description: 'Verify random node selection probability.'
            }
        ],
        tags: ['Linked List', 'Math', 'Reservoir Sampling', 'Randomized'],
        hints: [
            "You can use an array to store the nodes, but that uses extra space.",
            "Consider Reservoir Sampling for the O(1) extra space follow-up."
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
