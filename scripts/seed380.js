const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '380. Insert Delete GetRandom O(1)',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Design',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Implement the RandomizedSet class which supports insert, remove, and getRandom in average O(1) time complexity.",
        problemStatement: [
            '## 380. Insert Delete GetRandom O(1)',
            '',
            'Implement the `RandomizedSet` class:',
            '',
            '* `RandomizedSet()` Initializes the `RandomizedSet` object.',
            '* `bool insert(int val)` Inserts an item `val` into the set if not present. Returns `true` if the item was not present, `false` otherwise.',
            '* `bool remove(int val)` Removes an item `val` from the set if present. Returns `true` if the item was present, `false` otherwise.',
            '* `int getRandom()` Returns a random element from the current set of elements (it\'s guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.',
            '',
            'You must implement the functions of the class such that each function works in **average O(1)** time complexity.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input',
            '["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]',
            '[[], [1], [2], [2], [], [1], [2], []]',
            'Output',
            '[null, true, false, true, 2, true, false, 2]',
            '',
            'Explanation',
            'RandomizedSet randomizedSet = new RandomizedSet();',
            'randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.',
            'randomizedSet.remove(2); // Returns false as 2 does not exist in the set.',
            'randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].',
            'randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.',
            'randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].',
            'randomizedSet.insert(2); // 2 was already in the set, so return false.',
            'randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `-2^31 <= val <= 2^31 - 1`',
            '* At most `2 * 10^5` calls will be made to `insert`, `remove`, and `getRandom`.',
            '* There will be at least one element in the data structure when `getRandom` is called.'
        ].join('\n'),
        starterCode: [
            'var RandomizedSet = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {boolean}',
            ' */',
            'RandomizedSet.prototype.insert = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} val',
            ' * @return {boolean}',
            ' */',
            'RandomizedSet.prototype.remove = function(val) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @return {number}',
            ' */',
            'RandomizedSet.prototype.getRandom = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your RandomizedSet object will be instantiated and called as such:',
            ' * var obj = new RandomizedSet()',
            ' * var param_1 = obj.insert(val)',
            ' * var param_2 = obj.remove(val)',
            ' * var param_3 = obj.getRandom()',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"], [[],[1],[2],[2],[],[1],[2],[]]',
                expected: '[null,true,false,true,2,true,false,2]',
                description: 'Mix of operations.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Math', 'Design', 'Randomized'],
        hints: [
            "Think about using a combination of a hash map and a dynamic array.",
            "To remove in O(1) from an array, you can swap the element to be removed with the last element."
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
