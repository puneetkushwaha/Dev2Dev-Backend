const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '384. Shuffle an Array',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Design',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an integer array nums, design an algorithm to randomly shuffle the array. All permutations of the array should be equally likely as a result of the shuffling.",
        problemStatement: [
            '## 384. Shuffle an Array',
            '',
            'Given an integer array `nums`, design an algorithm to randomly shuffle the array. All permutations of the array should be equally likely as a result of the shuffling.',
            '',
            'Implement the `Solution` class:',
            '',
            '* `Solution(int[] nums)` Initializes the object with the integer array `nums`.',
            '* `int[] reset()` Resets the array to its original configuration and returns it.',
            '* `int[] shuffle()` Returns a random shuffling of the array.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input',
            '["Solution", "shuffle", "reset", "shuffle"]',
            '[[[1, 2, 3]], [], [], []]',
            'Output',
            '[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]',
            '',
            'Explanation:',
            'Solution solution = new Solution([1, 2, 3]);',
            'solution.shuffle();    // Shuffle the array [1,2,3] and return its result.',
            '                       // Any permutation of [1,2,3] must be equally likely to be returned.',
            '                       // Example: return [3, 1, 2]',
            'solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]',
            'solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 50`',
            '* `-10^6 <= nums[i] <= 10^6`',
            '* All the elements of `nums` are unique.',
            '* At most `10^4` calls in total will be made to `reset` and `shuffle`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' */',
            'var Solution = function(nums) {',
            '    ',
            '};',
            '',
            '/**',
            ' * Resets the array to its original configuration and return it.',
            ' * @return {number[]}',
            ' */',
            'Solution.prototype.reset = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * Returns a random shuffling of the array.',
            ' * @return {number[]}',
            ' */',
            'Solution.prototype.shuffle = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your Solution object will be instantiated and called as such:',
            ' * var obj = new Solution(nums)',
            ' * var param_1 = obj.reset()',
            ' * var param_2 = obj.shuffle()',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["Solution","shuffle","reset","shuffle"], [[[1,2,3]],[],[],[]]',
                expected: '[null,[1,2,3],[1,2,3],[1,3,2]]',
                description: 'Verify shuffle and reset functionality.'
            }
        ],
        tags: ['Array', 'Math', 'Design', 'Randomized'],
        hints: [
            "Keep a copy of the original array to support the reset operation.",
            "Use the Fisher-Yates shuffle algorithm for an O(N) shuffling process."
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
