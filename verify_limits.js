const axios = require('axios');
const mongoose = require('mongoose');
const crypto = require('crypto');

async function runTests() {
    let token = '';
    let orderId = '';
    const email = `testuser_${Date.now()}@develevate.com`;
    console.log(`[TEST] Registering a new test user: ${email}`);
    try {
        const regRes = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Limit Test User',
            email: email,
            password: 'password123'
        });
        token = regRes.data.token;
        console.log(`[TEST] User registered. Initial active Pro status: ${regRes.data.isPro}`);

        const authConfig = { headers: { Authorization: `Bearer ${token}` } };

        console.log(`[TEST] Making 3 AI mock interview submissions...`);
        for (let i = 0; i < 3; i++) {
            const intRes = await axios.post('http://localhost:5000/api/interviews', {
                role: 'Frontend', domain: 'React', score: 85, transcript: []
            }, authConfig);
            if (intRes.status !== 201) throw new Error("Expected 201");
            console.log(`[TEST] Submission ${i + 1} successful.`);
        }

        console.log(`[TEST] Making 4th AI mock interview submission (Should be blocked)`);
        try {
            await axios.post('http://localhost:5000/api/interviews', {
                role: 'Frontend', domain: 'React', score: 85, transcript: []
            }, authConfig);
            throw new Error(`[FAIL] 4th submission was NOT blocked. It should have been.`);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                console.log(`[TEST] 4th submission correctly blocked with 403: ${err.response.data.message}`);
            } else {
                throw err;
            }
        }

        console.log(`[TEST] Creating Razorpay order for PRO upgrade...`);
        const orderRes = await axios.post('http://localhost:5000/api/payment/create-order', {
            type: 'pro', amount: 3999
        }, authConfig);
        orderId = orderRes.data.id;
        console.log(`[TEST] Order created: ${orderId}`);

        console.log(`[TEST] Verifying payment for PRO upgrade...`);
        // Generate valid signature using Razorpay test secret
        const rzpSecret = "pacKF1nncaGJjIeRTaXC49Mp";
        const paymentId = "pay_fake" + Date.now();
        const sign = orderId + "|" + paymentId;
        const expectedSign = crypto.createHmac("sha256", rzpSecret).update(sign).digest("hex");

        const verifyRes = await axios.post('http://localhost:5000/api/payment/verify-payment', {
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: expectedSign,
            type: 'pro'
        }, authConfig);

        console.log(`[TEST] Payment verified. Pro Expiry set to: ${verifyRes.data.proExpiry}`);
        if (!verifyRes.data.isPro) throw new Error("[FAIL] isPro flag is not true in the response.");

        console.log(`[TEST] Making 5th AI mock interview submission as Pro user (Should succeed)`);
        const intRes5 = await axios.post('http://localhost:5000/api/interviews', {
            role: 'Frontend', domain: 'React', score: 85, transcript: []
        }, authConfig);
        if (intRes5.status === 201) {
            console.log(`[TEST] 5th submission successful as Premium. Limitations disabled.`);
        }

        console.log(`[TEST] Verifying Tutorial Access Lock and Unlock...`);
        console.log(`[TEST] Fetching tutorials list...`);
        const tutListRes = await axios.get('http://localhost:5000/api/tutorials', authConfig);
        const premiumTutorials = tutListRes.data.filter(t => t.isPremium);
        if (premiumTutorials.length > 0) {
            const tutorialToBuy = premiumTutorials[0];
            console.log(`[TEST] Found a premium tutorial: ${tutorialToBuy.title}`);
            const tutOrderRes = await axios.post('http://localhost:5000/api/payment/create-order', {
                type: 'tutorial', tutorialId: tutorialToBuy._id, amount: tutorialToBuy.price
            }, authConfig);
            console.log(`[TEST] Created order for tutorial: ${tutOrderRes.data.id}`);

            const tutPaymentId = "pay_tut_" + Date.now();
            const tutSign = tutOrderRes.data.id + "|" + tutPaymentId;
            const tutExpectedSign = crypto.createHmac("sha256", rzpSecret).update(tutSign).digest("hex");

            const tutVerifyRes = await axios.post('http://localhost:5000/api/payment/verify-payment', {
                razorpay_order_id: tutOrderRes.data.id,
                razorpay_payment_id: tutPaymentId,
                razorpay_signature: tutExpectedSign,
                type: 'tutorial',
                tutorialId: tutorialToBuy._id
            }, authConfig);

            console.log(`[TEST] Tutorial unlocked successfully! Valid Tutorials: ${tutVerifyRes.data.unlockedTutorials.join(', ')}`);
            if (!tutVerifyRes.data.unlockedTutorials.includes(tutorialToBuy._id)) {
                throw new Error("Tutorial ID not found in valid unlocked tutorials array.");
            }
        } else {
            console.log("[TEST] No premium tutorials found in DB to test locking.");
        }

        console.log("✅ ALL EXPIRATION & LIMITS TESTS PASSED!");
    } catch (e) {
        console.error("❌ Test Failed:", e.message || e);
        if (e.response && e.response.data) console.error(e.response.data);
    } finally {
        // Cleanup the test user
        console.log("[TEST] Cleaning up test user...");
        await mongoose.connect('mongodb+srv://puneetkushwaha9452_db_user:HzpxBAbtxe1FtHSu@cluster0.vokcuu3.mongodb.net/?appName=Cluster0');
        await mongoose.connection.collection('users').deleteOne({ email: email });
        console.log("[TEST] User deleted. Disconnecting...");
        await mongoose.disconnect();
    }
}

runTests();
