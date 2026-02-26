const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '181. Employees Earning More Than Their Managers',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Database',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the employees who earn more than their managers.",
        problemStatement: [
            '## 181. Employees Earning More Than Their Managers',
            '',
            '**Table: Employee**',
            '```',
            '+-------------+---------+',
            '| Column Name | Type    |',
            '+-------------+---------+',
            '| id          | int     |',
            '| name        | varchar |',
            '| salary      | int     |',
            '| managerId   | int     |',
            '+-------------+---------+',
            '```',
            '`id` is the primary key (column with unique values) for this table.',
            'Each row of this table indicates the ID of an employee, their name, salary, and the ID of their manager.',
            '',
            'Write a solution to find the employees who earn more than their managers.',
            '',
            'Return the result table in **any order**.',
            '',
            'The result format is in the following example.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:**',
            'Employee table:',
            '```',
            '+----+-------+--------+-----------+',
            '| id | name  | salary | managerId |',
            '+----+-------+--------+-----------+',
            '| 1  | Joe   | 70000  | 3         |',
            '| 2  | Henry | 80000  | 4         |',
            '| 3  | Sam   | 60000  | Null      |',
            '| 4  | Max   | 90000  | Null      |',
            '+----+-------+--------+-----------+',
            '```',
            '**Output:**',
            '```',
            '+----------+',
            '| Employee |',
            '+----------+',
            '| Joe      |',
            '+----------+',
            '```',
            '**Explanation:** Joe is the only employee who earns more than his manager.'
        ].join('\n'),
        starterCode: [
            '# Write your MySQL query statement below',
            'SELECT ',
            '    ',
            ';'
        ].join('\n'),
        testCases: [
            {
                input: 'Employee = [[1,"Joe",70000,3],[2,"Henry",80000,4],[3,"Sam",60000,null],[4,"Max",90000,null]]',
                expected: '[["Joe"]]',
                description: 'Comparing salary with self-joined table.'
            }
        ],
        tags: ['Database', 'SQL', 'Joins'],
        hints: [
            "You need to join the Employee table to itself, using the managerId column to link to the id column of the 'manager' side of the join."
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
