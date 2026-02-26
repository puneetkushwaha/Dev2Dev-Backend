const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Exam = require('../models/Exam');

const questions = [
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
    { text: "If Class B inherits Class A, what is Class A called?", options: ["Subclass", "Child Class", "Base Class", "Derived Class"], ans: "Base Class", diff: "Easy" },
    { text: "Can an interface contain non-abstract methods in traditional Java (prior to Java 8)?", options: ["Yes", "No", "Only if static", "Only if protected"], ans: "No", diff: "Hard" },
    { text: "Which paradigm focuses on changing the program state through assignment statements to achieve the goal?", options: ["Declarative", "Imperative / Procedural", "Logical", "Functional"], ans: "Imperative / Procedural", diff: "Medium" },
    { text: "Which of the following helps to avoid the 'Diamond Problem' in object-oriented design?", options: ["Using virtual inheritance or Interfaces", "Using multiple inheritance heavily", "Removing destructors", "Using only private inheritance"], ans: "Using virtual inheritance or Interfaces", diff: "Hard" },
    { text: "What is the size of an empty class in C++?", options: ["0 bytes", "1 byte", "4 bytes", "8 bytes"], ans: "1 byte", diff: "Hard" },
    { text: "Which of the following is true about a static variable?", options: ["Initialized every time an object is created", "Shared by all instances of a class", "Stored on the stack", "Cannot be accessed using class name"], ans: "Shared by all instances of a class", diff: "Medium" },
    { text: "What is it called when one module directly modifies another's internal data?", options: ["Common Coupling", "Control Coupling", "Content Coupling", "Stamp Coupling"], ans: "Content Coupling", diff: "Hard" },
    { text: "Which form of coupling is generally preferred in software design?", options: ["Tight Coupling", "Loose Coupling", "Static Coupling", "Dynamic Coupling"], ans: "Loose Coupling", diff: "Easy" },
    { text: "Which level of cohesion is considered the most desirable?", options: ["Communicational", "Sequential", "Functional", "Logical"], ans: "Functional", diff: "Medium" },
    { text: "Which principle states that a class should have only one reason to change?", options: ["Open/Closed Principle", "Liskov Substitution Principle", "Single Responsibility Principle", "Dependency Inversion Principle"], ans: "Single Responsibility Principle", diff: "Medium" },
    { text: "What is a 'kind-of-a' relationship also known as?", options: ["Inheritance", "Composition", "Mixin", "Aggregation"], ans: "Mixin", diff: "Medium" },
    { text: "Which relationship is stronger: Aggregation or Composition?", options: ["Aggregation", "Composition", "Both are same", "Neither"], ans: "Composition", diff: "Medium" },
    { text: "What happens to the children objects if a parent object is destroyed in Composition?", options: ["They continue to exist", "They are also destroyed", "They become global", "They are moved to another parent"], ans: "They are also destroyed", diff: "Hard" },
    { text: "What is the process of building objects by combining simpler ones called?", options: ["Inheritance", "Polymorphism", "Composition", "Encapsulation"], ans: "Composition", diff: "Easy" },
    { text: "Which keyword is used in Python to define a destructor?", options: ["__init__", "__del__", "__exit__", "__destruct__"], ans: "__del__", diff: "Easy" },
    { text: "In Java, what is used as a workaround for destructors?", options: ["finalize()", "dispose()", "close()", "None of the above"], ans: "finalize()", diff: "Medium" },
    { text: "Which keyword prevents a class from being inherited in Java?", options: ["static", "final", "private", "sealed"], ans: "final", diff: "Medium" },
    { text: "Which of these allows calling static methods without creating an object?", options: ["Object name", "Class name", "Variable name", "None"], ans: "Class name", diff: "Easy" },
    { text: "Is multiple inheritance possible in C++ using classes?", options: ["Yes", "No", "Only for abstract classes", "Only for virtual classes"], ans: "Yes", diff: "Easy" },
    { text: "Which design principle says 'Prefer Composition over Inheritance'?", options: ["LSP", "SRP", "Composition over Inheritance", "DIP"], ans: "Composition over Inheritance", diff: "Medium" },
    { text: "What is an abstract method?", options: ["A method with no name", "A method with no implementation", "A method with static keyword", "A method that cannot be overridden"], ans: "A method with no implementation", diff: "Easy" },
    { text: "What is it called when two or more classes communicate by passing data between them?", options: ["Data Coupling", "Stamp Coupling", "Control Coupling", "Common Coupling"], ans: "Data Coupling", diff: "Medium" },
    { text: "When multiple modules share global data, it is called:", options: ["Control Coupling", "Common Coupling", "Content Coupling", "External Coupling"], ans: "Common Coupling", diff: "Medium" },
    { text: "What does LSP stand for in SOLID principles?", options: ["Logical System Pattern", "Liskov Substitution Principle", "Language Syntax Protocol", "List Search Processing"], ans: "Liskov Substitution Principle", diff: "Medium" },
    { text: "Which principle focuses on avoiding 'thick' interfaces?", options: ["SRP", "OCP", "ISP", "DIP"], ans: "ISP", diff: "Medium" },
    { text: "What is information hiding also known as?", options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"], ans: "Encapsulation", diff: "Easy" },
    { text: "Which mechanism determines at runtime which specific method to invoke?", options: ["Static Dispatch", "Dynamic Dispatch", "Early Binding", "Default Binding"], ans: "Dynamic Dispatch", diff: "Hard" },
    { text: "What is the ability of an object to take many forms?", options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], ans: "Polymorphism", diff: "Easy" },
    { text: "Which of these is a physical entity?", options: ["Class", "Object", "Inheritance", "Abstraction"], ans: "Object", diff: "Easy" },
    { text: "Which of these is a logical entity?", options: ["Class", "Object", "Variable", "Instance"], ans: "Class", diff: "Easy" },
    { text: "Can a static method access non-static data members?", options: ["Yes", "No", "Only if they are public", "Only if they are protected"], ans: "No", diff: "Medium" },
    { text: "Which operator is used to call a static method in C++ using the class name?", options: [".", "->", "::", ":"], ans: "::", diff: "Medium" },
    { text: "What is a contract between a class and the outside world specifying what the class can do?", options: ["Inheritance", "Abstraction", "Interface", "Encapsulation"], ans: "Interface", diff: "Medium" },
    { text: "Which copy type creates a new object with its own memory locations?", options: ["Shallow Copy", "Deep Copy", "Virtual Copy", "Abstract Copy"], ans: "Deep Copy", diff: "Medium" },
    { text: "What refers to the current object instance in C++?", options: ["self", "this", "super", "base"], ans: "this", diff: "Easy" },
    { text: "What is disambiguating between instance variables and parameters with same name using 'this' called?", options: ["Shadowing", "Encapsulation", "Abstraction", "Polymorphism"], ans: "Shadowing", diff: "Hard" },
    { text: "Creating multiple methods in same class with same name but different parameters is:", options: ["Overloading", "Overriding", "Hiding", "Nesting"], ans: "Overloading", diff: "Easy" },
    { text: "Is method overloading decided at compile time or runtime?", options: ["Compile-time", "Runtime", "Both", "Depends on language"], ans: "Compile-time", diff: "Medium" },
    { text: "Is method overriding decided at compile time or runtime?", options: ["Compile-time", "Runtime", "Both", "Depends on language"], ans: "Runtime", diff: "Medium" },
    { text: "A function without a definition in an abstract class is:", options: ["Virtual function", "Pure virtual function", "Static function", "Friend function"], ans: "Pure virtual function", diff: "Medium" },
    { text: "What is the degree of interdependence between two classes called?", options: ["Cohesion", "Coupling", "Inheritance", "Abstraction"], ans: "Coupling", diff: "Medium" },
    { text: "What is the degree of relation between methods and data within a single class?", options: ["Coupling", "Cohesion", "Polymorphism", "Encapsulation"], ans: "Cohesion", diff: "Medium" },
    { text: "Which is a 'has-a' relationship?", options: ["Inheritance", "Abstraction", "Composition", "Aggregation"], ans: "Aggregation", diff: "Medium" },
    { text: "What is a stronger form of 'has-a' relationship?", options: ["Composition", "Aggregation", "Inheritance", "Polymorphism"], ans: "Composition", diff: "Medium" },
    { text: "Which principle suggests that high-level modules should not depend on low-level modules?", options: ["SRP", "OCP", "DIP", "ISP"], ans: "DIP", diff: "Hard" },
    { text: "A class definition inside another class is called:", options: ["Inner Class", "Friend Class", "Abstract Class", "Child Class"], ans: "Inner Class", diff: "Medium" },
    { text: "Which language features garbage collection?", options: ["C++", "C", "Java", "Assembly"], ans: "Java", diff: "Easy" },
    { text: "Can we have a constructor in an abstract class?", options: ["Yes", "No", "Only if it is public", "Only if it has parameters"], ans: "Yes", diff: "Hard" },
    { text: "Can we have a constructor in an interface (Java)?", options: ["Yes", "No", "Only if static", "Only if default"], ans: "No", diff: "Medium" },
    { text: "Which of the following is used to achieve runtime polymorphism in C++?", options: ["Static methods", "Virtual functions", "Friend functions", "Inline functions"], ans: "Virtual functions", diff: "Medium" },
    { text: "What is the process of identifying essential characteristics ignoring irrelevant details?", options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"], ans: "Abstraction", diff: "Easy" },
    { text: "Which of these is a protective shield preventing data access from outside code?", options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"], ans: "Encapsulation", diff: "Easy" },
    { text: "A car viewed as a single unit rather than individual components is example of:", options: ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance"], ans: "Abstraction", diff: "Easy" },
    { text: "What binds together code and data it manipulates?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], ans: "Encapsulation", diff: "Easy" }
];

async function seedExam() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to MongoDB');

        const examData = {
            title: "Object-Oriented Programming (OOP) Comprehensive Exam",
            type: "Topic-wise",
            durationMinutes: 90,
            questions: questions.map(q => ({
                questionText: q.text,
                options: q.options,
                correctAnswer: q.ans,
                difficulty: q.diff,
                explanation: `Correct Answer: ${q.ans}. This topic relates to the core OOP principle: ${q.text.split('?')[0]}.`
            }))
        };

        const existingExam = await Exam.findOne({ title: examData.title });
        if (existingExam) {
            await Exam.deleteOne({ _id: existingExam._id });
            console.log('Deleted existing exam with same title.');
        }

        const exam = new Exam(examData);
        await exam.save();
        console.log(`Successfully seeded ${questions.length} questions into "${examData.title}"`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seedExam();
