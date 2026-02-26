const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

const companyData = [
    {
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
        color: "from-blue-500/20 to-transparent",
        accent: "#4285F4",
        assessments: [
            { type: "Online Assessment", sets: 13, attempted: "206,035", rate: "41.58%" }
        ]
    },
    {
        name: "Meta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
        color: "from-blue-600/20 to-transparent",
        accent: "#0668E1",
        assessments: [
            { type: "Online Assessment", sets: 12, attempted: "156,930", rate: "61.87%" }
        ]
    },
    {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        color: "from-orange-500/20 to-transparent",
        accent: "#FF9900",
        assessments: [
            { type: "Online Assessment", sets: 13, attempted: "211,229", rate: "41.38%" }
        ]
    },
    {
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        color: "from-blue-400/20 to-transparent",
        accent: "#00A4EF",
        assessments: [
            { type: "Online Assessment", sets: 8, attempted: "82,179", rate: "61.91%" }
        ]
    },
    {
        name: "Bloomberg",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Bloomberg_logo.svg",
        color: "from-gray-500/20 to-transparent",
        accent: "#FFFFFF",
        assessments: [
            { type: "Online Assessment", sets: 4, attempted: "26,258", rate: "47.61%" }
        ]
    },
    {
        name: "Adobe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
        color: "from-red-500/20 to-transparent",
        accent: "#FF0000",
        assessments: [
            { type: "Online Assessment", sets: 4, attempted: "19,744", rate: "65.04%" }
        ]
    },
    {
        name: "Apple",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        color: "from-gray-400/20 to-transparent",
        accent: "#A3AAAE",
        assessments: [
            { type: "Online Assessment", sets: 7, attempted: "38,271", rate: "63.12%" }
        ]
    },
    {
        name: "Uber",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
        color: "from-gray-600/20 to-transparent",
        accent: "#FFFFFF",
        assessments: [
            { type: "Online Assessment", sets: 4, attempted: "29,924", rate: "41.39%" }
        ]
    }
];

const freeMocks = [
    {
        id: 1,
        title: "SDE Mock Assessment I",
        desc: "2 questions from arrays and strings. Difficulty: Easy/Medium.",
        attempted: "145,210",
        rate: "45.2%"
    },
    {
        id: 2,
        title: "SDE Mock Assessment II",
        desc: "2 questions involving dynamic programming and graphs. Difficulty: Medium/Hard.",
        attempted: "89,400",
        rate: "22.8%"
    },
    {
        id: 3,
        title: "SDE Mock Assessment III",
        desc: "2 questions on system design and logic. Difficulty: Medium.",
        attempted: "112,050",
        rate: "38.5%"
    }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
    console.log('Connected to DB');

    let domain = await Domain.findOne({ name: 'Interview Preparation' });
    if (!domain) {
        domain = await Domain.create({ name: 'Interview Preparation', description: 'Practice with mock assessments from top tech giants.' });
    }

    // Clear previous practice topics for this domain
    await Topic.deleteMany({ domainId: domain._id, lessonType: 'practice' });

    // Seed Free Mocks
    for (const mock of freeMocks) {
        await Topic.create({
            domainId: domain._id,
            title: mock.title,
            topicGroup: 'Free Mock Assessments',
            level: 'Intermediate',
            difficulty: mock.desc.includes('Hard') ? 'Hard' : (mock.desc.includes('Medium') ? 'Medium' : 'Easy'),
            isCoreCS: false,
            lessonType: 'practice',
            content: {
                description: mock.desc,
                mockId: mock.id,
                stats: { attempted: mock.attempted, rate: mock.rate }
            },
            quiz: []
        });
    }

    // Seed Company Assessments
    for (const company of companyData) {
        await Topic.create({
            domainId: domain._id,
            title: `${company.name} OA Practice`,
            topicGroup: 'Premium Company Assessments',
            level: 'Intermediate',
            difficulty: 'Medium',
            isCoreCS: false,
            lessonType: 'practice',
            content: {
                description: `${company.assessments[0].sets} Curated Problem Sets for ${company.name}`,
                logo: company.logo,
                accent: company.accent,
                stats: { attempted: company.assessments[0].attempted, rate: company.assessments[0].rate },
                isLocked: true
            },
            quiz: []
        });
    }

    console.log('✅ Interview Prep assessments seeded successfully!');
    process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
