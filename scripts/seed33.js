const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '33. Search in Rotated Sorted Array',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Binary Search',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Search for a target value in a sorted array that has been rotated.",
        problemStatement: [
            '## 33. Search in Rotated Sorted Array',
            '',
            'There is an integer array `nums` sorted in ascending order (with **distinct** values).',
            '',
            'Prior to being passed to your function, `nums` is **possibly left rotated** at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.',
            '',
            'Given the array `nums` **after** the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.',
            '',
            'You must write an algorithm with `O(log n)` runtime complexity.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [4,5,6,7,0,1,2], target = 0',
            '**Output:** 4',
            '',
            '### Example 2:',
            '**Input:** nums = [4,5,6,7,0,1,2], target = 3',
            '**Output:** -1',
            '',
            '### Example 3:',
            '**Input:** nums = [1], target = 0',
            '**Output:** -1',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 5000`',
            '* `-10^4 <= nums[i] <= 10^4`',
            '* All values of `nums` are **unique**.',
            '* `nums` is an ascending array that is possibly rotated.',
            '* `-10^4 <= target <= 10^4`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} target',
            ' * @return {number}',
            ' */',
            'var search = function(nums, target) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[4,5,6,7,0,1,2], 0',
                expected: '4',
                description: 'Target exists in right unsorted/sorted half.'
            },
            {
                input: '[4,5,6,7,0,1,2], 3',
                expected: '-1',
                description: 'Target does not exist.'
            },
            {
                input: '[1], 0',
                expected: '-1',
                description: 'Single element array.'
            }
        ],
        tags: ['Array', 'Binary Search'],
        hints: [
            "You can use binary search by checking which half of the current interval [left, right] is sorted.",
            "If [left, mid] is sorted and target is inside it, adjust right. Otherwise, search the other half."
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
