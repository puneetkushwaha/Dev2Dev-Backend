const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
require('dotenv').config();

const questions = [
    // --- MCQs (1-10: Fundamentals) ---
    { questionText: "CIA triad ka full form kya hai?", type: "mcq", options: ["Control, Integrity, Access", "Confidentiality, Integrity, Availability", "Cyber, Internet, Access", "Control, Internet, Authorization"], correctAnswer: "Confidentiality, Integrity, Availability", difficulty: "Easy" },
    { questionText: "Confidentiality ka matlab hai:", type: "mcq", options: ["Data modify karna", "Unauthorized access se protection", "System shutdown", "Backup"], correctAnswer: "Unauthorized access se protection", difficulty: "Easy" },
    { questionText: "Integrity ensure karta hai:", type: "mcq", options: ["Data accurate aur unchanged ho", "Data public ho", "Data encrypted ho", "System offline ho"], correctAnswer: "Data accurate aur unchanged ho", difficulty: "Easy" },
    { questionText: "Availability ka matlab hai:", type: "mcq", options: ["Data hidden ho", "Data accessible jab zarurat ho", "Server shutdown ho", "Firewall active ho"], correctAnswer: "Data accessible jab zarurat ho", difficulty: "Easy" },
    { questionText: "Threat kya hota hai?", type: "mcq", options: ["Attack ka actual execution", "Potential danger", "Software", "Patch"], correctAnswer: "Potential danger", difficulty: "Easy" },
    { questionText: "Vulnerability kya hoti hai?", type: "mcq", options: ["Security weakness", "Antivirus", "Encryption", "Firewall"], correctAnswer: "Security weakness", difficulty: "Easy" },
    { questionText: "Risk calculation formula (Basic context):", type: "mcq", options: ["Risk = Threat × Vulnerability", "Risk = Threat + Firewall", "Risk = Data – Attack", "Risk = Patch + Virus"], correctAnswer: "Risk = Threat × Vulnerability", difficulty: "Medium" },
    { questionText: "Cyber attack ka example?", type: "mcq", options: ["SQL Injection", "Power failure", "Hardware crash", "Printer jam"], correctAnswer: "SQL Injection", difficulty: "Easy" },
    { questionText: "Zero-day vulnerability ka matlab?", type: "mcq", options: ["0 users affected", "Unknown exploit without patch", "Old vulnerability", "Expired software"], correctAnswer: "Unknown exploit without patch", difficulty: "Medium" },
    { questionText: "Ethical hacking ka goal?", type: "mcq", options: ["Damage", "Legal testing", "Data theft", "System crash"], correctAnswer: "Legal testing", difficulty: "Easy" },

    // --- Networking Security (11-20) ---
    { questionText: "TCP/IP ka use primarily kya hai?", type: "mcq", options: ["Encryption", "Communication protocol", "Firewall", "Hash"], correctAnswer: "Communication protocol", difficulty: "Easy" },
    { questionText: "HTTPS ka matlab?", type: "mcq", options: ["Hyper Transfer Text Secure", "Hyper Text Transfer Protocol Secure", "High Text Protocol", "Host Transfer"], correctAnswer: "Hyper Text Transfer Protocol Secure", difficulty: "Easy" },
    { questionText: "Port 443 kis ke liye use hota hai?", type: "mcq", options: ["HTTP", "HTTPS", "FTP", "SSH"], correctAnswer: "HTTPS", difficulty: "Easy" },
    { questionText: "Firewall ka primary kaam?", type: "mcq", options: ["Data delete", "Network traffic filter", "Encrypt data", "Backup"], correctAnswer: "Network traffic filter", difficulty: "Easy" },
    { questionText: "IDS ka full form?", type: "mcq", options: ["Internet Data Security", "Intrusion Detection System", "Internal Data Service", "Integrated Defense System"], correctAnswer: "Intrusion Detection System", difficulty: "Medium" },
    { questionText: "IPS (Intrusion Prevention System) kya karta hai?", type: "mcq", options: ["Detect only", "Prevent attack", "Backup", "Scan email"], correctAnswer: "Prevent attack", difficulty: "Medium" },
    { questionText: "VPN ka primary purpose?", type: "mcq", options: ["Hide IP + secure tunnel", "Increase RAM", "Delete logs", "Stop firewall"], correctAnswer: "Hide IP + secure tunnel", difficulty: "Easy" },
    { questionText: "MITM attack stands for:", type: "mcq", options: ["Malware", "Man-in-the-Middle", "Memory leak", "Database error"], correctAnswer: "Man-in-the-Middle", difficulty: "Easy" },
    { questionText: "ARP poisoning target karta hai?", type: "mcq", options: ["Application layer", "Data link layer", "Physical layer", "DNS"], correctAnswer: "Data link layer", difficulty: "Hard" },
    { questionText: "DNS poisoning ka goal kya hai?", type: "mcq", options: ["IP change attack", "Fake DNS response to redirect users", "Firewall disable", "Router reset"], correctAnswer: "Fake DNS response to redirect users", difficulty: "Hard" },

    // --- Cryptography (21-35) ---
    { questionText: "Encryption ka purpose?", type: "mcq", options: ["Compress data", "Protect data", "Delete data", "Backup"], correctAnswer: "Protect data", difficulty: "Easy" },
    { questionText: "Symmetric encryption example?", type: "mcq", options: ["RSA", "AES", "ECC", "DSA"], correctAnswer: "AES", difficulty: "Medium" },
    { questionText: "Asymmetric encryption me kitni keys hoti hain?", type: "mcq", options: ["1", "2", "3", "4"], correctAnswer: "2", difficulty: "Easy" },
    { questionText: "Hashing logic basically reversible hota hai?", type: "mcq", options: ["Yes", "No", "Sometimes", "Depends"], correctAnswer: "No", difficulty: "Medium" },
    { questionText: "SHA-256 kis category me aata hai?", type: "mcq", options: ["Hash", "Cipher", "Protocol", "Port"], correctAnswer: "Hash", difficulty: "Easy" },
    { questionText: "Digital Signature ensure karta hai:", type: "mcq", options: ["Authenticity and Non-repudiation", "Compression", "Speed", "None"], correctAnswer: "Authenticity and Non-repudiation", difficulty: "Medium" },
    { questionText: "PKI (Public Key Infrastructure) ka role?", type: "mcq", options: ["Manage digital certificates", "Delete files", "Network hardware", "None"], correctAnswer: "Manage digital certificates", difficulty: "Hard" },
    { questionText: "SSL/TLS protocol layer?", type: "mcq", options: ["Transport Layer", "Physical Layer", "Network Layer", "None"], correctAnswer: "Transport Layer", difficulty: "Medium" },
    { questionText: "Salting in hashing helpful hai:", type: "mcq", options: ["Preventing rainbow table attacks", "Changing colors", "Increasing speed", "None"], correctAnswer: "Preventing rainbow table attacks", difficulty: "Hard" },
    { questionText: "HMAC stands for:", type: "mcq", options: ["Hash-based Message Authentication Code", "High Media", "Hardware Mode", "None"], correctAnswer: "Hash-based Message Authentication Code", difficulty: "Hard" },
    { questionText: "X.509 standard kiske liye hai?", type: "mcq", options: ["Digital Certificates", "Hard drive", "Cables", "None"], correctAnswer: "Digital Certificates", difficulty: "Hard" },
    { questionText: "Asymmetric me encryption kiske sath hoti hai?", type: "mcq", options: ["Public Key", "Private Key", "Both", "None"], correctAnswer: "Public Key", difficulty: "Medium" },
    { questionText: "Decryption in Asymmetric follows:", type: "mcq", options: ["Private Key", "Public Key", "Any key", "None"], correctAnswer: "Private Key", difficulty: "Medium" },
    { questionText: "Blockchain me data immutability ke liye kya use hota hai?", type: "mcq", options: ["Cryptographic Hashing", "Spreadsheets", "Passwords", "None"], correctAnswer: "Cryptographic Hashing", difficulty: "Hard" },
    { questionText: "Diffie-Hellman algorithm use hota hai:", type: "mcq", options: ["Key exchange", "Symmetric encryption", "Hashing", "None"], correctAnswer: "Key exchange", difficulty: "Hard" },

    // --- Web Security (36-50) ---
    { questionText: "SQL Injection kya target karta hai?", type: "mcq", options: ["Server RAM", "Database", "CSS", "DNS"], correctAnswer: "Database", difficulty: "Easy" },
    { questionText: "XSS ka full form?", type: "mcq", options: ["Cross Site Script", "Cross Site Scripting", "XML Secure Script", "Extra Secure Script"], correctAnswer: "Cross Site Scripting", difficulty: "Easy" },
    { questionText: "CSRF attack kya karta hai?", type: "mcq", options: ["User ko trick karta hai unwanted request bhejne ke liye", "Server crash", "DNS change", "Virus install"], correctAnswer: "User ko trick karta hai unwanted request bhejne ke liye", difficulty: "Medium" },
    { questionText: "OWASP Top 10 kya hai?", type: "mcq", options: ["Programming book", "Top security risks list", "Antivirus", "Protocol"], correctAnswer: "Top security risks list", difficulty: "Easy" },
    { questionText: "Secure cookies me 'Secure' flag ka kaam?", type: "mcq", options: ["Cookie only via HTTPS", "Hide cookie", "Delete cookie", "None"], correctAnswer: "Cookie only via HTTPS", difficulty: "Easy" },
    { questionText: "HttpOnly flag cookies me prevents:", type: "mcq", options: ["XSS script access", "Network sniffing", "Hard drive crash", "None"], correctAnswer: "XSS script access", difficulty: "Medium" },
    { questionText: "Broken Authentication example:", type: "mcq", options: ["Weak passwords/Session hijacking", "Slow UI", "Wrong CSS", "None"], correctAnswer: "Weak passwords/Session hijacking", difficulty: "Medium" },
    { questionText: "Clickjacking attack involves:", type: "mcq", options: ["Invisible UI components", "Keyboard theft", "Screen brightness", "None"], correctAnswer: "Invisible UI components", difficulty: "Medium" },
    { questionText: "CORS misconfiguration risk?", type: "mcq", options: ["Unauthorized cross-origin data access", "Slow loading", "Wrong image", "None"], correctAnswer: "Unauthorized cross-origin data access", difficulty: "Hard" },
    { questionText: "Rate Limiting protects from:", type: "mcq", options: ["Brute force and Denial of service", "Static code analysis", "UI design", "None"], correctAnswer: "Brute force and Denial of service", difficulty: "Medium" },
    { questionText: "JWT standard format parts:", type: "mcq", options: ["Header, Payload, Signature", "User, Pass, Data", "Text, Image, Vector", "None"], correctAnswer: "Header, Payload, Signature", difficulty: "Medium" },
    { questionText: "SSRF (Server-Side Request Forgery) logic:", type: "mcq", options: ["Server making requests to internal resources", "User hacking user", "DNS down", "None"], correctAnswer: "Server making requests to internal resources", difficulty: "Hard" },
    { questionText: "Path Traversal attack aim:", type: "mcq", options: ["Access unauthorized files/directories", "Change URL", "Delete logs", "None"], correctAnswer: "Access unauthorized files/directories", difficulty: "Hard" },
    { questionText: "Remote Code Execution (RCE) is:", type: "mcq", options: ["Executing commands on server remotely", "Reading email", "Formatting disk manually", "None"], correctAnswer: "Executing commands on server remotely", difficulty: "Hard" },
    { questionText: "Secure File Upload include karna chahiye:", type: "mcq", options: ["MIME check, extension validation, renaming", "Open access", "Zero check", "None"], correctAnswer: "MIME check, extension validation, renaming", difficulty: "Medium" },

    // --- Malware & Threats (51-60) ---
    { questionText: "Virus vs Worm difference primary?", type: "mcq", options: ["Worm self-replicates without human help", "Virus is faster", "Worm is hardware", "None"], correctAnswer: "Worm self-replicates without human help", difficulty: "Easy" },
    { questionText: "Trojan horse appearance:", type: "mcq", options: ["Legitimate software", "Open virus", "Image file", "None"], correctAnswer: "Legitimate software", difficulty: "Easy" },
    { questionText: "Ransomware primary action:", type: "mcq", options: ["Encrypting data for money", "Deleting data", "Printing files", "None"], correctAnswer: "Encrypting data for money", difficulty: "Easy" },
    { questionText: "Spyware ka goal:", type: "mcq", options: ["Secretly monitoring user activity", "Speed up PC", "Backup", "None"], correctAnswer: "Secretly monitoring user activity", difficulty: "Easy" },
    { questionText: "Keylogger captures:", type: "mcq", options: ["Keystrokes", "Images", "Audio", "Network speed"], correctAnswer: "Keystrokes", difficulty: "Easy" },
    { questionText: "Rootkit hides:", type: "mcq", options: ["Malware components from OS", "Browser history", "Passwords", "None"], correctAnswer: "Malware components from OS", difficulty: "Medium" },
    { questionText: "Botnet is a network of:", type: "mcq", options: ["Compromised computers (Zombies)", "Supercomputers", "Secure servers", "None"], correctAnswer: "Compromised computers (Zombies)", difficulty: "Medium" },
    { questionText: "DDoS stands for:", type: "mcq", options: ["Distributed Denial of Service", "Digital Data Service", "Double Defense", "None"], correctAnswer: "Distributed Denial of Service", difficulty: "Medium" },
    { questionText: "Phishing methodology:", type: "mcq", options: ["Fraudulent communications (Email/SMS)", "Physical theft", "Hardware hacking", "None"], correctAnswer: "Fraudulent communications (Email/SMS)", difficulty: "Easy" },
    { questionText: "Social Engineering focuses on:", type: "mcq", options: ["Human psychology manipulation", "Software bugs", "Network speed", "None"], correctAnswer: "Human psychology manipulation", difficulty: "Medium" },

    // --- Cloud + DevSecOps (61-70) ---
    { questionText: "Shared Responsibility Model logic?", type: "mcq", options: ["Provider and Customer both handle security", "Only Provider", "Only Customer", "None"], correctAnswer: "Provider and Customer both handle security", difficulty: "Medium" },
    { questionText: "IAM full form:", type: "mcq", options: ["Identity and Access Management", "Internal Access Mode", "Internet Area Management", "None"], correctAnswer: "Identity and Access Management", difficulty: "Easy" },
    { questionText: "Principle of Least Privilege:", type: "mcq", options: ["Minimum access needed for task", "Full admin to everyone", "No access", "None"], correctAnswer: "Minimum access needed for task", difficulty: "Easy" },
    { questionText: "DevSecOps primary shift:", type: "mcq", options: ["Integrated security in DevOps pipeline (Shift Left)", "Security after deployment", "No security", "None"], correctAnswer: "Integrated security in DevOps pipeline (Shift Left)", difficulty: "Medium" },
    { questionText: "SAST (Static Analysis) check karta hai:", type: "mcq", options: ["Source code without executing", "Running app", "Network speed", "None"], correctAnswer: "Source code without executing", difficulty: "Medium" },
    { questionText: "DAST (Dynamic Analysis) check karta hai:", type: "mcq", options: ["Running application", "Static code", "Design docs", "None"], correctAnswer: "Running application", difficulty: "Medium" },
    { questionText: "Container Security focus:", type: "mcq", options: ["Image vulnerabilities and runtime isolation", "Only hardware", "Network cables", "None"], correctAnswer: "Image vulnerabilities and runtime isolation", difficulty: "Hard" },
    { questionText: "Kubernetes RBAC role?", type: "mcq", options: ["Role-Based Access Control", "Data backup", "UI colors", "None"], correctAnswer: "Role-Based Access Control", difficulty: "Hard" },
    { questionText: "Secrets Management tools purpose?", type: "mcq", options: ["Securely storing API keys/passwords", "Deleting logs", "Publishing blogs", "None"], correctAnswer: "Securely storing API keys/passwords", difficulty: "Medium" },
    { questionText: "Log monitoring tool for CyberSec?", type: "mcq", options: ["Splunk / ELK", "Notepad", "VLC", "Canvas"], correctAnswer: "Splunk / ELK", difficulty: "Easy" },

    // --- Practical / Coding (71-100) ---
    { questionText: "Coding Question: Write a Python script to perform AES encryption on a string using a key and IV.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Use 'bcrypt' in Python/Node to hash a password and demonstrate how to check it later.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Write a SHA-256 hashing function that takes a JSON object as input and returns the hash string.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Write a script to generate an RSA Key pair (2048-bit) and save public/private keys to files.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Create a JWT token with a 1-hour expiration using a secret key and custom payload.", type: "coding", difficulty: "Hard" },

    { questionText: "Practical Question: Identify the SQL Injection vulnerability in this code: query = \"SELECT * FROM users WHERE id = \" + user_input. Write the fixed version using parameterized queries.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Write a simple HTML sanitization function that escapes '<', '>', and '&' to prevent XSS.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Implement a CSRF token verification middleware in Node.js (pseudocode/logic).", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Build a 'Secure Login' logic that includes account lockout after 5 failed attempts.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Implement a basic Rate Limiting logic using a dictionary to track IP request counts.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Create a File Upload validation function that checks for MIME type 'image/png' and file size < 5MB.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Write a Password Strength checker that validates length > 12, contains special chars, numbers, and capital letters.", type: "coding", difficulty: "Medium" },

    { questionText: "Coding Question: Write a simple Port Scanner in Python using the 'socket' library that checks ports 20-100.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Using 'scapy', write a 3-line script to sniff and print the summary of the first 5 network packets.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Define a firewall rule logic (JSON/Pseudocode) that blocks IP '192.168.1.50' and allows port 443 only.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Write a script to analyze access logs and print IP addresses that have more than 100 requests in 1 minute.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Implement a 'Brute Force Protection' logic using a sliding window for login timestamps.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Write a Python log parser that extracts and counts occurrences of '403 Forbidden' errors.", type: "coding", difficulty: "Medium" },

    { questionText: "Practical Question: Create an ML-inspired suspicious URL detector logic using a list of 'bad keywords' like 'phish', 'login-verify'.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Write a function to flag emails that contain both 'account suspension' and a 'http' link from unknown domains.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Create a malware signature matching logic that compares a file's MD5 hash against a database of known threats.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Write an anomaly detection function that flags data points outside 3 Standard Deviations from the Mean.", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Implement a logic for detecting 'Impossible Travel' anomaly (Login from Delhi at 10 AM and US at 11 AM).", type: "coding", difficulty: "Hard" },
    { questionText: "Practical Question: Write a logic to detect a Potential DDoS: incoming requests/sec crossing a threshold of 1000.", type: "coding", difficulty: "Medium" },
    { questionText: "Practical Question: Create a script to detect API abuse: one API token making requests to more than 50 unique endpoints/hour.", type: "coding", difficulty: "Hard" },

    { questionText: "System Design: Design a 'Secure API Architecture' including API Gateway, Auth Service, and WAF.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Describe the components of a 'Zero Trust Architecture' for a corporate remote worker setup.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Design a 'SOC Workflow' for handling a Ransomware alert: Detection to Remediation.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Design an 'Enterprise Password Manager' that ensures even server admins can't read user passwords.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Design an 'AI-powered Threat Detection System' that integrates Network Logs, SIEM, and automated playbooks.", type: "coding", difficulty: "Hard" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'Cyber Security' });
        if (!domain) {
            console.error('Cyber Security domain not found. Please ensure domains are seeded first.');
            process.exit(1);
        }

        // Delete existing exam to avoid duplicates
        await Exam.deleteMany({ title: "Cyber Security – 100 Questions Exam" });

        const cyberExam = new Exam({
            domainId: domain._id,
            title: "Cyber Security – 100 Questions Exam",
            type: "Full-length Mock",
            durationMinutes: 120, // 2 hours
            questions: questions
        });

        await cyberExam.save();
        console.log('Successfully seeded Cyber Security - 100 Questions Exam');

        await mongoose.connection.close();
        console.log('Done');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
