const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '176. Second Highest Salary',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Database',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the second highest distinct salary from the Employee table.",
        problemStatement: [
            '## 176. Second Highest Salary',
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
            'Write a solution to find the second highest **distinct** salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).',
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
            '**Output:**',
            '```',
            '+---------------------+',
            '| SecondHighestSalary |',
            '+---------------------+',
            '| 200                 |',
            '+---------------------+',
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
            '**Output:**',
            '```',
            '+---------------------+',
            '| SecondHighestSalary |',
            '+---------------------+',
            '| null                |',
            '+---------------------+',
            '```'
        ].join('\n'),
        starterCode: [
            '# Write your MySQL query statement below',
            'SELECT ',
            '    ',
            ';'
        ].join('\n'),
        testCases: [
            {
                input: 'Employee = [[1, 100], [2, 200], [3, 300]]',
                expected: '[[200]]',
                description: 'Three distinct salaries.'
            },
            {
                input: 'Employee = [[1, 100]]',
                expected: '[[null]]',
                description: 'Only one salary, expected null.'
            }
        ],
        tags: ['Database', 'SQL'],
        hints: [
            "You can use the MAX() function or sort utilizing LIMIT and OFFSET.",
            "Make sure to handle the case where there is no second highest salary by returning NULL."
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
