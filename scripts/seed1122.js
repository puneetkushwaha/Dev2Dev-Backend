const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '1122. Relative Sort Array',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Sort the elements of an array relative to the order established in a second array.",
        problemStatement: [
            '## 1122. Relative Sort Array',
            '',
            'Given two arrays `arr1` and `arr2`, the elements of `arr2` are distinct, and all elements in `arr2` are also in `arr1`.',
            '',
            'Sort the elements of `arr1` such that the relative ordering of items in `arr1` are the same as in `arr2`. Elements that do not appear in `arr2` should be placed at the end of `arr1` in **ascending** order.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]',
            '**Output:** [2,2,2,1,4,3,3,9,6,7,19]',
            '',
            '### Example 2:',
            '**Input:** arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]',
            '**Output:** [22,28,8,6,17,44]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= arr1.length, arr2.length <= 1000`',
            '* `0 <= arr1[i], arr2[i] <= 1000`',
            '* All the elements of `arr2` are **distinct**.',
            '* Each `arr2[i]` is in `arr1`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} arr1',
            ' * @param {number[]} arr2',
            ' * @return {number[]}',
            ' */',
            'var relativeSortArray = function(arr1, arr2) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6]',
                expected: '[2,2,2,1,4,3,3,9,6,7,19]',
                description: 'Typical mapping including distinct unseen elements.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Sorting', 'Counting Sort'],
        hints: [
            "Using a hashmap, we can map the values of arr2 to their position in arr2.",
            "After, we can use a custom sorting function based on the map.",
            "Counting sort is also highly effective here due to the small constraints on arr1[i]."
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
