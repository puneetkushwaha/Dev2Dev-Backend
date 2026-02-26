const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '217. Contains Duplicate',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an integer array, return true if any value appears at least twice in the array.",
        problemStatement: [
            '## 217. Contains Duplicate',
            '',
            'Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [1,2,3,1]',
            '**Output:** true',
            '**Explanation:** The element 1 occurs at the indices 0 and 3.',
            '',
            '### Example 2:',
            '**Input:** nums = [1,2,3,4]',
            '**Output:** false',
            '**Explanation:** All elements are distinct.',
            '',
            '### Example 3:',
            '**Input:** nums = [1,1,1,3,3,4,3,2,4,2]',
            '**Output:** true',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `-10^9 <= nums[i] <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {boolean}',
            ' */',
            'var containsDuplicate = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,2,3,1]',
                expected: 'true',
                description: 'Contains duplicates at end.'
            },
            {
                input: '[1,2,3,4]',
                expected: 'false',
                description: 'All distinct elements.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Sorting'],
        hints: [
            "You can use a Hash Table (like a Set) and iterate linearly, adding numbers to it. If a number is already present, return true.",
            "Another approach is to sort the array and then iterate through it, comparing adjacent elements."
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
