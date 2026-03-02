const fs = require('fs');
const files = [
    'c:/Users/Lenovo/Desktop/DevElevate/frontend/src/data/osMcqs.js',
    'c:/Users/Lenovo/Desktop/DevElevate/frontend/src/data/cnMcqs.js',
    'c:/Users/Lenovo/Desktop/DevElevate/frontend/src/data/dbmsMcqs.js',
    'c:/Users/Lenovo/Desktop/DevElevate/frontend/src/data/oopsMcqs.js'
];
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let updated = content.replace(/ans:\s*([0-9]+)/g, 'ans: $1,\n        explanation: "Detailed explanation will be provided soon."');
    // Avoid double replacing
    if (!content.includes('explanation:')) {
        fs.writeFileSync(f, updated);
        console.log(`Fixed ${f}`);
    } else {
        console.log(`Already fixed ${f}`);
    }
});
console.log('Finished updating MCQs');
