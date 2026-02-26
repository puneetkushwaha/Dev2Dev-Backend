const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const PRICE_MAP = {
    'pro': 499,      // Hardcoded price for Pro
    'tutorial': 199   // Default price for any tutorial (or lookup from DB if needed)
};

// @route   POST api/payment/create-order
// @desc    Create Razorpay Order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
    try {
        const { type, tutorialId } = req.body;

        // Security fix: Determine price server-side
        let amount = PRICE_MAP[type] || PRICE_MAP['pro'];

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
            notes: {
                userId: req.user.id,
                type: type,
                tutorialId: tutorialId || null
            }
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            console.error("Razorpay order creation failed");
            return res.status(500).json({ message: "Internal Server Error" });
        }

        res.json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// @route   POST api/payment/verify-payment
// @desc    Verify Razorpay Payment Signature
// @access  Private
router.post('/verify-payment', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, type, tutorialId } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");

        if (razorpay_signature === expectedSign) {

            // Payment is verified
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            const now = new Date();
            if (type === 'pro') {
                user.proExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year expiry
            } else if (type === 'tutorial' && tutorialId) {
                user.unlockedTutorials = user.unlockedTutorials.filter(t => t.tutorialId?.toString() !== tutorialId.toString());
                user.unlockedTutorials.push({
                    tutorialId: tutorialId,
                    expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                });
            }

            await user.save();

            // Send Confirmation Email
            const { sendPaymentConfirmation } = require('../utils/emailService');
            const amount = PRICE_MAP[type] || 0;
            sendPaymentConfirmation(user.email, user.name, type, amount);

            const hasProAccess = user.proExpiry && user.proExpiry > now;
            const validTutorials = user.unlockedTutorials ? user.unlockedTutorials.filter(t => t.expiry && t.expiry > now).map(t => t.tutorialId) : [];

            return res.json({
                message: "Payment verified successfully",
                isPro: hasProAccess,
                hasProAccess: hasProAccess,
                proExpiry: user.proExpiry,
                unlockedTutorials: validTutorials
            });
        } else {
            return res.status(400).json({ message: "Invalid payment signature" });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
