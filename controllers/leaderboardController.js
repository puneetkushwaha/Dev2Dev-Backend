const User = require('../models/User');

const getLeaderboard = async (req, res) => {
    try {
        // Fetch top 50 users sorted by totalSolved descending, then streak descending
        const users = await User.find({})
            .select('name username streak totalSolved badges profilePic _id')
            .sort({ totalSolved: -1, streak: -1 })
            .limit(50);

        // Format data for frontend
        const leaderboardData = users.map((u, index) => {
            // Find top badge (the one with highest requirement based on order)
            // Or just send all badges and let frontend decide, but sending top badge is easier:
            const topBadge = u.badges && u.badges.length > 0
                ? u.badges[u.badges.length - 1] // since they are pushed sequentially
                : null;

            return {
                _id: u._id,
                rank: index + 1,
                name: u.name,
                username: u.username || u.name,
                streak: u.streak || 0,
                totalSolved: u.totalSolved || 0,
                topBadge: topBadge,
                allBadges: u.badges || []
            };
        });

        res.json(leaderboardData);
    } catch (error) {
        console.error("Leaderboard Error:", error);
        res.status(500).json({ message: 'Error fetching leaderboard data' });
    }
};

module.exports = {
    getLeaderboard
};
