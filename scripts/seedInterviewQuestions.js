const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

const interviewQuestons = [
    {
        title: "Flipping an Image",
        difficulty: "Easy",
        description: `Given an n x n binary matrix image, flip the image horizontally, then invert it, and return the resulting image.

Flipping horizontally: [1,1,0] -> [0,1,1]
Inverting: [0,1,1] -> [1,0,0]

Example 1:
Input: image = [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]`,
        starterCode: `/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function(image) {
    
};`
    },
    {
        title: "Leaf-Similar Trees",
        difficulty: "Easy",
        description: `Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.
Two binary trees are considered leaf-similar if their leaf value sequence is the same.
Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.`,
        starterCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    
};`
    },
    {
        title: "Invert Binary Tree",
        difficulty: "Easy",
        description: `Given the root of a binary tree, invert the tree, and return its root.

Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]`,
        starterCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    
};`
    },
    {
        title: "Employee Importance",
        difficulty: "Medium",
        description: `You have a data structure of employee information, including the employee's unique ID, importance value, and direct subordinates' IDs.
Given an integer id that represents an employee's ID, return the total importance value of this employee and all their direct and indirect subordinates.`,
        starterCode: `/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */
/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {
    
};`
    },
    {
        title: "Peak Index in a Mountain Array",
        difficulty: "Medium",
        description: `You are given an integer mountain array arr of length n where the values increase to a peak element and then decrease.
Return the index of the peak element.
Your task is to solve it in O(log(n)) time complexity.`,
        starterCode: `/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function(arr) {
    
};`
    },
    {
        title: "Find in Mountain Array",
        difficulty: "Hard",
        description: `(Interactive problem)
Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target.
You may only access the array using a MountainArray interface:
- MountainArray.get(k) returns the element at index k.
- MountainArray.length() returns the length.
Max 100 calls to get().`,
        starterCode: `/**
 * // This is the MountainArray's API interface.
 * function MountainArray() {
 *     this.get = function(index) { ... };
 *     this.length = function() { ... };
 * };
 */
/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
var findInMountainArray = function(target, mountainArr) {
    
};`
    },
    {
        title: "Delete Nodes and Return Forest",
        difficulty: "Medium",
        description: `Given the root of a binary tree, each node has a distinct value.
After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
Return the roots of the trees in the remaining forest.`,
        starterCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
    
};`
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        let domain = await Domain.findOne({ name: "Interview Preparation" });
        if (!domain) {
            domain = await Domain.create({
                name: "Interview Preparation",
                description: "Master coding rounds with real-world mock assessments."
            });
        }

        console.log('Cleaning existing questions...');
        await Topic.deleteMany({ domainId: domain._id });

        const topics = interviewQuestons.map(q => ({
            domainId: domain._id,
            title: q.title,
            description: q.description.substring(0, 100) + "...",
            content: {
                description: q.description,
                starterCode: q.starterCode,
                difficulty: q.difficulty,
                lessonType: 'coding',
                type: 'coding'
            },
            isCoreCS: false,
            topicGroup: 'Coding Practice Pool'
        }));

        await Topic.insertMany(topics);
        console.log(`✅ Seeded ${topics.length} interview questions.`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
