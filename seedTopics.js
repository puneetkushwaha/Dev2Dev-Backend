require('dotenv').config();
const mongoose = require('mongoose');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');

// Same topics as in frontend/src/data/domainData.jsx
const domainTopics = {
    'Web Development': [
        { title: 'Frontend Foundation (HTML, CSS, JS)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Modern CSS & Frameworks (Tailwind, React)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Version Control & Packages (Git, npm)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Backend Mastery (Node.js, PostgreSQL)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'APIs & Security (REST, JWT Auth)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Scalable Systems (Redis, Linux Basics)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'Cloud & DevOps (AWS, CI/CD, Terraform)', level: 'Advanced', difficulty: 'Hard' },
    ],
    'Data Science': [
        { title: 'Mathematics (Linear Algebra, Calculus)', level: 'Beginner', difficulty: 'Medium' },
        { title: 'Statistics (Probability, Hypothesis Testing)', level: 'Beginner', difficulty: 'Medium' },
        { title: 'Econometrics (Regression, Time Series)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Coding Mastery (Python, DSA, SQL)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Exploratory Data Analysis (Pandas, Seaborn)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Machine Learning (Classic & Advanced ML)', level: 'Intermediate', difficulty: 'Hard' },
        { title: 'Deep Learning (Transformers, Neural Nets)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'MLOps (Deployment & CI/CD)', level: 'Advanced', difficulty: 'Hard' },
    ],
    'Cyber Security': [
        { title: 'Fundamental IT Skills (Hardware & Networking)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Operating Systems (Windows, Linux, MacOS)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Networking Knowledge (OSI, IP, Topologies)', level: 'Beginner', difficulty: 'Medium' },
        { title: 'Security Skills & Knowledge (Hardening, Crypto)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Incident Response & Discovery Tools', level: 'Intermediate', difficulty: 'Hard' },
        { title: 'Cloud Security (SaaS, PaaS, IaaS)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'Security Programming (Python, Bash, Go)', level: 'Advanced', difficulty: 'Hard' },
    ],
    'Cloud Computing': [
        { title: 'Cloud Essentials (IaaS, PaaS, SaaS)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Identity & Access Management (IAM)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Virtual Private Cloud (VPC Networking)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Compute Essentials (EC2 & Auto-Scaling)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Scalable Storage (S3 & Elastic Block Store)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Managed Databases (RDS & DynamoDB)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Containers & Serverless (EKS, Lambda, Fargate)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'Monitoring & Optimization (CloudWatch, CloudFront)', level: 'Advanced', difficulty: 'Hard' },
    ],
    'Mobile App Development': [
        { title: 'Mobile Fundamentals (Kotlin & XML Layouts)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'App Components (Activity & Intent Lifecycle)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Modern UI (Jetpack Compose & Material 3)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Local Storage (Room Database & DataStore)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Networking (Retrofit, API & State Flow)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Advanced Architecture (MVVM, Clean Code & Hilt)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'Background Tasks (Coroutines & WorkManager)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'Testing & Play Store Deployment', level: 'Advanced', difficulty: 'Medium' },
    ],
    'Artificial Intelligence': [
        { title: 'AI Engineering Fundamentals (Introduction & Roles)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Working with Pre-trained Models (OpenAI, Gemini, Claude)', level: 'Beginner', difficulty: 'Easy' },
        { title: 'Mastering APIs & Token Management (OpenAI API)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'Prompt Engineering Mastery (Injection, Bias & Security)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'OpenSource AI & Local Models (Hugging Face, Ollama)', level: 'Intermediate', difficulty: 'Medium' },
        { title: 'AI Safety, Ethics & Moderation (Adversarial Testing)', level: 'Intermediate', difficulty: 'Hard' },
        { title: 'Embeddings & Vector Databases (Semantic Search)', level: 'Advanced', difficulty: 'Hard' },
        { title: 'RAG & AI Agent Architectures (LangChain, LlamaIndex)', level: 'Advanced', difficulty: 'Hard' },
    ],
};

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        let totalSeeded = 0;
        let skipped = 0;

        for (const [domainName, topics] of Object.entries(domainTopics)) {
            const domain = await Domain.findOne({ name: domainName });
            if (!domain) {
                console.log(`⚠️  Domain not found: "${domainName}" — skipping. Run seedDomains.js first.`);
                continue;
            }

            for (const t of topics) {
                const exists = await Topic.findOne({ domainId: domain._id, title: t.title });
                if (exists) {
                    console.log(`   ↩ Already exists: [${domainName}] ${t.title}`);
                    skipped++;
                    continue;
                }
                await Topic.create({
                    domainId: domain._id,
                    title: t.title,
                    level: t.level,
                    difficulty: t.difficulty,
                    lessonType: 'theory',
                    isCoreCS: false,
                    content: {},
                    quiz: []
                });
                console.log(`   ✅ Seeded: [${domainName}] ${t.title}`);
                totalSeeded++;
            }
        }

        console.log(`\n🎉 Done! Seeded: ${totalSeeded} topics, Skipped (already exist): ${skipped}`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeder Error:', err.message);
        process.exit(1);
    }
};

seed();
