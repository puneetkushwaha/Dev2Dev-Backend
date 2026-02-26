const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '175. Combine Two Tables',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Database',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Report the first name, last name, city, and state of each person in the Person table.",
        problemStatement: [
            '## 175. Combine Two Tables',
            '',
            '**Table: Person**',
            '```',
            '+-------------+---------+',
            '| Column Name | Type    |',
            '+-------------+---------+',
            '| personId    | int     |',
            '| lastName    | varchar |',
            '| firstName   | varchar |',
            '+-------------+---------+',
            '```',
            '`personId` is the primary key (column with unique values) for this table.',
            'This table contains information about the ID of some persons and their first and last names.',
            '',
            '**Table: Address**',
            '```',
            '+-------------+---------+',
            '| Column Name | Type    |',
            '+-------------+---------+',
            '| addressId   | int     |',
            '| personId    | int     |',
            '| city        | varchar |',
            '| state       | varchar |',
            '+-------------+---------+',
            '```',
            '`addressId` is the primary key (column with unique values) for this table.',
            'Each row of this table contains information about the city and state of one person with ID = PersonId.',
            '',
            'Write a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report `null` instead.',
            '',
            'Return the result table in **any order**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:**',
            'Person table:',
            '```',
            '+----------+----------+-----------+',
            '| personId | lastName | firstName |',
            '+----------+----------+-----------+',
            '| 1        | Wang     | Allen     |',
            '| 2        | Alice    | Bob       |',
            '+----------+----------+-----------+',
            '```',
            'Address table:',
            '```',
            '+-----------+----------+---------------+------------+',
            '| addressId | personId | city          | state      |',
            '+-----------+----------+---------------+------------+',
            '| 1         | 2        | New York City | New York   |',
            '| 2         | 3        | Leetcode      | California |',
            '+-----------+----------+---------------+------------+',
            '```',
            '**Output:**',
            '```',
            '+-----------+----------+---------------+----------+',
            '| firstName | lastName | city          | state    |',
            '+-----------+----------+---------------+----------+',
            '| Allen     | Wang     | Null          | Null     |',
            '| Bob       | Alice    | New York City | New York |',
            '+-----------+----------+---------------+----------+',
            '```',
            '**Explanation:**',
            'There is no address in the address table for the personId = 1 so we return null in their city and state.',
            'addressId = 1 contains information about the address of personId = 2.'
        ].join('\n'),
        starterCode: [
            '# Write your MySQL query statement below',
            'SELECT ',
            '    ',
            ';'
        ].join('\n'),
        testCases: [
            {
                input: 'Person = [[1,"Wang","Allen"],[2,"Alice","Bob"]]\nAddress = [[1,2,"New York City","New York"],[2,3,"Leetcode","California"]]',
                expected: '[["Allen","Wang",null,null],["Bob","Alice","New York City","New York"]]',
                description: 'Returns null if address not found.'
            }
        ],
        tags: ['Database', 'SQL', 'Outer Join'],
        hints: [
            "Use a LEFT JOIN since we want to include all persons from the Person table regardless of whether they have an address or not."
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
