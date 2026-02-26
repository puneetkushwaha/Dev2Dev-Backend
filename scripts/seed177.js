const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '177. Nth Highest Salary',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Database',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the nth highest distinct salary from the Employee table.",
        problemStatement: [
            '## 177. Nth Highest Salary',
            '',
            '**Table: Employee**',
            '```',
            '+-------------+------+',
            '| Column Name | Type |',
            '+-------------+------+',
            '| id          | int  |',
            '| salary      | int  |',
            '+-------------+------+',
            '```',
            '`id` is the primary key (column with unique values) for this table.',
            'Each row of this table contains information about the salary of an employee.',
            '',
            'Write a solution to find the `nth` highest **distinct** salary from the `Employee` table. If there are less than `n` distinct salaries, return `null`.',
            '',
            'The result format is in the following example.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:**',
            'Employee table:',
            '```',
            '+----+--------+',
            '| id | salary |',
            '+----+--------+',
            '| 1  | 100    |',
            '| 2  | 200    |',
            '| 3  | 300    |',
            '+----+--------+',
            '```',
            'n = 2',
            '**Output:**',
            '```',
            '+------------------------+',
            '| getNthHighestSalary(2) |',
            '+------------------------+',
            '| 200                    |',
            '+------------------------+',
            '```',
            '',
            '### Example 2:',
            '**Input:**',
            'Employee table:',
            '```',
            '+----+--------+',
            '| id | salary |',
            '+----+--------+',
            '| 1  | 100    |',
            '+----+--------+',
            '```',
            'n = 2',
            '**Output:**',
            '```',
            '+------------------------+',
            '| getNthHighestSalary(2) |',
            '+------------------------+',
            '| null                   |',
            '+------------------------+',
            '```'
        ].join('\n'),
        starterCode: [
            'CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT',
            'BEGIN',
            '  RETURN (',
            '      # Write your MySQL query statement below.',
            '',
            '  );',
            'END'
        ].join('\n'),
        testCases: [
            {
                input: 'Employee = [[1, 100], [2, 200], [3, 300]], N = 2',
                expected: '[[200]]',
                description: 'Nth highest exists.'
            }
        ],
        tags: ['Database', 'SQL'],
        hints: [
            "Use LIMIT and OFFSET. However, OFFSET cannot accept mathematical expressions like `N-1`. You may need to declare a variable and set it to `N-1` inside the function."
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
