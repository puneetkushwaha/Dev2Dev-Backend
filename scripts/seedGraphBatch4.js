const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch4GraphQuestions = [
    {
        title: "Critical Connections in a Network",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find all bridges (edges which, if removed, increase the number of connected components) in an undirected graph.",
            explanation: "### Tarjan's Bridge-Finding Algorithm\n\n**Concept:** DFS + Discovery/Lowest Time tracking\n\n**Intuition:**\nAn edge `(u, v)` is a bridge if there's no other way to reach `v` or any of its descendants without using `(u, v)`. This means the 'earliest' node reachable from `v`'s subtree is still `v` itself or something later.\n\n**Steps:**\n1. Use `disc[u]` (time when `u` was first visited) and `low[u]` (earliest discovered node reachable from `u` in current DFS excluding parent).\n2. For neighbor `v` of `u`:\n   - If `v` is parent, skip.\n   - If unvisited: \n     - Recurse `dfs(v, u)`.\n     - `low[u] = min(low[u], low[v])`.\n     - **Bridge Check:** If `low[v] > disc[u]`, then `(u, v)` is a bridge.\n   - If visited: `low[u] = min(low[u], disc[v])`.\n\n**Time Complexity:** O(V + E)\n**Space Complexity:** O(V).",
            problemStatement: "There are `n` servers and an array `connections` representing undirected connections. Return all **critical connections** in the network.",
            sampleInput: "n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]",
            sampleOutput: "[[1,3]]",
            constraints: "n <= 10^5.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} connections\n * @return {number[][]}\n */\nvar criticalConnections = function(n, connections) {\n    \n};",
            tags: ["Depth-First Search", "Graph", "Biconnected Component"]
        }
    },
    {
        title: "Reorder Routes to Make All Paths Lead to the City Zero",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the minimum number of edges to reverse so that every city has a path to city 0.",
            explanation: "### Directed traversal as Undirected\n\n**Concept:** DFS on Undirected Version\n\n**Logic:**\n1. Turn all directed edges into undirected edges in an adjacency list, but mark which ones were 'artificial' (added for traversal) vs 'original'.\n2. Start DFS from city 0.\n3. Since we want everything to flow *to* 0, any edge pointing *away* from the current traversal direction (moving away from 0) needs to be flipped.\n\n**Steps:**\n1. Adj list stores `[neighbor, isOriginal]`.\n2. `dfs(node, parent)`:\n   - For each neighbor `[v, isOriginal]`:\n     - If `v == parent`, continue.\n     - If `isOriginal`, `changes++` (meaning it pointed AWAY from 0 in original direction).\n     - `dfs(v, node)`.\n\n**Time Complexity:** O(V + E)\n**Space Complexity:** O(V + E).",
            problemStatement: "There are `n` cities and `n-1` roads. Return the minimum number of edges that need to be changed so that each city can visit city 0.",
            sampleInput: "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]",
            sampleOutput: "3",
            constraints: "n <= 5 * 10^4.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} connections\n * @return {number}\n */\nvar minReorder = function(n, connections) {\n    \n};",
            tags: ["Depth-First Search", "Breadth-First Search", "Graph"]
        }
    },
    {
        title: "Number of Restricted Paths From First to Last Node",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Count the number of paths from node 1 to node n where distance to n is strictly decreasing.",
            explanation: "### Dijkstra + DP (MEMOIZATION)\n\n**Concept:** Shortest Path + DAG Counting\n\n**Logic:**\n1. Find shortest distance from every node to node `n`. Use Dijkstra starting from node `n`.\n2. We can only move from `u` to `v` if `distToN[u] > distToN[v]`. This defines a DAG.\n3. Count paths in this DAG from 1 to n using DFS + Memoization.\n\n**Time Complexity:** O(E log V + V + E)\n**Space Complexity:** O(V + E).",
            problemStatement: "Given a weighted undirected connected graph. A **restricted path** is a path from 1 to n where `d(u, n) > d(v, n)` for every edge `(u, v)` in the path. Return the number of restricted paths modulo 10^9 + 7.",
            sampleInput: "n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[2,4,2],[2,5,4],[3,4,1],[3,5,1],[4,5,2]]",
            sampleOutput: "3",
            constraints: "n <= 2 * 10^4.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {number}\n */\nvar countRestrictedPaths = function(n, edges) {\n    \n};",
            tags: ["Dynamic Programming", "Graph", "Topological Sort", "Heap (Priority Queue)", "Shortest Path"]
        }
    },
    {
        title: "All Ancestors of a Node in a Directed Acyclic Graph",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "For each node in a DAG, find all its ancestors in sorted order.",
            explanation: "### DFS Ancestor Search\n\n**Concept:** Reverse DFS or Topological Sort Tracking\n\n**Optimization:**\nInstead of finding ancestors of `u`, think: which nodes is `u` an ancestor of? \nFor each node `i` from `0` to `n-1`, perform a DFS on the *original* graph. Every node reachable from `i` has `i` as an ancestor.\n\n**Steps:**\n1. For each node `i`:\n   - `dfs(i, i)` where second arg is the ancestor we are tracking.\n   - In DFS, mark `ans[v].push(ancestor)` for all reachable `v`.\n   - Use a `visited` array per starting node to avoid redundant visits.\n\n**Time Complexity:** O(V * (V + E))\n**Space Complexity:** O(V²).",
            problemStatement: "You are given a directed acyclic graph (DAG). Return a list `answer` where `answer[i]` is the list of ancestors of the `i`th node, sorted in ascending order.",
            sampleInput: "n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]",
            sampleOutput: "[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]",
            constraints: "n <= 1000.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {number[][]}\n */\nvar getAncestors = function(n, edges) {\n    \n};",
            tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"]
        }
    },
    {
        title: "Minimum Height Trees",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find all nodes that can be roots of a tree with minimum height.",
            explanation: "### Topological Sort (Leaf Removal)\n\n**Concept:** Center of a Graph\n\n**Logic:**\nA tree can have at most 2 nodes as centers (minimum distance to all nodes). We can find them by repeatedly stripping away the leaf nodes (degree 1).\n\n**Approach:**\n1. If `n <= 2`, return all nodes.\n2. Build adjacency list and compute degree for all nodes.\n3. Add all current leaves (degree == 1) to a queue.\n4. While `remainingNodes > 2`:\n   - `leafCount = queue.length`.\n   - `remainingNodes -= leafCount`.\n   - For each leaf in queue:\n     - Find its only neighbor `v`.\n     - `degree[v]--`.\n     - If `degree[v] == 1`, push `v` to queue.\n5. Remaining nodes in queue are the answer.\n\n**Time Complexity:** O(V)\n**Space Complexity:** O(V).",
            problemStatement: "A tree is an undirected graph with no cycles. Find all nodes that, when chosen as root, provide the minimum height.",
            sampleInput: "n = 4, edges = [[1,0],[1,2],[1,3]]",
            sampleOutput: "[1]",
            constraints: "n <= 2 * 10^4.",
            starterCode: "/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {number[]}\n */\nvar findMinHeightTrees = function(n, edges) {\n    \n};",
            tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"]
        }
    },
    {
        title: "Shortest Path Visiting All Nodes",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the shortest path that visits every node in the graph (may revisit nodes/edges).",
            explanation: "### BFS with Bitmask\n\n**Concept:** State BFS (TSP variant)\n\n**Logic:**\nState is `(currentNode, maskOfVisitedNodes)`. Since we want shortest path, BFS is ideal.\n\n**Approach:**\n1. Queue stores `[u, mask, dist]`.\n2. Initialize queue with all nodes as start: `[i, 1 << i, 0]`.\n3. `visited[i][mask]` tracks if we've seen this state.\n4. Expand: for each neighbor `v` of `u`:\n   - `newMask = mask | (1 << v)`.\n   - If `newMask == (1 << n) - 1`, return `dist + 1`.\n   - If state not visited, mark and push.\n\n**Time Complexity:** O(N * 2^N)\n**Space Complexity:** O(N * 2^N).",
            problemStatement: "You have an undirected, connected graph of `n` nodes. Return the length of the shortest path that visits every node. You may start and stop at any node, and you may revisit nodes and edges multiple times.",
            sampleInput: "graph = [[1,2,3],[0],[0],[0]]",
            sampleOutput: "4 (0->1->0->2->0->3 is distance 4)",
            constraints: "n <= 12 (Very small for bitmask).",
            starterCode: "/**\n * @param {number[][]} graph\n * @return {number}\n */\nvar shortestPathLength = function(graph) {\n    \n};",
            tags: ["Dynamic Programming", "Bit Manipulation", "Breadth-First Search", "Graph", "Bitmask"]
        }
    },
    {
        title: "Longest Cycle in a Graph",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the length of the longest cycle in a directed graph where each node has at most one outgoing edge.",
            explanation: "### Path Traversal with Time Mapping\n\n**Concept:** DFS + Discovery Time Tracking\n\n**Logic:**\nSince out-degree is at most 1, a node can be part of at most one cycle. \n\n**Approach:**\n1. For an unvisited node, start a path traversal.\n2. Store `{node: stepNumber}` in a map for the current traversal.\n3. If you hit a node already in the current map, a cycle is found. `cycleLen = currentStep - map[node]`.\n4. Mark all nodes in the path as visited overall.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(N).",
            problemStatement: "You are given a directed graph of `n` nodes where each node has **at most one** outgoing edge. Return the length of the **longest cycle** in the graph. If no cycle exists, return -1.",
            sampleInput: "edges = [3,3,4,2,3]",
            sampleOutput: "3 (Cycle 3->2->4->3)",
            constraints: "n <= 10^5.",
            starterCode: "/**\n * @param {number[]} edges\n * @return {number}\n */\nvar longestCycle = function(edges) {\n    \n};",
            tags: ["Depth-First Search", "Graph", "Topological Sort"]
        }
    },
    {
        title: "Maximum Employees to Be Invited to a Meeting",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the maximum number of people who can sit at a table according to favorite-person constraints.",
            explanation: "### Graph Structure Analysis (Cycles + Chains)\n\n**Concept:** Functional Graph Decomposition\n\n**Logic:**\nTwo cases for seating:\n1. **Large Cycles (> 2 nodes):** Only one such cycle can sit at the round table.\n2. **Mutual Favorites (Cycles of 2):** Multiple pairs of `(A, B)` can sit together along with the longest chains leading to A and leading to B. \n\n**Approach:**\n1. Detect all cycles.\n2. For cycles of size 2, find the maximum path length leading into each of the two nodes.\n3. Sum up all `(2 + chainA + chainB)` for all mutual favorite pairs.\n4. Compare with the maximum large cycle size found.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(N).",
            problemStatement: "Each person has a favorite person they must sit next to. Multiple people can sit at a large round table. Return the maximum number of people that can be invited to the meeting.",
            sampleInput: "favorite = [2,2,1,2]",
            sampleOutput: "3 (People 0, 1, 2 can sit as 0->2, 2->1, 1->2)",
            constraints: "n <= 10^5.",
            starterCode: "/**\n * @param {number[]} favorite\n * @return {number}\n */\nvar maximumInvitations = function(favorite) {\n    \n};",
            tags: ["Depth-First Search", "Graph", "Topological Sort"]
        }
    },
    {
        title: "Find Smallest Common Region",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the smallest common region that contains two given regions in a tree-like hierarchy.",
            explanation: "### LCA in N-ary Tree\n\n**Concept:** Parent Mapping + Path Tracing\n\n**Logic:**\nThe regions form a directory-like structure. We need the Lowest Common Ancestor.\n\n**Approach:**\n1. Build a `child -> parent` map spanning all listed regions.\n2. For `region1`, trace its path to the root and store the path in a Set.\n3. For `region2`, trace its path to the root. The first region encountered that is also in the `region1` set is the answer.\n\n**Time Complexity:** O(N) (where N is total labels)\n**Space Complexity:** O(N).",
            problemStatement: "You are given some lists of regions where the first region of each list includes all other regions in that list. Given two regions `region1` and `region2`, find the smallest region that contains both of them.",
            sampleInput: "regions = [[\"Earth\",\"North America\",\"South America\"],[\"North America\",\"USA\",\"Canada\"],[\"USA\",\"New York\",\"Boston\"]], region1 = \"New York\", region2 = \"Canada\"",
            sampleOutput: "\"North America\"",
            constraints: "regions <= 10^4.",
            starterCode: "/**\n * @param {string[][]} regions\n * @param {string} region1\n * @param {string} region2\n * @return {string}\n */\nvar findSmallestRegion = function(regions, region1, region2) {\n    \n};",
            tags: ["Array", "Hash Table", "String", "Tree", "Depth-First Search", "Breadth-First Search"]
        }
    },
    {
        title: "Reconstruct Itinerary",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the lexicographically smallest itinerary that uses all tickets exactly once.",
            explanation: "### Eulerian Path (Hierholzer's Algorithm)\n\n**Concept:** Postorder DFS (Greedy with Backtracking)\n\n**Logic:**\nA ticket is an edge. We need to visit every edge once. Since we want lexicographical order, we should always pick the smallest neighbor first.\n\n**Approach:**\n1. Build an adjacency list where neighbors for each node are stored in a Min-Heap (or sorted list to pop smallest).\n2. `dfs(node)`:\n   - While `node` has tickets left:\n     - Pop smallest neighbor `v` and `dfs(v)`.\n   - `result.push(node)` (Postorder).\n3. Return `result.reverse()`.\n\n**Time Complexity:** O(E log E) (due to sorting/heaps)\n**Space Complexity:** O(V + E).",
            problemStatement: "You are given a list of airline tickets where `tickets[i] = [fromi, toi]`. Reconstruct the itinerary in order and return it. The itinerary must begin with \"JFK\". If multiple valid itineraries exist, return the one that has the smallest lexical order.",
            sampleInput: "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
            sampleOutput: "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]",
            constraints: "tickets <= 3000.",
            starterCode: "/**\n * @param {string[][]} tickets\n * @return {string[]}\n */\nvar findItinerary = function(tickets) {\n    \n};",
            tags: ["Depth-First Search", "Graph", "Eulerian Circuit"]
        }
    }
];

const seedGraphBatch4 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Graphs'
        }).distinct('title');

        const filteredQuestions = batch4GraphQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 4 Graph questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Graphs',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Graph questions (Batch 4).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedGraphBatch4();
