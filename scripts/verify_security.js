const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function verifySecurity() {
    console.log('--- DevElevate Security Verification ---');

    try {
        // 1. Verify Security Headers (Helmet)
        console.log('\n[1] Verifying Security Headers...');
        const res = await axios.get('http://localhost:5000/');
        const headers = res.headers;
        const securityHeaders = [
            'x-dns-prefetch-control',
            'x-frame-options',
            'strict-transport-security',
            'x-download-options',
            'x-content-type-options',
            'x-xss-protection'
        ];

        securityHeaders.forEach(header => {
            if (headers[header]) {
                console.log(`✅ ${header}: ${headers[header]}`);
            } else {
                console.log(`❌ ${header} missing`);
            }
        });

        // 2. Verify Rate Limiting
        console.log('\n[2] Verifying Rate Limiting (Sending 10 rapid requests)...');
        let blocked = false;
        for (let i = 0; i < 15; i++) {
            try {
                await axios.get(`${BASE_URL}/auth/test`, { validateStatus: false });
            } catch (err) {
                if (err.response && err.response.status === 429) {
                    blocked = true;
                    console.log(`✅ Rate limit triggered at request ${i + 1}`);
                    break;
                }
            }
        }
        if (!blocked) console.log('⚠️ Rate limit not triggered. Check backend configuration.');

        // 3. Verify Error Sanitization
        console.log('\n[3] Verifying Error Sanitization...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {}, { validateStatus: false });
        if (loginRes.data && loginRes.data.message && !loginRes.data.stack) {
            console.log('✅ Error message sanitized (no stack trace)');
        } else {
            console.log('⚠️ Warning: Error response might contain sensitive info or stack trace');
        }

        // 4. Verify Tutorial Access Control (requires a premium tutorial ID)
        console.log('\n[4] Verifying Tutorial Access Control...');
        console.log('Note: This requires a valid token and a premium tutorial ID to be fully tested.');
        const tutRes = await axios.get(`${BASE_URL}/tutorials/some_premium_id`, { validateStatus: false });
        if (tutRes.status === 401 || tutRes.status === 403) {
            console.log(`✅ Unauthorized access attempt blocked with status: ${tutRes.status}`);
        } else {
            console.log(`⚠️ Warning: Access attempt returned status: ${tutRes.status}. Ensure authentication is required.`);
        }

    } catch (error) {
        console.error('Error during verification:', error.message);
        console.log('Note: Ensure the server is running on http://localhost:5000');
    }
}

verifySecurity();
