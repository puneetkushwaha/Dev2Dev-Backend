const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch5GraphQuestions = [
    {
        title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find a city such that the number of cities reachable within a distance threshold is minimized.",
            explanation: "### All-Pairs Shortest Path\n\n**Concept:** Floyd-Warshall Algorithm\n\n**Logic:**\n1. Use an `n x n` distance matrix `dist` initialized to Infinity. `dist[i][i] = 0`.\n2. For each edge `(u, v, w)`, set `dist[u][v] = dist[v][u] = w`.\n3. Floyd-Warshall: For each intermediate city `k`:\n   - For each `i` and `j`:\n     - `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`.\n4. After calculating all-pairs shortest paths, iterate through each city to count how many neighbors `j` have `dist[i][j] <= distanceThreshold`.\n5. Return the city with the minimum count (and the largest index in case of ties).\n\n**Time Complexity:** O(N³)\n**Space Complexity:** O(N²).",
            problemStatement: "There are `n` cities. Some of them are connected by edges. Return the city with the smallest number of cities that are reachable through some path and whose distance is **at most** `distanceThreshold`.",
            sampleInput: "n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4",
            sampleOutput: "3",
            constraints: "n <= 100.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @param {number} distanceThreshold\n * @return {number}\n */\nvar findTheCity = function(n, edges, distanceThreshold) {\n    \n};",
            tags: ["Dynamic Programming", "Graph", "Shortest Path"]
        }
    },
    {
        title: "Path with Maximum Probability",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find a path with the maximum product of probabilities from start to end.",
            explanation: "### Dijkstra for Probabilities\n\n**Concept:** Modified Dijkstra (Max-Product variant)\n\n**Logic:**\nNormally Dijkstra finds the minimum *sum*. Here we want the maximum *product*. \n\n**Approach:**\n1. Use a Max-Heap to store `[probability, node]`. Initial: `[1.0, start]`.\n2. `maxProb[u]` stores the maximum probability to reach `u`. Initialize with 0.\n3. While heap not empty:\n   - Pop `(prob, u)`. If `prob < maxProb[u]`, continue.\n   - For each neighbor `v` with edge probability `p`:\n     - `newProb = prob * p`.\n     - If `newProb > maxProb[v]`:\n       - `maxProb[v] = newProb`.\n       - Push `(newProb, v)` to heap.\n\n**Time Complexity:** O(E log V)\n**Space Complexity:** O(V + E).",
            problemStatement: "You are given an array of undirected edges `edges[i] = [a, b]` and an array `succProb[i]` where `succProb[i]` is the probability of success of traversing the edge `i`. Return the maximum probability of success to go from `start` to `end`.",
            sampleInput: "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2",
            sampleOutput: "0.25",
            constraints: "n <= 10^4.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @param {number[]} succProb\n * @param {number} start_node\n * @param {number} end_node\n * @return {number}\n */\nvar maxProbability = function(n, edges, succProb, start_node, end_node) {\n    \n};",
            tags: ["Graph", "Heap (Priority Queue)", "Shortest Path"]
        }
    },
    {
        title: "Number of Ways to Arrive at Destination",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Count the number of paths from node 0 to node n-1 that have the minimum possible travel time.",
            explanation: "### Multi-Dijkstra (Count Shortest Paths)\n\n**Concept:** Dijkstra + DP Counting\n\n**Logic:**\nWe need to track if we found a path of the *same* minimum length.\n\n**Approach:**\n1. Use `dist[u]` (min time) and `count[u]` (number of ways at min time).\n2. Standard Dijkstra using a Min-Heap.\n3. When relaxing an edge `(u, v)` with weight `w`:\n   - If `dist[u] + w < dist[v]`:\n     - `dist[v] = dist[u] + w`.\n     - `count[v] = count[u]`.\n     - Push `(dist[v], v)` to heap.\n   - If `dist[u] + w == dist[v]`:\n     - `count[v] = (count[v] + count[u]) % mod`.\n\n**Time Complexity:** O(E log V)\n**Space Complexity:** O(V + E).",
            problemStatement: "You are in a city that consists of `n` intersections numbered from `0` to `n - 1`. Return the number of ways you can arrive at your destination in the shortest amount of time.",
            sampleInput: "n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]",
            sampleOutput: "4",
            constraints: "n <= 200.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} roads\n * @return {number}\n */\nvar countPaths = function(n, roads) {\n    \n};",
            tags: ["Dynamic Programming", "Graph", "Topological Sort", "Heap (Priority Queue)", "Shortest Path"]
        }
    },
    {
        title: "Minimum Number of Days to Disconnect Island",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum number of days/land-removals needed to disconnect a grid of islands.",
            explanation: "### Grid Connectivity Logic\n\n**Concept:** Graph Connectivity Property\n\n**Insight:**\nThe maximum number of land tiles you need to remove to disconnect any grid is 2 (removing two diagonal corners). A grid can be already disconnected (0 days), need 1 removal, or 2.\n\n**Approach:**\n1. Check if grid is currently disconnected (using DFS to count components). If components != 1, return 0.\n2. Try removing every single '1' tile one by one. After each removal, check if grid becomes disconnected. If yes, return 1.\n3. If neither 0 nor 1 works, return 2.\n\n**Time Complexity:** O( (M*N)² )\n**Space Complexity:** O(M*N).",
            problemStatement: "You are given an `m x n` binary grid `grid` where 1 is land and 0 is water. Return the minimum number of days to disconnect the grid. We say the grid is disconnected if the number of islands is not exactly 1.",
            sampleInput: "grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]",
            sampleOutput: "2",
            constraints: "m, n <= 30.",
            starterCode: "/**\n * @param {number[][]} grid\n * @return {number}\n */\nvar minDays = function(grid) {\n    \n};",
            tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix", "Strongly Connected Component"]
        }
    },
    {
        title: "Evaluate Division",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Given a list of division equations, evaluate multiple queries using transitive properties (A/B and B/C => A/C).",
            explanation: "### Division Graph\n\n**Concept:** Weighted Directed Graph Traversal\n\n**Logic:**\nAn equation `a / b = 2.0` is a directed edge `a -> b` with weight `2.0` and `b -> a` with weight `1 / 2.0 = 0.5`.\n\n**Approach:**\n1. Build an adjacency list where `adj[a]` contains `[b, weight]`.\n2. For each query `x / y`:\n   - Perform a DFS from `x` to `y`.\n   - Product of weights along the path is the result.\n   - If `x` or `y` is unknown, return -1.0.\n\n**Time Complexity:** O(Queries * (V + E))\n**Space Complexity:** O(V + E).",
            problemStatement: "You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represent the equation `Ai / Bi = values[i]`. Find the answers to multiple queries.",
            sampleInput: "equations = [[\"a\",\"b\"],[\"b\",\"c\"]], values = [2.0,3.0], queries = [[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"]]",
            sampleOutput: "[6.0, 0.5, -1.0]",
            constraints: "equations.length <= 20.",
            starterCode: "/**\n * @param {string[][]} equations\n * @param {number[]} values\n * @param {string[][]} queries\n * @return {number[]}\n */\nvar calcEquation = function(equations, values, queries) {\n    \n};",
            tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Graph", "Shortest Path"]
        }
    },
    {
        title: "Map of Highest Peak",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Assign heights to terrestrial cells in a grid such that water cells are 0 and absolute difference between adjacent cells is at most 1, while maximizing the heights.",
            explanation: "### Multi-Source BFS on Grid\n\n**Concept:** BFS Level-Order (Distance Transform)\n\n**Logic:**\nThis is finding the 'distance' of every land cell from the nearest water cell. Since difference is 1, a cell at distance `d` from nearest water will have height `d`.\n\n**Approach:**\n1. Initialize a `height` matrix with -1.\n2. Add all water cells `(r, c)` to a queue, set `height[r][c] = 0`.\n3. BFS: Explore neighbors. If height is -1, `height[nr][nc] = height[r][c] + 1`, and push neighbor.\n\n**Time Complexity:** O(M * N)\n**Space Complexity:** O(M * N).",
            problemStatement: "You are given an `m x n` integer matrix `isWater` representing a map of land and water cells. Assign a height to each cell such that: Water cells have height 0. Absolute difference between adjacent cells is at most 1. The maximum height is as large as possible.",
            sampleInput: "isWater = [[0,1],[0,0]]",
            sampleOutput: "[[1,0],[2,1]]",
            constraints: "m, n <= 1000.",
            starterCode: "/**\n * @param {number[][]} isWater\n * @return {number[][]}\n */\nvar highestPeak = function(isWater) {\n    \n};",
            tags: ["Array", "Breadth-First Search", "Matrix"]
        }
    },
    {
        title: "Snakes and Ladders",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the minimum number of moves to reach the last square in a Snakes and Ladders game.",
            explanation: "### Game Board BFS\n\n**Concept:** BFS on flattened board\n\n**Logic:**\nThe board is 1D logically but 2D physically in a Boustrophedon (snake-like) order. \n\n**Approach:**\n1. Convert the 2D board to a 1D array for easier indexing.\n2. BFS starting from index 1. Queue stores `[square, moves]`.\n3. For each roll `1-6`:\n   - `nextSquare = square + roll`.\n   - If `board[nextSquare] != -1`, it's a snake/ladder. Jump to `board[nextSquare]`.\n   - Add to queue and mark visited.\n\n**Time Complexity:** O(N²)\n**Space Complexity:** O(N²).",
            problemStatement: "You are given an `n x n` integer matrix `board` where segments of the board follow a zigzag pattern. Return the least number of moves required to reach the square `n²`. If it's impossible, return -1.",
            sampleInput: "board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]",
            sampleOutput: "4",
            constraints: "n <= 20.",
            starterCode: "/**\n * @param {number[][]} board\n * @return {number}\n */\nvar snakesAndLadders = function(board) {\n    \n};",
            tags: ["Array", "Breadth-First Search", "Matrix"]
        }
    },
    {
        title: "Minimize Malware Spread",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Remove one initially infected node to minimize the final number of infected nodes in a graph.",
            explanation: "### Component Analysis (Union-Find)\n\n**Concept:** Connected Components + Initial Infection Logic\n\n**Logic:**\nIf a component has more than one initially infected node, removing any one of them doesn't help—the rest will still infect the whole group. We only care about components that have **exactly one** infected node.\n\n**Approach:**\n1. Use Union-Find to group all nodes into components and record each component's size.\n2. For each initially infected node `u`, count how many infected nodes are in its component.\n3. Identify infected nodes that are 'alone' in their component.\n4. Among these, pick the one in the **largest** component. If tie, pick smaller node index.\n5. If no 'alone' infected node exists, just pick the smallest index among all initials.\n\n**Time Complexity:** O(N²)\n**Space Complexity:** O(N).",
            problemStatement: "In a network of `n` nodes, an initial selection of nodes `initial` are infected. An infected node will eventually infect all nodes in its connected component. Return the node that, if removed, would minimize the total number of infected nodes.",
            sampleInput: "graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]",
            sampleOutput: "0",
            constraints: "n <= 300.",
            starterCode: "/**\n * @param {number[][]} graph\n * @param {number[]} initial\n * @return {number}\n */\nvar minMalwareSpread = function(graph, initial) {\n    \n};",
            tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Graph"]
        }
    },
    {
        title: "All O`one Data Structure",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Design a data structure that allows O(1) string key updates and retrieval of strings with maximum/minimum counts.",
            explanation: "### Doubly Linked List + HashMap (LRU variant)\n\n**Concept:** Frequency Bucketing\n\n**Logic:**\nUse a Doubly Linked List where each node represents a 'Frequency Bucket' containing all keys with that frequency.\n\n**Approach:**\n1. `inc(key)`:\n   - If key not in map, add to Bucket(1). Move Bucket (1) to the front.\n   - If in map, move key from Bucket(f) to Bucket(f+1). Create Bucket(f+1) if it doesn't exist.\n2. `dec(key)`:\n   - Move from Bucket(f) to Bucket(f-1).\n3. `getMax() / getMin()`:\n   - Return any key from tail or head buckets in O(1).\n\n**Time Complexity:** O(1) for all ops.\n**Space Complexity:** O(unique keys).",
            problemStatement: "Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts in O(1) time.",
            sampleInput: "inc(\"hello\"), inc(\"world\"), getMax(), getMin()",
            sampleOutput: "\"world\", \"hello\"",
            constraints: "Calls <= 5 * 10^4.",
            starterCode: "/**\n * Initialize your data structure here.\n */\nvar AllOne = function() {\n    \n};\n\n/**\n * @param {string} key\n * @return {void}\n */\nAllOne.prototype.inc = function(key) {\n    \n};",
            tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"]
        }
    },
    {
        title: "Parallel Courses III",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum time to complete all courses in parallel with dependency constraints.",
            explanation: "### Topological Sort + DP (Max Path)\n\n**Concept:** Kahn's Algorithm with completion time tracking\n\n**Logic:**\nA course `u` can only start when all its prerequisites are done. The earliest `u` can start is `max(completionTime[prereq])`.\n\n**Approach:**\n1. Standard topological sort (BFS with in-degrees).\n2. Maintain `earliestStart[u]` for each course, initialized to 0.\n3. When processing node `u`:\n   - Final completion time: `timeToFinish[u] = earliestStart[u] + courseDuration[u]`.\n   - For each neighbor `v`:\n     - `earliestStart[v] = max(earliestStart[v], timeToFinish[u])`.\n     - Decrement in-degree. Pushing to queue when it hits 0.\n4. Return `max(timeToFinish)`.\n\n**Time Complexity:** O(V + E)\n**Space Complexity:** O(V + E).",
            problemStatement: "You are given `n` courses and an array `relations` indicating prerequisites. Each course `i` takes `time[i]` months to complete. Find the minimum number of months needed to complete all courses.",
            sampleInput: "n = 3, relations = [[1,3],[2,3]], time = [3,2,5]",
            sampleOutput: "8 (Courses 1 and 2 in parallel take 3 months, then course 3 takes 5 months)",
            constraints: "n <= 5 * 10^4.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} relations\n * @param {number[]} time\n * @return {number}\n */\nvar minimumTime = function(n, relations, time) {\n    \n};",
            tags: ["Array", "Dynamic Programming", "Graph", "Topological Sort"]
        }
    }
];

const seedGraphBatch5 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Graphs'
        }).distinct('title');

        const filteredQuestions = batch5GraphQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 5 Graph questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Graphs',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Graph questions (Batch 5).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedGraphBatch5();
