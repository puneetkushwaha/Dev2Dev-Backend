const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const scriptsDir = __dirname;
const scripts = [
    'seedStringBatch1.js',
    'seedStringBatch2.js',
    'seedStringBatch3.js',
    'seedStringBatch4.js',
    'seedStringBatch5.js',
    'seedStringBatch7.js',
    'seedLinkedListBatch3.js',
    'seedLinkedListBatch4.js',
    'seedLinkedListBatch5.js',
    'seedStackQueueBatch4.js',
    'seedTreeBatch4.js',
    'seedTreeBatch5.js',
    'seedGraphBatch4.js',
    'seedGraphBatch5.js',
    'seedHashmapBatch.js',
    'seedDPBatch4.js',
    'seedDPBatch5.js',
    'seedDynamicContent.js', // This handles OS, DBMS, CN, OOP (Initial)
    'seedOOPNew.js',         // This restores the enhanced OOP content
];

async function restoreAll() {
    console.log('--- Starting Full Restoration ---');
    for (const script of scripts) {
        const scriptPath = path.join(scriptsDir, script);
        if (fs.existsSync(scriptPath)) {
            console.log(`Running: ${script}...`);
            try {
                // Use execSync to run scripts one by one
                execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
                console.log(`✅ ${script} completed.`);
            } catch (e) {
                console.error(`❌ Error running ${script}:`, e.message);
            }
        } else {
            console.warn(`⚠️ Script not found: ${script}`);
        }
    }
    console.log('--- Restoration Process Finished ---');
}

restoreAll();
