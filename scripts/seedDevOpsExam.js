const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
require('dotenv').config();

const questions = [
    // --- MCQs (1-70) ---
    { questionText: "DevOps ka primary goal kya hai?", type: "mcq", options: ["Development slow karna", "Dev + Ops collaboration improve karna", "Only testing", "Only deployment"], correctAnswer: "Dev + Ops collaboration improve karna", difficulty: "Easy" },
    { questionText: "DevOps lifecycle me kya include hota hai?", type: "mcq", options: ["Plan", "Build", "Deploy", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "CI ka full form?", type: "mcq", options: ["Continuous Integration", "Code Integration", "Cloud Integration", "Continuous Internet"], correctAnswer: "Continuous Integration", difficulty: "Easy" },
    { questionText: "CD ka full form?", type: "mcq", options: ["Continuous Deployment / Delivery", "Code Deployment", "Cloud Delivery", "Continuous Debug"], correctAnswer: "Continuous Deployment / Delivery", difficulty: "Easy" },
    { questionText: "Agile DevOps me kya improve karta hai?", type: "mcq", options: ["Speed", "Collaboration", "Automation", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "DevOps pipeline kya hoti hai?", type: "mcq", options: ["Water pipeline", "Automated software workflow", "Network cable", "API"], correctAnswer: "Automated software workflow", difficulty: "Easy" },
    { questionText: "Feedback loop ka role?", type: "mcq", options: ["Monitoring improve karna", "Code delete", "Encrypt", "Backup"], correctAnswer: "Monitoring improve karna", difficulty: "Easy" },
    { questionText: "Version control ka example?", type: "mcq", options: ["Git", "Docker", "Jenkins", "Linux"], correctAnswer: "Git", difficulty: "Easy" },
    { questionText: "DevSecOps kya hai?", type: "mcq", options: ["DevOps + Security", "Only security", "Testing", "Deployment"], correctAnswer: "DevOps + Security", difficulty: "Easy" },
    { questionText: "Infrastructure automation ka tool?", type: "mcq", options: ["Terraform", "HTML", "CSS", "React"], correctAnswer: "Terraform", difficulty: "Easy" },
    { questionText: "Linux me root user kya hota hai?", type: "mcq", options: ["Guest", "Admin", "Service", "Hidden"], correctAnswer: "Admin", difficulty: "Easy" },
    { questionText: "File list command?", type: "mcq", options: ["ls", "list", "dir", "show"], correctAnswer: "ls", difficulty: "Easy" },
    { questionText: "Directory change command?", type: "mcq", options: ["cd", "mv", "cp", "pwd"], correctAnswer: "cd", difficulty: "Easy" },
    { questionText: "File copy command?", type: "mcq", options: ["mv", "cp", "copy", "duplicate"], correctAnswer: "cp", difficulty: "Easy" },
    { questionText: "Permission change command?", type: "mcq", options: ["chmod", "chown", "perm", "access"], correctAnswer: "chmod", difficulty: "Easy" },
    { questionText: "Process check command?", type: "mcq", options: ["ps", "run", "proc", "top"], correctAnswer: "ps", difficulty: "Easy" },
    { questionText: "Shell scripting kis liye use hoti hai?", type: "mcq", options: ["Automation", "UI", "DB", "API"], correctAnswer: "Automation", difficulty: "Easy" },
    { questionText: "Cron job kya hota hai?", type: "mcq", options: ["Scheduled task", "Virus", "DB job", "Backup"], correctAnswer: "Scheduled task", difficulty: "Easy" },
    { questionText: "Environment variable example?", type: "mcq", options: ["PATH", "HOME", "USER", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "Log files kahan store hote hain?", type: "mcq", options: ["/var/log", "/home", "/bin", "/root"], correctAnswer: "/var/log", difficulty: "Easy" },
    { questionText: "git init ka use kis liye hota hai?", type: "mcq", options: ["To delete repository", "To initialize a new local repository", "To connect to GitHub", "To clone code"], correctAnswer: "To initialize a new local repository", difficulty: "Easy" },
    { questionText: "git clone command kya karta hai?", type: "mcq", options: ["Delete code", "Copy remote repository to local", "Create new branch", "Commit changes"], correctAnswer: "Copy remote repository to local", difficulty: "Easy" },
    { questionText: "git commit ka major purpose kya hai?", type: "mcq", options: ["Send file to cloud", "Save staged changes with a message", "Delete history", "Download latest code"], correctAnswer: "Save staged changes with a message", difficulty: "Easy" },
    { questionText: "git push command kya action perform karta hai?", type: "mcq", options: ["Upload local commits to remote repository", "Download remote changes", "Initialize git", "Staging files"], correctAnswer: "Upload local commits to remote repository", difficulty: "Easy" },
    { questionText: "git pull aur git fetch me major difference?", type: "mcq", options: ["No difference", "Pull automatically merges changes, Fetch only downloads them", "Fetch merges automatically", "Pull only downloads"], correctAnswer: "Pull automatically merges changes, Fetch only downloads them", difficulty: "Medium" },
    { questionText: "Branching ka primary concept kya hai?", type: "mcq", options: ["Slow down development", "Create parallel workspace for features", "Delete code safe", "Network connection"], correctAnswer: "Create parallel workspace for features", difficulty: "Easy" },
    { questionText: "Merge conflict kab hota hai?", type: "mcq", options: ["When merging identical files", "When different changes are made to the same line of code", "On every git push", "When using single branch"], correctAnswer: "When different changes are made to the same line of code", difficulty: "Medium" },
    { questionText: "Git Rebase kya hai?", type: "mcq", options: ["Deleting history", "Moving/Combining sequence of commits to a new base", "Creating image", "Checking logs"], correctAnswer: "Moving/Combining sequence of commits to a new base", difficulty: "Hard" },
    { questionText: ".gitignore file ka use?", type: "mcq", options: ["To store passwords", "To exclude specific files from tracking", "To delete git", "To speed up push"], correctAnswer: "To exclude specific files from tracking", difficulty: "Easy" },
    { questionText: "Git vs GitHub me kya difference hai?", type: "mcq", options: ["Both same", "Git is a tool, GitHub is a hosting service", "GitHub is local, Git is cloud", "None"], correctAnswer: "Git is a tool, GitHub is a hosting service", difficulty: "Easy" },

    { questionText: "Jenkins kya hai?", type: "mcq", options: ["DB", "CI/CD Orchestration tool", "UI framework", "Operating system"], correctAnswer: "CI/CD Orchestration tool", difficulty: "Easy" },
    { questionText: "GitHub Actions ka use?", type: "mcq", options: ["Watching movies", "Automating CI/CD workflows directly in GitHub", "Only chatting", "Editing images"], correctAnswer: "Automating CI/CD workflows directly in GitHub", difficulty: "Easy" },
    { questionText: "Pipeline as code (PaC) ka matlab?", type: "mcq", options: ["Physical pipes", "Defining deployment pipelines through configuration files", "Only manual steps", "None"], correctAnswer: "Defining deployment pipelines through configuration files", difficulty: "Medium" },
    { questionText: "Build stage ka primary function?", type: "mcq", options: ["Delete code", "Compile code and create executables", "Deploy to production", "Send email"], correctAnswer: "Compile code and create executables", difficulty: "Easy" },
    { questionText: "Artifact kya hota hai?", type: "mcq", options: ["Output generated by a build process (jar, war, image)", "Old history", "Trash files", "Source code"], correctAnswer: "Output generated by a build process (jar, war, image)", difficulty: "Medium" },
    { questionText: "Test automation ka CI/CD me role?", type: "mcq", options: ["Manual testing ONLY", "Early bug detection and quality assurance", "Slow down the pipeline", "Not needed"], correctAnswer: "Early bug detection and quality assurance", difficulty: "Easy" },
    { questionText: "Common Deployment strategy?", type: "mcq", options: ["Big Bang", "Blue-Green", "In-place", "All of above"], correctAnswer: "All of above", difficulty: "Medium" },
    { questionText: "Blue-Green deployment me kya hota hai?", type: "mcq", options: ["Two identical production environments", "Only one server", "Deleting old environment", "Testing in dark"], correctAnswer: "Two identical production environments", difficulty: "Medium" },
    { questionText: "Canary deployment ka matlab?", type: "mcq", options: ["Releasing to a small subset of users first", "Releasing to everyone together", "Only internal testing", "None"], correctAnswer: "Releasing to a small subset of users first", difficulty: "Medium" },
    { questionText: "DevOps me Rollback ka kya significance hai?", type: "mcq", options: ["Moving forward", "Reverting to a previous stable state on failure", "Backup ONLY", "Scaling"], correctAnswer: "Reverting to a previous stable state on failure", difficulty: "Medium" },

    { questionText: "Docker kya hai?", type: "mcq", options: ["Containerization platform", "VM", "OS", "IDE"], correctAnswer: "Containerization platform", difficulty: "Easy" },
    { questionText: "Docker Image kya hoti hai?", type: "mcq", options: ["Read-only template with instructions", "Running container", "Network config", "Physical disk"], correctAnswer: "Read-only template with instructions", difficulty: "Easy" },
    { questionText: "Docker Container kya hai?", type: "mcq", options: ["Running instance of an image", "File system", "OS Kernel", "Database"], correctAnswer: "Running instance of an image", difficulty: "Easy" },
    { questionText: "Dockerfile ka use?", type: "mcq", options: ["To define image build instructions", "To view logs", "To monitor CPU", "To store secrets"], correctAnswer: "To define image build instructions", difficulty: "Easy" },
    { questionText: "Port mapping (80:8080) ka kya purpose hai?", type: "mcq", options: ["Mapping host port to container port", "Storage limit", "Security group", "None"], correctAnswer: "Mapping host port to container port", difficulty: "Medium" },
    { questionText: "Docker Volumes kis liye use hote hain?", type: "mcq", options: ["To delete data", "To persist data outside containers", "To increase speed", "For networking only"], correctAnswer: "To persist data outside containers", difficulty: "Medium" },
    { questionText: "Docker Compose ka role?", type: "mcq", options: ["Single container management", "Defining and running multi-container applications", "Building UI", "None"], correctAnswer: "Defining and running multi-container applications", difficulty: "Medium" },
    { questionText: "Docker Registry (like Docker Hub) kya hai?", type: "mcq", options: ["Storage for Docker images", "Operating system", "Network tool", "Database"], correctAnswer: "Storage for Docker images", difficulty: "Easy" },
    { questionText: "Docker layers caching ka kya advantage hai?", type: "mcq", options: ["Slow build", "Faster subsequent builds using cached layers", "Encryption", "Security"], correctAnswer: "Faster subsequent builds using cached layers", difficulty: "Medium" },
    { questionText: "Multi-stage build Dockerfile se kya hota hai?", type: "mcq", options: ["Bigger images", "Reduced final image size", "More errors", "None"], correctAnswer: "Reduced final image size", difficulty: "Hard" },

    { questionText: "Kubernetes (K8s) kya hai?", type: "mcq", options: ["Container runtime", "Orchestration platform for containers", "Operating system", "IDE"], correctAnswer: "Orchestration platform for containers", difficulty: "Easy" },
    { questionText: "K8s Pod kya hota hai?", type: "mcq", options: ["Smallest deployable unit (contains 1 or more containers)", "Large cluster", "Physical server", "Network cable"], correctAnswer: "Smallest deployable unit (contains 1 or more containers)", difficulty: "Easy" },
    { questionText: "K8s Node kya hota hai?", type: "mcq", options: ["Worker machine in K8s", "Single app", "Internal API", "File"], correctAnswer: "Worker machine in K8s", difficulty: "Easy" },
    { questionText: "Kubernetes Cluster ka matlab?", type: "mcq", options: ["Set of nodes running K8s", "Single container", "Database set", "None"], correctAnswer: "Set of nodes running K8s", difficulty: "Easy" },
    { questionText: "K8s Deployment ka primary responsibility?", type: "mcq", options: ["Stateful storage", "Managing desired state of pods (scaling/updates)", "Only networking", "Backup"], correctAnswer: "Managing desired state of pods (scaling/updates)", difficulty: "Medium" },
    { questionText: "Common K8s Service type?", type: "mcq", options: ["ClusterIP", "NodePort", "LoadBalancer", "All of above"], correctAnswer: "All of above", difficulty: "Medium" },
    { questionText: "Service Load balancing K8s me kaise help karta hai?", type: "mcq", options: ["It distributes traffic across pods", "It deletes pods", "It makes system slow", "None"], correctAnswer: "It distributes traffic across pods", difficulty: "Medium" },
    { questionText: "ConfigMap ka purpose?", type: "mcq", options: ["Store sensitive data", "Store non-confidential data in key-value pairs", "Networking", "Volume creation"], correctAnswer: "Store non-confidential data in key-value pairs", difficulty: "Medium" },
    { questionText: "K8s Secret vs ConfigMap major difference?", type: "mcq", options: ["Both same", "Secret stores sensitive info, ConfigMap non-sensitive", "Secret is public", "ConfigMap is encrypted"], correctAnswer: "Secret stores sensitive info, ConfigMap non-sensitive", difficulty: "Medium" },
    { questionText: "HPA (Horizontal Pod Autoscaler) kya monitor karta hai?", type: "mcq", options: ["Resource usage to scale pods", "Network speed", "Git commits", "None"], correctAnswer: "Resource usage to scale pods", difficulty: "Hard" },

    { questionText: "AWS EC2 instance kya hai?", type: "mcq", options: ["Database", "Virtual Server", "Object Storage", "Network"], correctAnswer: "Virtual Server", difficulty: "Easy" },
    { questionText: "AWS S3 ka use?", type: "mcq", options: ["Computing", "Scalable object storage (files)", "Networking", "Monitoring"], correctAnswer: "Scalable object storage (files)", difficulty: "Easy" },
    { questionText: "Cloud Load Balancer ka role?", type: "mcq", options: ["Increase CPU", "Distribute incoming traffic across instances", "Encryption", "Storage"], correctAnswer: "Distribute incoming traffic across instances", difficulty: "Easy" },
    { questionText: "Cloud Auto Scaling kya maintain karta hai?", type: "mcq", options: ["Fixed number of servers", "Scaling servers based on demand automatically", "Internet speed", "None"], correctAnswer: "Scaling servers based on demand automatically", difficulty: "Medium" },
    { questionText: "IAM role ka purpose?", type: "mcq", options: ["Only login", "Identity and Access Management for cloud resources", "Storage management", "None"], correctAnswer: "Identity and Access Management for cloud resources", difficulty: "Medium" },
    { questionText: "CloudWatch kya monitoring tool hai?", type: "mcq", options: ["AWS Monitoring & Management service", "DB tool", "IDE", "Deployment tool"], correctAnswer: "AWS Monitoring & Management service", difficulty: "Easy" },
    { questionText: "Prometheus ka secondary storage model?", type: "mcq", options: ["Relational DB", "Time-series database", "Graph DB", "None"], correctAnswer: "Time-series database", difficulty: "Hard" },
    { questionText: "Grafana kis liye famous hai?", type: "mcq", options: ["Deployment", "Metric visualization and dashboards", "Code editor", "Networking"], correctAnswer: "Metric visualization and dashboards", difficulty: "Easy" },
    { questionText: "ELK Stack ka components?", type: "mcq", options: ["Elasticsearch, Logstash, Kibana", "Exams, Linux, Kubernetes", "Express, Laravel, Kotlin", "None"], correctAnswer: "Elasticsearch, Logstash, Kibana", difficulty: "Medium" },
    { questionText: "Uptime monitoring kisse measure hoti hai?", type: "mcq", options: ["Availability of system (e.g. 99.9%)", "Code size", "Branch count", "User color"], correctAnswer: "Availability of system (e.g. 99.9%)", difficulty: "Easy" },

    // --- Coding / Practical Questions (71-100) ---
    { questionText: "Write a Bash script to automate daily backups of a directory '/data' into '/backups' with current date in filename.", type: "coding", difficulty: "Medium" },
    { questionText: "Create a Linux script that finds all '.log' files larger than 100MB in '/var/logs' and moves them to '/tmp/archives'.", type: "coding", difficulty: "Medium" },
    { questionText: "Develop a shell script that checks CPU usage. If it exceeds 80%, send a notification or append an alert to 'alert.log'.", type: "coding", difficulty: "Hard" },
    { questionText: "Automate cron job setup: Write a script that adds a task to crontab to run 'sync.sh' every day at midnight.", type: "coding", difficulty: "Medium" },
    { questionText: "Write a script that takes a list of usernames as input and creates those users in the Linux system with default passwords.", type: "coding", difficulty: "Hard" },

    { questionText: "Write a basic GitHub Actions YAML for a Node.js project that runs 'npm install' and 'npm test' on every push.", type: "coding", difficulty: "Medium" },
    { questionText: "Design a Git branching strategy workflow in markdown/text: Explain how Feature, Develop, and Main branches interact.", type: "coding", difficulty: "Medium" },
    { questionText: "Create a pseudo CI pipeline that triggers a Docker build only if unit tests pass.", type: "coding", difficulty: "Hard" },
    { questionText: "Write a shell script that deploys a simple static HTML file to an Nginx server automatically by copying files to '/var/www/html'.", type: "coding", difficulty: "Medium" },
    { questionText: "Implement a rollback logic script: If deployment fails (exit code non-zero), restore the previous backup from '/backups/current'.", type: "coding", difficulty: "Hard" },

    { questionText: "Write a Dockerfile for a React application (use Node base image, install deps, build, expose port 3000).", type: "coding", difficulty: "Medium" },
    { questionText: "Define a 'docker-compose.yml' file for a 2-tier app: A Node.js backend and a MongoDB database.", type: "coding", difficulty: "Medium" },
    { questionText: "Write the command to run a Docker container with an external volume mounted to '/app/data' for data persistence.", type: "coding", difficulty: "Medium" },
    { questionText: "Create a custom Docker network named 'app-net' and run two containers ('web' and 'db') inside that network.", type: "coding", difficulty: "Medium" },
    { questionText: "Optimize image: Write a multi-stage Dockerfile that builds a Go app and copies only the binary into an 'alpine' base.", type: "coding", difficulty: "Hard" },

    { questionText: "Write a Kubernetes 'pod.yaml' file for an Nginx container with port 80 exposed.", type: "coding", difficulty: "Medium" },
    { questionText: "Draft a K8s 'deployment.yaml' that ensures 3 replicas of your application are always running.", type: "coding", difficulty: "Medium" },
    { questionText: "Write a K8s 'service.yaml' of type LoadBalancer that exposes your 'web-app' deployment on port 80.", type: "coding", difficulty: "Medium" },
    { questionText: "Create a Kubernetes manifest for a ConfigMap that stores 'database_url' and 'api_key' for an application.", type: "coding", difficulty: "Medium" },
    { questionText: "Setup HPA: Write the YAML manifest to auto-scale a deployment based on 50% CPU utilization.", type: "coding", difficulty: "Hard" },

    { questionText: "AWS Automation: Write a basic Terraform script (main.tf) to provision an AWS EC2 instance.", type: "coding", difficulty: "Hard" },
    { questionText: "Cloud Storage: Write a script using AWS CLI to upload all files from a local directory to an S3 bucket.", type: "coding", difficulty: "Medium" },
    { questionText: "Infrastructure as Code: Write a Terraform snippet to create a Security Group allowing port 80 and 22.", type: "coding", difficulty: "Medium" },
    { questionText: "Provisioning: Write a simple Ansible Playbook to install Nginx and start the service on remote servers.", type: "coding", difficulty: "Hard" },
    { questionText: "Security: Write a configuration block for Nginx to enable SSL redirection (HTTP to HTTPS).", type: "coding", difficulty: "Hard" },
    { questionText: "Monitoring: Draft a Prometheus alert rule that triggers if an 'instance_down' happens for more than 5 minutes.", type: "coding", difficulty: "Hard" },
    { questionText: "Pipeline: Design a complete CI/CD workflow description: Source -> CI -> Registry -> K8s Staging -> K8s Production.", type: "coding", difficulty: "Hard" },
    { questionText: "Secrets: Write a Kubernetes manifest for a Secret using base64 encoded strings for 'DB_PASSWORD'.", type: "coding", difficulty: "Medium" },
    { questionText: "Architecture: Describe a Blue-Green deployment strategy using an Ingress controller in Kubernetes.", type: "coding", difficulty: "Hard" },
    { questionText: "Final Challenge: Design and describe a production-ready DevOps architecture for a globally distributed microservices app.", type: "coding", difficulty: "Hard" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'DevOps & Cloud' });
        if (!domain) {
            console.error('DevOps domain not found. Please ensure domains are seeded first.');
            process.exit(1);
        }

        // Delete existing DevOps exams to avoid duplicates
        await Exam.deleteMany({ title: "DevOps – 100 Questions Exam" });

        const devOpsExam = new Exam({
            domainId: domain._id,
            title: "DevOps – 100 Questions Exam",
            type: "Full-length Mock",
            durationMinutes: 120, // 2 hours for 100 questions
            questions: questions
        });

        await devOpsExam.save();
        console.log('Successfully seeded DevOps - 100 Questions Exam');

        await mongoose.connection.close();
        console.log('Done');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
