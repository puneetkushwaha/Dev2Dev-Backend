const path = require('path');
const fs = require('fs');

const dir1 = path.join(__dirname, 'uploads');
const dir2 = path.join(__dirname, 'uploads', 'feedback');

console.log('Static Dir:', dir1, fs.existsSync(dir1) ? 'OK' : 'MISS');
console.log('Feedback Dir:', dir2, fs.existsSync(dir2) ? 'OK' : 'MISS');
if (fs.existsSync(dir2)) {
    console.log('Files in feedback dir:', fs.readdirSync(dir2));
}
process.exit(0);
