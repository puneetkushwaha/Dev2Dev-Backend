const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '460. LFU Cache',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Design',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Design and implement a data structure for a Least Frequently Used (LFU) cache.",
        problemStatement: [
            '## 460. LFU Cache',
            '',
            'Design and implement a data structure for a **Least Frequently Used (LFU)** cache.',
            '',
            'Implement the `LFUCache` class:',
            '',
            '* `LFUCache(int capacity)` Initializes the object with the `capacity` of the data structure.',
            '* `int get(int key)` Gets the value of the `key` if the key exists in the cache. Otherwise, returns `-1`.',
            '* `void put(int key, int value)` Update the value of the `key` if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the **least frequently used** key before inserting a new item. For this problem, when there is a tie (i.e., multiple keys with the same frequency), the **least recently used** key would be invalidated.',
            '',
            'To determine the least frequently used key, a **use counter** is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.',
            '',
            'When a key is first inserted into the cache, its use counter is set to 1 (due to the `put` operation). The use counter for a key in the cache is incremented if a `get` or `put` operation is called on it.',
            '',
            'The functions `get` and `put` must each run in **O(1)** average time complexity.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input',
            '["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]',
            '[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]',
            'Output',
            '[null, null, null, 1, null, -1, 3, null, -1, 3, 4]',
            '',
            'Explanation',
            '// cnt(x) = the use counter for key x',
            '// cache=[] will show the last used order (leftmost element is most recent)',
            'LFUCache lfu = new LFUCache(2);',
            'lfu.put(1, 1);   // cache=[1], cnt(1)=1',
            'lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1',
            'lfu.get(1);      // return 1',
            '                 // cache=[1,2], cnt(2)=1, cnt(1)=2',
            'lfu.put(3, 3);   // 2 is LFU (cnt=1), invalidate 2.',
            '                 // cache=[3,1], cnt(3)=1, cnt(1)=2',
            'lfu.get(2);      // return -1 (not found)',
            'lfu.get(3);      // return 3',
            '                 // cache=[3,1], cnt(3)=2, cnt(1)=2',
            'lfu.put(4, 4);   // Both 1 and 3 have cnt=2, but 1 is LRU, invalidate 1.',
            '                 // cache=[4,3], cnt(4)=1, cnt(3)=2',
            'lfu.get(1);      // return -1 (not found)',
            'lfu.get(3);      // return 3',
            '                 // cache=[3,4], cnt(4)=1, cnt(3)=3',
            'lfu.get(4);      // return 4',
            '                 // cache=[4,3], cnt(4)=2, cnt(3)=3',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= capacity <= 10^4`',
            '* `0 <= key <= 10^5`',
            '* `0 <= value <= 10^9`',
            '* At most `2 * 10^5` calls will be made to `get` and `put`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} capacity',
            ' */',
            'var LFUCache = function(capacity) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @return {number}',
            ' */',
            'LFUCache.prototype.get = function(key) {',
            '    ',
            '};',
            '',
            '/**',
            ' * @param {number} key',
            ' * @param {number} value',
            ' * @return {void}',
            ' */',
            'LFUCache.prototype.put = function(key, value) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"], "[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]"',
                expected: '[null, null, null, 1, null, -1, 3, null, -1, 3, 4]',
                description: 'Standard cache operations with frequency and recency rules.'
            },
        ],
        tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
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
