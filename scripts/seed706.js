const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '706. Design HashMap',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Hash Function',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Design a HashMap without using any built-in hash table libraries.",
        problemStatement: [
            '## 706. Design HashMap',
            '',
            'Design a HashMap without using any built-in hash table libraries.',
            '',
            'Implement the `MyHashMap` class:',
            '',
            '* `MyHashMap()` initializes the object with an empty map.',
            '* `void put(int key, int value)` inserts a `(key, value)` pair into the HashMap. If the `key` already exists in the map, update the corresponding `value`.',
            '* `int get(int key)` returns the `value` to which the specified `key` is mapped, or `-1` if this map contains no mapping for the `key`.',
            '* `void remove(key)` removes the `key` and its corresponding `value` if the map contains the mapping for the `key`.',
            '',
            '---',
            '',
            '### Example 1:',
            '',
            '**Input**',
            '`["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]`',
            '`[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]`',
            '',
            '**Output**',
            '`[null, null, null, 1, -1, null, 1, null, -1]`',
            '',
            '**Explanation**',
            '```java',
            'MyHashMap myHashMap = new MyHashMap();',
            'myHashMap.put(1, 1); // The map is now [[1,1]]',
            'myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]',
            'myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]',
            'myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]',
            'myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)',
            'myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]',
            'myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]',
            'myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= key, value <= 10^6`',
            '* At most `10^4` calls will be made to `put`, `get`, and `remove`.'
        ].join('\n'),
        starterCode: [
            'var MyHashMap = function() {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @param {number} value',
            ' * @return {void}',
            ' */',
            'MyHashMap.prototype.put = function(key, value) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @return {number}',
            ' */',
            'MyHashMap.prototype.get = function(key) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @return {void}',
            ' */',
            'MyHashMap.prototype.remove = function(key) {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your MyHashMap object will be instantiated and called as such:',
            ' * var obj = new MyHashMap()',
            ' * obj.put(key,value)',
            ' * var param_2 = obj.get(key)',
            ' * obj.remove(key)',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]\n[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]',
                expected: '[null, null, null, 1, -1, null, 1, null, -1]',
                description: 'Various put, get, update, and remove operations.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Linked List', 'Design', 'Hash Function'],
        hints: [
            "Use an array of size 10^6 + 1 to store values, initializing it with -1.",
            "For a more robust solution, use an array of size ~1000 and handle collisions by chaining with Linked Lists."
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
