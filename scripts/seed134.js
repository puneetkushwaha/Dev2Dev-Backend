const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '134. Gas Station',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Greedy',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Determine if a car can travel around a circular route visiting all gas stations.",
        problemStatement: [
            '## 134. Gas Station',
            '',
            'There are `n` gas stations along a circular route, where the amount of gas at the `i`th station is `gas[i]`.',
            '',
            'You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i`th station to its next `(i + 1)`th station. You begin the journey with an empty tank at one of the gas stations.',
            '',
            'Given two integer arrays `gas` and `cost`, return the starting gas station\'s index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is **guaranteed to be unique**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
            '**Output:** 3',
            '**Explanation:**',
            'Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4',
            'Travel to station 4. Your tank = 4 - 1 + 5 = 8',
            'Travel to station 0. Your tank = 8 - 2 + 1 = 7',
            'Travel to station 1. Your tank = 7 - 3 + 2 = 6',
            'Travel to station 2. Your tank = 6 - 4 + 3 = 5',
            'Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.',
            'Therefore, return 3 as the starting index.',
            '',
            '### Example 2:',
            '**Input:** gas = [2,3,4], cost = [3,4,3]',
            '**Output:** -1',
            '**Explanation:**',
            'You can\'t start at station 0 or 1, as there is not enough gas to travel to the next station.',
            'Let\'s start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4',
            'Travel to station 0. Your tank = 4 - 3 + 2 = 3',
            'Travel to station 1. Your tank = 3 - 3 + 3 = 3',
            'You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.',
            'Therefore, you can\'t travel around the circuit once no matter where you start.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `n == gas.length == cost.length`',
            '* `1 <= n <= 10^5`',
            '* `0 <= gas[i], cost[i] <= 10^4`',
            '* The input is generated such that the answer is unique.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} gas',
            ' * @param {number[]} cost',
            ' * @return {number}',
            ' */',
            'var canCompleteCircuit = function(gas, cost) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,2,3,4,5], [3,4,5,1,2]',
                expected: '3',
                description: 'Unique solution at index 3.'
            },
            {
                input: '[2,3,4], [3,4,3]',
                expected: '-1',
                description: 'Insufficient total gas.'
            }
        ],
        tags: ['Array', 'Greedy'],
        hints: [
            "If the total gas is less than the total cost, it's impossible to complete the route.",
            "Otherwise, there's guaranteed to be a solution. Use greed: as you iterate, if your current tank drops below 0, it means you can't start at any station you've visited so far. Set the start index to the next station and reset your tank to 0."
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
