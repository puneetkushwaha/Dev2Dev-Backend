const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Graph',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find all the critical and pseudo-critical edges in a graph's minimum spanning tree.",
        problemStatement: [
            '## 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
            '',
            "Given aweighted undirected connected graph with `n` vertices numbered from `0` to `n - 1`, and an array `edges` where `edges[i] = [ai, bi, weighti]` represents a bidirectional and weighted edge between nodes `ai` and `bi`. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.",
            '',
            "Find all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.",
            '',
            'Note that you can return the indices of the edges in any order.',
            '',
            '---',
            '',
            '### Example 1:',
            '![MST Example 1](https://assets.leetcode.com/uploads/2020/06/04/ex1.png)',
            '**Input:** n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]',
            '**Output:** [[0,1],[2,3,4,5]]',
            '**Explanation:** The figure above describes the graph.',
            'The edges 0 and 1 appear in all MSTs, therefore they are critical edges. The edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are pseudo-critical edges.',
            '',
            '### Example 2:',
            '**Input:** n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]',
            '**Output:** [[],[0,1,2,3]]',
            '**Explanation:** Since all 4 edges have equal weight, choosing any 3 edges will yield an MST. Therefore all 4 edges are pseudo-critical.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `2 <= n <= 100`',
            '* `1 <= edges.length <= min(200, n * (n - 1) / 2)`',
            '* `edges[i].length == 3`',
            '* `0 <= ai < bi < n`',
            '* `1 <= weighti <= 1000`',
            '* All pairs `(ai, bi)` are distinct.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} n',
            ' * @param {number[][]} edges',
            ' * @return {number[][]}',
            ' */',
            'var findCriticalAndPseudoCriticalEdges = function(n, edges) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]',
                expected: '[[0,1],[2,3,4,5]]',
                description: 'Verify critical and pseudo-critical edges in a weighted graph.'
            },
            {
                input: '4, [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]',
                expected: '[[],[0,1,2,3]]',
                description: 'All equal weight edges in a cycle form pseudo-critical edges.'
            }
        ],
        tags: ['Union-Find', 'Graph Theory', 'Sorting', 'Minimum Spanning Tree'],
        hints: [
            "Use the Kruskal algorithm to find the minimum spanning tree weight.",
            "To find if one edge is critical, delete that edge and re-run the MST algorithm. If weight increases, it is critical.",
            "To find if one edge is non-critical (pseudo), include that edge and continue MST. If weight matches initial MST, it is pseudo-critical."
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
