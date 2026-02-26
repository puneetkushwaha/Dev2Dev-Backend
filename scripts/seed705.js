const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '705. Design HashSet',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Hash Function',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Design a HashSet without using any built-in hash table libraries.",
        problemStatement: [
            '## 705. Design HashSet',
            '',
            'Design a HashSet without using any built-in hash table libraries.',
            '',
            'Implement `MyHashSet` class:',
            '',
            '* `void add(key)` Inserts the value `key` into the HashSet.',
            '* `bool contains(key)` Returns whether the value `key` exists in the HashSet or not.',
            '* `void remove(key)` Removes the value `key` in the HashSet. If `key` does not exist in the HashSet, do nothing.',
            '',
            '---',
            '',
            '### Example 1:',
            '',
            '**Input**',
            '`["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]`',
            '`[[], [1], [2], [1], [3], [2], [2], [2], [2]]`',
            '',
            '**Output**',
            '`[null, null, null, true, false, null, true, null, false]`',
            '',
            '**Explanation**',
            '```java',
            'MyHashSet myHashSet = new MyHashSet();',
            'myHashSet.add(1);      // set = [1]',
            'myHashSet.add(2);      // set = [1, 2]',
            'myHashSet.contains(1); // return True',
            'myHashSet.contains(3); // return False, (not found)',
            'myHashSet.add(2);      // set = [1, 2]',
            'myHashSet.contains(2); // return True',
            'myHashSet.remove(2);   // set = [1]',
            'myHashSet.contains(2); // return False, (already removed)',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= key <= 10^6`',
            '* At most `10^4` calls will be made to `add`, `remove`, and `contains`.'
        ].join('\n'),
        starterCode: [
            'var MyHashSet = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @return {void}',
            ' */',
            'MyHashSet.prototype.add = function(key) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @return {void}',
            ' */',
            'MyHashSet.prototype.remove = function(key) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @return {boolean}',
            ' */',
            'MyHashSet.prototype.contains = function(key) {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your MyHashSet object will be instantiated and called as such:',
            ' * var obj = new MyHashSet()',
            ' * obj.add(key)',
            ' * obj.remove(key)',
            ' * var param_3 = obj.contains(key)',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]\n[[], [1], [2], [1], [3], [2], [2], [2], [2]]',
                expected: '[null, null, null, true, false, null, true, null, false]',
                description: 'Various add, contains, and remove operations.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Linked List', 'Design', 'Hash Function'],
        hints: [
            "You can use a boolean array of size 10^6 + 1 to keep track of elements.",
            "Alternatively, use chaining with a linked list or an array of arrays to handle collisions if you use a smaller hash space."
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
