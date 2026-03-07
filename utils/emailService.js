const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || 'onboarding@dev2dev.online';
const fromName = process.env.FROM_NAME || 'Dev2Dev';
const fromString = `${fromName} <${fromEmail}>`;

/**
 * Verify Resend Configuration
 */
const verifyConfig = async () => {
    try {
        if (!process.env.RESEND_API_KEY) {
            return { success: false, error: 'RESEND_API_KEY is missing' };
        }
        // Send a test email to the configured sender address (or user's email if possible, but sender is safer for pure verification)
        // Alternatively, since Resend doesn't have a direct "verify()" like nodemailer,
        // we can just check if the API key is present as a basic check, or attempt a safe API call.
        // For now, if the key is there, we assume it's configured. Real errors will happen during send.
        return { success: true };
    } catch (error) {
        console.error('[Email Verify Error]', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send Payment Confirmation Email
 */
const sendPaymentConfirmation = async (email, name, type, amount) => {
    try {
        const subject = type === 'pro'
            ? 'Welcome to Dev2Dev Pro! 🚀'
            : 'Payment Confirmed - Tutorial Unlocked! 📚';

        const html = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #6366f1; margin: 0; font-size: 28px;">Dev2Dev</h1>
                </div>
                <h2 style="color: #1e293b; font-size: 22px;">Hi ${name},</h2>
                <p style="color: #475569; font-size: 16px; lineHeight: 1.6;">
                    Your payment of <strong>₹${amount}</strong> was successful.
                    ${type === 'pro' 
                        ? 'Your <strong>Dev2Dev Pro</strong> membership is now active for 1 year!' 
                        : 'Your selected tutorial has been unlocked and added to your profile.'}
                </p>
                <div style="background: #f8fafc; padding: 25px; border-radius: 16px; margin: 30px 0; border: 1px dashed #cbd5e1;">
                    <p style="margin: 0;"><strong>Status:</strong> ${type === 'pro' ? 'Pro Membership Activated' : 'Tutorial Unlocked'}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Validity:</strong> 1 Year</p>
                </div>
                <p style="color: #475569;">${type === 'pro' ? 'You now have full access to all AI interviews and premium benchmarks.' : 'You can now access your tutorial from the learning dashboard.'}</p>
                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 40px 0;">
                <p style="font-size: 12px; color: #94a3b8; text-align: center;">If you have any questions, reply to this email.</p>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: fromString,
            to: email,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('[Resend Error] Failed to send confirmation:', error);
            return { success: false, error: error.message };
        }

        console.log(`[Email] Payment confirmation sent to ${email} (ID: ${data.id})`);
        return { success: true, data };
    } catch (error) {
        console.error('[Email Exception] Failed to send confirmation:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send Premium Status Change Email
 */
const sendPremiumStatusChange = async (email, name, isActive) => {
    try {
        const subject = isActive 
            ? 'Access Granted: Welcome to Dev2Dev Pro! 🌟' 
            : 'Dev2Dev Pro Subscription Update ℹ️';

        const html = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #6366f1; margin: 0; font-size: 28px;">Dev2Dev</h1>
                    <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Empowering Modern Tech Pioneers</p>
                </div>
                
                <h2 style="color: #1e293b; font-size: 22px;">Hi ${name},</h2>
                
                <p style="color: #475569; font-size: 16px; lineHeight: 1.6;">
                    ${isActive 
                        ? 'We are excited to inform you that your <strong>Dev2Dev Pro</strong> access has been activated! You now have unrestricted access to all premium features, including AI-driven interviews and advanced domain certifications.' 
                        : 'This is to inform you that your <strong>Dev2Dev Pro</strong> access has been deactivated as per recent account updates.'}
                </p>

                <div style="background: #f8fafc; padding: 25px; border-radius: 16px; margin: 30px 0; border: 1px dashed #cbd5e1;">
                    <p style="margin: 0; color: #1e293b;"><strong>Status:</strong> <span style="color: ${isActive ? '#10b981' : '#f43f5e'};">${isActive ? 'Premium Active' : 'Basic Tier'}</span></p>
                    <p style="margin: 8px 0 0 0; color: #64748b; font-size: 14px;">${isActive ? 'Validity: Extended Access Enabled' : 'Date: ' + new Date().toLocaleDateString()}</p>
                </div>

                ${isActive ? `
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.FRONTEND_URL || 'https://dev2dev.online'}/dashboard" style="background: #6366f1; color: white; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">Explore Pro Features</a>
                </div>
                ` : ''}

                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 40px 0;">
                <p style="font-size: 13px; color: #94a3b8; text-align: center;">
                    If you believe this is an error or have any questions about your subscription, please contact our support team at support@dev2dev.online
                </p>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: fromString,
            to: email,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('[Resend Error] Failed to send status change:', error);
            return { success: false, error: error.message };
        }

        console.log(`[Email] Status change notification sent to ${email} (Active: ${isActive}, ID: ${data.id})`);
        return { success: true, data };
    } catch (error) {
        console.error('[Email Exception] Failed to send status change:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send Premium Expiry Warning
 */
const sendPremiumExpiryWarning = async (email, name, daysLeft) => {
    try {
        const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #fee2e2; border-radius: 20px; background: #fffafb;">
                <h2 style="color: #dc2626;">Your Pro Access is Expiring Soon! ⚠️</h2>
                <p>Hi <strong>${name}</strong>,</p>
                <p>Your Dev2Dev Pro subscription is set to expire in <strong>${daysLeft} days</strong>.</p>
                <div style="background: #ffffff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #fecaca;">
                    <p style="margin: 0;">Renew now to maintain your streak and keep access to all premium interview modules.</p>
                </div>
                <a href="${process.env.FRONTEND_URL || 'https://dev2dev.online'}/pricing" style="background: #dc2626; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Renew Subscription</a>
                <p style="font-size: 12px; color: #991b1b; margin-top: 20px;">Ignore if already renewed.</p>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: fromString,
            to: email,
            subject: 'Dev2Dev Pro: Expiry Warning ⚡',
            html: html,
        });

        if (error) {
            console.error('[Resend Error] Failed to send expiry warning:', error);
            return { success: false, error: error.message };
        }

        console.log(`[Email] Expiry warning sent to ${email} (ID: ${data.id})`);
        return { success: true, data };
    } catch (error) {
        console.error('[Email Exception] Failed to send expiry warning:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { 
    sendPaymentConfirmation, 
    sendPremiumStatusChange, 
    sendPremiumExpiryWarning,
    verifyConfig 
};
