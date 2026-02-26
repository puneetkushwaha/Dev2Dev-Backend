const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../models/Topic');
const Domain = require('../models/Domain');

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

const oopMcqs = [
    {
        question: "Which pillar of OOP focuses on hiding internal implementation details?",
        options: ["Inheritance", "Abstraction", "Polymorphism", "Encapsulation"],
        correctAnswer: 1,
        explanation: "Abstraction is about showing only essential features and hiding the complex background details."
    },
    {
        question: "What is an instance of a class called?",
        options: ["Blueprint", "Template", "Object", "Variable"],
        correctAnswer: 2,
        explanation: "An object is a concrete instance of a class blueprint."
    },
    {
        question: "Which access specifier allows access to subclasses but not the outside world?",
        options: ["Private", "Protected", "Public", "Default"],
        correctAnswer: 1,
        explanation: "Protected members are accessible within the same class and by derived classes."
    },
    {
        question: "In which paradigm is the focus on 'how' to achieve a goal?",
        options: ["Declarative", "Functional", "Imperative", "Logical"],
        correctAnswer: 2,
        explanation: "Imperative programming focuses on the sequence of steps/commands to solve a problem."
    },
    {
        question: "Binding data and methods into a single unit is called:",
        options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"],
        correctAnswer: 1,
        explanation: "Encapsulation refers to wrapping data and code into a single unit like a class."
    },
    {
        question: "Which type of inheritance involves a child class derived from multiple parent classes?",
        options: ["Single", "Multilevel", "Multiple", "Hierarchical"],
        correctAnswer: 2,
        explanation: "Multiple inheritance allows a class to inherit from more than one base class."
    },
    {
        question: "Java does not support which type of inheritance directly?",
        options: ["Single", "Multiple", "Multilevel", "Hierarchical"],
        correctAnswer: 1,
        explanation: "Java does not support multiple inheritance with classes to avoid the diamond problem."
    },
    {
        question: "Which constructor is called automatically by the compiler if none are defined?",
        options: ["Parameterized", "Copy", "Default", "Static"],
        correctAnswer: 2,
        explanation: "The default constructor is provided by the compiler if the user doesn't specify any."
    },
    {
        question: "What is the return type of a constructor?",
        options: ["void", "int", "No return type", "Object"],
        correctAnswer: 2,
        explanation: "Constructors do not have a return type, not even void."
    },
    {
        question: "Which function is used to free memory when an object is no longer needed?",
        options: ["Constructor", "Destructor", "Free()", "Delete()"],
        correctAnswer: 1,
        explanation: "Destructors are used for cleanup and resource deallocation."
    },
    {
        question: "A class that cannot be instantiated is called:",
        options: ["Final Class", "Static Class", "Abstract Class", "Interface"],
        correctAnswer: 2,
        explanation: "Abstract classes are meant for inheritance and cannot be used to create objects directly."
    },
    {
        question: "Polymorphism achieved through method overloading is called:",
        options: ["Runtime Polymorphism", "Early Binding", "Dynamic Dispatch", "Late Binding"],
        correctAnswer: 1,
        explanation: "Early binding (or compile-time polymorphism) is resolved before execution."
    },
    {
        question: "Which keyword in C++ is used to prefix a destructor?",
        options: ["!", "#", "~", "&"],
        correctAnswer: 2,
        explanation: "The tilde (~) symbol is used before the class name for destructors in C++."
    },
    {
        question: "Which pillar of OOP promotes code reusability the most?",
        options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
        correctAnswer: 2,
        explanation: "Inheritance allows reuse of existing code from parent classes."
    },
    {
        question: "An interface contains only:",
        options: ["Method declarations", "Method definitions", "Private variables", "Constructors"],
        correctAnswer: 0,
        explanation: "Interfaces specify what a class must do, but not how, using declarations."
    },
    {
        question: "Which principle says 'If it looks like a duck and quacks like a duck, it is a duck'?",
        options: ["Strong Typing", "Duck Typing", "Static Typing", "Encapsulation"],
        correctAnswer: 1,
        explanation: "Duck typing focuses on an object's behavior rather than its explicit class type."
    },
    {
        question: "In Python, what is the name of the constructor method?",
        options: ["init()", "__init__", "constructor()", "new()"],
        correctAnswer: 1,
        explanation: "__init__ is the reserved method for initializing objects in Python."
    },
    {
        question: "Which feature allows the same operator to have different meanings?",
        options: ["Operator Overriding", "Operator Overloading", "Encapsulation", "Abstraction"],
        correctAnswer: 1,
        explanation: "Operator overloading allows operators (+, -, etc.) to work with user-defined types."
    },
    {
        question: "Which of these is NOT a pillar of OOP?",
        options: ["Encapsulation", "Compilation", "Polymorphism", "Abstraction"],
        correctAnswer: 1,
        explanation: "The four pillars are Abstraction, Encapsulation, Inheritance, and Polymorphism."
    },
    {
        question: "A 'has-a' relationship between objects is known as:",
        options: ["Inheritance", "Composition", "Abstraction", "Generalization"],
        correctAnswer: 1,
        explanation: "Composition or Aggregation represents a 'has-a' relationship."
    },
    {
        question: "Which type of coupling is preferred in software design?",
        options: ["Tight Coupling", "Content Coupling", "Loose Coupling", "Global Coupling"],
        correctAnswer: 2,
        explanation: "Loose coupling makes modules more independent and easier to maintain."
    },
    {
        question: "What refers to the degree of interdependence between classes?",
        options: ["Cohesion", "Coupling", "Inheritance", "Abstraction"],
        correctAnswer: 1,
        explanation: "Coupling measures how much one class relies on another."
    },
    {
        question: "A highly focused class with a single responsibility has:",
        options: ["High Coupling", "Low Cohesion", "High Cohesion", "Tight Coupling"],
        correctAnswer: 2,
        explanation: "High cohesion means class elements are closely related to a single task."
    },
    {
        question: "Which keyword is used to access parent class methods in Java/Python?",
        options: ["this", "parent", "super", "base"],
        correctAnswer: 2,
        explanation: "The super keyword (or function) refers to the immediate parent class."
    },
    {
        question: "Static methods can be called using:",
        options: ["Object instance", "Class name", "Both", "New keyword"],
        correctAnswer: 1,
        explanation: "Static methods belong to the class and are called via ClassName.method()."
    },
    {
        question: "Virtual functions are used to achieve:",
        options: ["Compile-time polymorphism", "Encapsulation", "Runtime polymorphism", "Abstraction"],
        correctAnswer: 2,
        explanation: "Virtual functions allow the correct method to be called at runtime based on object type."
    },
    {
        question: "Which language uses garbage collection automatically?",
        options: ["C", "C++", "Java", "Assembly"],
        correctAnswer: 2,
        explanation: "Java, Python, and C# use garbage collection to manage memory."
    },
    {
        question: "In C++, members of a class are by default:",
        options: ["Public", "Protected", "Private", "Global"],
        correctAnswer: 2,
        explanation: "Class members in C++ are private unless specified otherwise."
    },
    {
        question: "In C++, members of a struct are by default:",
        options: ["Public", "Protected", "Private", "Static"],
        correctAnswer: 0,
        explanation: "Struct members are public by default in C++."
    },
    {
        question: "Which constructor initializes an object using another object of the same class?",
        options: ["Default", "Parameterized", "Copy", "Destructor"],
        correctAnswer: 2,
        explanation: "A copy constructor creates a new object as a copy of an existing one."
    },
    {
        question: "Dynamic dispatch is also known as:",
        options: ["Early Binding", "Late Binding", "Static Binding", "Encapsulation"],
        correctAnswer: 1,
        explanation: "Late binding determines the implementation at execution time."
    },
    {
        question: "Which pillar allows code to behave differently for different contexts?",
        options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
        correctAnswer: 1,
        explanation: "Polymorphism means 'many forms'."
    },
    {
        question: "Can we have private constructors in a class?",
        options: ["Yes", "No", "Only in C++", "Only in Python"],
        correctAnswer: 0,
        explanation: "Private constructors are used in patterns like Singleton to prevent instantiation."
    },
    {
        question: "A friend function is allowed to access which members?",
        options: ["Only Public", "Only Private", "Private and Protected", "Global only"],
        correctAnswer: 2,
        explanation: "Friend functions can access private and protected data of a class."
    },
    {
        question: "Method resolution order (MRO) is used to handle:",
        options: ["Encapsulation", "Abstraction", "Multiple Inheritance", "Garbage Collection"],
        correctAnswer: 2,
        explanation: "MRO defines the search order for methods in complex inheritance links."
    },
    {
        question: "Which magic method represents an object as a string in Python?",
        options: ["__init__", "__str__", "__len__", "__repr__"],
        correctAnswer: 1,
        explanation: "__str__ is used for human-readable string representation."
    },
    {
        question: "Which decorator is used to define a getter in Python?",
        options: ["@classmethod", "@property", "@getter", "@staticmethod"],
        correctAnswer: 1,
        explanation: "@property allows a method to be accessed like an attribute."
    },
    {
        question: "Composition represents which relationship?",
        options: ["is-a", "has-a", "can-do", "kind-of-a"],
        correctAnswer: 1,
        explanation: "Composition is a strong 'has-a' relationship."
    },
    {
        question: "A pure virtual function in C++ is assigned what value?",
        options: ["null", "0", "undefined", "-1"],
        correctAnswer: 1,
        explanation: "A pure virtual function is declared as: virtual void func() = 0;"
    },
    {
        question: "Which principle states that a class should have only one reason to change?",
        options: ["Open-Closed", "Single Responsibility", "Liskov Substitution", "Interface Segregation"],
        correctAnswer: 1,
        explanation: "Single Responsibility Principle (SRP) focuses on functional cohesion."
    },
    {
        question: "The 'diamond problem' is associated with:",
        options: ["Single Inheritance", "Multiple Inheritance", "Encapsulation", "Polymorphism"],
        correctAnswer: 1,
        explanation: "It occurs when a class inherits from two classes that share a common grandparent."
    },
    {
        question: "Encapsulation helps in achieving:",
        options: ["Code Reusability", "Data Hiding", "Runtime Polymorphism", "Static Binding"],
        correctAnswer: 1,
        explanation: "Encapsulation hides the internal state from unauthorized access."
    },
    {
        question: "Which of these is NOT a disadvantage of OOP?",
        options: ["Size of program", "Think in terms of objects", "Code reusability", "Proper planning requirement"],
        correctAnswer: 2,
        explanation: "Code reusability is an advantage, not a disadvantage."
    },
    {
        question: "Class variables are shared among:",
        options: ["Only one instance", "All instances", "Method scopes", "Global scope"],
        correctAnswer: 1,
        explanation: "Class variables are shared by every instance of that class."
    },
    {
        question: "Which member cannot be inherited?",
        options: ["Public", "Protected", "Private", "Static"],
        correctAnswer: 2,
        explanation: "Private members are local to the class and not visible to subclasses."
    },
    {
        question: "Constructors are used for:",
        options: ["Memory allocation", "Object destruction", "Attribute initialization", "Looping"],
        correctAnswer: 2,
        explanation: "Constructors initialize the state of a new object."
    },
    {
        question: "Memory for objects is typically allocated in:",
        options: ["Stack", "Heap", "Cache", "Register"],
        correctAnswer: 1,
        explanation: "Dynamic objects are usually allocated on the heap."
    },
    {
        question: "Which OOP concept allows the same method name with different parameters?",
        options: ["Method Overriding", "Method Overloading", "Encapsulation", "Abstraction"],
        correctAnswer: 1,
        explanation: "Method overloading is compile-time polymorphism."
    },
    {
        question: "An abstract class must have at least one:",
        options: ["Static method", "Abstract method", "Constructor", "Private variable"],
        correctAnswer: 1,
        explanation: "By definition, an abstract class contains design elements (abstract methods) to be implemented."
    },
    {
        question: "Finalizers/Destructors are mainly used for:",
        options: ["Data input", "Closing resources", "Starting threads", "Defining classes"],
        correctAnswer: 1,
        explanation: "They manage resource cleanup like closing files or DB connections."
    }
];

async function seedOOPFresh() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const coreDomain = await Domain.findOne({ name: /Core Computer Science/i });
        if (!coreDomain) {
            console.error('Core CS Domain not found!');
            process.exit(1);
        }

        // Delete existing OOP theory content
        await Topic.deleteMany({ subject: 'OOP', lessonType: 'theory' });

        const oopTopic = new Topic({
            title: 'Object-Oriented Programming (OOPs) - Interview Masterclass',
            subject: 'OOP',
            topicGroup: 'Introduction',
            domainId: coreDomain._id,
            isCoreCS: true,
            lessonType: 'theory',
            content: {
                explanation: oopTheory,
                description: 'A comprehensive guide to OOP principles, pillars, and interview concepts.'
            },
            quiz: oopMcqs
        });

        await oopTopic.save();
        console.log('Successfully seeded fresh OOP content with 50 MCQs.');

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
}

seedOOPFresh();
