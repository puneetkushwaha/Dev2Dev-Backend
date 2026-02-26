const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const medianProblem = {
    title: "Median of Two Sorted Arrays",
    level: "Advanced",
    difficulty: "Hard",
    subject: "DSA",
    topicGroup: "Array",
    isCoreCS: true,
    lessonType: "practice",
    content: {
        description: "Given two sorted arrays, return the median of the two sorted arrays.",
        problemStatement: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the **median** of the two sorted arrays.

The overall run time complexity should be \`O(log(m+n))\`.

&nbsp;

### Example 1:
**Input:** \`nums1 = [1,3], nums2 = [2]\`
**Output:** \`2.00000\`
**Explanation:** merged array = \`[1,2,3]\` and median is 2.

### Example 2:
**Input:** \`nums1 = [1,2], nums2 = [3,4]\`
**Output:** \`2.50000\`
**Explanation:** merged array = \`[1,2,3,4]\` and median is \`(2 + 3) / 2 = 2.5\`.

&nbsp;

### Constraints:
* \`nums1.length == m\`
* \`nums2.length == n\`
* \`0 <= m <= 1000\`
* \`0 <= n <= 1000\`
* \`1 <= m + n <= 2000\`
* \`-10^6 <= nums1[i], nums2[i] <= 10^6\`
`,
        inputFormat: "Two sorted arrays of integers 'nums1' and 'nums2'.",
        outputFormat: "A float representing the median value.",
        sampleInput: "nums1 = [1,3], nums2 = [2]",
        sampleOutput: "2.00000",
        constraints: "0 <= m, n <= 1000, 1 <= m + n <= 2000",
        starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
};`,
        testCases: [
            { input: "[1,3], [2]", expected: "2.00000", description: "Odd combined length" },
            { input: "[1,2], [3,4]", expected: "2.50000", description: "Even combined length" },
            { input: "[0,0], [0,0]", expected: "0.00000", description: "All zeros" }
        ],
        tags: ["Array", "Binary Search", "Divide and Conquer"]
    }
};

const seedMedianProblem = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await Topic.findOne({ title: medianProblem.title, subject: "DSA" });
        if (existing) {
            console.log(`Problem "${medianProblem.title}" already exists. Updating...`);
            await Topic.findByIdAndUpdate(existing._id, medianProblem);
        } else {
            await new Topic(medianProblem).save();
            console.log(`Successfully seeded "${medianProblem.title}" problem.`);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedMedianProblem();
