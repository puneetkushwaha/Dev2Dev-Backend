const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '3600. Maximize Spanning Tree Stability with Upgrades',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Graph',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Maximize the minimum edge strength in a spanning tree using up to k double-strength upgrades.",
        problemStatement: [
            '## 3600. Maximize Spanning Tree Stability with Upgrades',
            '',
            'You are given an integer `n`, representing `n` nodes numbered from `0` to `n - 1` and a list of `edges`, where `edges[i] = [ui, vi, si, musti]`:',
            '',
            '* `ui` and `vi` indicates an undirected edge between nodes `ui` and `vi`.',
            '* `si` is the strength of the edge.',
            '* `musti` is an integer (`0` or `1`). If `musti == 1`, the edge **must** be included in the spanning tree. These edges **cannot** be upgraded.',
            '',
            'You are also given an integer `k`, the maximum number of upgrades you can perform. Each upgrade **doubles** the strength of an edge, and each eligible edge (with `musti == 0`) can be upgraded at most once.',
            '',
            'The **stability** of a spanning tree is defined as the **minimum strength score** among all edges included in it.',
            '',
            'Return the maximum possible stability of any valid spanning tree. If it is impossible to connect all nodes, return `-1`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** n = 3, edges = [[0,1,2,1],[1,2,3,0]], k = 1',
            '**Output:** 2',
            '**Explanation:**',
            '* Edge `[0,1]` with strength = `2` must be included.',
            '* Edge `[1,2]` is optional and can be upgraded from `3` to `6`.',
            '* The minimum strength in the tree is `2`.',
            '',
            '### Example 2:',
            '**Input:** n = 3, edges = [[0,1,4,0],[1,2,3,0],[0,2,1,0]], k = 2',
            '**Output:** 6',
            '**Explanation:**',
            '* Upgrade `[0,1]` from `4` to `8` and `[1,2]` from `3` to `6`.',
            '* The resulting MST includes these two with minimum strength `6`.',
            '',
            '### Example 3:',
            '**Input:** n = 3, edges = [[0,1,1,1],[1,2,1,1],[2,0,1,1]], k = 0',
            '**Output:** -1',
            '**Explanation:** All mandatory edges form a cycle, violating the spanning tree property.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `2 <= n <= 10^5`',
            '* `1 <= edges.length <= 10^5`',
            '* `musti` is either `0` or `1`.',
            '* `1 <= si <= 10^5`',
            '* `0 <= k <= n`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} n',
            ' * @param {number[][]} edges',
            ' * @param {number} k',
            ' * @return {number}',
            ' */',
            'var maxStability = function(n, edges, k) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '3, [[0,1,2,1],[1,2,3,0]], 1',
                expected: '2',
                description: 'Mandatory edge limits stability.'
            },
            {
                input: '3, [[0,1,4,0],[1,2,3,0],[0,2,1,0]], 2',
                expected: '6',
                description: 'Optional edges upgraded to maximize stability.'
            },
            {
                input: '3, [[0,1,1,1],[1,2,1,1],[2,0,1,1]], 0',
                expected: '-1',
                description: 'Cycle in mandatory edges leads to invalid tree.'
            }
        ],
        tags: ['Binary Search', 'Greedy', 'Union-Find', 'Graph Theory', 'Minimum Spanning Tree'],
        hints: [
            "Binary search on the answer (stability).",
            "For a fixed stability 'S', check if it's possible to form a spanning tree where every edge has strength >= S.",
            "Use DSU to connect components. Prioritize mandatory edges first.",
            "For optional edges, check if original strength >= S or doubled strength >= S using an upgrade."
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
