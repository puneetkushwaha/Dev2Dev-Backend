require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const fullExamQuestions = [
    // Fundamentals (1-10)
    {
        type: 'MCQ',
        text: 'Which language is primarily used for writing native Android apps?',
        options: ['Python', 'Kotlin', 'C#', 'PHP'],
        correctAnswer: 'Kotlin'
    },
    {
        type: 'MCQ',
        text: 'Which is the official primary language for iOS app development?',
        options: ['Java', 'Swift', 'Kotlin', 'Dart'],
        correctAnswer: 'Swift'
    },
    {
        type: 'MCQ',
        text: 'What does SDK stand for?',
        options: ['Software Development Kit', 'Secure Data Kit', 'System Deployment Kit', 'Software Debug Kit'],
        correctAnswer: 'Software Development Kit'
    },
    {
        type: 'MCQ',
        text: 'What does APK stand for in Android?',
        options: ['Android Programming Kit', 'Android Package Kit', 'App Programming Kernel', 'Application Private Key'],
        correctAnswer: 'Android Package Kit'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of a Cross-platform framework?',
        options: ['Flutter', 'React Native', 'Xamarin', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'What is the primary purpose of an Emulator?',
        options: ['To permanently replace real devices', 'To test and run apps virtually without needing a physical device', 'Only for debugging code structure', 'For publishing apps to the store'],
        correctAnswer: 'To test and run apps virtually without needing a physical device'
    },
    {
        type: 'MCQ',
        text: 'What is required to publish an app on the Google Play Store?',
        options: ['Signed APK/AAB file', 'Paid Google Developer account', 'App icon and graphics', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'What is meant by an App Lifecycle?',
        options: ['The installation process', 'The series of states an app goes through (Create, Start, Resume, Pause, Stop, Destroy)', 'The frequency of app updates', 'The UI graphic design phase'],
        correctAnswer: 'The series of states an app goes through (Create, Start, Resume, Pause, Stop, Destroy)'
    },
    {
        type: 'MCQ',
        text: 'What does UI stand for?',
        options: ['User Integration', 'User Interface', 'Universal Input', 'User Internet'],
        correctAnswer: 'User Interface'
    },
    {
        type: 'MCQ',
        text: 'What does UX stand for?',
        options: ['User Experience', 'User Extension', 'User Execute', 'User XML'],
        correctAnswer: 'User Experience'
    },

    // Android Core (11-25)
    {
        type: 'MCQ',
        text: 'What is an Activity in Android?',
        options: ['A background process that runs indefinitely', 'A single, focused window/screen with a user interface', 'A local relational database table', 'An XML layout structure'],
        correctAnswer: 'A single, focused window/screen with a user interface'
    },
    {
        type: 'MCQ',
        text: 'Why are Fragments used in Android development?',
        options: ['To create modular, reusable UI components that can work across multiple screen sizes', 'To store SQL database records securely', 'To handle REST API requests', 'To encrypt sensitive user data'],
        correctAnswer: 'To create modular, reusable UI components that can work across multiple screen sizes'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of an Intent?',
        options: ['To navigate between screens/activities or pass data between components', 'To insert data into an SQLite database', 'To create complex CSS animations', 'To secure the app from reverse engineering'],
        correctAnswer: 'To navigate between screens/activities or pass data between components'
    },
    {
        type: 'MCQ',
        text: 'What is a RecyclerView used for?',
        options: ['Displaying large data sets in an efficiently scrolling list', 'Displaying a single static image only', 'Making asynchronous API calls', 'Running silent background tasks'],
        correctAnswer: 'Displaying large data sets in an efficiently scrolling list'
    },
    {
        type: 'MCQ',
        text: 'ViewModel is a core part of which architectural pattern?',
        options: ['MVC', 'MVP', 'MVVM', 'REST'],
        correctAnswer: 'MVVM'
    },
    {
        type: 'MCQ',
        text: 'What is the primary function of LiveData?',
        options: ['Storing persistent data on disk', 'Holding observable data that is lifecycle-aware', 'Encrypting network requests', 'Deleting old unused application files'],
        correctAnswer: 'Holding observable data that is lifecycle-aware'
    },
    {
        type: 'MCQ',
        text: 'What is the Room database in Android?',
        options: ['A NoSQL cloud Database', 'An abstraction layer over SQLite for easier local database access', 'An API client', 'An image caching library'],
        correctAnswer: 'An abstraction layer over SQLite for easier local database access'
    },
    {
        type: 'MCQ',
        text: 'What is a Service in Android?',
        options: ['An application component that performs long-running operations in the background without UI', 'An XML layout file for buttons', 'A clickable UI widget', 'A local database file'],
        correctAnswer: 'An application component that performs long-running operations in the background without UI'
    },
    {
        type: 'MCQ',
        text: 'What is the use of a BroadcastReceiver?',
        options: ['To listen and respond to system-wide broadcast announcements or events', 'To create 3D animations', 'To execute HTTP GET requests', 'To encrypt app bundles'],
        correctAnswer: 'To listen and respond to system-wide broadcast announcements or events'
    },
    {
        type: 'MCQ',
        text: 'What is the role of the AndroidManifest.xml file?',
        options: ['It stores essential app configuration, components, permissions, and hardware constraints', 'It is purely for UI design and color themes', 'It operates as the local relational database', 'It stores the Java/Kotlin source code'],
        correctAnswer: 'It stores essential app configuration, components, permissions, and hardware constraints'
    },
    {
        type: 'MCQ',
        text: 'Which keyword is used in Android 6.0+ to request sensitive permissions?',
        options: ['Auto-grant Permissions', 'Compile-time checks', 'Runtime Permissions', 'XML strictly'],
        correctAnswer: 'Runtime Permissions'
    },
    {
        type: 'MCQ',
        text: 'What is Gradle used for in Android development?',
        options: ['As an advanced text editor', 'As the official build automation system for managing dependencies and compilation', 'As a SQL database engine', 'As a UI design tool vector'],
        correctAnswer: 'As the official build automation system for managing dependencies and compilation'
    },
    {
        type: 'MCQ',
        text: 'What is the main benefit of using a ConstraintLayout?',
        options: ['It makes scrolling through a million rows smooth', 'It allows for creating large, complex UI layouts with a flat view hierarchy for better performance', 'It replaces the need for a database', 'It provides automatic network caching'],
        correctAnswer: 'It allows for creating large, complex UI layouts with a flat view hierarchy for better performance'
    },
    {
        type: 'MCQ',
        text: 'What does Data Binding do?',
        options: ['Connects a local database to the cloud automatically', 'Allows declarative binding of UI components in layouts directly to data sources in the app', 'Compresses image resolutions gracefully', 'Fetches REST APIs asynchronously'],
        correctAnswer: 'Allows declarative binding of UI components in layouts directly to data sources in the app'
    },
    {
        type: 'MCQ',
        text: 'Why do developers use Kotlin Coroutines?',
        options: ['To replace XML entirely', 'To simplify asynchronous programming and manage background threads cleanly', 'To design custom app icons', 'To encrypt SQLite databases natively'],
        correctAnswer: 'To simplify asynchronous programming and manage background threads cleanly'
    },

    // iOS / Swift (26-35)
    {
        type: 'MCQ',
        text: 'What is Xcode?',
        options: ['An Android emulator', 'Apple’s official IDE for macOS, iOS, watchOS, and tvOS development', 'A cross-platform library', 'A cloud hosting service'],
        correctAnswer: 'Apple’s official IDE for macOS, iOS, watchOS, and tvOS development'
    },
    {
        type: 'MCQ',
        text: 'What is the primary role of a UIViewController in iOS?',
        options: ['To manage a view hierarchy and coordinate data between the model and the view', 'To store persistent offline data', 'To perform background network fetches exclusively', 'To generate UI test coverage'],
        correctAnswer: 'To manage a view hierarchy and coordinate data between the model and the view'
    },
    {
        type: 'MCQ',
        text: 'What is a Storyboard in iOS development?',
        options: ['A tool to write Swift code visually', 'A visual representation of the app’s user interface and navigation flow', 'A mechanism for dependency injection', 'A local cache for images'],
        correctAnswer: 'A visual representation of the app’s user interface and navigation flow'
    },
    {
        type: 'MCQ',
        text: 'What does an "Optional" represent in Swift?',
        options: ['A variable that cannot be changed', 'A type that can hold either a value or `nil` (nothing)', 'An optional software package to install', 'A compiler warning flag'],
        correctAnswer: 'A type that can hold either a value or `nil` (nothing)'
    },
    {
        type: 'MCQ',
        text: 'What is CocoaPods used for?',
        options: ['To write Android apps in Swift', 'As a dependency manager for Swift and Objective-C Cocoa projects', 'To simulate an iOS device on Windows', 'To store cloud databases for iOS'],
        correctAnswer: 'As a dependency manager for Swift and Objective-C Cocoa projects'
    },
    {
        type: 'MCQ',
        text: 'In the MVC architecture (common in iOS), what does the \'M\' stand for?',
        options: ['Module', 'Model', 'Machine', 'Memory'],
        correctAnswer: 'Model'
    },
    {
        type: 'MCQ',
        text: 'What is the Delegation pattern used for in Swift/iOS?',
        options: ['To grant administrator access to the app', 'To allow one object to communicate back to its owner/creator about events or data', 'To compress App Store binaries', 'To offload processing to the cloud'],
        correctAnswer: 'To allow one object to communicate back to its owner/creator about events or data'
    },
    {
        type: 'MCQ',
        text: 'What is Core Data?',
        options: ['A cross-platform API tool', 'An Apple framework used to manage the model layer objects and persist data locally', 'A UI design library for Swift', 'A remote cloud server provided by Apple'],
        correctAnswer: 'An Apple framework used to manage the model layer objects and persist data locally'
    },
    {
        type: 'MCQ',
        text: 'What is required prior to an App Store publish via App Store Connect?',
        options: ['Only the Swift source code files', 'Provisioning profiles, certificates, app screenshots, and an archive build', 'A pre-written HTML website', 'A Google Developer account'],
        correctAnswer: 'Provisioning profiles, certificates, app screenshots, and an archive build'
    },
    {
        type: 'MCQ',
        text: 'What is the main purpose of TestFlight?',
        options: ['To test web browser compatibility', 'To distribute beta versions of iOS apps to testers before pushing to the App Store', 'To simulate Android apps on Mac', 'To monitor battery drain on actual devices'],
        correctAnswer: 'To distribute beta versions of iOS apps to testers before pushing to the App Store'
    },

    // Cross Platform (36-45)
    {
        type: 'MCQ',
        text: 'Which programming language is Flutter based on?',
        options: ['JavaScript', 'Dart', 'Kotlin', 'Java'],
        correctAnswer: 'Dart'
    },
    {
        type: 'MCQ',
        text: 'Which programming language does React Native primarily use?',
        options: ['C++', 'JavaScript/TypeScript', 'Ruby', 'Swift'],
        correctAnswer: 'JavaScript/TypeScript'
    },
    {
        type: 'MCQ',
        text: 'What is "Hot Reload" in cross-platform development?',
        options: ['Recompiling the entire app from scratch instantly', 'Injecting updated source code files into the running Dart/JS Virtual Machine instantly without losing state', 'Automatically deleting old cache files', 'An overheating safety warning'],
        correctAnswer: 'Injecting updated source code files into the running Dart/JS Virtual Machine instantly without losing state'
    },
    {
        type: 'MCQ',
        text: 'In Flutter, almost everything on the UI is considered a:',
        options: ['Component', 'Widget', 'Fragment', 'Activity'],
        correctAnswer: 'Widget'
    },
    {
        type: 'MCQ',
        text: 'What is Expo in the context of React Native?',
        options: ['It is a NoSQL database', 'A framework and a platform for universal React applications to easily build and preview apps', 'An IDE strictly for Windows users', 'A background service engine'],
        correctAnswer: 'A framework and a platform for universal React applications to easily build and preview apps'
    },
    {
        type: 'MCQ',
        text: 'What are Platform Channels used for in Flutter?',
        options: ['Streaming movies via OTT apps', 'Communicating between the Dart code and the platform-specific native code (Java/Kotlin/Swift/Obj-C)', 'Hosting Flutter apps on AWS', 'Connecting to Bluetooth headsets exclusively'],
        correctAnswer: 'Communicating between the Dart code and the platform-specific native code (Java/Kotlin/Swift/Obj-C)'
    },
    {
        type: 'MCQ',
        text: 'What is a "Native Module" in React Native?',
        options: ['A custom library written in Javascript', 'A piece of code written in platform-native languages (Java/Swift) that exposes native APIs to JavaScript', 'A generic UI component like Text or View', 'An npm package repository'],
        correctAnswer: 'A piece of code written in platform-native languages (Java/Swift) that exposes native APIs to JavaScript'
    },
    {
        type: 'MCQ',
        text: 'Which is a popular State Management solution in Flutter?',
        options: ['Redux solely', 'Provider / Riverpod', 'Retrofit mostly', 'Spring Boot'],
        correctAnswer: 'Provider / Riverpod'
    },
    {
        type: 'MCQ',
        text: 'What does the BLoC pattern stand for in Flutter architecture?',
        options: ['Business Logic Component', 'Base Layout Observer Class', 'Basic List of Controllers', 'Background Loop of Core'],
        correctAnswer: 'Business Logic Component'
    },
    {
        type: 'MCQ',
        text: 'Can Redux be used for state management in React Native apps?',
        options: ['Yes', 'No, Redux is strictly for React Web', 'Only on iOS', 'Only if written in C++'],
        correctAnswer: 'Yes'
    },

    // API & Backend Integration (46-55)
    {
        type: 'MCQ',
        text: 'What does REST API stand for?',
        options: ['Rapid Extended Server Transfer API', 'Representational State Transfer API', 'Remote Edge Syncing Transfer API', 'Random Energy State Testing API'],
        correctAnswer: 'Representational State Transfer API'
    },
    {
        type: 'MCQ',
        text: 'What does JSON stand for?',
        options: ['Java Standard Output Network', 'Java Source Object Notation', 'JavaScript Object Notation', 'Joint Server Operated Node'],
        correctAnswer: 'JavaScript Object Notation'
    },
    {
        type: 'MCQ',
        text: 'What is Retrofit typically used for in Android?',
        options: ['Creating UI animations', 'A type-safe HTTP client for Android and Java to handle API requests', 'A local caching library', 'A database ORM'],
        correctAnswer: 'A type-safe HTTP client for Android and Java to handle API requests'
    },
    {
        type: 'MCQ',
        text: 'Axios is commonly used for what purpose in React Native?',
        options: ['To manage UI state', 'To make HTTP requests to external APIs', 'To build mobile layouts', 'To interact with the phone camera'],
        correctAnswer: 'To make HTTP requests to external APIs'
    },
    {
        type: 'MCQ',
        text: 'Which of the following services are typically provided by Firebase?',
        options: ['Realtime Database, Authentication, Cloud Messaging (FCM)', 'Operating System compilation', 'Domain Name Registration exclusively', 'Hardware load balancing'],
        correctAnswer: 'Realtime Database, Authentication, Cloud Messaging (FCM)'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is a common method of Mobile App Authentication?',
        options: ['JWT (JSON Web Tokens)', 'OAuth 2.0 (Google/Apple Sign-In)', 'Firebase Auth', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'Which tool is widely used to send Push Notifications to mobile apps?',
        options: ['Firebase Cloud Messaging (FCM)', 'SQLite database triggers', 'React Router DOM', 'Retrofit interceptors'],
        correctAnswer: 'Firebase Cloud Messaging (FCM)'
    },
    {
        type: 'MCQ',
        text: 'What is a WebSocket used for?',
        options: ['One-way HTTP requests only', 'Establishing a persistent, full-duplex, two-way communication channel for real-time applications', 'Downloading heavy files like MP4 via FTP', 'Styling UI components on the web'],
        correctAnswer: 'Establishing a persistent, full-duplex, two-way communication channel for real-time applications'
    },
    {
        type: 'MCQ',
        text: 'What is the standard purpose of OAuth?',
        options: ['To encrypt databases locally', 'It is an open standard for access delegation (e.g., login with Google without sharing your password with the App)', 'It creates vector images from PNGs', 'It optimizes battery life magically'],
        correctAnswer: 'It is an open standard for access delegation (e.g., login with Google without sharing your password with the App)'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of Token-based authentication?',
        options: ['Sending a plain-text password every time', 'Storing session IDs strictly inside the server RAM only', 'Using JWTs in the Authorization Bearer Header', 'Creating unauthenticated IP allowlists'],
        correctAnswer: 'Using JWTs in the Authorization Bearer Header'
    },

    // Security & Performance (56-70)
    {
        type: 'MCQ',
        text: 'What is App Signing?',
        options: ['Giving user reviews on the Play Store', 'Cryptographically signing an APK/AAB or IPA with a developer certificate to verify the author and ensure code integrity', 'Using a digital pen to design app logos', 'Asking users for explicit consent to trace data'],
        correctAnswer: 'Cryptographically signing an APK/AAB or IPA with a developer certificate to verify the author and ensure code integrity'
    },
    {
        type: 'MCQ',
        text: 'What is the primary function of ProGuard/R8 in Android?',
        options: ['To enlarge the APK size', 'To shrink, optimize, and obfuscate Java/Kotlin bytecode', 'To automatically test the app and find crashes', 'To design custom Android keyboards'],
        correctAnswer: 'To shrink, optimize, and obfuscate Java/Kotlin bytecode'
    },
    {
        type: 'MCQ',
        text: 'Which of these is considered Secure Storage for sensitive credentials on mobile?',
        options: ['SharedPreferences (Plain Text format)', 'In a publicly accessible JSON file', 'Android Keystore / iOS Keychain', 'Hardcoded in the source code as private final string'],
        correctAnswer: 'Android Keystore / iOS Keychain'
    },
    {
        type: 'MCQ',
        text: 'Why is using HTTPS critical for mobile apps?',
        options: ['It uses 10x less battery than HTTP', 'It encrypts data in-transit preventing man-in-the-middle packet sniffing attacks', 'It automatically creates an offline cache', 'It boosts CPU performance artificially'],
        correctAnswer: 'It encrypts data in-transit preventing man-in-the-middle packet sniffing attacks'
    },
    {
        type: 'MCQ',
        text: 'What is Code Obfuscation?',
        options: ['A bug resulting in app crashes', 'A technique that deliberately makes source code or binaries difficult for humans (and decompilers) to understand', 'Translating code from English to Chinese automatically', 'Changing the app UI completely'],
        correctAnswer: 'A technique that deliberately makes source code or binaries difficult for humans (and decompilers) to understand'
    },
    {
        type: 'MCQ',
        text: 'What is a Memory Leak in mobile apps?',
        options: ['When RAM physically gets damaged by water', 'When an app keeps references to objects that are no longer needed, preventing the Garbage Collector from freeing the memory', 'When the app sends too many API requests', 'When data gets leaked unencrypted to the dark web'],
        correctAnswer: 'When an app keeps references to objects that are no longer needed, preventing the Garbage Collector from freeing the memory'
    },
    {
        type: 'MCQ',
        text: 'What does ANR stand for in Android context?',
        options: ['Application Not Responding', 'Android Native Renderer', 'Auto Navigation Routing', 'App Null Request'],
        correctAnswer: 'Application Not Responding'
    },
    {
        type: 'MCQ',
        text: 'Which trick is NOT typically part of standard Battery Optimization?',
        options: ['Batching network requests', 'Using JobScheduler/WorkManager for background tasks', 'Keeping the GPS radio active and pinging continuously in the foreground 24/7', 'Reducing unnecessary wakeup alarms'],
        correctAnswer: 'Keeping the GPS radio active and pinging continuously in the foreground 24/7'
    },
    {
        type: 'MCQ',
        text: 'What is Lazy Loading in lists/images?',
        options: ['Refusing to load the app if the user is inactive', 'Loading assets (like images) or data only when they are about to become visible on the screen, improving parsing speed and memory usage', 'Delaying code execution by placing Thread.sleep everywhere', 'Waiting until the user clicks twice to fetch an item'],
        correctAnswer: 'Loading assets (like images) or data only when they are about to become visible on the screen, improving parsing speed and memory usage'
    },
    {
        type: 'MCQ',
        text: 'What does Crashlytics do?',
        options: ['It deliberately crashes apps to stress-test them locally', 'It tracks, groups, and reports application crashes securely in real-time to a developer dashboard via Firebase', 'It fixes bugs automatically with AI', 'It tracks what website users visit after leaving the app'],
        correctAnswer: 'It tracks, groups, and reports application crashes securely in real-time to a developer dashboard via Firebase'
    },
    {
        type: 'MCQ',
        text: 'How should API Keys ideally be secured in a production mobile app environment?',
        options: ['Kept completely in plain text inside `Constants.java`', 'They shouldn\'t exist, APIs should be public', 'Kept securely in BuildConfig or injected via CI/CD, and restricted via backend referrer/IP checks where possible', 'Stored in `strings.xml` on GitHub'],
        correctAnswer: 'Kept securely in BuildConfig or injected via CI/CD, and restricted via backend referrer/IP checks where possible'
    },
    {
        type: 'MCQ',
        text: 'What is SSL/TLS Certificate Pinning?',
        options: ['Pinning a post to the top of a forum', 'Hardcoding the server’s exact certificate or public key hash into the app to thwart proxy-based MITM attacks', 'Writing a token to the Keychain', 'Locking the UI screen dynamically'],
        correctAnswer: 'Hardcoding the server’s exact certificate or public key hash into the app to thwart proxy-based MITM attacks'
    },
    {
        type: 'MCQ',
        text: 'Which is a Mobile Biometric Authentication method?',
        options: ['Face ID / Touch ID / Fingerprint APIs', 'Texting an OTP via SMS', 'Prompting for a 12-character alphanumeric password', 'Validating an email link click'],
        correctAnswer: 'Face ID / Touch ID / Fingerprint APIs'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of Code Minification?',
        options: ['Removes unused code and renames variables to small letters to reduce final bundle size', 'Minimizes the UI buttons visually', 'Generates mock test databases in minified forms', 'Halves the battery consumption linearly'],
        correctAnswer: 'Removes unused code and renames variables to small letters to reduce final bundle size'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an App Performance Profiling tool natively available?',
        options: ['Android Studio Profiler (CPU, Memory, Network)', 'Adobe Photoshop Metrics', 'MS Excel Analytics Dashboard', 'Notepad++ Thread counter'],
        correctAnswer: 'Android Studio Profiler (CPU, Memory, Network)'
    }
];

// Add 30 Coding/Practical Questions Programmatically to reach 100
const practicalQuestions = [
    // Android Coding (71-80)
    { text: 'Android UI: Write the XML and Java/Kotlin Activity code for a simple login screen with validation.' },
    { text: 'Android Intents: Write code to pass a String Extra named "USER_ID" from MainActivity to DetailActivity.' },
    { text: 'Android RecyclerView: Implement a basic RecyclerView Adapter in Kotlin to display a list of "Contact" models.' },
    { text: 'Android Room DB: Write an Entity class and Dao interface for a "Task" object performing basic CRUD.' },
    { text: 'Retrofit Implementation: Define a Retrofit API interface to fetch a `GET /users` endpoint.' },
    { text: 'MVVM Architecture: Create a basic ViewModel containing a MutableLiveData integer counter.' },
    { text: 'Android Services: Implement a simple Foreground Service that plays music and shows a persistent notification.' },
    { text: 'Firebase Cloud Messaging: Write the FirebaseMessagingService subclass to log received push payload data.' },
    { text: 'Runtime Permissions: Write the boilerplate implementation to explicitly request CAMERA permission from the user at runtime context.' },
    { text: 'UI Dark Mode: Provide the XML structure under `res/values-night` to force custom inverted colors for an app.' },

    // iOS Coding (81-85)
    { text: 'Swift UIAction: Write Swift code using `@IBAction` or SwiftUI to handle a basic Button click event.' },
    { text: 'iOS TableView: Implement standard `UITableViewDataSource` boilerplate to render a list of Strings on screen.' },
    { text: 'Swift Networking: Write an asynchronous `URLSession.shared.dataTask` snippet to parse remote JSON data.' },
    { text: 'iOS Core Data: Show a pseudo-code implementation for fetching Entity requests securely from NSPersistentContainer.' },
    { text: 'iOS Navigation: How do you programmatically push a UIViewController onto a UINavigationController stack in Swift?' },

    // Cross Platform (86-93)
    { text: 'Flutter Basics: Write the standard Dart `main()` boilerplate snippet that mounts a MaterialApp.' },
    { text: 'Flutter Widgets: Explain by writing code the difference between building a Stateful vs a Stateless Widget.' },
    { text: 'Dart Networking: Implement a basic REST API `http.get` call inside an async Dart function.' },
    { text: 'Flutter Navigation: Write the precise Dart code to `Navigator.push` to a new widget screen.' },
    { text: 'React Native UI: Write a basic `FlatList` component snippet that iterates over an array of objects.' },
    { text: 'React Native Storage: Write code to `setItem` and `getItem` securely using AsyncStorage in RN.' },
    { text: 'React Native Logic: Showcase a basic Login function block that validates an email against Regex and sets an Auth state hook.' },
    { text: 'State Management: Write a barebones Redux or Context API wrapper to provide a global \'Theme\' variable to descendant RN components.' },

    // Advanced / Architecture (94-100)
    { text: 'MVVM Scaling: Explain via interface logic how you would mock a Repository layer for unit-testing a ViewModel.' },
    { text: 'Clean Architecture logic: Describe the strict segregation folder structure rules of Presentation, Domain, and Data layers.' },
    { text: 'Offline-First mechanism: Write pseudo-code demonstrating caching network responses manually to SQLite/Room before passing flow to UI.' },
    { text: 'Sockets & Real-time: Write pseudo-code for a mobile client managing a WebSocket connection to handle real-time incoming chat payloads.' },
    { text: 'Authentication security: Showcase how to intercept outbound Retrofit/Axios calls to automatically attach a Bearer JWT header.' },
    { text: 'Mobile Profiling: List a 5-step checklist specifically for identifying and mitigating heavy view overdraw and UI thread-blocking logic in mobile.' },
    { text: 'App Architecture Design: Sketch an end-to-end production-ready Mobile Stack including DI, Modularization flags, Network, and Local Caching tiers.' }
];

practicalQuestions.forEach((pq) => {
    fullExamQuestions.push({
        type: 'Coding',
        text: pq.text,
        options: [],
        correctAnswer: '' // Handled by compiler/manual
    });
});

const seedMobileApp100QuestionExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');

        await Exam.deleteOne({ title: 'Mobile App Development – 100 Questions Exam' });

        // Ensure Domain exists
        let domain = await Domain.findOne({ name: 'Mobile App Development' });
        if (!domain) {
            domain = new Domain({
                name: 'Mobile App Development',
                description: 'Android, iOS, Flutter, React Native, cross-platform and native paradigms.'
            });
            await domain.save();
        }

        const examObj = new Exam({
            title: 'Mobile App Development – 100 Questions Exam',
            type: 'Full-length Mock',
            durationMinutes: 180,
            domainId: domain._id,
            questions: fullExamQuestions
        });

        await examObj.save();
        console.log('Successfully seeded Mobile App Development 100 question exam. Total length: ', examObj.questions.length);

        process.exit(0);
    } catch (err) {
        console.error('Failed to seed exam:');
        console.error(err);
        process.exit(1);
    }
};

seedMobileApp100QuestionExam();
