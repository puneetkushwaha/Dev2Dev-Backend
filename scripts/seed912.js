const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '912. Sort an Array',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Sort an array of integers in ascending order without using built-in functions.",
        problemStatement: [
            '## 912. Sort an Array',
            '',
            'Given an array of integers `nums`, sort the array in ascending order and return it.',
            '',
            'You must solve the problem **without using any built-in functions** in `O(nlog(n))` time complexity and with the smallest space complexity possible.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [5,2,3,1]',
            '**Output:** [1,2,3,5]',
            '**Explanation:** After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).',
            '',
            '### Example 2:',
            '**Input:** nums = [5,1,1,2,0,0]',
            '**Output:** [0,0,1,1,2,5]',
            '**Explanation:** Note that the values of nums are not necessarily unique.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 5 * 10^4`',
            '* `-5 * 10^4 <= nums[i] <= 5 * 10^4`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number[]}',
            ' */',
            'var sortArray = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[5,2,3,1]',
                expected: '[1,2,3,5]',
                description: 'Unsorted array of unique elements.'
            },
            {
                input: '[5,1,1,2,0,0]',
                expected: '[0,0,1,1,2,5]',
                description: 'Unsorted array with duplicate elements.'
            }
        ],
        tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Merge Sort', 'Bucket Sort', 'Radix Sort', 'Counting Sort'],
        hints: [
            "Consider using a fast sorting algorithm like Merge Sort or Heap Sort to achieve O(N log N) time.",
            "Counting Sort can also be used here as the range of values allows for a sized counting array."
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
