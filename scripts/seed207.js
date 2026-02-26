const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '207. Course Schedule',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Graph Theory',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Determine if it is possible to finish all courses given their prerequisites.",
        problemStatement: [
            '## 207. Course Schedule',
            '',
            'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.',
            '',
            '* For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.',
            '',
            'Return `true` if you can finish all courses. Otherwise, return `false`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** numCourses = 2, prerequisites = [[1,0]]',
            '**Output:** true',
            '**Explanation:** There are a total of 2 courses to take.',
            'To take course 1 you should have finished course 0. So it is possible.',
            '',
            '### Example 2:',
            '**Input:** numCourses = 2, prerequisites = [[1,0],[0,1]]',
            '**Output:** false',
            '**Explanation:** There are a total of 2 courses to take.',
            'To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= numCourses <= 2000`',
            '* `0 <= prerequisites.length <= 5000`',
            '* `prerequisites[i].length == 2`',
            '* `0 <= ai, bi < numCourses`',
            '* All the pairs `prerequisites[i]` are **unique**.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} numCourses',
            ' * @param {number[][]} prerequisites',
            ' * @return {boolean}',
            ' */',
            'var canFinish = function(numCourses, prerequisites) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '2, [[1,0]]',
                expected: 'true',
                description: 'Simple two course prerequisite chain.'
            },
            {
                input: '2, [[1,0],[0,1]]',
                expected: 'false',
                description: 'Cycle present, cannot finish.'
            }
        ],
        tags: ['Depth-First Search', 'Breadth-First Search', 'Graph Theory', 'Topological Sort'],
        hints: [
            "This problem is equivalent to finding if a cycle exists in a directed graph.",
            "If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.",
            "Use DFS or BFS (Kahn's algorithm) to find the topological sort."
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
