const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '1365. How Many Numbers Are Smaller Than the Current Number',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "For each element, count how many elements in the array are strictly smaller than it.",
        problemStatement: [
            '## 1365. How Many Numbers Are Smaller Than the Current Number',
            '',
            'Given the array `nums`, for each `nums[i]` find out how many numbers in the array are smaller than it. That is, for each `nums[i]` you have to count the number of valid `j`\'s such that `j != i` and `nums[j] < nums[i]`.',
            '',
            'Return the answer in an array.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [8,1,2,2,3]',
            '**Output:** [4,0,1,1,3]',
            '**Explanation:**',
            'For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3).',
            'For nums[1]=1 does not exist any smaller number than it.',
            'For nums[2]=2 there exist one smaller number than it (1).',
            'For nums[3]=2 there exist one smaller number than it (1).',
            'For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).',
            '',
            '### Example 2:',
            '**Input:** nums = [6,5,4,8]',
            '**Output:** [2,1,0,3]',
            '',
            '### Example 3:',
            '**Input:** nums = [7,7,7,7]',
            '**Output:** [0,0,0,0]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `2 <= nums.length <= 500`',
            '* `0 <= nums[i] <= 100`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number[]}',
            ' */',
            'var smallerNumbersThanCurrent = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[8,1,2,2,3]',
                expected: '[4,0,1,1,3]',
                description: 'Various smaller numbers including duplicates.'
            },
            {
                input: '[7,7,7,7]',
                expected: '[0,0,0,0]',
                description: 'All elements equal.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Sorting', 'Counting Sort'],
        hints: [
            "Brute force for each array element runs in O(N^2).",
            "In order to improve the time complexity, we can sort the array and get the answer for each element in O(N log N).",
            "A Counting Sort approach works in O(N) due to the small constraint on the values (0-100)."
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
