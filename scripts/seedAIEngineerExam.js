const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
require('dotenv').config();

const questions = [
    // --- MCQs (1-10: AI Fundamentals) ---
    { questionText: "AI ka full form kya hai?", type: "mcq", options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Internet", "Algorithmic Interface"], correctAnswer: "Artificial Intelligence", difficulty: "Easy" },
    { questionText: "Machine Learning AI ka subset hai?", type: "mcq", options: ["Yes", "No", "Sometimes", "Depends"], correctAnswer: "Yes", difficulty: "Easy" },
    { questionText: "Supervised learning me kya hota hai?", type: "mcq", options: ["Labeled data", "Unlabeled data", "No data", "Random data"], correctAnswer: "Labeled data", difficulty: "Easy" },
    { questionText: "Unsupervised learning example?", type: "mcq", options: ["Classification", "Clustering", "Regression", "Reinforcement"], correctAnswer: "Clustering", difficulty: "Easy" },
    { questionText: "Reinforcement learning kis par based hai?", type: "mcq", options: ["Rewards & penalties", "Labels", "Rules", "Clusters"], correctAnswer: "Rewards & penalties", difficulty: "Medium" },
    { questionText: "Overfitting ka matlab?", type: "mcq", options: ["Model too simple", "Model training data memorize kar leta hai", "Low accuracy", "No training"], correctAnswer: "Model training data memorize kar leta hai", difficulty: "Medium" },
    { questionText: "Underfitting ka matlab?", type: "mcq", options: ["Model complex", "Model data learn nahi karta", "High accuracy", "Perfect fit"], correctAnswer: "Model data learn nahi karta", difficulty: "Medium" },
    { questionText: "Feature engineering kya hai?", type: "mcq", options: ["Data delete", "Feature create/transform", "Model deploy", "Train GPU"], correctAnswer: "Feature create/transform", difficulty: "Medium" },
    { questionText: "Dataset split ratio common kya hai?", type: "mcq", options: ["50–50", "70–30", "80–20", "90–10"], correctAnswer: "80–20", difficulty: "Easy" },
    { questionText: "Bias vs Variance tradeoff kis me hota hai?", type: "mcq", options: ["Training", "Model performance", "Deployment", "UI"], correctAnswer: "Model performance", difficulty: "Medium" },

    // --- MCQs (11-25: Machine Learning) ---
    { questionText: "Regression predict karta hai:", type: "mcq", options: ["Category", "Continuous value", "Image", "Text"], correctAnswer: "Continuous value", difficulty: "Easy" },
    { questionText: "Classification example?", type: "mcq", options: ["Price prediction", "Spam detection", "Temperature", "Height"], correctAnswer: "Spam detection", difficulty: "Easy" },
    { questionText: "Decision Tree kis type ka model hai?", type: "mcq", options: ["Supervised", "Unsupervised", "RL", "None"], correctAnswer: "Supervised", difficulty: "Easy" },
    { questionText: "Random Forest kya hai?", type: "mcq", options: ["Multiple trees ensemble", "Single tree", "Neural net", "DB"], correctAnswer: "Multiple trees ensemble", difficulty: "Medium" },
    { questionText: "KNN me K kya hota hai?", type: "mcq", options: ["Clusters", "Neighbors count", "Features", "Layers"], correctAnswer: "Neighbors count", difficulty: "Easy" },
    { questionText: "SVM ka use?", type: "mcq", options: ["Classification", "Regression", "Both", "None"], correctAnswer: "Both", difficulty: "Medium" },
    { questionText: "Confusion matrix use hoti hai:", type: "mcq", options: ["Accuracy measure", "Loss", "Speed", "Size"], correctAnswer: "Accuracy measure", difficulty: "Easy" },
    { questionText: "Precision formula?", type: "mcq", options: ["TP / (TP + FP)", "TP / (TP + FN)", "TN / (TN + FP)", "None"], correctAnswer: "TP / (TP + FP)", difficulty: "Medium" },
    { questionText: "Recall formula?", type: "mcq", options: ["TP / (TP + FN)", "TP / (TP + FP)", "TN / (TN + FN)", "None"], correctAnswer: "TP / (TP + FN)", difficulty: "Medium" },
    { questionText: "F1 score kya hai?", type: "mcq", options: ["Precision + Recall harmonic mean", "Only Precision", "Only Recall", "Average"], correctAnswer: "Precision + Recall harmonic mean", difficulty: "Medium" },
    { questionText: "K-Fold Cross-validation ka benefit?", type: "mcq", options: ["Better estimate of model performance", "Slow training", "Reduce data size", "None"], correctAnswer: "Better estimate of model performance", difficulty: "Medium" },
    { questionText: "ROC-AUC measure karta hai:", type: "mcq", options: ["Classifier performance across thresholds", "Only loss", "Linearity", "None"], correctAnswer: "Classifier performance across thresholds", difficulty: "Hard" },
    { questionText: "Grid Search ka purpose?", type: "mcq", options: ["Hyperparameter tuning", "Searching files", "Database query", "None"], correctAnswer: "Hyperparameter tuning", difficulty: "Medium" },
    { questionText: "StandardScaler kya karta hai?", type: "mcq", options: ["Scale data to 0 mean and 1 variance", "Delete data", "Increase size", "None"], correctAnswer: "Scale data to 0 mean and 1 variance", difficulty: "Medium" },
    { questionText: "PCA (Principal Component Analysis) ka role?", type: "mcq", options: ["Dimensionality reduction", "Classification", "Clustering", "None"], correctAnswer: "Dimensionality reduction", difficulty: "Hard" },

    // --- MCQs (26-40: Deep Learning) ---
    { questionText: "Neural Network basic unit?", type: "mcq", options: ["Node/Neuron", "Layer", "Weight", "Bias"], correctAnswer: "Node/Neuron", difficulty: "Easy" },
    { questionText: "Activation function example?", type: "mcq", options: ["ReLU", "Sigmoid", "Tanh", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "CNN use hota hai:", type: "mcq", options: ["Text", "Image", "Audio", "Tabular"], correctAnswer: "Image", difficulty: "Easy" },
    { questionText: "RNN use hota hai:", type: "mcq", options: ["Sequence data", "Image", "Table", "None"], correctAnswer: "Sequence data", difficulty: "Easy" },
    { questionText: "LSTM solve karta hai:", type: "mcq", options: ["Vanishing gradient", "Overfitting", "Scaling", "Noise"], correctAnswer: "Vanishing gradient", difficulty: "Medium" },
    { questionText: "Transformers paper foundation of LLMs?", type: "mcq", options: ["Attention is All You Need", "Deep Learning 101", "AI Revolution", "None"], correctAnswer: "Attention is All You Need", difficulty: "Hard" },
    { questionText: "Attention mechanism ka goal?", type: "mcq", options: ["Focus on specific input parts", "Ignore all input", "Delete noise", "None"], correctAnswer: "Focus on specific input parts", difficulty: "Medium" },
    { questionText: "BERT stands for:", type: "mcq", options: ["Bidirectional Encoder Representations from Transformers", "Basic Encoder", "Binary Entity", "None"], correctAnswer: "Bidirectional Encoder Representations from Transformers", difficulty: "Hard" },
    { questionText: "GPT models architecture:", type: "mcq", options: ["Decoder-only", "Encoder-only", "Both", "None"], correctAnswer: "Decoder-only", difficulty: "Hard" },
    { questionText: "GANs contain two models:", type: "mcq", options: ["Generator & Discriminator", "CNN & RNN", "Linear & Logistic", "None"], correctAnswer: "Generator & Discriminator", difficulty: "Hard" },
    { questionText: "Diffusion models mostly used for:", type: "mcq", options: ["Image generation", "Text sorting", "Database", "Networking"], correctAnswer: "Image generation", difficulty: "Medium" },
    { questionText: "Autoencoders goal:", type: "mcq", options: ["Efficient data coding (compression)", "Only training", "Generating text", "None"], correctAnswer: "Efficient data coding (compression)", difficulty: "Medium" },
    { questionText: "Dropout layer purpose?", type: "mcq", options: ["Prevent Overfitting", "Increase accuracy", "Speed up", "None"], correctAnswer: "Prevent Overfitting", difficulty: "Medium" },
    { questionText: "Batch Normalization help krta hai:", type: "mcq", options: ["Stabilize training", "Increase noise", "Delete data", "None"], correctAnswer: "Stabilize training", difficulty: "Hard" },
    { questionText: "Transfer Learning benefit?", type: "mcq", options: ["Save computation/time using pre-trained weights", "Faster CPU", "Memory leak", "None"], correctAnswer: "Save computation/time using pre-trained weights", difficulty: "Medium" },

    // --- MCQs (41-50: NLP + LLMs) ---
    { questionText: "NLP full form?", type: "mcq", options: ["Neural Language Processing", "Natural Language Processing", "Native Language Program", "Network Language Protocol"], correctAnswer: "Natural Language Processing", difficulty: "Easy" },
    { questionText: "Tokenization kya hai?", type: "mcq", options: ["Split text into tokens", "Encrypt text", "Translate", "Compress"], correctAnswer: "Split text into tokens", difficulty: "Easy" },
    { questionText: "Embeddings kya represent karte hain?", type: "mcq", options: ["Images", "Vector representation", "Audio", "Labels"], correctAnswer: "Vector representation", difficulty: "Medium" },
    { questionText: "LLM ka example?", type: "mcq", options: ["GPT", "LLaMA", "Mistral", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "Prompt engineering kya hai?", type: "mcq", options: ["Model training", "Prompt optimize karna", "Data cleaning", "Fine-tuning"], correctAnswer: "Prompt optimize karna", difficulty: "Easy" },
    { questionText: "Fine-tuning ka matlab?", type: "mcq", options: ["Training pre-trained model on specific dataset", "Starting from scratch", "Deleting model", "None"], correctAnswer: "Training pre-trained model on specific dataset", difficulty: "Medium" },
    { questionText: "RLHF stands for:", type: "mcq", options: ["Reinforcement Learning from Human Feedback", "Rapid Language", "Rule Logic", "None"], correctAnswer: "Reinforcement Learning from Human Feedback", difficulty: "Hard" },
    { questionText: "Context window kya limit karti hai?", type: "mcq", options: ["Input tokens capacity", "Only speed", "Disk space", "None"], correctAnswer: "Input tokens capacity", difficulty: "Medium" },
    { questionText: "LLM Hallucination kya hai?", type: "mcq", options: ["Generating confident but incorrect info", "Stopping response", "Encryption", "None"], correctAnswer: "Generating confident but incorrect info", difficulty: "Medium" },
    { questionText: "Temperature parameter controls:", type: "mcq", options: ["Randomness of AI output", "Hardware heat", "File size", "None"], correctAnswer: "Randomness of AI output", difficulty: "Medium" },

    // --- MCQs (51-55: Vector DB + RAG) ---
    { questionText: "Vector database example?", type: "mcq", options: ["Pinecone", "MySQL", "Excel", "Notepad"], correctAnswer: "Pinecone", difficulty: "Medium" },
    { questionText: "Similarity search logic?", type: "mcq", options: ["Finding vectors close in vector space", "Linear scan", "Alphabetical", "None"], correctAnswer: "Finding vectors close in vector space", difficulty: "Hard" },
    { questionText: "RAG full form?", type: "mcq", options: ["Retrieval-Augmented Generation", "Random Access", "Rapid AI", "None"], correctAnswer: "Retrieval-Augmented Generation", difficulty: "Medium" },
    { questionText: "Embeddings store kahan hote hain?", type: "mcq", options: ["Vector Database", "Image file", "CSS", "None"], correctAnswer: "Vector Database", difficulty: "Easy" },
    { questionText: "Chunking kyu karte hain?", type: "mcq", options: ["To fit documents in context window and improve retrieval", "To delete text", "For design", "None"], correctAnswer: "To fit documents in context window and improve retrieval", difficulty: "Medium" },

    // --- MCQs (56-60: MLOps) ---
    { questionText: "Model deployment tool example:", type: "mcq", options: ["Docker / Kubernetes", "Text editor", "VLC", "Canvas"], correctAnswer: "Docker / Kubernetes", difficulty: "Medium" },
    { questionText: "CI/CD in ML covers:", type: "mcq", options: ["Continuous training and deployment", "Only code", "UI only", "None"], correctAnswer: "Continuous training and deployment", difficulty: "Medium" },
    { questionText: "Model versioning kyu zaruri hai?", type: "mcq", options: ["To track different iterations of models", "Waste of space", "Not needed", "None"], correctAnswer: "To track different iterations of models", difficulty: "Medium" },
    { questionText: "Monitoring drift refers to:", type: "mcq", options: ["Change in model performance over time due to data changes", "Moving files", "Network lag", "None"], correctAnswer: "Change in model performance over time due to data changes", difficulty: "Hard" },
    { questionText: "A/B testing in AI models:", type: "mcq", options: ["Comparing two versions of models for better metrics", "Testing alphabet", "Random choice", "None"], correctAnswer: "Comparing two versions of models for better metrics", difficulty: "Medium" },

    // --- MCQs (61-70: AI Security + Ethics) ---
    { questionText: "AI bias kya hai?", type: "mcq", options: ["Prejudice in data/algorithm favoring/disadvantaging groups", "Fast speed", "Encryption", "None"], correctAnswer: "Prejudice in data/algorithm favoring/disadvantaging groups", difficulty: "Easy" },
    { questionText: "Adversarial attack involves:", type: "mcq", options: ["Small input changes to fool model", "Deleting database", "Sending emails", "None"], correctAnswer: "Small input changes to fool model", difficulty: "Hard" },
    { questionText: "Data poisoning ka matlab?", type: "mcq", options: ["Manipulating training data to corrupt model", "Computer virus", "Deleting code", "None"], correctAnswer: "Manipulating training data to corrupt model", difficulty: "Hard" },
    { questionText: "Model stealing logic?", type: "mcq", options: ["Extracting model parameters via queries", "Downloading image", "Encryption", "None"], correctAnswer: "Extracting model parameters via queries", difficulty: "Hard" },
    { questionText: "Deepfake risk primarily involves:", type: "mcq", options: ["Misinformation via AI generated media", "Slow internet", "No risk", "None"], correctAnswer: "Misinformation via AI generated media", difficulty: "Easy" },
    { questionText: "AI governance goal:", type: "mcq", options: ["Framework for legal/ethical AI use", "No governance", "Hacking", "None"], correctAnswer: "Framework for legal/ethical AI use", difficulty: "Medium" },
    { questionText: "Explainable AI (XAI) makes:", type: "mcq", options: ["AI decisions understandable to humans", "AI faster", "AI cheaper", "None"], correctAnswer: "AI decisions understandable to humans", difficulty: "Medium" },
    { questionText: "Differential privacy contributes to:", type: "mcq", options: ["Preventing individual data leakage in models", "Speed", "Colors", "None"], correctAnswer: "Preventing individual data leakage in models", difficulty: "Hard" },
    { questionText: "Federated Learning trained on:", type: "mcq", options: ["Decentralized edge devices", "Central cluster only", "Single PC", "None"], correctAnswer: "Decentralized edge devices", difficulty: "Hard" },
    { questionText: "Responsible AI principles include:", type: "mcq", options: ["Fairness, Accountability, Transparency", "Bias, Hacking, Speed", "Money, Power, Control", "None"], correctAnswer: "Fairness, Accountability, Transparency", difficulty: "Medium" },

    // --- Coding / Practical Questions (71-100) ---
    { questionText: "Coding Question: Implement Linear regression from scratch using only Python and NumPy. Define fit and predict methods.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build a Logistic regression classifier using Scikit-Learn on the 'Iris' dataset.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement a basic KNN classifier from scratch: calculate Euclidean distance and pick top K neighbors.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Train a Decision Tree model using 'sklearn' and export/plot the tree structure.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Write code to evaluate a model using Accuracy, Precision, Recall, and F1-Score metrics.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Generate and plot a Confusion Matrix using Seaborn for a set of y_true and y_pred values.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement Feature scaling manually: Normalize a dataset using (x - min) / (max - min).", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Use PCA from sklearn to reduce a 10D dataset to 3D and output the explained variance ratio.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Perform hyperparameter tuning using GridSearchCV for a Random Forest model (search for n_estimators [10, 50, 100]).", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build a Scikit-Learn ML pipeline that includes an Imputer, a Scaler, and an SVM classifier.", type: "coding", difficulty: "Hard" },

    { questionText: "Coding Question: Build an Artficial Neural Network (ANN) using TensorFlow/Keras with 2 hidden layers to solve MNIST.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Create a CNN image classifier with 3 Convolutional blocks and Global Average Pooling.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Use Transfer learning with ResNet50: Load weights, freeze base, and add a custom dense head.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build an LSTM based text generator: define the model architecture for next-token prediction.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Sketch the basic self-attention block implementation in PyTorch (concept code).", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Outline a basic GAN implementation logic (Generator training vs Moderator/Discriminator training loop).", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build an Autoencoder for anomaly detection: if reconstruction loss is high, mark as anomaly.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Write code to fine-tune a BERT model (from HuggingFace) for a binary classification task.", type: "coding", difficulty: "Hard" },

    { questionText: "Coding Question: Build a chatbot using the OpenAI API (openai-python) that maintains a conversation history.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Show how to run a local LLM using llama-cpp-python and generate a response to a simple prompt.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement a Prompt chaining system using LangChain (Chain A output becomes Chain B input).", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build a basic RAG pipeline: document load -> split -> embedding -> retrieve -> generate.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Use a vector database (e.g. Chroma or Pinecone) to store 5 document chunks and perform a similarity search.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Create a Document Q&A system using LangChain that reads a local PDF and answers questions.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build an AI Agent using LangChain or AutoGen that can use a 'Calculator' tool to solve math problems.", type: "coding", difficulty: "Hard" },

    { questionText: "System Design: Design an architecture for an AI SaaS that handles 10k users with low-latency inference.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Design a scalable inference system for multiple LLMs using a load balancer and model caching.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Outline a multi-agent collaboration system where one agent researches and another writes code.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Design an AI cybersecurity threat detector that monitors network logs in real-time for anomalies.", type: "coding", difficulty: "Hard" },
    { questionText: "System Design: Design an Enterprise RAG knowledge assistant that syncs with Slack, Jira, and Confluence docs.", type: "coding", difficulty: "Hard" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'AI & Data Science' });
        if (!domain) {
            console.error('AI domain not found. Please ensure domains are seeded first.');
            process.exit(1);
        }

        // Delete existing exam if it exists to avoid duplicates
        await Exam.deleteMany({ title: "AI Engineer – 100 Questions Exam" });

        const aiEngineerExam = new Exam({
            domainId: domain._id,
            title: "AI Engineer – 100 Questions Exam",
            type: "Full-length Mock",
            durationMinutes: 120, // 2 hours
            questions: questions
        });

        await aiEngineerExam.save();
        console.log('Successfully seeded AI Engineer - 100 Questions Exam');

        await mongoose.connection.close();
        console.log('Done');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
