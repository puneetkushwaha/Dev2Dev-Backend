const nodemailer = require('nodemailer');

/**
 * Send Payment Confirmation Email
 * @param {string} email - User email
 * @param {string} name - User name
 * @param {string} type - 'pro' or 'tutorial'
 * @param {number} amount - Amount paid
 */
const sendPaymentConfirmation = async (email, name, type, amount) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const subject = type === 'pro'
            ? 'Welcome to Dev2Dev Pro! 🚀'
            : 'Payment Confirmed - Tutorial Unlocked! 📚';

        const message = type === 'pro'
            ? `Hi ${name},\n\nYour payment of ₹${amount} was successful. You now have full access to Dev2Dev Pro features for 1 year!\n\nEnjoy your premium interview preparation.`
            : `Hi ${name},\n\nYour payment of ₹${amount} was successful. Your requested tutorial has been unlocked and added to your profile.\n\nHappy Learning!`;

        const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #6366f1;">Dev2Dev Confirmation</h2>
                <p>Hi <strong>${name}</strong>,</p>
                <p>Your payment of <strong>₹${amount}</strong> was successful.</p>
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Status:</strong> ${type === 'pro' ? 'Pro Membership Activated' : 'Tutorial Unlocked'}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Validity:</strong> 1 Year</p>
                </div>
                <p>${type === 'pro' ? 'You now have full access to all AI interviews and premium benchmarks.' : 'You can now access your tutorial from the learning dashboard.'}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #666;">If you have any questions, reply to this email.</p>
            </div>
        `;

        const info = await transporter.sendMail({
            from: `"${process.env.FROM_NAME || 'Dev2Dev'}" <${process.env.FROM_EMAIL}>`,
            to: email,
            subject: subject,
            text: message,
            html: html,
        });

        console.log(`[Email] Payment confirmation sent to ${email}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('[Email Error] Failed to send confirmation:', error.message);
        // We don't throw error here to avoid breaking the payment flow if email fails
        return false;
    }
};

module.exports = { sendPaymentConfirmation };
