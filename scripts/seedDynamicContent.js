const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

// Import MCQ data
const { osMcqs } = require('../../frontend/src/data/osMcqs');
const { dbmsMcqs } = require('../../frontend/src/data/dbmsMcqs');
const { cnMcqs } = require('../../frontend/src/data/cnMcqs');
const { oopsMcqs } = require('../../frontend/src/data/oopsMcqs');
const { aptitudeData } = require('../../frontend/src/data/aptitudeData');
const { verbalAbilityData } = require('../../frontend/src/data/verbalAbilityData');
const { logicalReasoningData } = require('../../frontend/src/data/logicalReasoningData');

async function extractJSXQA(filePath) {
    if (!fs.existsSync(filePath)) return [];

    // We will read the file and extract <QA q="..." a="..." /> components.
    // We can use a simple state machine or regex.
    const content = fs.readFileSync(filePath, 'utf-8');
    const results = [];

    // Regex to match <QA q={...} a={...} /> or <QA q="..." a="..." />
    // This is a naive regex but usually works for simple JSX.
    const regex = /<QA\s+q=(["']|{`?)(.*?)\1\s+a=(["']|{`?)([\s\S]*?)\3(?:[\s\S]*?code=(?:{|`)([\s\S]*?)(?:}|`))?\s*\/>/g;

    let match;
    while ((match = regex.exec(content)) !== null) {
        results.push({
            q: match[2].trim(),
            a: match[4].trim().replace(/\\"/g, '"'),
            code: match[5] ? match[5].trim().replace(/\\n/g, '\n') : null
        });
    }

    return results;
}

const mapMcqs = (mcqs) => {
    return mcqs.map(m => ({
        question: m.q || m.question,
        options: m.options,
        correctAnswer: m.ans !== undefined ? m.ans : m.correctAnswer,
        explanation: m.explanation || ''
    }));
};

async function seed() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
    console.log('Connected to DB');

    // 1. Core CS Domain
    let coreDomain = await Domain.findOne({ name: 'Core Computer Science' });
    if (!coreDomain) {
        coreDomain = await Domain.create({ name: 'Core Computer Science', description: 'Core CS Subjects' });
    }

    // OS
    await Topic.deleteMany({ subject: 'OS', lessonType: 'theory' });
    const osQAs = await extractJSXQA(path.join(__dirname, '../../frontend/src/pages/OSTutorial.jsx'));
    await Topic.create({
        domainId: coreDomain._id, subject: 'OS', topicGroup: 'Operating Systems',
        title: 'Operating Systems Full Tutorial', level: 'Beginner', difficulty: 'Medium',
        isCoreCS: true, lessonType: 'theory',
        content: {
            explanation: osQAs.map(qa => `### ${qa.q}\n${qa.a}\n${qa.code ? '```cpp\n' + qa.code + '\n```' : ''}`).join('\n\n')
        },
        quiz: mapMcqs(osMcqs)
    });
    console.log('OS seeded. QAs extracted:', osQAs.length);

    // DBMS
    await Topic.deleteMany({ subject: 'DBMS', lessonType: 'theory' });
    const dbmsQAs = await extractJSXQA(path.join(__dirname, '../../frontend/src/pages/DBMSTutorial.jsx'));
    await Topic.create({
        domainId: coreDomain._id, subject: 'DBMS', topicGroup: 'Database Management',
        title: 'DBMS Full Tutorial', level: 'Beginner', difficulty: 'Medium',
        isCoreCS: true, lessonType: 'theory',
        content: {
            explanation: dbmsQAs.map(qa => `### ${qa.q}\n${qa.a}\n${qa.code ? '```sql\n' + qa.code + '\n```' : ''}`).join('\n\n')
        },
        quiz: mapMcqs(dbmsMcqs)
    });
    console.log('DBMS seeded. QAs extracted:', dbmsQAs.length);

    // CN
    await Topic.deleteMany({ subject: 'CN', lessonType: 'theory' });
    const cnQAs = await extractJSXQA(path.join(__dirname, '../../frontend/src/pages/CNTutorial.jsx'));
    await Topic.create({
        domainId: coreDomain._id, subject: 'CN', topicGroup: 'Computer Networks',
        title: 'Computer Networks Full Tutorial', level: 'Beginner', difficulty: 'Medium',
        isCoreCS: true, lessonType: 'theory',
        content: {
            explanation: cnQAs.map(qa => `### ${qa.q}\n${qa.a}\n${qa.code ? '```bash\n' + qa.code + '\n```' : ''}`).join('\n\n')
        },
        quiz: mapMcqs(cnMcqs)
    });
    console.log('CN seeded. QAs extracted:', cnQAs.length);

    // OOP
    await Topic.deleteMany({ subject: 'OOP', lessonType: 'theory' });
    const oopQAs = await extractJSXQA(path.join(__dirname, '../../frontend/src/pages/OopsGuide.jsx'));
    await Topic.create({
        domainId: coreDomain._id, subject: 'OOP', topicGroup: 'Object Oriented Programming',
        title: 'OOPs Full Tutorial', level: 'Beginner', difficulty: 'Medium',
        isCoreCS: true, lessonType: 'theory',
        content: {
            explanation: oopQAs.map(qa => `### ${qa.q}\n${qa.a}\n${qa.code ? '```java\n' + qa.code + '\n```' : ''}`).join('\n\n')
        },
        quiz: mapMcqs(oopsMcqs)
    });
    console.log('OOP seeded. QAs extracted:', oopQAs.length);


    // 2. Aptitude & Reasoning Domain
    let aptitudeDomain = await Domain.findOne({ name: 'Aptitude & Reasoning' });
    if (!aptitudeDomain) {
        aptitudeDomain = await Domain.create({ name: 'Aptitude & Reasoning', description: 'Quantitative, Logical, and Verbal skills' });
    }

    await Topic.deleteMany({ domainId: aptitudeDomain._id });

    for (const item of aptitudeData) {
        await Topic.create({
            domainId: aptitudeDomain._id, title: item.title, topicGroup: 'Quantitative Aptitude',
            level: 'Beginner', difficulty: 'Medium', isCoreCS: false, lessonType: 'theory',
            content: { explanation: item.theory || 'No theory available.' },
            quiz: mapMcqs(item.questions || [])
        });
    }

    for (const item of logicalReasoningData) {
        await Topic.create({
            domainId: aptitudeDomain._id, title: item.title, topicGroup: 'Logical Reasoning',
            level: 'Beginner', difficulty: 'Medium', isCoreCS: false, lessonType: 'theory',
            content: { explanation: item.theory || 'No theory available.' },
            quiz: mapMcqs(item.questions || [])
        });
    }

    for (const item of verbalAbilityData) {
        await Topic.create({
            domainId: aptitudeDomain._id, title: item.title, topicGroup: 'Verbal Ability',
            level: 'Beginner', difficulty: 'Medium', isCoreCS: false, lessonType: 'theory',
            content: { explanation: item.theory || 'No theory available.' },
            quiz: mapMcqs(item.questions || [])
        });
    }
    console.log('Aptitude, Logical, Verbal seeded.');

    // 3. Interview Prep
    let interviewDomain = await Domain.findOne({ name: 'Interview Preparation' });
    if (!interviewDomain) {
        interviewDomain = await Domain.create({ name: 'Interview Preparation', description: 'HR and Technical Interview Prep' });
    }
    await Topic.deleteMany({ domainId: interviewDomain._id });

    const interviewQAs = await extractJSXQA(path.join(__dirname, '../../frontend/src/pages/InterviewPrep.jsx'));
    if (interviewQAs.length > 0) {
        await Topic.create({
            domainId: interviewDomain._id, title: 'Top Interview Questions', topicGroup: 'General HR',
            level: 'Beginner', difficulty: 'Medium', isCoreCS: false, lessonType: 'theory',
            content: {
                explanation: interviewQAs.map(qa => `### ${qa.q}\n${qa.a}`).join('\n\n')
            },
            quiz: []
        });
        console.log('Interview Prep seeded. QAs extracted:', interviewQAs.length);
    } else {
        console.log('No Interview Prep QAs found or file missing.');
    }

    console.log('✅ All dynamic content seeded successfully!');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
