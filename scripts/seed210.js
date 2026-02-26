const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '210. Course Schedule II',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Graph Theory',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Return the ordering of courses you should take to finish all courses.",
        problemStatement: [
            '## 210. Course Schedule II',
            '',
            'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.',
            '',
            '* For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.',
            '',
            'Return the ordering of courses you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** numCourses = 2, prerequisites = [[1,0]]',
            '**Output:** [0,1]',
            '**Explanation:** There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].',
            '',
            '### Example 2:',
            '**Input:** numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
            '**Output:** [0,2,1,3]',
            '**Explanation:** There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.',
            'So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].',
            '',
            '### Example 3:',
            '**Input:** numCourses = 1, prerequisites = []',
            '**Output:** [0]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= numCourses <= 2000`',
            '* `0 <= prerequisites.length <= numCourses * (numCourses - 1)`',
            '* `prerequisites[i].length == 2`',
            '* `0 <= ai, bi < numCourses`',
            '* `ai != bi`',
            '* All the pairs `[ai, bi]` are **distinct**.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} numCourses',
            ' * @param {number[][]} prerequisites',
            ' * @return {number[]}',
            ' */',
            'var findOrder = function(numCourses, prerequisites) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '2, [[1,0]]',
                expected: '[0,1]',
                description: 'Simple valid topology.'
            },
            {
                input: '4, [[1,0],[2,0],[3,1],[3,2]]',
                expected: '[0,1,2,3]', // Using one of the valid outputs
                description: 'Multiple valid branches.'
            },
            {
                input: '2, [[1,0],[0,1]]',
                expected: '[]',
                description: 'Cycle present, impossible.'
            }
        ],
        tags: ['Depth-First Search', 'Breadth-First Search', 'Graph Theory', 'Topological Sort'],
        hints: [
            "This problem is equivalent to finding the topological order in a directed graph.",
            "Use DFS to visit all nodes, or Kahn's algorithm (BFS) using in-degrees."
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
