const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Domain = require('../models/Domain');
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');

const dbmsTheory = `### What is DBMS?
A database management system (DBMS) is a set of tools that make it easier for users to construct and maintain databases. It provides an interface for tasks such as creating a database, entering data, deleting data, updating data, and so on. A DBMS is software that allows data to be kept in a more secure manner than a file-based system.

### What is Database?
A database is a collection of logical, consistent, and organised data that can be easily accessed, controlled, and updated. Databases are structured to allow for the efficient production, insertion, and updating of data and are saved as a file or set of files on magnetic discs, tapes, and other secondary devices.

### Issues with Traditional File-Based Systems
- **Lack of indexing**: Content access is time-consuming and slow.
- **Redundancy & Inconsistency**: Duplicate data causes inconsistencies during updates.
- **Lack of Concurrency Management**: One operation locks the entire page.
- **Security & Integrity**: Difficult to enforce checks and access controls.

### Advantages of a DBMS
- **Data sharing**: Multiple users can access data simultaneously.
- **Integrity restrictions**: Allows for refined data storage.
- **Data redundancy control**: Integrates all data into a single database.
- **Data Independence**: Change structure without affecting running applications.
- **Backup & Recovery**: Automatically creates backups and restores as needed.
- **Data Security**: Authentication and encryption make storage dependable.

### Languages in DBMS
- **DDL (Data Definition Language)**: CREATE, ALTER, DROP, TRUNCATE, RENAME.
- **DML (Data Manipulation Language)**: SELECT, UPDATE, INSERT, DELETE.
- **DCL (Data Control Language)**: GRANT, REVOKE.
- **TCL (Transaction Control Language)**: COMMIT, ROLLBACK, SAVEPOINT.

### ACID Properties
- **Atomicity**: "All or nothing" rule – evaluated as a single unit.
- **Consistency**: Data is consistent before and after each transaction.
- **Isolation**: Several transactions can be conducted at the same time independently.
- **Durability**: Each transaction is saved in non-volatile memory once finished.

### Keys in DBMS
- **Super Key**: A set of attributes that uniquely identify any row.
- **Candidate Key**: A minimal superkey.
- **Primary Key**: Chosen from candidate keys, cannot be NULL.
- **Foreign Key**: A field in one table that uniquely identifies a row in another table.

### Primary Key vs Unique Constraint
- Primary Key cannot have NULL values; Unique Constraint can.
- A table has only one Primary Key but multiple Unique constraints.

### DBMS vs RDBMS
- **DBMS**: Stores data as files, often Hierarchical or Network models.
- **RDBMS**: Relational Database Management System (1970s). Stores data in tables (rows/columns), making it easier to locate specific values.

### Levels of Abstraction
- **Physical Level**: Lowest level, specifies how data is stored.
- **Logical Level**: Decides what data is saved and relationships.
- **View Level**: Highest level, describes only a portion of the database.

### Entity-Relationship (E-R) Model
A diagrammatic approach where real-world things are represented as entities and relationships between them are mentioned.
- **Entity**: A real-world object (e.g., Employee).
- **Entity Type**: Collection of entities with similar attributes.
- **Entity Set**: Collection of all entities of a specific type.

### Unary Operations in Relational Algebra
PROJECTION and SELECTION are unary operations (single-operand).

### Degree of Relation
The number of attributes in a relation schema (also called Arity).

### Relationships
- **One-to-One**: One record linked to one other record.
- **One-to-Many**: One record linked to many records (e.g., Department to Employees).
- **Many-to-Many**: Multiple records linked to multiple records (e.g., Students to Courses).

### Having vs Where Clause
- **WHERE**: Picks rows before grouping. No aggregate functions.
- **HAVING**: Picks rows after grouping. Can use aggregate functions.

### Identity (AutoNumber)
A column that creates numeric values automatically (Start/Increment).

### Views in SQL
A virtual table created from a SQL result set. Used to simplify tables, provide security, and obscure complexity.

### Triggers vs Stored Procedures
- **Trigger**: Automatically executed in response to Insert/Update/Delete.
- **Stored Procedure**: A collection of operations called directly like a function.

### Normalization
A method for evaluating relation schemas to minimize redundancy and prevent anomalies (1NF, 2NF, 3NF, BCNF).

### Indexes
A data structure (B-tree, B+ tree) that improves data retrieval speed at the expense of storage and write performance.
- **Clustered Index**: Determines physical order on disk (Only one).
- **Non-Clustered Index**: Logical ordering, points to disk records.

### LiveLock vs Deadlock
- **Deadlock**: All processes are in a waiting state.
- **LiveLock**: Processes repeat the same interaction without producing beneficial work (not waiting).

### Entity vs Referential Integrity
- **Entity Integrity**: Primary Key can never be NULL.
- **Referential Integrity**: Foreign Key must be NULL or match a Primary Key of another relation.
`;

const dbmsMcqsRaw = [
    { q: "What does DBMS stand for?", options: ["Data Base Management System", "Data Bank Management System", "Digital Base Management System", "Database Management System"], ans: 3 },
    { q: "What is an RDBMS?", options: ["Relational Database Management System", "Refined Database Management System", "Regional Database Management System", "Reliable Database Management System"], ans: 0 },
    { q: "Which of the following is NOT an advantage of a DBMS over traditional file systems?", options: ["Data sharing", "Data redundancy control", "Complexity of setup", "Data Security"], ans: 2 },
    { q: "In a relational model, a 'tuple' is equivalent to a:", options: ["Table", "Row", "Column", "Database"], ans: 1 },
    { q: "Which language contains commands to define the database schema (e.g., CREATE, ALTER)?", options: ["DML", "DDL", "DCL", "TCL"], ans: 1 },
    { q: "Which of the following commands is a DML (Data Manipulation Language) command?", options: ["GRANT", "COMMIT", "UPDATE", "DROP"], ans: 2 },
    { q: "What do the ACID properties in a DBMS stand for?", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Isolation, Durability", "Atomicity, Concurrency, Isolation, Dependability", "Accuracy, Concurrency, Integration, Durability"], ans: 0 },
    { q: "Does a NULL value represent a zero or a blank space in a database?", options: ["Yes, it represents a blank space.", "Yes, it represents a zero.", "No, it represents a value that is unknown or not applicable.", "It represents a syntax error."], ans: 2 },
    { q: "Which level of data abstraction hides the physical storage details but shows what data is stored?", options: ["Physical Level", "Conceptual (Logical) Level", "View (External) Level", "Schema Level"], ans: 1 },
    { q: "What is the difference between a 2-tier and a 3-tier database architecture?", options: ["2-tier has a middleware, 3-tier doesn't.", "Both are the same but 3-tier is faster.", "2-tier connects client directly to the database; 3-tier introduces an application layer in between.", "3-tier architecture stores data in 3 different databases."], ans: 2 },
    { q: "What represents an entity set in an E-R diagram?", options: ["Circle", "Rectangle", "Ellipse", "Diamond Box"], ans: 1 },
    { q: "In an E-R diagram, what does a diamond box represent?", options: ["Attribute", "Entity", "Relationship", "Weak Entity"], ans: 2 },
    { q: "Which of the following is a minimal super key that uniquely identifies a row?", options: ["Composite Key", "Foreign Key", "Candidate Key", "Alternate Key"], ans: 2 },
    { q: "Can a table have multiple Primary Keys?", options: ["Yes, a table can have any number of primary keys.", "No, a table can have only one primary key constraint.", "Yes, but they must all be INT types.", "No, a table cannot have any primary keys."], ans: 1 },
    { q: "What is the difference between a Unique Key and a Primary Key?", options: ["Unique Key can accept NULL values, Primary Key cannot.", "Primary Key can accept NULL values, Unique Key cannot.", "There is no difference.", "Unique Key is used across multiple tables, Primary Key is for one."], ans: 0 },
    { q: "Which key is used to establish a link between two tables?", options: ["Primary Key", "Super Key", "Foreign Key", "Composite Key"], ans: 2 },
    { q: "If an attribute in a table relies on two specific columns together to uniquely identify rows, those columns form a:", options: ["Foreign Key", "Secondary Key", "Composite Key", "Sort Key"], ans: 2 },
    { q: "Which constraint ensures that a column does not accept any NULL values?", options: ["UNIQUE", "PRIMARY KEY", "NOT NULL", "CHECK"], ans: 2 },
    { q: "What relationship describes one student enrolling in multiple courses, and one course having multiple students?", options: ["One-to-One", "One-to-Many", "Many-to-One", "Many-to-Many"], ans: 3 },
    { q: "What specifies the overall blueprint/structure of the database?", options: ["Database Instance", "Database Extension", "Database Schema (Intension)", "Database Snapshot"], ans: 2 },
    { q: "What is Normalization?", options: ["Combining tables to increase redundancy.", "A process to organize data to minimize redundancy and dependency.", "Sorting tables alphabetically.", "Encrypting data in a table."], ans: 1 },
    { q: "Which normal form requires that every column must have a single atomic value?", options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "BCNF"], ans: 0 },
    { q: "To achieve Second Normal Form (2NF), a table must first be in 1NF and:", options: ["Remove all primary keys", "Ensure no transitive dependencies", "Have no partial functional dependencies on a composite primary key", "Ensure every determinant is a candidate key"], ans: 2 },
    { q: "Third Normal Form (3NF) focuses on removing which type of dependencies?", options: ["Partial dependencies", "Transitive dependencies", "Multi-valued dependencies", "Atomic dependencies"], ans: 1 },
    { q: "What constitutes the Boyce-Codd Normal Form (BCNF)?", options: ["A stricter version of 3NF where every determinant must be a candidate key.", "It deals strictly with multi-valued attributes.", "It is the first step of normalization.", "It merges two tables back together."], ans: 0 },
    { q: "What is the primary difference between the WHERE and HAVING clauses?", options: ["They are exactly the same.", "WHERE filters before grouping; HAVING filters after grouping.", "HAVING filters before grouping; WHERE filters after grouping.", "WHERE is for text, HAVING is for numbers."], ans: 1 },
    { q: "Which SQL command will empty a table but keep its structure, and cannot usually be rolled back?", options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"], ans: 2 },
    { q: "What type of JOIN returns all rows from the left table and matched rows from the right table?", options: ["INNER JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "LEFT JOIN"], ans: 3 },
    { q: "What happens if a LEFT JOIN discovers no matching row on the right table?", options: ["It throws an error.", "It drops the row from the left table.", "It returns NULL values for the right table columns.", "It duplicates the left table data."], ans: 2 },
    { q: "What is the key difference between UNION and UNION ALL?", options: ["UNION ALL removes duplicates.", "UNION keeps duplicates, UNION ALL removes them.", "UNION removes duplicates, UNION ALL keeps all records.", "UNION ALL is used for JOIN operations."], ans: 2 },
    { q: "Which keyword returns the Cartesian product of two tables?", options: ["INNER JOIN", "CROSS JOIN", "LEFT JOIN", "SELF JOIN"], ans: 1 },
    { q: "What is a 'Correlated Subquery'?", options: ["A subquery that can run entirely independent of the outer query.", "A subquery that depends on values from the outer query and runs once for each row.", "A subquery running in the SELECT clause only.", "A subquery combined with a UNION operation."], ans: 1 },
    { q: "What is a CTE?", options: ["Common Table Expression, a temporary named result set.", "Compiled Table Enforcer, for constraints.", "Concurrent Transaction Engine.", "Combined Table Entity, representing weak entities."], ans: 0 },
    { q: "Which function is an aggregate function in SQL?", options: ["LOWER()", "SUBSTRING()", "COUNT()", "NOW()"], ans: 2 },
    { q: "What does a VIEW in a database do?", options: ["It acts as a virtual table representing the result of a stored query.", "It creates an physical backup of a table.", "It compiles SQL procedures.", "It prevents any unauthorized users from logging in."], ans: 0 },
    { q: "Which transaction property ensures that if a system crashes, the committed changes survive?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], ans: 3 },
    { q: "What is 'Dirty Read'?", options: ["Reading from a corrupted hard drive.", "Reading uncommitted data from an ongoing transaction.", "Reading data without an index.", "Reading data missing a foreign key."], ans: 1 },
    { q: "Which isolation level prevents dirty reads, non-repeatable reads, and phantom reads?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], ans: 3 },
    { q: "Which locking mechanism assumes conflicts are rare and checks for modification only at commit time?", options: ["Pessimistic Locking", "Shared Locking", "Exclusive Locking", "Optimistic Locking"], ans: 3 },
    { q: "When a transaction holds a lock that another needs, and vice versa indefinitely, it is called a:", options: ["Race Condition", "Deadlock", "Livelock", "Starvation"], ans: 1 },
    { q: "What is the primary purpose of Indexing?", options: ["To secure the data natively.", "To speed up data retrieval operations.", "To save disk space.", "To create backups automatically."], ans: 1 },
    { q: "A table can only have ONE of which type of index because it dictates the data's physical order?", options: ["Unique Index", "Composite Index", "Non-clustered Index", "Clustered Index"], ans: 3 },
    { q: "A B+ Tree stores all actual data (or pointers) in which nodes?", options: ["Root Node", "Internal Nodes", "Leaf Nodes", "All of the above"], ans: 2 },
    { q: "What happens if you have too many indexes on a table?", options: ["Read performance degrades heavily.", "Write operations (INSERT, UPDATE, DELETE) become slower.", "The database engine crashes automatically.", "The rows automatically denormalize."], ans: 1 },
    { q: "Selectivity in indexing refers to:", options: ["How unique the values in a column are.", "How fast the CPU processes the query.", "How much RAM the database uses.", "Which SELECT query is executed first."], ans: 0 },
    { q: "What is Sharding in a database?", options: ["A type of security encryption.", "A method to split a large dataset across multiple separate databases horizontally.", "A method to normalize a table vertically.", "An indexing algorithm."], ans: 1 },
    { q: "What does WAL stand for in databases?", options: ["Write-All Logging", "Wide-Area Lookup", "Write-Ahead Logging", "Wait-And-Load"], ans: 2 },
    { q: "What is the purpose of Write-Ahead Logging (WAL)?", options: ["To track user mouse clicks.", "To ensure that all changes are written to the log on disk before being applied to the data.", "To prevent unauthorized IP addresses.", "To index text fields efficiently."], ans: 1 },
    { q: "What type of backup captures only the data that has changed since the last full backup?", options: ["Full Backup", "Incremental Backup", "Differential Backup", "Copy-only Backup"], ans: 2 },
    { q: "What is MVCC (Multi-Version Concurrency Control)?", options: ["A protocol for database mirroring.", "A way for databases to provide concurrent access by keeping multiple versions of the data.", "A file structure used largely in MS Access.", "A method for denormalizing tables automatically."], ans: 1 },
    { q: "Which technique is used to solve the problem of 'Lost Updates' in highly concurrent environments?", options: ["Pessimistic Locking", "Indexing", "Normalization", "Denormalization"], ans: 0 },
    { q: "What is an 'Internal Level' of Abstraction also known as?", options: ["Logical Level", "View Level", "Physical Level", "Conceptual Level"], ans: 2 },
    { q: "Which property ensure data remains accurate and consistent across the database?", options: ["Data Isolation", "Data Integrity", "Data Redundancy", "Data Atomicity"], ans: 1 },
    { q: "The process of reorganizing attributes and tables to minimize redundancy is:", options: ["Generalization", "Specialization", "Normalization", "Aggregation"], ans: 2 },
    { q: "Which SQL command deletes all records but keeps the table structure and its indexing?", options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"], ans: 1 },
    { q: "What is a 'Checkpoint' in the context of DBMS recovery?", options: ["A security barrier", "A point in time where the log is synced with the database", "A primary key constraint", "A transaction start marker"], ans: 1 },
    { q: "Which Normal Form handles multi-valued dependencies?", options: ["2NF", "3NF", "BCNF", "4NF"], ans: 3 },
    { q: "In a B+ Tree, what do internal nodes contain?", options: ["Only pointers to leaf nodes", "Only keys and pointers to the next level", "The actual data records", "Transaction logs"], ans: 1 },
    { q: "Which JOIN returns rows when there is a match in one of the tables?", options: ["INNER JOIN", "FULL OUTER JOIN", "CROSS JOIN", "NATURAL JOIN"], ans: 1 },
    { q: "What does SQL stand for?", options: ["Sequential Query Language", "Structured Query Language", "Standard Query Language", "Systemized Query Language"], ans: 1 },
    { q: "A relationship where one entity interacts with another relationship is called:", options: ["Generalization", "Specialization", "Aggregation", "Self-Join"], ans: 2 },
    { q: "Which DDL command changes the definition of an existing table?", options: ["UPDATE", "INSERT", "ALTER", "CREATE"], ans: 2 },
    { q: "What is the 'Shadow Paging' technique used for?", options: ["Indexing", "Concurrency Control", "Database Recovery", "Query Optimization"], ans: 2 },
    { q: "Which isolation level prevents 'Phantom Reads'?", options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"], ans: 2 },
    { q: "What is 'Selectivity' of an index index?", options: ["Number of blocks", "Ratio of distinct values to total rows", "CPU utilization", "Memory footprint"], ans: 1 },
    { q: "Which of the following is an Unary relational operation?", options: ["Join", "Projection", "Union", "Intersection"], ans: 1 },
    { q: "A stored procedure is:", options: ["A list of tables", "A precompiled group of SQL statements", "A database trigger", "A view and a table combined"], ans: 1 },
    { q: "Which key is used to map a specific record in one table to a record in another?", options: ["Primary Key", "Foreign Key", "Alternate Key", "Candidate Key"], ans: 1 },
    { q: "What is the degree of a relation?", options: ["Total number of tuples", "Total number of attributes", "Number of distinct values", "Maximum key length"], ans: 1 },
    { q: "A query within another query is called a:", options: ["Main query", "Sub-query", "External query", "Loop query"], ans: 1 },
    { q: "Which technique uses a hash function to find data addresses?", options: ["B-Tree Indexing", "Hashing", "Linear Search", "Binary Search"], ans: 1 },
    { q: "What is 'Denormalization' focused on?", options: ["Improving Data Integrity", "Removing Redundancy", "Improving Read Performance", "Adding Constraints"], ans: 2 },
    { q: "Which command removes a table permanently from the database?", options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"], ans: 2 },
    { q: "What is the 'Application Level' Abstraction?", options: ["How data is stored physically", "The user-facing part of the database", "The schema definition", "The OS interactions"], ans: 1 },
    { q: "Which property ensure that transactions are executed in a serializable order?", options: ["Isolation", "Durability", "Atomicity", "Consistency"], ans: 0 },
    { q: "A 'View' is stored on disk as:", options: ["A full copy of the table", "A query definition only", "A temporary binary file", "An index"], ans: 1 },
    { q: "Which protocol prevents deadlocks by pre-ordering resource access?", options: ["Wait-Die", "Two-Phase Locking", "Timestamp Ordering", "Wound-Wait"], ans: 3 },
    { q: "What does the 'GRANT' command do?", options: ["Removes access", "Deletes a user", "Gives permissions", "Updates the schema"], ans: 2 },
    { q: "In 1NF, multi-valued attributes are:", options: ["Allowed", "Forbidden", "Converted to primary keys", "Encrypted"], ans: 1 },
    { q: "Which component of DBMS translates SQL into low-level instructions?", options: ["Query Processor", "Transaction Manager", "Buffer Manager", "Storage Engine"], ans: 0 },
    { q: "A 'Super Key' that has no proper subset as a key is called:", options: ["Primary Key", "Candidate Key", "Foreign Key", "Unique Key"], ans: 1 },
    { q: "What is 'Data Independence'?", options: ["Data is not related", "Data can be accessed by any user", "Ability to change schema levels without affecting higher levels", "Using multiple databases"], ans: 2 },
    { q: "Which normal form deals with Transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], ans: 2 },
    { q: "What is a 'Weak Entity'?", options: ["An entity with few attributes", "An entity that cannot be uniquely identified by its own attributes", "An entity with a null primary key", "A deleted entity"], ans: 1 },
    { q: "What is the 'Cardinality' of a relationship?", options: ["Number of entities", "Maximum number of relationship instances", "Number of attributes mapping", "Size of the table"], ans: 1 },
    { q: "Which keyword is used for pattern matching in SQL?", options: ["MATCH", "LIKE", "EQUALS", "SIMILAR"], ans: 1 },
    { q: "Transactions that appear to run sequentially but are interleaved are:", options: ["Serial", "Serializable", "Parallel", "Distributed"], ans: 1 },
    { q: "What is 'Log Sequence Number' (LSN)?", options: ["A user ID", "The unique identifier of a log record", "The version of the database", "The number of rows in a table"], ans: 1 },
    { q: "Which lock type allows multiple concurrent reads?", options: ["Exclusive Lock", "S-Lock (Shared)", "X-Lock", "Update Lock"], ans: 1 },
    { q: "In E-R models, attributes of attributes are called:", options: ["Complex attributes", "Composite attributes", "Multivalued attributes", "Derived attributes"], ans: 1 },
    { q: "The 'All-or-Nothing' rule corresponds to:", options: ["Consistency", "Atomicity", "Durability", "Isolation"], ans: 1 },
    { q: "Which SQL clause is used to sort the result-set?", options: ["SORT BY", "GROUP BY", "ORDER BY", "ARRANGE BY"], ans: 2 },
    { q: "What does 'R' in RDBMS stand for?", options: ["Relational", "Reliable", "Rapid", "Row-based"], ans: 0 },
    { q: "Which command is used to add a new column to a table?", options: ["MODIFY TABLE", "ALTER TABLE", "UPDATE TABLE", "ADD COLUMN"], ans: 1 },
    { q: "What is 'Cascading Deletes'?", options: ["Deleting rows randomly", "Automatically deleting child rows when a parent row is deleted", "A error in the query", "Deleting the entire database"], ans: 1 },
    { q: "Which normal form requires every determinant to be a candidate key?", options: ["3NF", "4NF", "BCNF", "5NF"], ans: 2 },
    { q: "What is 'Deadlock Detection'?", options: ["Preventing deadlocks", "Aborting a transaction that causes a wait-cycle", "Checking for idle connections", "Encryption check"], ans: 1 },
    { q: "Which type of integrity ensures a primary key cannot be NULL?", options: ["Referential Integrity", "Entity Integrity", "Domain Integrity", "User-defined Integrity"], ans: 1 },
    { q: "What is 'Horizontal Partitioning'?", options: ["Splitting a table by its columns", "Splitting a table by its rows", "Merging two tables", "Creating a view"], ans: 1 },
    { q: "Which join is basically a Cartesian product?", options: ["Cross Join", "Inner Join", "Outer Join", "Natural Join"], ans: 0 },
    { q: "What is the 'Conceptual' level of database mapping?", options: ["Internal to logical mapping", "Conceptual to internal mapping", "Logical to view mapping", "User to view mapping"], ans: 0 }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('✅ Connected to MongoDB');

        const coreDomain = await Domain.findOne({ name: /Core Computer Science/i });
        if (!coreDomain) {
            console.error('❌ Core CS Domain not found!');
            process.exit(1);
        }

        // 1. Update DBMS Topic
        await Topic.deleteMany({ subject: 'DBMS', lessonType: 'theory' });

        const mappedMcqs = dbmsMcqsRaw.map(m => ({
            question: m.q,
            options: m.options,
            correctAnswer: m.ans, // Use index here
            explanation: "Knowledge of this concept is essential for technical rounds."
        }));

        await Topic.create({
            domainId: coreDomain._id,
            subject: 'DBMS',
            topicGroup: 'Database Management',
            title: 'DBMS Full Tutorial - Interview Masterclass',
            level: 'Beginner',
            difficulty: 'Medium',
            isCoreCS: true,
            lessonType: 'theory',
            content: { explanation: dbmsTheory },
            quiz: mappedMcqs
        });
        console.log(`✅ Seeded DBMS Tutorial with ${mappedMcqs.length} MCQs`);

        // 2. Create 100-Question Exam
        await Exam.deleteMany({ title: 'DBMS Comprehensive Technical Exam' });

        const examQuestions = dbmsMcqsRaw.map((m, index) => {
            let difficulty = 'Medium';
            if (index < 30) difficulty = 'Easy';
            else if (index > 70) difficulty = 'Hard';

            return {
                questionText: m.q,
                options: m.options,
                correctAnswer: m.options[m.ans], // String value for Exam
                difficulty: difficulty,
                explanation: "Mastering this concept is key for DBMS interviews."
            };
        });

        await Exam.create({
            domainId: coreDomain._id,
            title: 'DBMS Comprehensive Technical Exam',
            type: 'Topic-wise',
            durationMinutes: 60,
            questions: examQuestions
        });
        console.log('✅ Seeded 100-Question DBMS Exam');

        await mongoose.connection.close();
        console.log('✅ Seeding Completed Successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
}

seed();
