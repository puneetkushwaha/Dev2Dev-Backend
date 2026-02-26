const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '122. Best Time to Buy and Sell Stock II',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Greedy',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the maximum profit from buying and selling a stock multiple times.",
        problemStatement: [
            '## 122. Best Time to Buy and Sell Stock II',
            '',
            'You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`th day.',
            '',
            'On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.',
            '',
            'Find and return the **maximum profit** you can achieve.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** prices = [7,1,5,3,6,4]',
            '**Output:** 7',
            '**Explanation:** Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.',
            'Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.',
            'Total profit is 4 + 3 = 7.',
            '',
            '### Example 2:',
            '**Input:** prices = [1,2,3,4,5]',
            '**Output:** 4',
            '**Explanation:** Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.',
            'Total profit is 4.',
            '',
            '### Example 3:',
            '**Input:** prices = [7,6,4,3,1]',
            '**Output:** 0',
            '**Explanation:** There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= prices.length <= 3 * 10^4`',
            '* `0 <= prices[i] <= 10^4`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} prices',
            ' * @return {number}',
            ' */',
            'var maxProfit = function(prices) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[7,1,5,3,6,4]',
                expected: '7',
                description: 'Multiple buy-sell pairs.'
            },
            {
                input: '[1,2,3,4,5]',
                expected: '4',
                description: 'Continuous uptrend.'
            }
        ],
        tags: ['Array', 'Dynamic Programming', 'Greedy'],
        hints: [
            "You can greedily capture every upward price movement.",
            "If `prices[i] > prices[i-1]`, then add the difference to the total profit."
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
