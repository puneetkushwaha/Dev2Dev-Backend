const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const scriptsDir = __dirname;
const dsaScripts = [
    'seedStringBatch1.js', 'seedStringBatch2.js', 'seedStringBatch3.js', 'seedStringBatch4.js', 'seedStringBatch5.js', 'seedStringBatch7.js',
    'seedLinkedListBatch3.js', 'seedLinkedListBatch4.js', 'seedLinkedListBatch5.js',
    'seedStackQueueBatch4.js',
    'seedTreeBatch4.js', 'seedTreeBatch5.js',
    'seedGraphBatch4.js', 'seedGraphBatch5.js',
    'seedHashmapBatch.js',
    'seedDPBatch4.js', 'seedDPBatch5.js',
    'seedDSAProblems.js',
    'seedTwoSum.js', 'seedMedianProblem.js',
    'seed3.js', 'seed6.js', 'seed15.js', 'seed30.js', 'seed45.js', 'seed55.js', 'seed76.js', 'seed80.js', 'seed125.js', 'seed167.js', 'seed189.js', 'seed205.js', 'seed209.js', 'seed274.js', 'seed383.js', 'seed392.js'
];

async function restoreDSA() {
    console.log('--- Starting DSA Restoration ---');
    for (const script of dsaScripts) {
        const scriptPath = path.join(scriptsDir, script);
        if (fs.existsSync(scriptPath)) {
            console.log(`Running: ${script}...`);
            try {
                execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
                console.log(`✅ ${script} completed.`);
            } catch (e) {
                console.error(`❌ Error running ${script}:`, e.message);
            }
        } else {
            console.warn(`⚠️ Script not found: ${script}`);
        }
    }
    console.log('--- DSA Restoration Finished ---');
}

restoreDSA();
