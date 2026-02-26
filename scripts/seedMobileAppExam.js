const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
require('dotenv').config();

const questions = [
    // --- MCQs (1-10: Fundamentals) ---
    { questionText: "Android apps primarily kis language me likhe jate hain?", type: "mcq", options: ["Python", "Kotlin", "C#", "PHP"], correctAnswer: "Kotlin", difficulty: "Easy" },
    { questionText: "iOS app development ke liye official language kaunsi hai?", type: "mcq", options: ["Java", "Swift", "Kotlin", "Dart"], correctAnswer: "Swift", difficulty: "Easy" },
    { questionText: "SDK ka full form kya hai?", type: "mcq", options: ["Software Development Kit", "Secure Data Kit", "System Deployment Kit", "Software Debug Kit"], correctAnswer: "Software Development Kit", difficulty: "Easy" },
    { questionText: "APK ka full form?", type: "mcq", options: ["Android Programming Kit", "Android Package Kit", "App Programming Kernel", "Application Private Key"], correctAnswer: "Android Package Kit", difficulty: "Easy" },
    { questionText: "Cross-platform framework ka example?", type: "mcq", options: ["Flutter", "React Native", "Xamarin", "All of the above"], correctAnswer: "All of the above", difficulty: "Easy" },
    { questionText: "Emulator ka purpose kya hai?", type: "mcq", options: ["Real device replace", "Testing without physical device", "Debugging only", "Publishing"], correctAnswer: "Testing without physical device", difficulty: "Easy" },
    { questionText: "Play Store par app publish karne ke liye kya zaruri hai?", type: "mcq", options: ["APK", "Developer account", "App icon", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "App lifecycle ka matlab?", type: "mcq", options: ["Install process", "App states (create, start, pause, destroy)", "App update", "App design"], correctAnswer: "App states (create, start, pause, destroy)", difficulty: "Easy" },
    { questionText: "UI ka full form?", type: "mcq", options: ["User Integration", "User Interface", "Universal Input", "User Internet"], correctAnswer: "User Interface", difficulty: "Easy" },
    { questionText: "UX ka full form?", type: "mcq", options: ["User Experience", "User Extension", "User Execute", "User XML"], correctAnswer: "User Experience", difficulty: "Easy" },

    // --- Android Core (11-25) ---
    { questionText: "Activity kya hoti hai?", type: "mcq", options: ["Background task", "UI screen", "Database", "Layout"], correctAnswer: "UI screen", difficulty: "Easy" },
    { questionText: "Fragment ka use kyu hota hai?", type: "mcq", options: ["Multi-screen UI", "Database", "API", "Security"], correctAnswer: "Multi-screen UI", difficulty: "Medium" },
    { questionText: "Intent ka purpose?", type: "mcq", options: ["Screen navigation", "Database insert", "Animation", "Security"], correctAnswer: "Screen navigation", difficulty: "Easy" },
    { questionText: "RecyclerView ka use?", type: "mcq", options: ["Scrollable list", "Image only", "API call", "Background task"], correctAnswer: "Scrollable list", difficulty: "Easy" },
    { questionText: "ViewModel kis architecture ka part hai?", type: "mcq", options: ["MVC", "MVP", "MVVM", "REST"], correctAnswer: "MVVM", difficulty: "Medium" },
    { questionText: "LiveData kya karta hai?", type: "mcq", options: ["Store data", "Observe data changes", "Encrypt", "Delete"], correctAnswer: "Observe data changes", difficulty: "Medium" },
    { questionText: "Room database kya hai?", type: "mcq", options: ["Cloud DB", "Local DB abstraction", "API", "Cache"], correctAnswer: "Local DB abstraction", difficulty: "Medium" },
    { questionText: "Service kya hoti hai?", type: "mcq", options: ["Background task", "Layout", "Button", "DB"], correctAnswer: "Background task", difficulty: "Medium" },
    { questionText: "BroadcastReceiver ka use?", type: "mcq", options: ["Listen system events", "Animation", "API call", "Security"], correctAnswer: "Listen system events", difficulty: "Medium" },
    { questionText: "Manifest file ka role?", type: "mcq", options: ["App configuration", "UI design", "DB", "Code storage"], correctAnswer: "App configuration", difficulty: "Easy" },
    { questionText: "Android me Runtime Permissions kab mangi jati hain?", type: "mcq", options: ["Installation time", "When the app needs to use the resource", "Always on app start", "None"], correctAnswer: "When the app needs to use the resource", difficulty: "Medium" },
    { questionText: "Gradle ka major job kya hai?", type: "mcq", options: ["Compiling and Building the app", "UI design", "Icon resizing", "None"], correctAnswer: "Compiling and Building the app", difficulty: "Medium" },
    { questionText: "ConstraintLayout ka primary benefit?", type: "mcq", options: ["Flattening the view hierarchy to improve performance", "Creating simple lists", "Formatting text only", "None"], correctAnswer: "Flattening the view hierarchy to improve performance", difficulty: "Medium" },
    { questionText: "Data Binding ka use?", type: "mcq", options: ["Binding UI components to data sources", "Connecting to SQL", "Encryption", "None"], correctAnswer: "Binding UI components to data sources", difficulty: "Medium" },
    { questionText: "Kotlin Coroutines kis liye use hote hain?", type: "mcq", options: ["Asynchronous/non-blocking operations", "Drawing UI", "Security", "None"], correctAnswer: "Asynchronous/non-blocking operations", difficulty: "Hard" },

    // --- iOS / Swift (26-35) ---
    { questionText: "Xcode kya hai?", type: "mcq", options: ["Android IDE", "Apple's Integrated Development Environment", "Graphics tool", "Browser"], correctAnswer: "Apple's Integrated Development Environment", difficulty: "Easy" },
    { questionText: "UIViewController kya karta hai?", type: "mcq", options: ["Manages the view lifecycle and transitions", "Stores images", "API server", "None"], correctAnswer: "Manages the view lifecycle and transitions", difficulty: "Medium" },
    { questionText: "Storyboard kya hota hai?", type: "mcq", options: ["Visual map of app's UI screens and flow", "Code editor", "Database", "None"], correctAnswer: "Visual map of app's UI screens and flow", difficulty: "Medium" },
    { questionText: "Swift me 'Optional' (?) kya represent karta hai?", type: "mcq", options: ["A variable that can hold both a value and 'nil'", "A constant value", "A required field", "None"], correctAnswer: "A variable that can hold both a value and 'nil'", difficulty: "Medium" },
    { questionText: "CocoaPods ka use kyu hota hai?", type: "mcq", options: ["Dependency management for Swift/Obj-C projects", "Editing images", "Creating logos", "None"], correctAnswer: "Dependency management for Swift/Obj-C projects", difficulty: "Medium" },
    { questionText: "iOS me standard MVC me 'C' kya hota hai?", type: "mcq", options: ["Controller", "Center", "Code", "Cloud"], correctAnswer: "Controller", difficulty: "Easy" },
    { questionText: "Delegation pattern ka purpose?", type: "mcq", options: ["Enabling one object to act on behalf of another", "Deleting data", "Security", "None"], correctAnswer: "Enabling one object to act on behalf of another", difficulty: "Hard" },
    { questionText: "Core Data kya hai?", type: "mcq", options: ["Object-oriented database and persistence framework", "Cloud storage", "UI framework", "None"], correctAnswer: "Object-oriented database and persistence framework", difficulty: "Hard" },
    { questionText: "App Store publish karne ke liye kaunsi file create hoti hai?", type: "mcq", options: ["IPA", "APK", "EXE", "DMG"], correctAnswer: "IPA", difficulty: "Easy" },
    { questionText: "TestFlight ka primary use?", type: "mcq", options: ["Beta testing apps before App Store release", "Designing icons", "Writing code", "None"], correctAnswer: "Beta testing apps before App Store release", difficulty: "Medium" },

    // --- Cross Platform (36-45) ---
    { questionText: "Flutter kis language par based hai?", type: "mcq", options: ["JavaScript", "Dart", "Swift", "C++"], correctAnswer: "Dart", difficulty: "Easy" },
    { questionText: "React Native kis language ka use karta hai?", type: "mcq", options: ["JavaScript/React", "Swift", "Kotlin", "Dart"], correctAnswer: "JavaScript/React", difficulty: "Easy" },
    { questionText: "Hot Reload feature ka fyada?", type: "mcq", options: ["Instant UI update without rebuilding state", "Full app restart", "Memory clear", "None"], correctAnswer: "Instant UI update without rebuilding state", difficulty: "Easy" },
    { questionText: "Flutter me everything is a _______?", type: "mcq", options: ["State", "Widget", "Plugin", "Object"], correctAnswer: "Widget", difficulty: "Easy" },
    { questionText: "Expo kya hai?", type: "mcq", options: ["Set of tools for React Native development", "Database", "Compiler", "None"], correctAnswer: "Set of tools for React Native development", difficulty: "Medium" },
    { questionText: "Platform Channels kya hote hain?", type: "mcq", options: ["Bridge between Flutter/RN and Native OS code", "Satellite channels", "Marketing tools", "None"], correctAnswer: "Bridge between Flutter/RN and Native OS code", difficulty: "Hard" },
    { questionText: "Native Module ka purpose?", type: "mcq", options: ["Using native device features (Camera, GPS) in cross-platform", "Deleting apps", "Encryption", "None"], correctAnswer: "Using native device features (Camera, GPS) in cross-platform", difficulty: "Hard" },
    { questionText: "Redux/Provider/Riverpod kya solve karte hain?", type: "mcq", options: ["State Management", "Formatting text", "API calls only", "None"], correctAnswer: "State Management", difficulty: "Medium" },
    { questionText: "BLoC pattern standalone for:", type: "mcq", options: ["Business Logic Component", "Basic Loop", "Binary Link", "None"], correctAnswer: "Business Logic Component", difficulty: "Hard" },
    { questionText: "Redux mobile app me utilize ho sakta hai?", type: "mcq", options: ["Yes, both in React Native and specialized Flutter libs", "No", "Only for web", "None"], correctAnswer: "Yes, both in React Native and specialized Flutter libs", difficulty: "Medium" },

    // --- API & Backend Integration (46-55) ---
    { questionText: "REST API kya hoti hai?", type: "mcq", options: ["Representational State Transfer protocol", "Database type", "UI tool", "Hardware"], correctAnswer: "Representational State Transfer protocol", difficulty: "Easy" },
    { questionText: "JSON ka full form?", type: "mcq", options: ["JavaScript Object Notation", "Java Script Only", "Junction System", "None"], correctAnswer: "JavaScript Object Notation", difficulty: "Easy" },
    { questionText: "Retrofit kya hai?", type: "mcq", options: ["Type-safe HTTP client for Android/Java", "Database", "Image editor", "None"], correctAnswer: "Type-safe HTTP client for Android/Java", difficulty: "Medium" },
    { questionText: "Axios ka use mobile dev में?", type: "mcq", options: ["Making network requests in React Native", "Local storage", "Design", "None"], correctAnswer: "Making network requests in React Native", difficulty: "Medium" },
    { questionText: "Firebase kya provide karta hai?", type: "mcq", options: ["Realtime DB, Auth, Hosting", "Only Icons", "C++ compiler", "None"], correctAnswer: "Realtime DB, Auth, Hosting", difficulty: "Easy" },
    { questionText: "2FA (Two Factor Authentication) example?", type: "mcq", options: ["Password + OTP", "Only username", "Fingerprint only", "None"], correctAnswer: "Password + OTP", difficulty: "Easy" },
    { questionText: "Push Notification send karne ke liye tool?", type: "mcq", options: ["FCM (Firebase Cloud Messaging)", "VLC", "Notepad", "None"], correctAnswer: "FCM (Firebase Cloud Messaging)", difficulty: "Easy" },
    { questionText: "WebSocket ka primary benefit?", type: "mcq", options: ["Two-way persistent connection for realtime apps", "One-way only", "Deleting data", "None"], correctAnswer: "Two-way persistent connection for realtime apps", difficulty: "Hard" },
    { questionText: "OAuth 2.0 kya hai?", type: "mcq", options: ["Industry-standard protocol for authorization", "Encryption algorithm", "Database type", "None"], correctAnswer: "Industry-standard protocol for authorization", difficulty: "Hard" },
    { questionText: "Token-based authentication ka standard header?", type: "mcq", options: ["Authorization: Bearer <token>", "Secret-Key", "Content-Type", "None"], correctAnswer: "Authorization: Bearer <token>", difficulty: "Medium" },

    // --- Security & Performance (56-70) ---
    { questionText: "App Signing kya hota hai?", type: "mcq", options: ["Ensuring the app version comes from a known developer", "Deleting app", "Writing code", "None"], correctAnswer: "Ensuring the app version comes from a known developer", difficulty: "Medium" },
    { questionText: "Proguard / R8 kya karta hai?", type: "mcq", options: ["Shrinks, obfuscates, and optimizes app code", "Increases size", "Designs icons", "None"], correctAnswer: "Shrinks, obfuscates, and optimizes app code", difficulty: "Hard" },
    { questionText: "EncryptedSharedPreferences (Android) use hota hai:", type: "mcq", options: ["Secure storage of key-value pairs", "Open storage", "Only for images", "None"], correctAnswer: "Secure storage of key-value pairs", difficulty: "Medium" },
    { questionText: "HTTPS kyu zaruri hai?", type: "mcq", options: ["Data encryption in transit", "To increase speed", "For styling only", "None"], correctAnswer: "Data encryption in transit", difficulty: "Easy" },
    { questionText: "Obfuscation ka purpose?", type: "mcq", options: ["Making code difficult to reverse engineer", "Increasing speed", "Encryption", "None"], correctAnswer: "Making code difficult to reverse engineer", difficulty: "Hard" },
    { questionText: "Memory Leak kya hota hai?", type: "mcq", options: ["Failing to release unused memory, causing app to slow/crash", "Physical leak", "Deleting cache", "None"], correctAnswer: "Failing to release unused memory, causing app to slow/crash", difficulty: "Hard" },
    { questionText: "ANR stands for:", type: "mcq", options: ["Application Not Responding", "Android Network Run", "App Node React", "None"], correctAnswer: "Application Not Responding", difficulty: "Medium" },
    { questionText: "Battery optimization kaise possible hai?", type: "mcq", options: ["Reducing background tasks and location usage", "Increasing CPU", "Keeping high brightness", "None"], correctAnswer: "Reducing background tasks and location usage", difficulty: "Medium" },
    { questionText: "Lazy Loading ka fyada?", type: "mcq", options: ["Loading data only when needed to save resources", "Loading everything at start", "Slowing down", "None"], correctAnswer: "Loading data only when needed to save resources", difficulty: "Medium" },
    { questionText: "Crashlytics kya monitor karta hai?", type: "mcq", options: ["Realtime crash reports and analytics", "Weather", "Stock market", "None"], correctAnswer: "Realtime crash reports and analytics", difficulty: "Easy" },
    { questionText: "Secure API Call include krna chahiye:", type: "mcq", options: ["Tokens, HTTPS, and proper headers", "Open URLs", "Passwords in plain text", "None"], correctAnswer: "Tokens, HTTPS, and proper headers", difficulty: "Medium" },
    { questionText: "Certificate Pinning ka role?", type: "mcq", options: ["Preventing Man-in-the-Middle attacks by validating SSL certificates", "Formatting certificates", "Deleting server", "None"], correctAnswer: "Preventing Man-in-the-Middle attacks by validating SSL certificates", difficulty: "Hard" },
    { questionText: "Biometric Authentication include karta hai:", type: "mcq", options: ["Fingerprint and Face ID", "Only PIN", "Only Username", "None"], correctAnswer: "Fingerprint and Face ID", difficulty: "Easy" },
    { questionText: "Code Minification se kya hota hai?", type: "mcq", options: ["Reducing binary/APK size", "Deleting code functionality", "Making code bigger", "None"], correctAnswer: "Reducing binary/APK size", difficulty: "Medium" },
    { questionText: "App Performance Profiling kiske liye hai?", type: "mcq", options: ["To find bottlenecks in CPU, Memory, and Network", "For game play", "To delete cache", "None"], correctAnswer: "To find bottlenecks in CPU, Memory, and Network", difficulty: "Medium" },

    // --- Coding / Practical (71-100) ---
    { questionText: "Coding Question: Design a basic Login screen XML layout with an ImageView (logo), two EditTexts (email/password), and a 'Login' Button.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Write the code to start a new 'ProfileActivity' from 'MainActivity' and pass a string 'username' using Intent Extras.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement a basic RecyclerView Adapter in Kotlin for a list of 'Product' objects with title and price.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Create a Room Database DAO interface for a 'User' entity with Insert and GetAll methods.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Write the Retrofit interface definition to fetch a 'UserResponse' from endpoint '/api/profile' using a GET request and a Bearer Token.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Implement a ViewModel class that stores a 'Counter' integer and exposes it as LiveData to the UI.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Code a Background Service in Android that prints 'Processing data...' to the console every 1 minute.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Write the logic to handle the incoming Firebase Push Notification in the 'onMessageReceived' method.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Implement the 'requestPermissions' logic for READ_EXTERNAL_STORAGE at runtime, including the callback 'onRequestPermissionsResult'.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Demonstrate how to check the current system theme (Light/Dark) in Android and apply a conditional UI change.", type: "coding", difficulty: "Medium" },

    { questionText: "Coding Question: Swift: Write a simple IBAction function that changes the text of a UILabel to 'Button Clicked!' when pressed.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement a basic 'numberOfRowsInSection' and 'cellForRowAt' logic for a Swift UITableView.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Write a Swift function using URLSession to fetch a JSON object from 'https://api.example.com/data' and print the status code.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Create a simple Core Data 'saveRecord' function that inserts a 'Task' entity with a 'title' string.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Code the navigation from 'ViewControllerA' to 'ViewControllerB' using a segue identifier 'toDetail'.", type: "coding", difficulty: "Medium" },

    { questionText: "Coding Question: Flutter: Create a 'CounterApp' using a StatefulWidget that increments a value displayed in a Text widget.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Explain through code the difference between a StatelessWidget and a StatefulWidget in Flutter (simplified demo).", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Fetch a list of posts in Flutter using the 'http' package and map it to a List<Post> model.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Implement the Navigator.push code to move from Page1 to Page2 in a Flutter application.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: React Native: Create a FlatList that renders a list of 'userNames' from an array.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Use AsyncStorage in React Native to save and retrieve a 'userToken' string.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement a basic Authentication flow: If 'isLoggedIn' is true, show HomeStack, otherwise show AuthStack.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: State Management: Set up a simple Provider (Flutter) or Redux (RN) store with an 'action' to update username.", type: "coding", difficulty: "Hard" },

    { questionText: "Architecture: Implement the Repository pattern in Android: Fetch from Local DB first, fallback to API, and save result to Local DB.", type: "coding", difficulty: "Hard" },
    { questionText: "Folder Structure: Define a 'Clean Architecture' folder hierarchy for an app: Domain, Data, Platform, and Presentation layers.", type: "coding", difficulty: "Medium" },
    { questionText: "Architecture: Develop the logic for an 'Offline-First' app: Sync local changes to server when internet is restored using a WorkManager.", type: "coding", difficulty: "Hard" },
    { questionText: "Real-time: Implement a Firebase Realtime Database listener that updates a Chat screen whenever a new 'message' is added.", type: "coding", difficulty: "Hard" },
    { questionText: "Security: Write a function to manually verify a JWT token expiration and trigger a logout if expired.", type: "coding", difficulty: "Hard" },
    { questionText: "Performance Checklist: Design a JSON-ready list for a mobile performance audit (e.g., Startup time, Memory Peak, Network Payload).", type: "coding", difficulty: "Medium" },
    { questionText: "Final Challenge: Design and describe a high-level architecture for a production-ready E-commerce app (Auth, Cart, Payment, Offline support).", type: "coding", difficulty: "Hard" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'Mobile App Development' });
        if (!domain) {
            console.error('Mobile App Development domain not found. Please ensure domains are seeded first.');
            process.exit(1);
        }

        // Delete existing exam to avoid duplicates
        await Exam.deleteMany({ title: "Mobile App Development – 100 Questions Exam" });

        const mobileExam = new Exam({
            domainId: domain._id,
            title: "Mobile App Development – 100 Questions Exam",
            type: "Full-length Mock",
            durationMinutes: 120, // 2 hours
            questions: questions
        });

        await mobileExam.save();
        console.log('Successfully seeded Mobile App Development - 100 Questions Exam');

        await mongoose.connection.close();
        console.log('Done');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
