const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '1833. Maximum Ice Cream Bars',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Maximize the number of ice cream bars you can buy given an array of costs and limited coins.",
        problemStatement: [
            '## 1833. Maximum Ice Cream Bars',
            '',
            'It is a sweltering summer day, and a boy wants to buy some ice cream bars.',
            '',
            'At the store, there are `n` ice cream bars. You are given an array `costs` of length `n`, where `costs[i]` is the price of the `i`th ice cream bar in coins. The boy initially has `coins` coins to spend, and he wants to buy as many ice cream bars as possible.',
            '',
            '**Note:** The boy can buy the ice cream bars in any order.',
            '',
            'Return the maximum number of ice cream bars the boy can buy with `coins` coins.',
            '',
            'You must solve the problem by **counting sort**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** costs = [1,3,2,4,1], coins = 7',
            '**Output:** 4',
            '**Explanation:** The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.',
            '',
            '### Example 2:',
            '**Input:** costs = [10,6,8,7,7,8], coins = 5',
            '**Output:** 0',
            '**Explanation:** The boy cannot afford any of the ice cream bars.',
            '',
            '### Example 3:',
            '**Input:** costs = [1,6,3,1,2,5], coins = 20',
            '**Output:** 6',
            '**Explanation:** The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `costs.length == n`',
            '* `1 <= n <= 10^5`',
            '* `1 <= costs[i] <= 10^5`',
            '* `1 <= coins <= 10^8`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} costs',
            ' * @param {number} coins',
            ' * @return {number}',
            ' */',
            'var maxIceCream = function(costs, coins) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,3,2,4,1], 7',
                expected: '4',
                description: 'Typical greedy purchase optimization.'
            },
            {
                input: '[10,6,8,7,7,8], 5',
                expected: '0',
                description: 'Not enough coins for any purchase.'
            }
        ],
        tags: ['Array', 'Greedy', 'Sorting', 'Counting Sort'],
        hints: [
            "It is always optimal to buy the least expensive ice cream bar first.",
            "Sort the prices using Counting Sort (since the maximum cost `10^5` is small enough) so that the cheapest ice cream bar comes first.",
            "Greedily subtract costs from the sum of coins until the remaining coins are insufficient."
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
