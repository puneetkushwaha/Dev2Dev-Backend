const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '71. Simplify Path',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Stack',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Transform a Unix-style absolute path into its simplified canonical path.",
        problemStatement: [
            '## 71. Simplify Path',
            '',
            'You are given an absolute path for a Unix-style file system, which always begins with a slash `/`. Your task is to transform this absolute path into its **simplified canonical path**.',
            '',
            'The rules of a Unix-style file system are as follows:',
            '*   A single period `.` represents the current directory.',
            '*   A double period `..` represents the previous/parent directory.',
            '*   Multiple consecutive slashes such as `//` and `///` are treated as a single slash `/`.',
            '*   Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. (e.g., `...` is a valid name).',
            '',
            'The simplified canonical path should follow these rules:',
            '*   The path must start with a single slash `/`.',
            '*   Directories within the path must be separated by exactly one slash `/`.',
            '*   The path must not end with a slash `/`, unless it is the root directory.',
            '*   The path must not have any single or double periods (`.` and `..`) used to denote current or parent directories.',
            '',
            'Return the simplified canonical path.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** path = "/home/"',
            '**Output:** "/home"',
            '**Explanation:** The trailing slash should be removed.',
            '',
            '### Example 2:',
            '**Input:** path = "/home//foo/"',
            '**Output:** "/home/foo"',
            '**Explanation:** Multiple consecutive slashes are replaced by a single one.',
            '',
            '### Example 3:',
            '**Input:** path = "/home/user/Documents/../Pictures"',
            '**Output:** "/home/user/Pictures"',
            '',
            '### Example 4:',
            '**Input:** path = "/../"',
            '**Output:** "/"',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= path.length <= 3000`',
            '* `path` consists of English letters, digits, period `.`, slash `/` or `_`.',
            '* `path` is a valid absolute Unix path.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} path',
            ' * @return {string}',
            ' */',
            'var simplifyPath = function(path) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"/home/"',
                expected: '"/home"',
                description: 'Trailing slash removal.'
            },
            {
                input: '"/home/user/Documents/../Pictures"',
                expected: '"/home/user/Pictures"',
                description: 'Parent directory navigation.'
            },
            {
                input: '"/../"',
                expected: '"/"',
                description: 'Root parent remains root.'
            }
        ],
        tags: ['String', 'Stack'],
        hints: [
            "Split the path by '/' to get individual directory names/commands.",
            "Use a stack to keep track of directory names. Push a name when it's valid, and pop when you see '..'."
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
