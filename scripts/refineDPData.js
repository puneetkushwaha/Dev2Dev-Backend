const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: './backend/.env' });

const dpRefinements = [
    {
        title: "Distinct Subsequences",
        editorial: `/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    const m = s.length, n = t.length;
    const dp = Array.from({ length: n + 1 }, () => 0);
    dp[0] = 1;

    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }
    return dp[n];
};`,
        testCases: [
            { input: '"rabbbit", "rabbit"', expected: '3', description: 'Multiple repeating characters' },
            { input: '"babgbag", "bag"', expected: '5', description: 'Small string with multiple matches' },
            { input: '"aaaaa", "aa"', expected: '10', description: 'All same characters' }
        ]
    },
    {
        title: "Regular Expression Matching",
        editorial: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length, n = p.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;

    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }
    return dp[m][n];
};`,
        testCases: [
            { input: '"aa", "a*"', expected: 'true', description: 'Backtracking with *' },
            { input: '"ab", ".*"', expected: 'true', description: 'Wildcard and matching any' },
            { input: '"mississippi", "mis*is*p*."', expected: 'false', description: 'Complex mismatch' }
        ]
    },
    {
        title: "Dungeon Game",
        editorial: `/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));
    
    dp[m][n - 1] = 1;
    dp[m - 1][n] = 1;
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const minHealth = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = Math.max(1, minHealth);
        }
    }
    
    return dp[0][0];
};`,
        testCases: [
            { input: '[[-2,-3,3],[-5,-10,1],[10,30,-5]]', expected: '7', description: 'Standard 3x3 grid' },
            { input: '[[0]]', expected: '1', description: 'Single zero cell' },
            { input: '[[10]]', expected: '1', description: 'Single positive cell' }
        ]
    }
];

const refineDPData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        for (const ref of dpRefinements) {
            const result = await Topic.updateOne(
                { title: ref.title, isCoreCS: true },
                {
                    $set: {
                        "content.editorial": ref.editorial,
                        "content.testCases": ref.testCases
                    }
                }
            );
            if (result.modifiedCount > 0) {
                console.log(`Refined: ${ref.title}`);
            } else {
                console.log(`No changes for: ${ref.title}`);
            }
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Refine Error:', err);
        process.exit(1);
    }
};

refineDPData();
