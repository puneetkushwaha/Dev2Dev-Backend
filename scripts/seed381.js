const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '381. Insert Delete GetRandom O(1) - Duplicates allowed',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Design',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Implement the RandomizedCollection class which supports insert, remove, and getRandom in average O(1) time complexity, allowing duplicates.",
        problemStatement: [
            '## 381. Insert Delete GetRandom O(1) - Duplicates allowed',
            '',
            '`RandomizedCollection` is a data structure that contains a collection of numbers, possibly duplicates (i.e., a multiset). It should support inserting and removing specific elements and also reporting a random element.',
            '',
            'Implement the `RandomizedCollection` class:',
            '',
            '* `RandomizedCollection()` Initializes the empty `RandomizedCollection` object.',
            '* `bool insert(int val)` Inserts an item `val` into the multiset, even if the item is already present. Returns `true` if the item is not present, `false` otherwise.',
            '* `bool remove(int val)` Removes an item `val` from the multiset if present. Returns `true` if the item is present, `false` otherwise. Note that if `val` has multiple occurrences in the multiset, we only remove one of them.',
            '* `int getRandom()` Returns a random element from the current multiset of elements. The probability of each element being returned is linearly related to the number of the same values the multiset contains.',
            '',
            'You must implement the functions of the class such that each function works on **average O(1)** time complexity.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input',
            '["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]',
            '[[], [1], [1], [2], [], [1], []]',
            'Output',
            '[null, true, false, true, 2, true, 1]',
            '',
            'Explanation',
            'RandomizedCollection randomizedCollection = new RandomizedCollection();',
            'randomizedCollection.insert(1);   // return true since the collection does not contain 1.',
            'randomizedCollection.insert(1);   // return false since the collection contains 1.',
            'randomizedCollection.insert(2);   // return true since the collection does not contain 2.',
            'randomizedCollection.getRandom(); // getRandom should return 1 with 2/3 probability, or 2 with 1/3 probability.',
            'randomizedCollection.remove(1);   // return true since the collection contains 1.',
            'randomizedCollection.getRandom(); // getRandom should return 1 or 2, both equally likely.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `-2^31 <= val <= 2^31 - 1`',
            '* At most `2 * 10^5` calls in total will be made to `insert`, `remove`, and `getRandom`.',
            '* There will be at least one element in the data structure when `getRandom` is called.'
        ].join('\n'),
        starterCode: [
            'var RandomizedCollection = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {boolean}',
            ' */',
            'RandomizedCollection.prototype.insert = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {boolean}',
            ' */',
            'RandomizedCollection.prototype.remove = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'RandomizedCollection.prototype.getRandom = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your RandomizedCollection object will be instantiated and called as such:',
            ' * var obj = new RandomizedCollection()',
            ' * var param_1 = obj.insert(val)',
            ' * var param_2 = obj.remove(val)',
            ' * var param_3 = obj.getRandom()',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["RandomizedCollection","insert","insert","insert","getRandom","remove","getRandom"], [[],[1],[1],[2],[],[1],[]]',
                expected: '[null,true,false,true,2,true,1]',
                description: 'Handling duplicates and random probability.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Math', 'Design', 'Randomized'],
        hints: [
            "Use a hash map to map each value to a set of its indices in the array.",
            "Similar to the non-duplicate version, use swapping with the last element for O(1) removal."
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
