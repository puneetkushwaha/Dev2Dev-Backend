const User = require('../models/User');
const Exam = require('../models/Exam');
const Topic = require('../models/Topic');

// Returns the effective streak — resets to 0 if the user hasn't solved anything today or yesterday
const getEffectiveStreak = (streak, lastSubmissionDate) => {
    if (!lastSubmissionDate || !streak) return 0;
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const lastDate = new Date(lastSubmissionDate).toISOString().split('T')[0];
    return (lastDate === today || lastDate === yesterdayStr) ? streak : 0;
};

const getLeaderboard = async (req, res) => {
    try {
        // Build the DSA curriculum set (same logic as getUserProfile)
        const [currExams, currTopics] = await Promise.all([
            Exam.find({ 'questions.type': 'coding', type: 'Topic-wise' }, '_id'),
            Topic.find({ isCoreCS: true, subject: 'DSA', lessonType: 'practice' }, '_id')
        ]);

        const dsaIds = new Set([
            ...currExams.map(e => e._id.toString()),
            ...currTopics.map(t => t._id.toString())
        ]);

        // Fetch top users — we'll sort after computing real DSA counts
        const users = await User.find({})
            .select('name username streak lastSubmissionDate badges profilePic _id progress.examScores')
            .limit(200); // fetch more, then sort

        const leaderboardData = users
            .map((u) => {
                // Count unique DSA problems solved (passed only, no duplicates)
                const scores = u.progress?.examScores || [];
                const solvedIds = new Set();
                scores.forEach(s => {
                    if (s.passed && s.examId) {
                        const pid = s.examId.toString();
                        if (dsaIds.has(pid)) solvedIds.add(pid);
                    }
                });
                const dsaSolved = solvedIds.size;

                const topBadge = u.badges && u.badges.length > 0
                    ? u.badges[u.badges.length - 1]
                    : null;

                return {
                    _id: u._id,
                    name: u.name,
                    username: u.username || u.name,
                    streak: getEffectiveStreak(u.streak, u.lastSubmissionDate),
                    totalSolved: dsaSolved,
                    topBadge,
                    allBadges: u.badges || []
                };
            })
            .sort((a, b) => b.totalSolved - a.totalSolved || b.streak - a.streak)
            .slice(0, 50)
            .map((u, index) => ({ ...u, rank: index + 1 }));

        res.json(leaderboardData);
    } catch (error) {
        console.error("Leaderboard Error:", error);
        res.status(500).json({ message: 'Error fetching leaderboard data' });
    }
};

module.exports = {
    getLeaderboard
};
