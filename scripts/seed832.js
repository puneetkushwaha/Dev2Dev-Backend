const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '832. Flipping an Image',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Arrays',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Flip a binary matrix horizontally and then invert its colors.",
        problemStatement: [
            '## 832. Flipping an Image',
            '',
            '**Difficulty:** Easy | **Topics:** Array, Two Pointers, Matrix, Simulation',
            '',
            'Given an `n x n` binary matrix `image`, flip the image **horizontally**, then **invert** it, and return the resulting image.',
            '',
            '### 1. Flipping Horizontally',
            'To flip an image horizontally means that each row of the image is reversed.',
            '* For example, flipping `[1,1,0]` horizontally results in `[0,1,1]`.',
            '',
            '### 2. Inverting',
            'To invert an image means that each `0` is replaced by `1`, and each `1` is replaced by `0`.',
            '* For example, inverting `[0,1,1]` results in `[1,0,0]`.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: image = [[1,1,0],[1,0,1],[0,0,0]]',
            'Output: [[1,0,0],[0,1,0],[1,1,1]]',
            'Explanation:',
            'First reverse each row: [[0,1,1],[1,0,1],[0,0,0]]',
            'Then invert the image: [[1,0,0],[0,1,0],[1,1,1]]',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]',
            'Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]',
            'Explanation:',
            'First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]]',
            'Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `n == image.length`',
            '* `n == image[i].length`',
            '* `1 <= n <= 20`',
            '* `image[i][j]` is either `0` or `1`.',
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[][]} image',
            ' * @return {number[][]}',
            ' */',
            'var flipAndInvertImage = function(image) {',
            '    ',
            '};',
        ].join('\n'),
        starterCodes: {
            javascript: [
                '/**',
                ' * @param {number[][]} image',
                ' * @return {number[][]}',
                ' */',
                'var flipAndInvertImage = function(image) {',
                '    ',
                '};',
            ].join('\n'),
            python: [
                'class Solution:',
                '    def flipAndInvertImage(self, image: List[List[int]]) -> List[List[int]]:',
                '        ',
            ].join('\n'),
            java: [
                'class Solution {',
                '    public int[][] flipAndInvertImage(int[][] image) {',
                '        ',
                '    }',
                '}',
            ].join('\n'),
            cpp: [
                'class Solution {',
                'public:',
                '    vector<vector<int>> flipAndInvertImage(vector<vector<int>>& image) {',
                '        ',
                '    }',
                '};',
            ].join('\n'),
        },
        testCases: [
            { input: '[[1,1,0],[1,0,1],[0,0,0]]', expected: '[[1,0,0],[0,1,0],[1,1,1]]', description: 'Standard 3x3 case' },
            { input: '[[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]', expected: '[[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]', description: 'Standard 4x4 case' },
        ],
        tags: ['Array', 'Two Pointers', 'Matrix', 'Simulation'],
    },
};

mongoose.connect(process.env.MONGO_URI).then(async () => {
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
