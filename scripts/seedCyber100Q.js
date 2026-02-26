require('dotenv').config();
const mongoose = require('mongoose');

// Need the models
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const fullExamQuestions = [
    // Section A - Fundamentals (1-10)
    {
        type: 'MCQ',
        text: 'What does the CIA triad stand for?',
        options: ['Control, Integrity, Access', 'Confidentiality, Integrity, Availability', 'Cyber, Internet, Access', 'Control, Internet, Authorization'],
        correctAnswer: 'Confidentiality, Integrity, Availability'
    },
    {
        type: 'MCQ',
        text: 'What is the primary purpose of Confidentiality?',
        options: ['To modify data', 'To protect from unauthorized access', 'To shutdown the system', 'To backup data'],
        correctAnswer: 'To protect from unauthorized access'
    },
    {
        type: 'MCQ',
        text: 'What does Integrity ensure?',
        options: ['Data is accurate and unchanged', 'Data is public', 'Data is encrypted', 'System is offline'],
        correctAnswer: 'Data is accurate and unchanged'
    },
    {
        type: 'MCQ',
        text: 'What is the definition of Availability?',
        options: ['Data is hidden', 'Data is accessible when needed', 'Server is shutdown', 'Firewall is active'],
        correctAnswer: 'Data is accessible when needed'
    },
    {
        type: 'MCQ',
        text: 'What is a Threat in cybersecurity?',
        options: ['The actual execution of an attack', 'A potential danger or harm', 'Antivirus software', 'A security patch'],
        correctAnswer: 'A potential danger or harm'
    },
    {
        type: 'MCQ',
        text: 'What is a Vulnerability?',
        options: ['A security weakness or flaw', 'An antivirus program', 'Data encryption', 'A hardware firewall'],
        correctAnswer: 'A security weakness or flaw'
    },
    {
        type: 'MCQ',
        text: 'Which is the correct formula for calculating Risk?',
        options: ['Risk = Threat × Vulnerability', 'Risk = Threat + Firewall', 'Risk = Data - Attack', 'Risk = Patch + Virus'],
        correctAnswer: 'Risk = Threat × Vulnerability'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of a Cyber attack?',
        options: ['SQL Injection', 'Power failure', 'Hardware crash', 'Printer jam'],
        correctAnswer: 'SQL Injection'
    },
    {
        type: 'MCQ',
        text: 'What is a Zero-day vulnerability?',
        options: ['0 users affected', 'An unknown exploit for which no patch exists', 'An old vulnerability', 'Expired software license'],
        correctAnswer: 'An unknown exploit for which no patch exists'
    },
    {
        type: 'MCQ',
        text: 'What is the primary goal of Ethical hacking?',
        options: ['System damage', 'Legal security testing and patching', 'Data theft', 'System crash'],
        correctAnswer: 'Legal security testing and patching'
    },
    // Networking Security (11-20)
    {
        type: 'MCQ',
        text: 'What is TCP/IP used for?',
        options: ['Encryption', 'Communication protocol standard', 'Firewall deployment', 'Hashing'],
        correctAnswer: 'Communication protocol standard'
    },
    {
        type: 'MCQ',
        text: 'What does HTTPS stand for?',
        options: ['Hyper Transfer Text Secure', 'Hyper Text Transfer Protocol Secure', 'High Text Protocol', 'Host Transfer Protocol Secure'],
        correctAnswer: 'Hyper Text Transfer Protocol Secure'
    },
    {
        type: 'MCQ',
        text: 'What is Port 443 typically used for?',
        options: ['HTTP', 'HTTPS', 'FTP', 'SSH'],
        correctAnswer: 'HTTPS'
    },
    {
        type: 'MCQ',
        text: 'What is the core function of a Firewall?',
        options: ['To delete old data', 'To filter network traffic based on rules', 'To encrypt data at rest', 'To backup databases'],
        correctAnswer: 'To filter network traffic based on rules'
    },
    {
        type: 'MCQ',
        text: 'What does IDS stand for?',
        options: ['Internet Data Security', 'Intrusion Detection System', 'Internal Data Service', 'Integrated Defense System'],
        correctAnswer: 'Intrusion Detection System'
    },
    {
        type: 'MCQ',
        text: 'What does an IPS (Intrusion Prevention System) do?',
        options: ['Detects attacks only', 'Actively prevents and blocks attacks', 'Creates system backups', 'Scans incoming emails'],
        correctAnswer: 'Actively prevents and blocks attacks'
    },
    {
        type: 'MCQ',
        text: 'What is the main purpose of a VPN?',
        options: ['Hide IP address and create a secure encrypted tunnel', 'Increase system RAM', 'Delete server logs', 'Stop firewall rules'],
        correctAnswer: 'Hide IP address and create a secure encrypted tunnel'
    },
    {
        type: 'MCQ',
        text: 'What does MITM attack stand for?',
        options: ['Malicious Intent Threat Model', 'Man-in-the-Middle', 'Memory Leak in Time', 'Main Interface Tracking Mechanism'],
        correctAnswer: 'Man-in-the-Middle'
    },
    {
        type: 'MCQ',
        text: 'Which OSI layer does ARP poisoning target?',
        options: ['Application layer', 'Data link layer', 'Physical layer', 'Transport layer'],
        correctAnswer: 'Data link layer'
    },
    {
        type: 'MCQ',
        text: 'What is DNS poisoning?',
        options: ['Changing physical IP address', 'Injecting fake DNS responses to redirect traffic', 'Disabling a firewall', 'Resetting a router remotely'],
        correctAnswer: 'Injecting fake DNS responses to redirect traffic'
    },
    // Cryptography (21-35)
    {
        type: 'MCQ',
        text: 'What is the primary purpose of Encryption?',
        options: ['Compressing data', 'Protecting and scrambling data to maintain confidentiality', 'Deleting data', 'Backing up data'],
        correctAnswer: 'Protecting and scrambling data to maintain confidentiality'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of Symmetric encryption?',
        options: ['RSA', 'AES', 'ECC', 'DSA'],
        correctAnswer: 'AES'
    },
    {
        type: 'MCQ',
        text: 'How many keys are used in Asymmetric encryption?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2'
    },
    {
        type: 'MCQ',
        text: 'Is cryptographic Hashing reversible?',
        options: ['Yes', 'No', 'Sometimes', 'Depends on the algorithm'],
        correctAnswer: 'No'
    },
    {
        type: 'MCQ',
        text: 'What type of algorithm is SHA-256?',
        options: ['Hashing algorithm', 'Symmetric Cipher', 'Network Protocol', 'Network Port'],
        correctAnswer: 'Hashing algorithm'
    },
    {
        type: 'MCQ',
        text: 'What does a Digital Signature ensure?',
        options: ['Data size reduction', 'Non-repudiation and Authenticity', 'Faster network speed', 'Anonymity'],
        correctAnswer: 'Non-repudiation and Authenticity'
    },
    {
        type: 'MCQ',
        text: 'What does PKI stand for?',
        options: ['Private Key Infrastructure', 'Public Key Infrastructure', 'Protocol Key Interface', 'Public Known Identity'],
        correctAnswer: 'Public Key Infrastructure'
    },
    {
        type: 'MCQ',
        text: 'What does "Salting" a password mean?',
        options: ['Encrypting it twice', 'Adding random data before hashing to prevent rainbow table attacks', 'Deleting it from database', 'Compressing it'],
        correctAnswer: 'Adding random data before hashing to prevent rainbow table attacks'
    },
    {
        type: 'MCQ',
        text: 'What is HMAC used for?',
        options: ['To verify data integrity and authenticity using a secret key', 'To encrypt entire drives', 'To compress files', 'To route packets over the internet'],
        correctAnswer: 'To verify data integrity and authenticity using a secret key'
    },
    {
        type: 'MCQ',
        text: 'Who issues a Digital Certificate?',
        options: ['ISP', 'Certificate Authority (CA)', 'System Admin', 'Web Browser'],
        correctAnswer: 'Certificate Authority (CA)'
    },
    {
        type: 'MCQ',
        text: 'Which key is used to decrypt data that was encrypted with a Public Key in asymmetric cryptography?',
        options: ['The same Public Key', 'A shared secret key', 'The corresponding Private Key', 'A hash key'],
        correctAnswer: 'The corresponding Private Key'
    },
    {
        type: 'MCQ',
        text: 'What is the primary security feature of Blockchain?',
        options: ['It is centralized in one server', 'It is an immutable and decentralized ledger', 'It is not connected to the internet', 'It uses no encryption'],
        correctAnswer: 'It is an immutable and decentralized ledger'
    },
    {
        type: 'MCQ',
        text: 'Which protocol is commonly used for secure key exchange over an insecure channel?',
        options: ['FTP', 'Diffie-Hellman', 'Telnet', 'SMTP'],
        correctAnswer: 'Diffie-Hellman'
    },
    {
        type: 'MCQ',
        text: 'What does SSL/TLS provide?',
        options: ['Software updates', 'Secure communication over a computer network', 'Virus removal', 'Database management'],
        correctAnswer: 'Secure communication over a computer network'
    },
    {
        type: 'MCQ',
        text: 'What is a "Rainbow Table" used for?',
        options: ['Organizing network cables', 'Cracking password hashes using precomputed tables', 'Routing IP packets', 'Drawing network topologies'],
        correctAnswer: 'Cracking password hashes using precomputed tables'
    },
    // Web Security (36-50)
    {
        type: 'MCQ',
        text: 'What does SQL Injection target?',
        options: ['Server RAM', 'Backend Database', 'CSS stylesheets', 'DNS records'],
        correctAnswer: 'Backend Database'
    },
    {
        type: 'MCQ',
        text: 'What does XSS stand for?',
        options: ['Cross Site Script', 'Cross-Site Scripting', 'XML Secure Script', 'Extra Secure Script'],
        correctAnswer: 'Cross-Site Scripting'
    },
    {
        type: 'MCQ',
        text: 'What is the primary action of a CSRF attack?',
        options: ['Trick the user into executing unwanted actions on a trusted site', 'Crash the web server', 'Change DNS entries', 'Install local malware'],
        correctAnswer: 'Trick the user into executing unwanted actions on a trusted site'
    },
    {
        type: 'MCQ',
        text: 'What is the OWASP Top 10?',
        options: ['A programming book', 'A list of the 10 most critical web application security risks', 'Top antivirus softwares', 'Top 10 network protocols'],
        correctAnswer: 'A list of the 10 most critical web application security risks'
    },
    {
        type: 'MCQ',
        text: 'Which flag protects cookies from being accessed by client-side scripts?',
        options: ['HttpOnly', 'Secure', 'SameSite', 'Path'],
        correctAnswer: 'HttpOnly'
    },
    {
        type: 'MCQ',
        text: 'Broken Authentication vulnerabilities allow attackers to:',
        options: ['Compromise passwords, keys, or session tokens', 'Modify CSS files', 'Crash the server RAM', 'Perform DDoS automatically'],
        correctAnswer: 'Compromise passwords, keys, or session tokens'
    },
    {
        type: 'MCQ',
        text: 'Clickjacking is also known as:',
        options: ['SQL injection', 'UI Redressing', 'Buffer Overflow', 'Packet Sniffing'],
        correctAnswer: 'UI Redressing'
    },
    {
        type: 'MCQ',
        text: 'What does CORS stand for?',
        options: ['Cross-Origin Resource Sharing', 'Cyber Online Router Security', 'Central Outbound Request Server', 'Cross-Outline Rendering System'],
        correctAnswer: 'Cross-Origin Resource Sharing'
    },
    {
        type: 'MCQ',
        text: 'What is API Rate Limiting used for?',
        options: ['Preventing brute force and DoS attacks by limiting request volume', 'Increasing API speed', 'Encrypting API data', 'Translating API languages'],
        correctAnswer: 'Preventing brute force and DoS attacks by limiting request volume'
    },
    {
        type: 'MCQ',
        text: 'What part of a JWT (JSON Web Token) ensures its integrity?',
        options: ['Header', 'Payload', 'Signature', 'Footer'],
        correctAnswer: 'Signature'
    },
    {
        type: 'MCQ',
        text: 'What does SSRF stand for?',
        options: ['Server-Side Request Forgery', 'Simple Server Response Filter', 'Secure System Root Folder', 'Static Site Render Fetch'],
        correctAnswer: 'Server-Side Request Forgery'
    },
    {
        type: 'MCQ',
        text: 'How can you mitigate File Upload attacks?',
        options: ['Allowing all file types', 'Validating extensions, MIME types, and storing files outside public dirs', 'Making files public immediately', 'Encrypting the filenames only'],
        correctAnswer: 'Validating extensions, MIME types, and storing files outside public dirs'
    },
    {
        type: 'MCQ',
        text: 'RCE is a severe vulnerability. What does it stand for?',
        options: ['Remote Connection Error', 'Remote Code Execution', 'Random Cipher Encryption', 'Response Code Evaluation'],
        correctAnswer: 'Remote Code Execution'
    },
    {
        type: 'MCQ',
        text: 'Path Traversal (Directory Traversal) aims to:',
        options: ['Access files and directories stored outside the web root folder', 'Traverse network switches', 'Optimize website URLs', 'Find broken hyperlinks'],
        correctAnswer: 'Access files and directories stored outside the web root folder'
    },
    {
        type: 'MCQ',
        text: 'What does a WAF do?',
        options: ['Web Application Firewall - filters malicious HTTP traffic', 'Wide Area Firewall - connects offices', 'Web Access Filter - blocks employee websites', 'Wireless Antenna Frequency'],
        correctAnswer: 'Web Application Firewall - filters malicious HTTP traffic'
    },
    // Malware & Threats (51-60)
    {
        type: 'MCQ',
        text: 'What is the main difference between a Virus and a Worm?',
        options: ['A worm needs a host program to run, a virus does not', 'A virus requires a host program or user action to spread, while a worm self-replicates independently', 'Viruses are harmless, worms are destructive', 'There is no difference'],
        correctAnswer: 'A virus requires a host program or user action to spread, while a worm self-replicates independently'
    },
    {
        type: 'MCQ',
        text: 'How does a Trojan Horse operate?',
        options: ['By self-replicating over the network', 'By disguised as legitimate, harmless software to trick the user into installing it', 'By encrypting network packets', 'By destroying RAM hardware'],
        correctAnswer: 'By disguised as legitimate, harmless software to trick the user into installing it'
    },
    {
        type: 'MCQ',
        text: 'What is the primary action of Ransomware?',
        options: ['Stealing passwords silently', 'Encrypting user files and demanding payment for the decryption key', 'Sending spam emails', 'Displaying pop-up ads'],
        correctAnswer: 'Encrypting user files and demanding payment for the decryption key'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of Spyware?',
        options: ['To covertly gather user information and track activity', 'To destroy the operating system', 'To automatically update software', 'To speed up internet connections'],
        correctAnswer: 'To covertly gather user information and track activity'
    },
    {
        type: 'MCQ',
        text: 'What does a Keylogger do?',
        options: ['Generates cryptographic keys', 'Records every keystroke made by the user to steal credentials', 'Locks the keyboard when not in use', 'Optimizes typing speed'],
        correctAnswer: 'Records every keystroke made by the user to steal credentials'
    },
    {
        type: 'MCQ',
        text: 'What is a Rootkit?',
        options: ['Software used to root Android devices natively', 'Malicious software designed to hide its presence and maintain admin-level access', 'A networking troubleshooting tool', 'A physical hardware key'],
        correctAnswer: 'Malicious software designed to hide its presence and maintain admin-level access'
    },
    {
        type: 'MCQ',
        text: 'What is a Botnet?',
        options: ['A network of robots in a factory', 'A network of infected computers controlled remotely by an attacker', 'A secure intranet system', 'An artificial intelligence chatbot'],
        correctAnswer: 'A network of infected computers controlled remotely by an attacker'
    },
    {
        type: 'MCQ',
        text: 'What does DDoS stand for?',
        options: ['Distributed Denial of Service', 'Direct Data Object Storage', 'Dedicated Device Operating System', 'Dynamic Domain Output System'],
        correctAnswer: 'Distributed Denial of Service'
    },
    {
        type: 'MCQ',
        text: 'What is Phishing?',
        options: ['A type of fishing sport', 'Fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity via email', 'A method of encrypting drives', 'A firewall configuration rule'],
        correctAnswer: 'Fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity via email'
    },
    {
        type: 'MCQ',
        text: 'What is Social Engineering in the context of cybersecurity?',
        options: ['Building social media platforms', 'Manipulating individuals into divulging confidential information or breaking security procedures', 'Engineers collaborating socially', 'Analyzing social network algorithms'],
        correctAnswer: 'Manipulating individuals into divulging confidential information or breaking security procedures'
    },
    // Cloud + DevSecOps (61-70)
    {
        type: 'MCQ',
        text: 'What is the Cloud Shared Responsibility Model?',
        options: ['The cloud provider is responsible for everything', 'The customer is responsible for everything', 'Security responsibility is divided between the cloud service provider and the customer', 'Government regulations manage cloud security'],
        correctAnswer: 'Security responsibility is divided between the cloud service provider and the customer'
    },
    {
        type: 'MCQ',
        text: 'What does IAM stand for in Cloud Computing?',
        options: ['Internal Access Module', 'Identity and Access Management', 'Internet Application Monitoring', 'Integrated Audit Mechanism'],
        correctAnswer: 'Identity and Access Management'
    },
    {
        type: 'MCQ',
        text: 'What is the Principle of Least Privilege?',
        options: ['Giving users maximum access by default', 'Giving users only the minimum access necessary to perform their job functions', 'Privileges are given out randomly', 'None of the above'],
        correctAnswer: 'Giving users only the minimum access necessary to perform their job functions'
    },
    {
        type: 'MCQ',
        text: 'What does DevSecOps mean?',
        options: ['Development without Security', 'Integrating Security practices seamlessly into the DevOps lifecycle', 'Developing Security Hardware', 'Operations Security Team'],
        correctAnswer: 'Integrating Security practices seamlessly into the DevOps lifecycle'
    },
    {
        type: 'MCQ',
        text: 'What is the difference between SAST and DAST?',
        options: ['SAST analyzes source code without running it (White-box), while DAST tests the running application (Black-box)', 'SAST is for dynamic testing, DAST is for static testing', 'They are the exact same tools', 'SAST is hardware, DAST is software'],
        correctAnswer: 'SAST analyzes source code without running it (White-box), while DAST tests the running application (Black-box)'
    },
    {
        type: 'MCQ',
        text: 'How can security be integrated into a CI/CD pipeline?',
        options: ['By bypassing security checks to maintain speed', 'By automating security scans, vulnerability assessments, and compliance checks as part of the build/deploy process', 'By hiring manual testers after deployment', 'Security cannot be added to CI/CD'],
        correctAnswer: 'By automating security scans, vulnerability assessments, and compliance checks as part of the build/deploy process'
    },
    {
        type: 'MCQ',
        text: 'What is a common Container Security best practice?',
        options: ['Running containers as root user forever', 'Scanning container images for vulnerabilities before deploying', 'Using default out-of-the-box settings unconditionally', 'Ignoring network segmentation'],
        correctAnswer: 'Scanning container images for vulnerabilities before deploying'
    },
    {
        type: 'MCQ',
        text: 'What is a common Kubernetes security risk?',
        options: ['Misconfigured Role-Based Access Control (RBAC)', 'Unlimited pod creation by default', 'Having too many nodes', 'Updating clusters too frequently'],
        correctAnswer: 'Misconfigured Role-Based Access Control (RBAC)'
    },
    {
        type: 'MCQ',
        text: 'What is Secrets Management used for?',
        options: ['Gossiping loudly', 'Securely storing and managing digital authentication credentials like API keys and passwords', 'Storing employee personal data', 'Hiding source code from compilers'],
        correctAnswer: 'Securely storing and managing digital authentication credentials like API keys and passwords'
    },
    {
        type: 'MCQ',
        text: 'Which is an example of a Log Monitoring & SIEM tool?',
        options: ['Splunk or ELK Stack', 'Microsoft Word', 'Adobe Photoshop', 'React DOM'],
        correctAnswer: 'Splunk or ELK Stack'
    }
];

// Add 30 Coding/Practical Questions Programmatically to reach 100
const practicalQuestions = [
    { text: 'Cryptographic Implementation: Write a secure AES-256-GCM encryption and decryption wrapper in Python or Node.js.' },
    { text: 'Authentication Security: Demonstrate how to properly hash and verify user passwords using the bcrypt library.' },
    { text: 'Data Integrity: Write a function to compute the SHA-256 hash of an input file to verify its integrity.' },
    { text: 'Public Key Infrastructure: Generate an RSA 2048-bit key pair and demonstrate encrypting a small payload with the public key.' },
    { text: 'JWT Implementation: Create, sign (using HMAC), and verify a JSON Web Token complete with expiration payload logic.' },
    { text: 'SQLi Remediation: Provide a snippet of vulnerable raw SQL query code and rewrite it using parameterized queries to fix SQL Injection.' },
    { text: 'XSS Defense: Write a secure React component or raw DOM manipulation code that safely sanitizes and displays user-provided HTML.' },
    { text: 'CSRF Protection: Outline the logic for implementing an Anti-CSRF token mechanism in an Express/Node.js stack.' },
    { text: 'Secure Session Control: Code a middleware that creates a secure, HttpOnly, SameSite strict session cookie upon successful login.' },
    { text: 'DDoS Prevention: Implement a basic API rate limiting middleware using sliding window concept in Redis or Memory.' },
    { text: 'File Upload Safety: Write a backend check to rigidly validate file type (using Magic Bytes) and size before accepting user uploads.' },
    { text: 'Password Policies: Create a Regular Expression and validation function to enforce strict password strength rules.' },
    { text: 'Network Toolkit: Write a minimal Python script using sockets to scan common ports (80, 443, 22) on a target IP.' },
    { text: 'Traffic Analysis: Show how to write a basic packet sniffer using Python Scapy to capture only TCP traffic.' },
    { text: 'Firewall Logic: Write pseudo-code for a WAF (Web Application Firewall) that blocks requests containing common SQLi payloads.' },
    { text: 'Intrusion Detection: Create a script that parses auth.log or nginx access logs to detect repeated failed login attempts from a single IP.' },
    { text: 'Brute Force Mitigation: Implement a dynamic account lockout mechanism after 5 consecutive failed login attempts.' },
    { text: 'Log Anomaly Analysis: Write a python script using Pandas to group and count HTTP status codes from a web server log file.' },
    { text: 'ML Threat Hunting: Describe a simple heuristic or Machine Learning logic snippet to flag suspicious URLs based on length and special characters.' },
    { text: 'Email Security Analysis: Write a function that scans an email body for common phishing keywords (e.g., "Urgent", "Account Suspended").' },
    { text: 'Malware Identification: Implement logic to map a given file hash against a list of known malicious MD5 signatures.' },
    { text: 'Anomaly Statistics: Compute the baseline average API requests per user, and write logic to flag users exceeding 3 standard deviations.' },
    { text: 'Geo-fencing Logins: Implement an anomaly check that triggers an alert if the same user logs in from two distant physical locations within minutes.' },
    { text: 'Volumetric Detection: Create logic to detect SYN Flood characteristics (e.g., many half-open connections with no ACK).' },
    { text: 'API Abuse: Write an endpoint validator that ensures requests have necessary auth headers, payload size limits, and expected schemas.' },
    { text: 'System Architecture (Web): Sketch or describe a 3-tier secure architecture (Proxy/WAF -> App -> private Subnet DB) highlighting network rules.' },
    { text: 'Zero Trust Implementation: Design a scenario where microservices must mutually authenticate (mTLS) to communicate.' },
    { text: 'SOC Workflow Automation: Provide an automation script (SOAR snippet) that auto-bans an IP on the firewall upon receiving a high-severity SIEM alert.' },
    { text: 'Secrets Manager Integration: Write code connecting to AWS Secrets Manager or HashiCorp Vault to fetch a DB password dynamically at Boot time.' },
    { text: 'AI SecOps: Describe a neural-network architecture outline that ingests packet flows to detect previously unknown C2 server communications.' }
];

practicalQuestions.forEach((pq) => {
    fullExamQuestions.push({
        type: 'Coding',
        text: pq.text,
        options: [],
        correctAnswer: '' // Handled by manual grading or compiler tests
    });
});

const seedCyber100QuestionExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        // console.log('MongoDB Connected correctly.');

        await Exam.deleteOne({ title: 'Cyber Security – 100 Questions Exam' });

        // Check if Cyber Security domain exists, else get a placeholder or create one
        let domain = await Domain.findOne({ name: 'Cyber Security' });
        if (!domain) {
            domain = new Domain({
                name: 'Cyber Security',
                description: 'Network defense, Cryptography, Web Security, and DevSecOps.'
            });
            await domain.save();
        }

        const examObj = new Exam({
            title: 'Cyber Security – 100 Questions Exam',
            type: 'Full-length Mock',
            durationMinutes: 180,
            domainId: domain._id,
            questions: fullExamQuestions
        });

        await examObj.save();
        console.log('Successfully seeded Cyber Security 100 question exam. Total length: ', examObj.questions.length);

        process.exit(0);
    } catch (err) {
        console.error('Failed to seed exam:');
        console.error(err);
        process.exit(1);
    }
};

seedCyber100QuestionExam();
