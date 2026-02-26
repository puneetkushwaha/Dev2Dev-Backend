const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Domain = require('../models/Domain');
const Topic = require('../models/Topic');

// Import MCQ data from frontend
const { oopsMcqs } = require('../../frontend/src/data/oopsMcqs');
const { osMcqs } = require('../../frontend/src/data/osMcqs');
const { dbmsMcqs } = require('../../frontend/src/data/dbmsMcqs');
const { cnMcqs } = require('../../frontend/src/data/cnMcqs');
const { aptitudeData } = require('../../frontend/src/data/aptitudeData');
const { logicalReasoningData } = require('../../frontend/src/data/logicalReasoningData');
const { verbalAbilityData } = require('../../frontend/src/data/verbalAbilityData');

const mapMcqs = (mcqs) => {
    return mcqs.map(m => ({
        question: m.q || m.question,
        options: m.options,
        correctAnswer: m.ans !== undefined ? m.ans : m.correctAnswer,
        explanation: m.explanation || m.answer || ''
    }));
};

const oopTheory = `### What is Object-Oriented Programming (OOP)?

Object-Oriented Programming (OOP) is a powerful programming paradigm where software is organized around **objects** rather than functions and logic. 

An object can be defined as a data field that has unique attributes and behavior.

### Why OOP?

The main advantage of OOP is making complex code more manageable and reusable. Key benefits include:

- **Understandability:** Real-world modeling makes it easier to bridge the gap between business logic and technical implementation.
- **Maintenance:** Encapsulation allows you to change internal logic without breaking the rest of the system.
- **Scalability:** Object hierarchies (Inheritance) make it easier to expand large-scale software systems.

### Programming Paradigms

1. **Imperative Paradigms:** Focused on **how** to achieve a goal. 
   - Examples: Procedural, Object-Oriented, Parallel.
2. **Declarative Paradigms:** Focused on **what** to execute.
   - Examples: Logical, Functional, Database.

### OOP vs. Structured Programming

- **OOP:** Uses a **bottom-up approach**, focuses on data security, and utilizes objects as fundamental entities.
- **Structured:** Uses a **top-down approach**, focuses on functions, and is generally less secure as data moves freely.

### Core Concepts: Classes & Objects

- **Class:** A user-defined data type that serves as a **blueprint** or template. It defines the structure (data members) and behavior (member functions).
- **Object:** An **instance** of a class. It is the actual entity that occupies memory and possesses state and behavior.

### The 4 Pillars of OOP

Comprehensive understanding of these is essential for any developer:

- **Encapsulation:** The process of wrapping data (variables) and code (methods) together as a single unit. It protects data from outside interference.
- **Abstraction:** Hiding complex implementation details and showing only the necessary features to the user.
- **Inheritance:** The mechanism by which one class acquires the properties and behaviors of another class.
- **Polymorphism:** The ability of a message or function to be processed in more than one way.

### Access Specifiers

These determine the visibility and accessibility of class members:

- **Private:** Accessible only within the same class.
- **Protected:** Accessible within the class and its subclasses (Inheritance).
- **Public:** Accessible from anywhere in the program.

### Constructors & Destructors

- **Constructor:** A special member function that **initializes** an object. 
    - Types: Default, Parameterized, and Copy constructors.
- **Destructor:** Automatically called when an object scope ends to **deallocate resources** and free memory.

### Advanced Concepts

- **Interface:** A contract that defines *what* a class should do, but not *how*. It supports multiple inheritance in languages like Java/C#.
- **Abstract Class:** A class that provides a common base for other classes but cannot be instantiated on its own.
`;


const osTheory = `
### What is an Operating System?
An Operating System (OS) is software that acts as an interface between computer hardware and the user. It manages hardware resources and provides services for computer programs, ensuring they run conveniently and efficiently.

### What is a Process and Process Table?
A process is an instance of a program in execution. The operating system maintains a **Process Table** to keep track of the state, resources, and execution context of all active processes. Every process has an entry in this table.

### What are the different states of a process?
Processes typically transition through three primary states:
1. **Running**: Currently executing on the CPU.
2. **Ready**: Waiting in the queue for CPU allocation.
3. **Waiting/Blocked**: Waiting for an external event (like I/O or a signal).

### What is a Thread and how does it differ from a Process?
A thread is the smallest unit of CPU scheduling within a process, often called a "lightweight process."
- **Memory**: Threads of the same process share the same address space (code, data, heap) but have their own stack and registers.
- **Overhead**: Context switching between threads is much faster than between processes.
- **IPC**: Processes use Inter-Process Communication (IPC), while threads communicate via shared memory.

### Explain Virtual Memory and its benefits.
Virtual memory creates the illusion of a very large, contiguous memory space, even if it exceeds physical RAM. It uses disk space to extend RAM, allowing large programs to run and enabling efficient multiprogramming.

### What is Demand Paging?
Demand paging is the process of loading pages into memory only when they are needed (on demand) rather than loading the entire program at once. If a required page is not in RAM, a **Page Fault** occurs, and the OS fetches it from secondary storage.

### What is the Kernel?
The kernel is the core component of an OS that manages system resources and hardware. It acts as a bridge between applications and hardware, handling memory management, CPU scheduling, and I/O operations.

### Explain CPU Scheduling Algorithms.
The scheduler determines which "Ready" process gets the CPU. Common algorithms include:
- **FCFS (First-Come, First-Served)**: Simple but can lead to long wait times.
- **Round Robin (RR)**: Each process gets a fixed time slice (quantum).
- **SJF (Shortest Job First)**: Prioritizes shorter tasks to minimize average waiting time.
- **Priority Scheduling**: Processes are scheduled based on priority levels.

### What is a Deadlock and what are its conditions?
A deadlock occurs when processes are blocked because each is holding a resource and waiting for another held by someone else. Four necessary conditions (Coffman conditions) must hold:
1. **Mutual Exclusion**: Non-sharable resources.
2. **Hold and Wait**: Holding one resource while waiting for another.
3. **No Preemption**: Resources cannot be taken away forcefully.
4. **Circular Wait**: A dependency ring exists among processes.

### How to handle Deadlocks?
- **Prevention**: Ensuring at least one Coffman condition is never met.
- **Avoidance**: Using algorithms like **Banker's Algorithm** to check if an allocation is safe.
- **Detection & Recovery**: Identifying deadlocks and terminating processes or preempting resources.

### What is Thrashing?
Thrashing is a situation where the system spends more time processing page faults than executing actual instructions. It occurs when a process doesn't have enough frames, leading to frequent swapping in and out of pages.

### What is a Zombie Process vs Orphan Process?
- **Zombie Process**: A process that has finished execution but still has an entry in the process table while waiting for the parent to read its exit status.
- **Orphan Process**: A process whose parent has terminated or finished without waiting for it. These are usually adopted by the 'init' process.

### What is Context Switching?
Context switching involves saving the state (context) of a running process and loading the saved state of another process. While essential for multitasking, it introduces computational overhead.

### Explain Fragmentation.
- **Internal Fragmentation**: Wasted space within a partition (occurs in fixed-size partitioning/paging).
- **External Fragmentation**: Total free memory exists but is not contiguous (occurs in dynamic partitioning/segmentation). **Compaction** can help resolve this.

### What is a Semaphore?
A semaphore is a synchronization tool (integer variable) used to manage concurrent access to shared resources. Two atomic operations are used: **Wait()** and **Signal()**. Binary semaphores are often used as Mutexes.

### What is Belady's Anomaly?
Belady's Anomaly is a phenomenon where increasing the number of page frames results in more page faults. This typically occurs with the FIFO (First-In, First-Out) page replacement algorithm.
`;


const dbmsTheory = `### What is DBMS?
    A database management system (DBMS) is a set of tools that make it easier for users to construct and maintain databases. It provides an interface for tasks such as creating a database, entering data, deleting data, updating data, and so on. A DBMS is software that allows data to be kept in a more secure manner than a file-based system.

### What is Database ?
    A database is a collection of logical, consistent, and organised data that can be easily accessed, controlled, and updated.Databases are structured to allow for the efficient production, insertion, and updating of data and are saved as a file or set of files on magnetic discs, tapes, and other secondary devices.

### Issues with Traditional File - Based Systems
    - ** Lack of indexing **: Content access is time - consuming and slow.
- ** Redundancy & Inconsistency **: Duplicate data causes inconsistencies during updates.
- ** Lack of Concurrency Management **: One operation locks the entire page.
- ** Security & Integrity **: Difficult to enforce checks and access controls.

### Advantages of a DBMS
    - ** Data sharing **: Multiple users can access data simultaneously.
- ** Integrity restrictions **: Allows for refined data storage.
- ** Data redundancy control **: Integrates all data into a single database.
- ** Data Independence **: Change structure without affecting running applications.
- ** Backup & Recovery **: Automatically creates backups and restores as needed.
- ** Data Security **: Authentication and encryption make storage dependable.

### Languages in DBMS
    - ** DDL(Data Definition Language) **: CREATE, ALTER, DROP, TRUNCATE, RENAME.
- ** DML(Data Manipulation Language) **: SELECT, UPDATE, INSERT, DELETE.
- ** DCL(Data Control Language) **: GRANT, REVOKE.
- ** TCL(Transaction Control Language) **: COMMIT, ROLLBACK, SAVEPOINT.

### ACID Properties
    - ** Atomicity **: "All or nothing" rule – evaluated as a single unit.
- ** Consistency **: Data is consistent before and after each transaction.
- ** Isolation **: Several transactions can be conducted at the same time independently.
- ** Durability **: Each transaction is saved in non - volatile memory once finished.

### Keys in DBMS
    - ** Super Key **: A set of attributes that uniquely identify any row.
- ** Candidate Key **: A minimal superkey.
- ** Primary Key **: Chosen from candidate keys, cannot be NULL.
- ** Foreign Key **: A field in one table that uniquely identifies a row in another table.

### Primary Key vs Unique Constraint
    - Primary Key cannot have NULL values; Unique Constraint can.
- A table has only one Primary Key but multiple Unique constraints.

### DBMS vs RDBMS
    - ** DBMS **: Stores data as files, often Hierarchical or Network models.
- ** RDBMS **: Relational Database Management System(1970s).Stores data in tables(rows / columns), making it easier to locate specific values.

### Levels of Abstraction
    - ** Physical Level **: Lowest level, specifies how data is stored.
- ** Logical Level **: Decides what data is saved and relationships.
- ** View Level **: Highest level, describes only a portion of the database.

### Entity - Relationship(E - R) Model
A diagrammatic approach where real - world things are represented as entities and relationships between them are mentioned.
- ** Entity **: A real - world object(e.g., Employee).
- ** Entity Type **: Collection of entities with similar attributes.
- ** Entity Set **: Collection of all entities of a specific type.
`;


const cnTheory = `### What is Computer Networking ?

    A ** Computer Network ** is a system of interconnected devices(nodes) that communicate with each other to share resources and information. 

- ** Node:** Any device like a computer, printer, or server that can send / receive data.
- ** Link:** The communication channel(wired or wireless) connecting two nodes.

### Why is Networking Important ?

    Networking is the backbone of the modern digital world, enabling:
- ** Resource Sharing:** Sharing printers, files, and hardware.
- ** Communication:** Email, video calls, and instant messaging.
- ** Scalability:** Easily adding more devices to an existing system.
- ** Data Centralization:** Storing data on central servers for easy access and backup.

### Network Topologies

    ** Topology ** refers to the physical or logical arrangement of nodes in a network.

1. ** Star Topology:** All nodes connect to a central hub /switch.Most common in offices.
2. ** Bus Topology:** All nodes connect to a single central cable(the bus).
3. ** Ring Topology:** Each node connects to exactly two neighbors, forming a circle.
4. ** Mesh Topology:** Every node is connected to every other node(Full Mesh) or some others(Partial Mesh).Highly fault - tolerant.
5. ** Tree Topology:** A hierarchical structure combining star and bus topologies.

### OSI Reference Model

The ** OSI(Open Systems Interconnection) ** model defines 7 layers of networking:

1. ** Physical Layer:** Transmits raw bits over physical media(cables, radio).
2. ** Data Link Layer:** Handles node - to - node data transfer and error detection(Frames, MAC Addresses).
3. ** Network Layer:** Manages routing and logical addressing(Packets, IP Addresses).
4. ** Transport Layer:** Ensures end - to - end communication and error recovery(TCP / UDP).
5. ** Session Layer:** Manages sessions between applications.
6. ** Presentation Layer:** Translates, encrypts, and compresses data.
7. ** Application Layer:** Direct interaction with software(HTTP, FTP, SMTP).

### TCP / IP Model

A more practical 4 - layer model used for the actual Internet:
    1. ** Network Access(Link) Layer **
        2. ** Internet Layer(IP) **
            3. ** Transport Layer(TCP / UDP) **
                4. ** Application Layer **

### Key Protocols

    - ** HTTP / HTTPS:** Hypertext Transfer Protocol(Secure).Port 80 / 443.
        - ** DNS:** Domain Name System.Translates names to IPs.Port 53.
            - ** DHCP:** Dynamic Host Configuration Protocol.Auto - assigns IPs.
- ** ARP:** Address Resolution Protocol.Maps IP to MAC address.
- ** ICMP:** Internet Control Message Protocol.Used for error reporting(e.g., Ping).

### IP Addressing(IPv4 vs IPv6)

    - ** IPv4:** 32 - bit address(e.g., 192.168.1.1). 4.3 billion possible addresses.
- ** IPv6:** 128 - bit address(hexadecimal).Solves the address exhaustion problem of IPv4.

### Network Security: Firewalls & VPNs

    - ** Firewall:** A security system that monitors and controls incoming / outgoing traffic based on rules.
- ** VPN(Virtual Private Network):** Creates a secure, encrypted "tunnel" over a public network(the Internet).

### Performance Metrics

    - ** Bandwidth:** The maximum amount of data that can pass through a link in a given time.
- ** Throughput:** The actual amount of data successfully transmitted.
- ** Latency:** The delay in data transmission(measured in ms).
- ** Jitter:** Variation in packet delay.
`;


async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('✅ Connected to MongoDB');

        // 1. Core CS Domain
        let coreDomain = await Domain.findOne({ name: 'Core Computer Science' });
        if (!coreDomain) {
            coreDomain = await Domain.create({
                name: 'Core Computer Science',
                description: 'Master the fundamentals of Computer Science: DSA, OS, DBMS, Networks, and System Design.'
            });
        }

        const coreTopics = [
            { subject: 'OOP', topicGroup: 'Object Oriented Programming', title: 'Object Oriented Programming Full Tutorial', theory: oopTheory, mcqs: oopsMcqs },
            { subject: 'OS', topicGroup: 'Operating Systems', title: 'Operating Systems Full Tutorial', theory: osTheory, mcqs: osMcqs },
            { subject: 'DBMS', topicGroup: 'Database Management', title: 'DBMS Full Tutorial', theory: dbmsTheory, mcqs: dbmsMcqs },
            { subject: 'CN', topicGroup: 'Computer Networks', title: 'Computer Networks Full Tutorial', theory: cnTheory, mcqs: cnMcqs }
        ];

        for (const t of coreTopics) {
            await Topic.deleteMany({ subject: t.subject, lessonType: 'theory' });
            await Topic.create({
                domainId: coreDomain._id,
                subject: t.subject,
                topicGroup: t.topicGroup,
                title: t.title,
                level: 'Beginner',
                difficulty: 'Medium',
                isCoreCS: true,
                lessonType: 'theory',
                content: { explanation: t.theory },
                quiz: mapMcqs(t.mcqs)
            });
            console.log(`✅ Seeded ${t.subject} Tutorial`);
        }

        // 2. Aptitude & Reasoning Domain
        let aptitudeDomain = await Domain.findOne({ name: 'Aptitude & Reasoning' });
        if (!aptitudeDomain) {
            aptitudeDomain = await Domain.create({
                name: 'Aptitude & Reasoning',
                description: 'Quantitative, Logical, and Verbal skills for placement preparation.'
            });
        }

        // Quantitative Aptitude
        for (const item of aptitudeData) {
            await Topic.deleteMany({ domainId: aptitudeDomain._id, title: item.title });
            await Topic.create({
                domainId: aptitudeDomain._id,
                title: item.title,
                topicGroup: 'Quantitative Aptitude',
                level: 'Beginner',
                difficulty: 'Medium',
                isCoreCS: false,
                lessonType: 'theory',
                content: { explanation: item.theory || 'No theory available.' },
                quiz: mapMcqs(item.questions || [])
            });
        }

        // Logical Reasoning
        for (const item of logicalReasoningData) {
            await Topic.deleteMany({ domainId: aptitudeDomain._id, title: item.title });
            await Topic.create({
                domainId: aptitudeDomain._id,
                title: item.title,
                topicGroup: 'Logical Reasoning',
                level: 'Beginner',
                difficulty: 'Medium',
                isCoreCS: false,
                lessonType: 'theory',
                content: { explanation: item.theory || 'No theory available.' },
                quiz: mapMcqs(item.questions || [])
            });
        }

        // Verbal Ability
        for (const item of verbalAbilityData) {
            await Topic.deleteMany({ domainId: aptitudeDomain._id, title: item.title });
            await Topic.create({
                domainId: aptitudeDomain._id,
                title: item.title,
                topicGroup: 'Verbal Ability',
                level: 'Beginner',
                difficulty: 'Medium',
                isCoreCS: false,
                lessonType: 'theory',
                content: { explanation: item.theory || 'No theory available.' },
                quiz: mapMcqs(item.questions || [])
            });
        }
        console.log('✅ Seeded Aptitude, Logical, and Verbal topics');

        console.log('🚀 All content restored successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
}

seed();
