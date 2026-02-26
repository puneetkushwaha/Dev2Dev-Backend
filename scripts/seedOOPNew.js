const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../models/Topic');

const oopTheory = `### What is Object-Oriented Programming (OOP)?
Object-Oriented Programming (OOP) is a core paradigm in software development that models real-world entities into objects combining data and behavior. In OOP, the complete software operates as a bunch of objects talking to each other. An object is a collection of data and the methods which operate on that data.

### Why OOPs?
The main advantage of OOP is better manageable code that covers the following:
- **Improved Understanding**: The gap between the language spoken by developers and that spoken by users is narrowed.
- **Easier Maintenance**: Encapsulation allows changing the underlying representation without affecting the methods used to access it.
- **Scalability**: The OOP paradigm is specifically useful for relatively large software systems.

### Programming Paradigms
- **Imperative**: Works by changing the program state through assignment statements (e.g., Procedural, parallel).
- **Declarative**: Focuses on *what* to execute rather than *how* (e.g., Logical, Functional, Database).
- **Procedural**: Based on procedure calls (functions/routines).
- **Structured**: Precursor to OOP, consisting of well-structured and separated modules.

### Differences: Structured vs Object-Oriented Programming
| Feature | Structured Programming | Object-Oriented Programming |
| :--- | :--- | :--- |
| **Foundation** | Based on functions/logic. | Built on objects having state and behavior. |
| **Approach** | Top-to-Down. | Bottom-to-Top. |
| **Data Security** | No restriction to data flow. | Restricts data flow to authorized parts. |
| **Reusability** | Achieved via functions and loops. | Enhanced via polymorphism and inheritance. |
| **Focus** | Code is more important. | Data is given more importance. |

### Core Concept: The Class
A class is a building block of Object-Oriented Programs. It is a user-defined data type that contains data members and member functions. It serves as a blueprint or template for creating objects that share common properties and methods. Classes do not occupy memory themselves; they are merely templates.

### Core Concept: The Object
An object is an instance of a class. It is the real-world entity that has a state and behavior. To use the data members and methods defined in a class, you must create an object of that class. Objects are what actually use memory during program execution.

### The Four Pillars of OOP
1.  **Encapsulation**: Binding data and methods into a single unit (class) to hide sensitive data from unauthorized access.
2.  **Abstraction**: Showing only necessary information and hiding irrelevant details from the user. Implemented using classes and interfaces.
3.  **Inheritance**: Deriving a new class from an existing class to increase code reusability. Establishes an "is-a" relationship.
4.  **Polymorphism**: "Having many forms." The ability of code to behave differently in different contexts (Overloading and Overriding).

### Access Specifiers
Access specifiers control the visibility of class members:
- **Public**: Accessible from anywhere.
- **Private**: Accessible only within the same class (ensures data encapsulation).
- **Protected**: Accessible within the class and its subclasses.

### Polymorphism: Overloading vs Overriding
- **Overloading (Compile-Time)**: Multiple methods in the same class with the same name but different parameters (number, type, or order).
- **Overriding (Runtime)**: A subclass provides a specific implementation for a method already defined in its parent class.

### Inheritance Types
- **Single**: Child inherits from one base class.
- **Multiple**: Child inherits from multiple base classes (Not directly supported in Java classes).
- **Multilevel**: A derived class serves as a base class for another class.
- **Hierarchical**: Multiple subclasses inherit from a single base class.
- **Hybrid**: A combination of two or more of the above types.

### Constructors and Destructors
- **Constructor**: A special method used to initialize objects. It has the same name as the class and no return type.
- **Destructor**: A method automatically called when an object is destroyed or goes out of scope to release resources. In C++, it starts with a tilde (~).

### Interfaces vs Abstract Classes
- **Abstract Class**: Cannot be instantiated; can have both abstract and non-abstract methods. Supports single inheritance.
- **Interface**: A contract or blueprint with no implementation details (only signatures). Supports multiple inheritance.`;

const questionsPool = [
    { text: "Which of the following is NOT a pillar of Object-Oriented Programming?", options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"], ans: "Compilation", diff: "Easy" },
    { text: "What is the primary advantage of OOP?", options: ["Faster execution", "Code reusability and manageable code", "No use of memory", "Writing code in assembly"], ans: "Code reusability and manageable code", diff: "Easy" },
    { text: "Which programming paradigm treats computation as the evaluation of mathematical functions?", options: ["Procedural", "Object-Oriented", "Functional", "Logical"], ans: "Functional", diff: "Medium" },
    { text: "Which of the following is a bottom-up approach?", options: ["Structured Programming", "Procedural Programming", "Object-Oriented Programming", "Logical Programming"], ans: "Object-Oriented Programming", diff: "Easy" },
    { text: "Which language is NOT primarily an Object-Oriented language?", options: ["C", "C++", "Java", "Python"], ans: "C", diff: "Easy" },
    { text: "What binds data and the functions that manipulate them together?", options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"], ans: "Encapsulation", diff: "Easy" },
    { text: "Hiding internal details and showing only essential functionalities is called:", options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], ans: "Abstraction", diff: "Easy" },
    { text: "Which of the following creates a new class from an existing class?", options: ["Polymorphism", "Inheritance", "Constructors", "Destructors"], ans: "Inheritance", diff: "Easy" },
    { text: "The ability of a single function or operator to behave differently depending on the context is known as:", options: ["Polymorphism", "Inheritance", "Encapsulation", "Data Hiding"], ans: "Polymorphism", diff: "Easy" },
    { text: "Which concept allows a child class to have the same method name as its parent but with a different implementation?", options: ["Method Overloading", "Method Overriding", "Data Abstraction", "Encapsulation"], ans: "Method Overriding", diff: "Medium" },
    { text: "What is an Object in OOP?", options: ["A template", "A blueprint", "An instance of a class", "A function"], ans: "An instance of a class", diff: "Easy" },
    { text: "What is a Class in OOP?", options: ["A real-world entity", "An instance", "A user-defined data type / blueprint", "A primitive data type"], ans: "A user-defined data type / blueprint", diff: "Easy" },
    { text: "How much memory does a class inherently occupy before instantiation?", options: ["Depends on its variables", "Zero memory", "1 Byte", "8 Bytes"], ans: "Zero memory", diff: "Medium" },
    { text: "Is it always necessary to create objects from a class to use its methods?", options: ["Yes, always", "No, if methods are static", "No, if methods are private", "Yes, if methods are static"], ans: "No, if methods are static", diff: "Medium" },
    { text: "In C++, members of a structure are by default:", options: ["Private", "Protected", "Public", "Abstract"], ans: "Public", diff: "Easy" },
    { text: "In C++, members of a class are by default:", options: ["Private", "Protected", "Public", "Abstract"], ans: "Private", diff: "Easy" },
    { text: "What is the primary purpose of a constructor?", options: ["To delete an object", "To initialize a newly created object", "To print values", "To copy an object automatically"], ans: "To initialize a newly created object", diff: "Easy" },
    { text: "Which of the following is true about constructors in C++?", options: ["They have a return type", "They must have the same name as the class", "They can be virtual", "They cannot be overloaded"], ans: "They must have the same name as the class", diff: "Medium" },
    { text: "Which of the following is NOT a type of constructor in C++?", options: ["Default Constructor", "Parameterized Constructor", "Copy Constructor", "Virtual Constructor"], ans: "Virtual Constructor", diff: "Hard" },
    { text: "What is the name of the constructor method in Python?", options: ["__init__", "__del__", "constructor()", "init()"], ans: "__init__", diff: "Easy" },
    { text: "What initializes an object using another object of the same class?", options: ["Default Constructor", "Destructor", "Copy Constructor", "Reference Constructor"], ans: "Copy Constructor", diff: "Medium" },
    { text: "Which method is automatically called when an object goes out of scope?", options: ["Constructor", "Destructor", "Finalize", "Destroy"], ans: "Destructor", diff: "Easy" },
    { text: "What is the prefix used to denote a destructor in C++?", options: ["*", "&", "~", "!"], ans: "~", diff: "Easy" },
    { text: "Can a constructor be overloaded?", options: ["Yes", "No", "Only in Java", "Only in C++"], ans: "Yes", diff: "Easy" },
    { text: "Can a destructor be overloaded?", options: ["Yes", "No", "Only in Python", "Only in Java"], ans: "No", diff: "Medium" },
    { text: "Which feature of OOP is demonstrated by having multiple functions with the same name but different parameters?", options: ["Method Overriding", "Method Overloading", "Virtual Functions", "Friend Functions"], ans: "Method Overloading", diff: "Medium" },
    { text: "Method Overloading is an example of:", options: ["Runtime Polymorphism", "Compile-Time Polymorphism", "Abstraction", "Data Hiding"], ans: "Compile-Time Polymorphism", diff: "Medium" },
    { text: "Method Overriding is an example of:", options: ["Runtime Polymorphism", "Compile-Time Polymorphism", "Encapsulation", "Inheritance Binding"], ans: "Runtime Polymorphism", diff: "Medium" },
    { text: "In which type of inheritance does a child class derive from multiple base classes?", options: ["Single", "Multilevel", "Hierarchical", "Multiple"], ans: "Multiple", diff: "Medium" },
    { text: "In which type of inheritance does a child class derive from a class which is also derived from another base class?", options: ["Multilevel", "Multiple", "Hierarchical", "Hybrid"], ans: "Multilevel", diff: "Medium" },
    { text: "Java does NOT support which type of inheritance through classes directly?", options: ["Multilevel", "Single", "Multiple", "Hierarchical"], ans: "Multiple", diff: "Medium" },
    { text: "What does tight coupling in inheritance refer to?", options: ["Classes are independent", "Base and child classes are closely related and changes in one affect the other", "Methods are heavily overloaded", "Variables are private"], ans: "Base and child classes are closely related and changes in one affect the other", diff: "Hard" },
    { text: "Which keyword is used in C++ and C# to declare a function that will be overridden in a derived class?", options: ["override", "new", "virtual", "abstract"], ans: "virtual", diff: "Medium" },
    { text: "A virtual function that doesn't contain any statements and forces derived classes to implement it is called:", options: ["Blank function", "Pure virtual function", "Static function", "Friend function"], ans: "Pure virtual function", diff: "Hard" },
    { text: "A class that contains at least one pure virtual function (in C++) or is explicitly marked as abstract is called:", options: ["Concrete Class", "Base Class", "Abstract Class", "Friend Class"], ans: "Abstract Class", diff: "Medium" },
    { text: "Can an abstract class be instantiated directly?", options: ["Yes", "No", "Yes, if it has no variables", "Yes, in Java only"], ans: "No", diff: "Medium" },
    { text: "What is an Interface?", options: ["A class with fully implemented methods", "A unique class type containing only method declarations and constants", "A friend class", "A constructor"], ans: "A unique class type containing only method declarations and constants", diff: "Medium" },
    { text: "Which of the following supports multiple inheritance directly in Java?", options: ["Classes", "Abstract Classes", "Interfaces", "Constructors"], ans: "Interfaces", diff: "Medium" },
    { text: "Which access specifier allows members to be accessed within the defining class and its subclasses only?", options: ["Private", "Public", "Protected", "Default"], ans: "Protected", diff: "Easy" },
    { text: "What is a 'Friend Function' in C++?", options: ["A function inside a struct", "A globally accessible function without restrictions", "A function allowed to access private and protected data of a class despite not being a member", "A function that has no parameters"], ans: "A function allowed to access private and protected data of a class despite not being a member", diff: "Hard" },
    { text: "Which principle focuses on showing only the necessary details and hiding the background complexities?", options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"], ans: "Abstraction", diff: "Easy" },
    { text: "Which principle is achieved largely through access specifiers (private, protected, public)?", options: ["Inheritance", "Polymorphism", "Data Hiding / Encapsulation", "Method Overloading"], ans: "Data Hiding / Encapsulation", diff: "Medium" },
    { text: "What happens if a copy constructor is not defined by the user in C++?", options: ["Compile error", "Runtime error", "The compiler provides a default copy constructor", "The object cannot be assigned"], ans: "The compiler provides a default copy constructor", diff: "Hard" },
    { text: "What is early binding?", options: ["Runtime Polymorphism", "Compile-Time Polymorphism", "Garbage Collection", "Interface Implemetation"], ans: "Compile-Time Polymorphism", diff: "Medium" },
    { text: "What is late binding?", options: ["Compile-Time Polymorphism", "Method Overloading", "Runtime Polymorphism", "Variable Initialization"], ans: "Runtime Polymorphism", diff: "Medium" },
    { text: "Which of these is NOT an access modifier?", options: ["Public", "Protected", "Private", "Virtual"], ans: "Virtual", diff: "Easy" },
    { text: "If Class B inherits Class A, what is Class A called?", options: ["Subclass", "Child Class", "Base Class", "Derived Class"], ans: "Base Class", diff: "Easy" }
];

const oopMcqs = questionsPool.map(q => ({
    question: q.text,
    options: q.options,
    correctAnswer: q.options.indexOf(q.ans),
    explanation: `Correct Answer: ${q.ans}. This question explores core OOP principles.`
}));

async function seedOOP() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        // Delete existing OOP theory
        await Topic.deleteOne({ subject: 'OOP', lessonType: 'theory', isCoreCS: true });

        const oopTopic = new Topic({
            title: 'Object-Oriented Programming (OOPs) - Comprehensive Guide',
            subject: 'OOP',
            topicGroup: 'Introduction',
            level: 'Beginner',
            difficulty: 'Easy',
            isCoreCS: true,
            lessonType: 'theory',
            content: {
                explanation: oopTheory,
                description: 'Complete guide for Object Oriented Programming concepts and interview questions.',
                problemStatement: 'Learn the core principles of OOP including Classes, Objects, and the Four Pillars.'
            },
            quiz: oopMcqs
        });

        await oopTopic.save();
        console.log(`Successfully seeded OOP Theory and ${oopMcqs.length} MCQs.`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seedOOP();
