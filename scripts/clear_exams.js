const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/develevate').then(async () => {
    const db = mongoose.connection.db;
    await db.collection('users').updateMany({}, { $set: { 'progress.examScores': [] } });
    console.log('Cleared exam history for all users');
    process.exit(0);
});
