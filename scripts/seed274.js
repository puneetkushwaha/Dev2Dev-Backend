const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '274. H-Index',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Calculate a researcher's h-index from an array of citations.",
        problemStatement: [
            '## 274. H-Index',
            '',
            "Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i`th paper, return the researcher's h-index.",
            '',
            'According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** citations = [3,0,6,1,5]',
            '**Output:** 3',
            '**Explanation:** `[3,0,6,1,5]` means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.',
            'Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.',
            '',
            '### Example 2:',
            '**Input:** citations = [1,3,1]',
            '**Output:** 1',
            '',
            '---',
            '',
            '### Constraints:',
            '* `n == citations.length`',
            '* `1 <= n <= 5000`',
            '* `0 <= citations[i] <= 1000`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} citations',
            ' * @return {number}',
            ' */',
            'var hIndex = function(citations) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[3,0,6,1,5]',
                expected: '3',
                description: 'Standard case with mixed citations.'
            },
            {
                input: '[1,3,1]',
                expected: '1',
                description: 'Case where multiple papers have low citations.'
            }
        ],
        tags: ['Array', 'Sorting', 'Counting Sort'],
        hints: [
            "An easy approach is to sort the array first.",
            "What are the possible values of h-index?",
            "A faster approach is to use counting sort since the range of possible h-index values is bounded by n."
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
