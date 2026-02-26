const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '535. Encode and Decode TinyURL',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Hash Function',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Design a class to encode a long URL to a tiny URL and decode it back.",
        problemStatement: [
            '## 535. Encode and Decode TinyURL',
            '',
            '> **Note:** This is a companion problem to the System Design problem: Design TinyURL.',
            '',
            'TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`. Design a class to encode a URL and decode a tiny URL.',
            '',
            'There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.',
            '',
            'Implement the `Solution` class:',
            '',
            '* `Solution()` Initializes the object of the system.',
            '* `String encode(String longUrl)` Returns a tiny URL for the given `longUrl`.',
            '* `String decode(String shortUrl)` Returns the original long URL for the given `shortUrl`. It is guaranteed that the given `shortUrl` was encoded by the same object.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** url = "https://leetcode.com/problems/design-tinyurl"',
            '**Output:** "https://leetcode.com/problems/design-tinyurl"',
            '',
            '**Explanation:**',
            '```java',
            'Solution obj = new Solution();',
            'string tiny = obj.encode(url); // returns the encoded tiny url.',
            'string ans = obj.decode(tiny); // returns the original url after decoding it.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= url.length <= 10^4`',
            '* `url` is guaranteed to be a valid URL.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * Encodes a URL to a shortened URL.',
            ' *',
            ' * @param {string} longUrl',
            ' * @return {string}',
            ' */',
            'var encode = function(longUrl) {',
            '    ',
            '};',
            '',
            '/**',
            ' * Decodes a shortened URL to its original URL.',
            ' *',
            ' * @param {string} shortUrl',
            ' * @return {string}',
            ' */',
            'var decode = function(shortUrl) {',
            '    ',
            '};',
            '',
            '/**',
            ' * Your functions will be called as such:',
            ' * decode(encode(url));',
            ' */'
        ].join('\n'),
        testCases: [
            {
                input: '"https://leetcode.com/problems/design-tinyurl"',
                expected: '"https://leetcode.com/problems/design-tinyurl"',
                description: 'Encode and decode a standard valid URL.'
            }
        ],
        tags: ['Hash Table', 'String', 'Design', 'Hash Function'],
        hints: [
            "You can use a Hash Map to store the mapping from the short URL to the long URL.",
            "Generate a random string or counter for the short URL key.",
            "Make sure your collision handling is robust if you are generating random keys."
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
