const Visit = require('../models/Visit');

/**
 * Middleware to track daily website visits.
 * It increments total hits and tracks unique IP addresses for the current day.
 */
const trackVisit = async (req, res, next) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Use findOneAndUpdate with upsert to handle race conditions and simplify logic
        await Visit.findOneAndUpdate(
            { date: today },
            { 
                $inc: { totalHits: 1 },
                $addToSet: { uniqueIPs: clientIP }
            },
            { upsert: true, new: true }
        );

        next();
    } catch (error) {
        console.error('Error tracking visit:', error);
        // We don't call next(error) here because we don't want to stop the request
        // if visit tracking fails for some reason.
        next();
    }
};

module.exports = trackVisit;
