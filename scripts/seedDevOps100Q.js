require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const fullExamQuestions = [
    // Section A — MCQ (1–70)
    // DevOps Fundamentals (1–10)
    {
        type: 'MCQ',
        text: 'What is the primary goal of DevOps?',
        options: ['Slowing down development to ensure stability', 'Improving collaboration between Development and Operations for faster, reliable delivery', 'Focusing strictly on QA Testing', 'Optimizing hardware servers physically'],
        correctAnswer: 'Improving collaboration between Development and Operations for faster, reliable delivery'
    },
    {
        type: 'MCQ',
        text: 'Which phases are typically included in the DevOps Lifecycle?',
        options: ['Plan, Code, Build, Test, Release, Deploy, Operate, Monitor', 'Just Writing Code and Debugging', 'Only Testing and Monitoring', 'Design, Build, Stop'],
        correctAnswer: 'Plan, Code, Build, Test, Release, Deploy, Operate, Monitor'
    },
    {
        type: 'MCQ',
        text: 'What does CI stand for in CI/CD?',
        options: ['Continuous Integration', 'Code Integration', 'Cloud Integration', 'Continuous Internet'],
        correctAnswer: 'Continuous Integration'
    },
    {
        type: 'MCQ',
        text: 'What does CD stand for in CI/CD?',
        options: ['Continuous Deployment / Continuous Delivery', 'Code Deployment', 'Cloud Delivery', 'Continuous Debugging'],
        correctAnswer: 'Continuous Deployment / Continuous Delivery'
    },
    {
        type: 'MCQ',
        text: 'What does implementing Agile principles within DevOps primarily improve?',
        options: ['Speed, Collaboration, and Automation through iterative cycles', 'Hardware manufacturing speed', 'The physical size of servers', 'Database table architecture'],
        correctAnswer: 'Speed, Collaboration, and Automation through iterative cycles'
    },
    {
        type: 'MCQ',
        text: 'What is a DevOps Pipeline?',
        options: ['An automated set of processes and tools that developers and operations staff use to compile, build, and deploy code', 'A literal pipe for cooling datacenters', 'A manual checklist given to QA engineers', 'An HTTP request handler'],
        correctAnswer: 'An automated set of processes and tools that developers and operations staff use to compile, build, and deploy code'
    },
    {
        type: 'MCQ',
        text: 'What is the role of a Feedback Loop in DevOps?',
        options: ['To automatically delete old logs', 'To rapidly provide information back to developers regarding code performance, errors, or security flaws in production', 'To slow down server traffic', 'To encrypt network packets'],
        correctAnswer: 'To rapidly provide information back to developers regarding code performance, errors, or security flaws in production'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of a Version Control System?',
        options: ['Git', 'Docker', 'Jenkins', 'Linux'],
        correctAnswer: 'Git'
    },
    {
        type: 'MCQ',
        text: 'What does DevSecOps mean?',
        options: ['Integrating Security practices seamlessly into the DevOps lifecycle (Development + Security + Operations)', 'Only auditing servers once a year', 'Using HTTP instead of HTTPS', 'A specific brand of antivirus'],
        correctAnswer: 'Integrating Security practices seamlessly into the DevOps lifecycle (Development + Security + Operations)'
    },
    {
        type: 'MCQ',
        text: 'Which is a popular tool for Infrastructure as Code (IaC) automation?',
        options: ['Terraform', 'HTML', 'CSS', 'React'],
        correctAnswer: 'Terraform'
    },

    // Linux & Scripting (11–20)
    {
        type: 'MCQ',
        text: 'What is the "root" user in Linux?',
        options: ['A temporary guest profile', 'The superuser or system administrator with absolute privileges', 'A background network service', 'Hidden inactive user account'],
        correctAnswer: 'The superuser or system administrator with absolute privileges'
    },
    {
        type: 'MCQ',
        text: 'Which command is used to list directory contents in Linux?',
        options: ['ls', 'list', 'dir', 'show'],
        correctAnswer: 'ls'
    },
    {
        type: 'MCQ',
        text: 'Which command is used to change directories in Linux?',
        options: ['cd', 'mv', 'cp', 'pwd'],
        correctAnswer: 'cd'
    },
    {
        type: 'MCQ',
        text: 'Which command is used to copy files and directories in Linux?',
        options: ['mv', 'cp', 'copy', 'duplicate'],
        correctAnswer: 'cp'
    },
    {
        type: 'MCQ',
        text: 'Which command changes file permissions in Linux?',
        options: ['chmod', 'chown', 'perm', 'access'],
        correctAnswer: 'chmod'
    },
    {
        type: 'MCQ',
        text: 'Which command is used to report a snapshot of current running processes?',
        options: ['ps', 'run', 'proc', 'ls'],
        correctAnswer: 'ps'
    },
    {
        type: 'MCQ',
        text: 'What is Shell Scripting primarily used for in DevOps?',
        options: ['Automating repetitive tasks, configuring environments, and executing sequential commands via a script', 'Designing web frontend UIs', 'Replacing relational databases completely', 'Interacting with HTTP REST APIs directly without tools'],
        correctAnswer: 'Automating repetitive tasks, configuring environments, and executing sequential commands via a script'
    },
    {
        type: 'MCQ',
        text: 'What is a Cron job?',
        options: ['A time-based job scheduler in Unix-like operating systems to run tasks automatically', 'A computer virus', 'A database transaction process', 'A backup log file'],
        correctAnswer: 'A time-based job scheduler in Unix-like operating systems to run tasks automatically'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is a classic example of an Environment Variable in Linux?',
        options: ['PATH', 'HOME', 'USER', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'By convention, where are system log files typically stored in Linux?',
        options: ['/var/log', '/home', '/bin', '/root'],
        correctAnswer: '/var/log'
    },

    // Git & Version Control (21–30)
    {
        type: 'MCQ',
        text: 'What does the command `git init` do?',
        options: ['Deletes a repository', 'Initializes a new Git repository in an existing directory', 'Pushes code to GitHub', 'Downloads an existing repository'],
        correctAnswer: 'Initializes a new Git repository in an existing directory'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of `git clone`?',
        options: ['To copy a repository from a remote server to your local machine', 'To copy a file securely', 'To duplicate an image tag', 'To branch out from main'],
        correctAnswer: 'To copy a repository from a remote server to your local machine'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of a `git commit`?',
        options: ['To upload code online instantly', 'To record a snapshot of the repository\'s staged changes along with a customized message', 'To merge branches', 'To fetch latest changes'],
        correctAnswer: 'To record a snapshot of the repository\'s staged changes along with a customized message'
    },
    {
        type: 'MCQ',
        text: 'What does `git push` do?',
        options: ['Updates local repository with changes from the remote server', 'Uploads local repository content (commits) to a remote repository (like GitHub)', 'Creates a new local branch', 'Deletes unstaged modifications'],
        correctAnswer: 'Uploads local repository content (commits) to a remote repository (like GitHub)'
    },
    {
        type: 'MCQ',
        text: 'What is the main difference between `git pull` and `git fetch`?',
        options: ['`fetch` downloads changes from remote without merging; `pull` does exactly what `fetch` does but immediately merges the changes into your local branch', 'There is no difference', '`pull` uploads code, `fetch` downloads it', '`fetch` deletes remote branches'],
        correctAnswer: '`fetch` downloads changes from remote without merging; `pull` does exactly what `fetch` does but immediately merges the changes into your local branch'
    },
    {
        type: 'MCQ',
        text: 'What is a Branch in Git?',
        options: ['An independent line of development, allowing workers to collaborate without messing up the main codebase', 'A connection point between a network', 'A folder structure block', 'A different server'],
        correctAnswer: 'An independent line of development, allowing workers to collaborate without messing up the main codebase'
    },
    {
        type: 'MCQ',
        text: 'What is a Merge Conflict?',
        options: ['An argument between two developers over syntax', 'When Git encounters competing changes (e.g. edits to the same line) and cannot automatically merge branches', 'A server timeout issue', 'When an SSH key is rejected'],
        correctAnswer: 'When Git encounters competing changes (e.g. edits to the same line) and cannot automatically merge branches'
    },
    {
        type: 'MCQ',
        text: 'What does `git rebase` do conceptually?',
        options: ['It changes the UI of GitHub', 'It moves or combines a sequence of commits to a new base commit smoothly, creating a cleaner linear history', 'It deletes the entire remote repository', 'It prevents commit conflicts permanently'],
        correctAnswer: 'It moves or combines a sequence of commits to a new base commit smoothly, creating a cleaner linear history'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of a `.gitignore` file?',
        options: ['To ignore syntax errors during compilation', 'To specify intentionally untracked files/directories that Git should ignore (e.g. `.env`, node_modules)', 'To block bad IP addresses', 'To reject pull requests'],
        correctAnswer: 'To specify intentionally untracked files/directories that Git should ignore (e.g. `.env`, node_modules)'
    },
    {
        type: 'MCQ',
        text: 'What is the difference between Git and GitHub?',
        options: ['Git is a free and open-source version control software; GitHub is an online service that hosts Git repositories', 'Git is for Windows, GitHub is for Mac', 'There is absolutely no difference', 'Git is used only for images'],
        correctAnswer: 'Git is a free and open-source version control software; GitHub is an online service that hosts Git repositories'
    },

    // CI/CD Tools (31–40)
    {
        type: 'MCQ',
        text: 'What is Jenkins fundamentally?',
        options: ['A cloud database platform', 'An open-source automation server designed to build, test, and deploy software in a CI/CD pipeline', 'An operating system specifically for hackers', 'A CSS preprocessing tool'],
        correctAnswer: 'An open-source automation server designed to build, test, and deploy software in a CI/CD pipeline'
    },
    {
        type: 'MCQ',
        text: 'What are GitHub Actions?',
        options: ['A feature to ban users from your repository', 'A CI/CD automation platform native to GitHub that lets you create workflows to build, test, and deploy code right from GitHub', 'A ticketing system for PMs', 'A chat forum for developers'],
        correctAnswer: 'A CI/CD automation platform native to GitHub that lets you create workflows to build, test, and deploy code right from GitHub'
    },
    {
        type: 'MCQ',
        text: 'What does "Pipeline as Code" mean?',
        options: ['Writing pipelines explicitly in YAML or Groovy files stored in version control instead of clicking manual UI configurations', 'Encrypting the pipeline', 'Writing code that generates pipelines dynamically at runtime', 'Never testing the code'],
        correctAnswer: 'Writing pipelines explicitly in YAML or Groovy files stored in version control instead of clicking manual UI configurations'
    },
    {
        type: 'MCQ',
        text: 'What primarily happens in the "Build stage" of a CD pipeline?',
        options: ['The source code is compiled, dependencies are fetched, and deployable artifacts (like a JAR or Docker image) are generated', 'The database is wiped clean', 'The code is permanently deployed to production', 'The developer gets paid'],
        correctAnswer: 'The source code is compiled, dependencies are fetched, and deployable artifacts (like a JAR or Docker image) are generated'
    },
    {
        type: 'MCQ',
        text: 'What is a build "Artifact"?',
        options: ['A visual glitch in CSS', 'The deployable output generated by the build process (e.g., an executable, a .zip file, an image)', 'A corrupted database record', 'A historical piece of code'],
        correctAnswer: 'The deployable output generated by the build process (e.g., an executable, a .zip file, an image)'
    },
    {
        type: 'MCQ',
        text: 'Why is Test Automation critical in a CI/CD Pipeline?',
        options: ['Because humans cannot test software', 'Because it ensures code changes do not break existing functionality and allows fast, reliable feedback continuously', 'Because it rewrites code using AI', 'It is not actually necessary if developers are good'],
        correctAnswer: 'Because it ensures code changes do not break existing functionality and allows fast, reliable feedback continuously'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is considered an Advanced Deployment Strategy?',
        options: ['Blue-Green Deployment', 'Canary Release', 'Rolling Update', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'What defines a Blue-Green Deployment?',
        options: ['Running two identical production environments (Blue and Green). Traffic shifts instantly to the new version once verified, allowing point-in-time rollbacks', 'Replacing servers over a period of weeks', 'Changing the UI strictly between blue and green themes', 'None of the above'],
        correctAnswer: 'Running two identical production environments (Blue and Green). Traffic shifts instantly to the new version once verified, allowing point-in-time rollbacks'
    },
    {
        type: 'MCQ',
        text: 'What defines a Canary Deployment?',
        options: ['Releasing the new version sequentially to a tiny subset of users (e.g., 5%) to gauge health before a full rollout', 'Only deploying on weekends', 'Never deleting old code', 'Uploading code manually via FTP'],
        correctAnswer: 'Releasing the new version sequentially to a tiny subset of users (e.g., 5%) to gauge health before a full rollout'
    },
    {
        type: 'MCQ',
        text: 'What does "Rollback" mean in deployment?',
        options: ['Reverting a system or application to a previous stable state or version when a new deployment inherently fails', 'Stealing code from an older repository', 'Updating a database schema forward', 'Shutting down servers for maintenance'],
        correctAnswer: 'Reverting a system or application to a previous stable state or version when a new deployment inherently fails'
    },

    // Docker (41–50)
    {
        type: 'MCQ',
        text: 'What exactly is Docker?',
        options: ['An open-source OS to replace Linux', 'An open-platform for developing, shipping, and running applications inside lightweight, isolated containers', 'A hardware networking load-balancer', 'A Javascript UI framework'],
        correctAnswer: 'An open-platform for developing, shipping, and running applications inside lightweight, isolated containers'
    },
    {
        type: 'MCQ',
        text: 'What is a Docker Image?',
        options: ['A lightweight, standalone, executable package that includes everything needed to run a piece of software (code, runtime, libraries, settings)', 'A JPEG profile picture of an application', 'A running instance on a server', 'A dedicated physical volume layer'],
        correctAnswer: 'A lightweight, standalone, executable package that includes everything needed to run a piece of software (code, runtime, libraries, settings)'
    },
    {
        type: 'MCQ',
        text: 'What is a Docker Container?',
        options: ['A running memory instance of a Docker Image', 'The text file containing build instructions', 'The central hub for downloading images', 'A type of physical server memory'],
        correctAnswer: 'A running memory instance of a Docker Image'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of a Dockerfile?',
        options: ['To store logs and diagnostics', 'To define the instructions that daemon uses to automatically build a Docker image layer by layer', 'It is an alternate name for `package.json`', 'To compress the image size by 50%'],
        correctAnswer: 'To define the instructions that daemon uses to automatically build a Docker image layer by layer'
    },
    {
        type: 'MCQ',
        text: 'Why do we map ports (e.g. -p 8080:80) when running a Docker container?',
        options: ['To allow the host machine and external network to communicate with the isolated container via a dedicated port mapping', 'To increase disk space', 'To encrypt all HTTP traffic arbitrarily', 'To clone the container dynamically'],
        correctAnswer: 'To allow the host machine and external network to communicate with the isolated container via a dedicated port mapping'
    },
    {
        type: 'MCQ',
        text: 'What is a Docker Volume used for?',
        options: ['To play audio from a container', 'To persistently store stateful data across container restarts and deletions', 'To limit CPU usage', 'To deploy the image to the cloud seamlessly'],
        correctAnswer: 'To persistently store stateful data across container restarts and deletions'
    },
    {
        type: 'MCQ',
        text: 'What is Docker Compose?',
        options: ['A tool for defining and running multi-container Docker applications using a declarative YAML file configuration', 'An API to upload images explicitly', 'A UI to design application logs', 'A music generator app'],
        correctAnswer: 'A tool for defining and running multi-container Docker applications using a declarative YAML file configuration'
    },
    {
        type: 'MCQ',
        text: 'What is a Docker Registry (like Docker Hub)?',
        options: ['A local compiler suite', 'A centralized stateless system for storing and distributing container images via push/pull', 'An operating system kernel extension', 'A specialized SQL Database'],
        correctAnswer: 'A centralized stateless system for storing and distributing container images via push/pull'
    },
    {
        type: 'MCQ',
        text: 'What is Docker Layer Caching?',
        options: ['Deleting temporary cache files automatically', 'A mechanism where the Docker daemon re-uses intermediate image layers if instructions haven’t changed, greatly speeding up builds', 'Caching web traffic via Nginx physically inside Docker', 'Storing images completely in RAM'],
        correctAnswer: 'A mechanism where the Docker daemon re-uses intermediate image layers if instructions haven’t changed, greatly speeding up builds'
    },
    {
        type: 'MCQ',
        text: 'What is the primary benefit of a Multi-stage Docker build?',
        options: ['It drastically reduces the final image size by discarding build tools and source code, copying only the compiled production artifacts into the final stage', 'It runs containers linearly 1 by 1', 'It duplicates images across nodes', 'It bypasses required network permissions'],
        correctAnswer: 'It drastically reduces the final image size by discarding build tools and source code, copying only the compiled production artifacts into the final stage'
    },

    // Kubernetes (51–60)
    {
        type: 'MCQ',
        text: 'What is Kubernetes (K8s)?',
        options: ['An open-source container orchestration system for automating application deployment, scaling, and management', 'A language similar to Python', 'A version control alternative exactly like Git', 'A cloud hosting provider like AWS'],
        correctAnswer: 'An open-source container orchestration system for automating application deployment, scaling, and management'
    },
    {
        type: 'MCQ',
        text: 'What is the smallest deployable computing unit in Kubernetes?',
        options: ['Cluster', 'Node', 'Pod', 'Container'],
        correctAnswer: 'Pod'
    },
    {
        type: 'MCQ',
        text: 'What is a Node in Kubernetes?',
        options: ['A single physical or virtual machine that forms part of the cluster where Pods are scheduled to run', 'A lightweight virtual network port', 'A data volume partition', 'The master database controller'],
        correctAnswer: 'A single physical or virtual machine that forms part of the cluster where Pods are scheduled to run'
    },
    {
        type: 'MCQ',
        text: 'What constitutes a Kubernetes Cluster?',
        options: ['A set of node machines (master and worker nodes) running containerized applications collaboratively', 'A single file with a `.kube` extension', 'A Git branch specifically for infrastructure', 'A stack of unorganized Docker images'],
        correctAnswer: 'A set of node machines (master and worker nodes) running containerized applications collaboratively'
    },
    {
        type: 'MCQ',
        text: 'What does a Deployment object do in Kubernetes?',
        options: ['Provides declarative updates for Pods/ReplicaSets, defining desired state scaling and automated rollouts/rollbacks', 'Exposes applications to the public network globally', 'Securely stores passwords', 'Manages only hard drive encryption'],
        correctAnswer: 'Provides declarative updates for Pods/ReplicaSets, defining desired state scaling and automated rollouts/rollbacks'
    },
    {
        type: 'MCQ',
        text: 'Which Kubernetes Service type maps the service to a cloud provider’s external load balancer?',
        options: ['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName'],
        correctAnswer: 'LoadBalancer'
    },
    {
        type: 'MCQ',
        text: 'In Kubernetes networking, how does a Service achieve Load Balancing?',
        options: ['By copying the database to all nodes evenly', 'By maintaining a stable IP and predictably distributing proxy traffic continuously to healthy underlying Pods matching labels', 'By deleting offline pods securely', 'By pinging the server physically'],
        correctAnswer: 'By maintaining a stable IP and predictably distributing proxy traffic continuously to healthy underlying Pods matching labels'
    },
    {
        type: 'MCQ',
        text: 'What is a ConfigMap used for?',
        options: ['Storing completely sensitive secrets securely', 'Storing non-confidential data in key-value pairs separated from the image logic (e.g., config files, DB URLs)', 'Mapping network ports natively', 'Mapping global domain names'],
        correctAnswer: 'Storing non-confidential data in key-value pairs separated from the image logic (e.g., config files, DB URLs)'
    },
    {
        type: 'MCQ',
        text: 'What is a Secret in Kubernetes?',
        options: ['A highly encrypted physical hard drive file', 'An object that stores sensitive information natively such as passwords, OAuth tokens, and SSH keys in Base64', 'A hidden Pod that cannot be deleted natively', 'An undocumented K8s API protocol'],
        correctAnswer: 'An object that stores sensitive information natively such as passwords, OAuth tokens, and SSH keys in Base64'
    },
    {
        type: 'MCQ',
        text: 'What does the Horizontal Pod Autoscaler (HPA) do?',
        options: ['Upgrades the physical CPU size of a Node server', 'Automatically scales the number of Pod replicas locally or globally depending on observed CPU utilization or custom metrics', 'Automatically reboots failed Linux containers continually', 'Deletes pods to save money strictly'],
        correctAnswer: 'Automatically scales the number of Pod replicas locally or globally depending on observed CPU utilization or custom metrics'
    },

    // Cloud & Monitoring (61–70)
    {
        type: 'MCQ',
        text: 'What is Amazon EC2 (Elastic Compute Cloud)?',
        options: ['A globally managed fast database service', 'A scalable virtual server environment to run applications in the AWS cloud computing layer', 'An object storage bucket solution natively', 'A machine learning auto-tuning service'],
        correctAnswer: 'A scalable virtual server environment to run applications in the AWS cloud computing layer'
    },
    {
        type: 'MCQ',
        text: 'What is Amazon S3 (Simple Storage Service)?',
        options: ['A virtual machine container precisely', 'A relational SQL Database exclusively', 'An infinitely scalable object storage service used for backups, artifacts, and static files', 'A firewall service'],
        correctAnswer: 'An infinitely scalable object storage service used for backups, artifacts, and static files'
    },
    {
        type: 'MCQ',
        text: 'What is the fundamental use of a Cloud Load Balancer (ALB / ELB)?',
        options: ['To automatically distribute incoming application UI traffic across multiple backend targets or instances to ensure fault tolerance', 'To encrypt database passwords reliably', 'To provide a free domain name locally', 'To test code changes automatically prior to deployment'],
        correctAnswer: 'To automatically distribute incoming application UI traffic across multiple backend targets or instances to ensure fault tolerance'
    },
    {
        type: 'MCQ',
        text: 'What does Auto Scaling allow a system to do in cloud infrastructure?',
        options: ['Change server passwords dynamically reliably', 'Automatically add or remove compute resources (like EC2 instances) locally based on real-time traffic demand metrics', 'Automatically deploy code to production constantly', 'Reduce latency by moving data dynamically'],
        correctAnswer: 'Automatically add or remove compute resources (like EC2 instances) locally based on real-time traffic demand metrics'
    },
    {
        type: 'MCQ',
        text: 'What is an IAM Role conceptually used for?',
        options: ['A managed entity that defines a set of specific access permissions strictly assigned to users, groups, or cloud instances', 'A tool for managing server IP addresses heavily', 'A configuration file for installing Kubernetes reliably', 'A database replication strategy strictly'],
        correctAnswer: 'A managed entity that defines a set of specific access permissions strictly assigned to users, groups, or cloud instances'
    },
    {
        type: 'MCQ',
        text: 'What is CloudWatch in AWS?',
        options: ['A weather forecasting tool literally', 'A robust monitoring and management service that aggregates metrics, logs, and triggers automated alarms across AWS resources', 'A video streaming service interface', 'A cost calculator natively'],
        correctAnswer: 'A robust monitoring and management service that aggregates metrics, logs, and triggers automated alarms across AWS resources'
    },
    {
        type: 'MCQ',
        text: 'What is Prometheus largely known for in DevOps culture?',
        options: ['Building UI dashboards gracefully', 'An open-source systems monitoring and alerting toolkit designed around scraping time-series metric data reliably', 'Connecting SQL databases dynamically', 'Load balancing external traffic continuously'],
        correctAnswer: 'An open-source systems monitoring and alerting toolkit designed around scraping time-series metric data reliably'
    },
    {
        type: 'MCQ',
        text: 'What is Grafana?',
        options: ['An open-source multi-platform interactive visualization and analytic web application to plot metrics natively (often paired with Prometheus)', 'A container registry reliably', 'A cloud hosting platform independently', 'An automated code testing suite strictly'],
        correctAnswer: 'An open-source multi-platform interactive visualization and analytic web application to plot metrics natively (often paired with Prometheus)'
    },
    {
        type: 'MCQ',
        text: 'What does the ELK Stack consist of?',
        options: ['Express, Linux, Kubernetes', 'Elasticsearch, Logstash, Kibana (used comprehensively for centralized logging and log analytics)', 'Ethernet, Linux, Kernel', 'Elastic Beanstalk, Lambda, Kinesis exactly'],
        correctAnswer: 'Elasticsearch, Logstash, Kibana (used comprehensively for centralized logging and log analytics)'
    },
    {
        type: 'MCQ',
        text: 'Why is Uptime monitoring so important?',
        options: ['To proactively ensure customer-facing services are available, responsive, and to alert operations teams instantly during outages', 'To check if developers are typing reliably', 'To calculate the server size exactly', 'To prevent DDOS attacks physically'],
        correctAnswer: 'To proactively ensure customer-facing services are available, responsive, and to alert operations teams instantly during outages'
    }
];

// Add 30 Coding/Practical Questions Programmatically to reach 100
const practicalQuestions = [
    // Linux & Scripting (71–75)
    { text: 'Bash Automation: Write a short `.sh` bash script to recursively compress a `/var/www/html` directory into a `.tar.gz` archive and append the current timestamp to the filename.' },
    { text: 'Log Parsing awk/grep: Provide the exact Bash pipeline command strictly using `cat`, `grep`, and `awk` to extract all lines containing "ERROR 500" from a Nginx access log and count their occurrences.' },
    { text: 'System Resource Monitoring: Write a barebones Python or Bash sequence utilizing `top` or `ps` to identify the Process ID (PID) consuming highest CPU reliably.' },
    { text: 'Cron Job Configuration: Write the exact `crontab -e` syntax required to execute a script located at `/home/user/backup.sh` predictably at 2:00 AM every single Sunday.' },
    { text: 'User Management: Write the bash sequence to create a new Linux user "deployer", add them safely to the "sudo" group, and set up an SSH key directory.' },

    // Git & CI/CD (76–80)
    { text: 'CI Pipeline Architecture: Write a basic synthetic `.github/workflows/main.yml` or `Jenkinsfile` structure defining a precise "build" job running on `ubuntu-latest`.' },
    { text: 'Git Workflow Strategies: Visually describe or diagram the exact Git branching model differences between Git Flow and simple Trunk-Based Development.' },
    { text: 'CI Build Steps: Outline the YAML/Shell command block required to cleanly checkout code, configure strictly Node 20.x, execute `npm install`, and successfully run `npm test`.' },
    { text: 'CD Automation Script: Write an SSH execution script snippet (using `scp` or `ssh`) that connects to an EC2 instance, cleanly pulls the latest `main` branch, and predictably restarts a Systemd Node service.' },
    { text: 'Deployment Rollback Logic: Construct a high-level CI/CD pseudo-code flowchart block representing how to detect a 5xx HTTP error post-deployment and seamlessly trigger a reversion to the prior stable image tag.' },

    // Docker (81–85)
    { text: 'Dockerfile Construction: Write a simple yet concise production-ready `Dockerfile` starting from `node:alpine` that successfully installs dependencies using `npm ci`, copies source files gracefully, and runs `node server.js`.' },
    { text: 'Docker Compose Setup: Write a generic `docker-compose.yml` defining exactly two services: an Express "app" and a Postgres "db" mapped efficiently to port 5432, with a declared restart policy.' },
    { text: 'State Persistence: Rewrite the previous `docker-compose.yaml` explicitly defining a named persistent volume securely attached to the underlying Postgres container path.' },
    { text: 'Container Networking: Provide the exact CLI command to generate an isolated custom Docker bridge network specifically named "backend_tier" and successfully run an Nginx container connected strictly to it.' },
    { text: 'Multi-stage Docker Builds: Write a robust multi-stage `Dockerfile` representing a Golang app: stage 1 strictly compiles the binary statically, stage 2 copies the binary into a minimal `scratch` image reliably.' },

    // Kubernetes (86–90)
    { text: 'Kubernetes Pod Manifest: Write a syntactically correct `pod.yaml` file declaring a singular Pod hosting an Nginx container specifically exposing TCP port 80.' },
    { text: 'Deployment Strategy YAML: Construct a comprehensive native `deployment.yaml` strictly specifying 3 `replicas` for a given container image, leveraging rolling updates predictably.' },
    { text: 'Service Exposure YAML: Write a related K8s `service.yaml` correctly routing port 80 on a LoadBalancer abstraction natively to `targetPort: 8080` internally.' },
    { text: 'ConfigMap Mounting: Demonstrate by writing YAML securely how to mount a custom `nginx.conf` stored efficiently within a ConfigMap natively as a physical volume exactly at `/etc/nginx/nginx.conf`.' },
    { text: 'Horizontal Pod Autoscaler Implementation: Write the CLI syntax or YAML block utilizing HPA to scale a specific deployment dynamically between 2 and 10 pods when CPU precisely exceeds 75% load.' },

    // Cloud + DevSecOps (91–100)
    { text: 'Cloud Provisioning (Launch Template): Write the standard bash "User Data" startup script necessary to auto-install Docker on a fresh underlying Amazon Linux EC2 instance immediately on boot.' },
    { text: 'Static Asset Deployment: Write the exact `aws s3 cli` sync command sequence gracefully required to deploy a built React `./dist` folder securely to an S3 bucket.' },
    { text: 'Terraform IaC: Write a basic synthetic `main.tf` snippet defining an AWS Provider reliably and deploying a single foundational `aws_instance` specifically using an exact AMI.' },
    { text: 'Configuration Management: Construct a concise Ansible `playbook.yml` targeting a "webservers" inventory effectively to cleanly execute an APT update and subsequently install Nginx reliably.' },
    { text: 'DevSecOps Hardening: Detail the script or certbot CLI sequence reliably required to seamlessly provision a Let\'s Encrypt TLS/SSL cert natively for an Nginx reverse proxy.' },
    { text: 'Observability & Monitoring: Provide the architectural command sequences typically implemented using Helm to install the Prometheus-Stack effectively onto a standard Kubernetes Cluster.' },
    { text: 'Unified Full-Stack Pipeline Strategy: Sketch out practically the comprehensive DevOps pipeline logic smoothly taking a commit from GitHub, scanning it natively using SonarQube, successfully building its Docker image, securely pushing to ECR, and orchestrating deployment to a managed EKS cluster.' },
    { text: 'Secrets Management: Show practically by writing pseudo-code securely how a Node application should securely pull its DB URI explicitly from AWS Secrets Manager natively rather than exposing it directly in a standard `.env` file.' },
    { text: 'Zero Downtime Architecture Design: Design and diagram securely the Blue-Green conceptual traffic flow specifically transitioning from an old Target Group running natively on an ALB smoothly to a new healthy Target Group.' },
    { text: 'Enterprise DevOps Architecture Plan: Draft a 3-tier fault-tolerant AWS system layout smoothly utilizing Route53 cleanly routed to an ALB, which serves strictly Auto-Scaled Private Subnet EC2s, successfully fetching highly available RDS data.' }
];

practicalQuestions.forEach((pq) => {
    fullExamQuestions.push({
        type: 'Coding',
        text: pq.text,
        options: [],
        correctAnswer: '' // Handled gracefully by manual evaluation systems
    });
});

const seedDevOps100QuestionExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        // console.log('MongoDB successfully Connected.');

        await Exam.deleteOne({ title: 'DevOps – 100 Questions Exam' });

        // Ensure Domain exists exclusively
        let domain = await Domain.findOne({ name: 'DevOps & Cloud' });
        if (!domain) {
            domain = new Domain({
                name: 'DevOps & Cloud',
                description: 'Linux, Git, CI/CD Pipelines, Docker, Kubernetes, and Cloud Infrastructures.'
            });
            await domain.save();
        }

        const examObj = new Exam({
            title: 'DevOps – 100 Questions Exam',
            type: 'Full-length Mock',
            durationMinutes: 180,
            domainId: domain._id,
            questions: fullExamQuestions
        });

        await examObj.save();
        console.log('Successfully seeded DevOps 100 question exam. Total correctly resolved length: ', examObj.questions.length);

        process.exit(0);
    } catch (err) {
        console.error('Critically failed to seed DevOps exam:');
        console.error(err);
        process.exit(1);
    }
};

seedDevOps100QuestionExam();
