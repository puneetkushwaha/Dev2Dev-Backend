/**
 * seedContentWithAI.js
 * ─────────────────────
 * Fetches all Topics from MongoDB, calls the AI service /generate_lesson
 * for each one, and saves the generated content back to the topic.
 *
 * Usage: node seedContentWithAI.js
 * Flags:
 *   --force     Re-generate even if content already exists
 *   --domain    Only process a specific domain name (exact match)
 *
 * Example:
 *   node seedContentWithAI.js --domain "Web Development"
 *   node seedContentWithAI.js --force
 */

require('dotenv').config();
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const Topic = require('./models/Topic');
const Domain = require('./models/Domain');

const AI_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const FORCE = process.argv.includes('--force');
const DOMAIN_FILTER = (() => {
    const idx = process.argv.indexOf('--domain');
    return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ── HTTP POST helper (no external deps)
function postJSON(url, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const parsed = new URL(url);
        const options = {
            hostname: parsed.hostname,
            port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
            path: parsed.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        const lib = parsed.protocol === 'https:' ? https : http;
        const req = lib.request(options, (res) => {
            let raw = '';
            res.on('data', chunk => raw += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(raw)); }
                catch (e) { reject(new Error(`Bad JSON: ${raw.substring(0, 200)}`)); }
            });
        });
        req.on('error', reject);
        req.setTimeout(120000, () => { req.destroy(); reject(new Error('Request timeout')); });
        req.write(data);
        req.end();
    });
}

// ── Sleep helper
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── Map domain name → AI domain label  
function mapDomainName(name) {
    const MAP = {
        'Web Development': 'Web Development',
        'Data Science': 'Data Science',
        'Cyber Security': 'Cyber Security',
        'Cloud Computing': 'DevOps',
        'Mobile App Development': 'Mobile App Development',
        'Artificial Intelligence': 'Artificial Intelligence',
        'Core Computer Science': 'Computer Science Fundamentals',
    };
    return MAP[name] || name;
}

async function generateContent(domainName, topicTitle, level) {
    try {
        const result = await postJSON(`${AI_URL}/generate_lesson`, {
            domain: mapDomainName(domainName),
            topic: topicTitle,
            difficulty: level || 'Beginner'
        });
        return result;
    } catch (err) {
        console.error(`   ⚠ AI Error for "${topicTitle}": ${err.message}`);
        return null;
    }
}

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    // Build domain id → name map
    const domains = await Domain.find({});
    const domainMap = {};
    domains.forEach(d => { domainMap[d._id.toString()] = d.name; });

    // Fetch topics
    let query = {};
    if (DOMAIN_FILTER) {
        const domainDoc = domains.find(d => d.name === DOMAIN_FILTER);
        if (!domainDoc) {
            console.error(`❌ Domain "${DOMAIN_FILTER}" not found in DB.`);
            process.exit(1);
        }
        query.domainId = domainDoc._id;
    }
    const topics = await Topic.find(query).sort({ domainId: 1, createdAt: 1 });

    console.log(`Found ${topics.length} topics to process${DOMAIN_FILTER ? ` in "${DOMAIN_FILTER}"` : ''}.\n`);
    if (FORCE) console.log('  ⚡ --force flag set: regenerating all content.\n');

    let done = 0, skipped = 0, failed = 0;

    for (const topic of topics) {
        const domainName = domainMap[topic.domainId?.toString()] || 'General';

        // Skip if already has content and not --force
        const hasContent = topic.content?.explanation || topic.content?.theory || topic.content?.problemStatement;
        if (hasContent && !FORCE) {
            console.log(`  ↩ Skip [${domainName}] ${topic.title}`);
            skipped++;
            continue;
        }

        console.log(`  ⏳ Generating [${domainName}] ${topic.title}...`);

        const result = await generateContent(domainName, topic.title, topic.level);
        if (!result) { failed++; continue; }

        // Map AI response fields to our Topic content schema
        const update = {
            'content.explanation': result.theory || result.explanation || '',
            'content.description': result.exercise || '',
            'content.starterCode': result.solution_stub || result.solutionStub || '',
            'content.testCases': Array.isArray(result.testCases) ? result.testCases : [],
            'content.sampleInput': '',
            'content.sampleOutput': '',
            'content.keyPoints': [],
        };

        // Handle quiz
        let quiz = [];
        if (Array.isArray(result.quiz)) {
            quiz = result.quiz.map(q => ({
                question: q.question || '',
                options: Array.isArray(q.options) ? q.options : ['', '', '', ''],
                correctAnswer: typeof q.answer === 'number' ? q.answer : 0,
                explanation: ''
            }));
        }

        await Topic.findByIdAndUpdate(topic._id, {
            $set: { ...update, quiz }
        });

        console.log(`  ✅ Done   [${domainName}] ${topic.title} (${quiz.length} quiz Qs)`);
        done++;

        // Small delay to not overwhelm the local LLM
        await sleep(500);
    }

    console.log(`\n────────────────────────────────`);
    console.log(`✅ Generated: ${done}  |  ↩ Skipped: ${skipped}  |  ❌ Failed: ${failed}`);
    console.log(`────────────────────────────────`);
    process.exit(0);
}

main().catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});
