require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const fullExamQuestions = [
    // Section A — MCQ (1–70)
    // AI Fundamentals (1–10)
    {
        type: 'MCQ',
        text: 'What does AI stand for?',
        options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Internet', 'Algorithmic Interface'],
        correctAnswer: 'Artificial Intelligence'
    },
    {
        type: 'MCQ',
        text: 'Is Machine Learning a subset of AI?',
        options: ['Yes', 'No', 'Sometimes', 'Depends'],
        correctAnswer: 'Yes'
    },
    {
        type: 'MCQ',
        text: 'What kind of data is used in Supervised Learning?',
        options: ['Labeled data', 'Unlabeled data', 'No data', 'Random data'],
        correctAnswer: 'Labeled data'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of Unsupervised Learning?',
        options: ['Classification', 'Clustering', 'Regression', 'Reinforcement'],
        correctAnswer: 'Clustering'
    },
    {
        type: 'MCQ',
        text: 'What is Reinforcement Learning primarily based on?',
        options: ['Rewards & penalties', 'Labels', 'Rules', 'Clusters'],
        correctAnswer: 'Rewards & penalties'
    },
    {
        type: 'MCQ',
        text: 'What does Overfitting mean in machine learning?',
        options: ['The model is too simple', 'The model memorizes the training data but fails on new data', 'Low training accuracy', 'No training occurred'],
        correctAnswer: 'The model memorizes the training data but fails on new data'
    },
    {
        type: 'MCQ',
        text: 'What does Underfitting mean?',
        options: ['The model is too complex', 'The model fails to learn the underlying patterns in the data', 'High accuracy on test data', 'Perfect fit'],
        correctAnswer: 'The model fails to learn the underlying patterns in the data'
    },
    {
        type: 'MCQ',
        text: 'What is Feature Engineering?',
        options: ['Deleting data', 'Creating or transforming features to improve model performance', 'Deploying a model', 'Training on GPUs'],
        correctAnswer: 'Creating or transforming features to improve model performance'
    },
    {
        type: 'MCQ',
        text: 'What is a common widely used Dataset split ratio (Train-Test)?',
        options: ['50-50', '70-30', '80-20', '90-10'],
        correctAnswer: '80-20'
    },
    {
        type: 'MCQ',
        text: 'Where does the Bias vs Variance Tradeoff occur?',
        options: ['During data collection', 'In model performance and generalization', 'During model deployment', 'In UI design'],
        correctAnswer: 'In model performance and generalization'
    },

    // Machine Learning (11–25)
    {
        type: 'MCQ',
        text: 'What does Regression typically predict?',
        options: ['A category', 'A continuous value', 'An image', 'A text string'],
        correctAnswer: 'A continuous value'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of Classification?',
        options: ['House price prediction', 'Spam detection in emails', 'Temperature forecasting', 'Height estimation'],
        correctAnswer: 'Spam detection in emails'
    },
    {
        type: 'MCQ',
        text: 'What type of learning model is a Decision Tree usually?',
        options: ['Supervised', 'Unsupervised', 'Reinforcement Learning', 'None of the above'],
        correctAnswer: 'Supervised'
    },
    {
        type: 'MCQ',
        text: 'What is a Random Forest?',
        options: ['An ensemble of multiple decision trees', 'A single deep tree', 'A type of neural network', 'A relational database'],
        correctAnswer: 'An ensemble of multiple decision trees'
    },
    {
        type: 'MCQ',
        text: 'What does the \'K\' stand for in KNN (K-Nearest Neighbors)?',
        options: ['Number of Clusters', 'The count of nearest neighbors to consider', 'Number of Features', 'Number of hidden layers'],
        correctAnswer: 'The count of nearest neighbors to consider'
    },
    {
        type: 'MCQ',
        text: 'What can Support Vector Machines (SVM) be used for?',
        options: ['Classification only', 'Regression only', 'Both Classification and Regression', 'None of the above'],
        correctAnswer: 'Both Classification and Regression'
    },
    {
        type: 'MCQ',
        text: 'What is a Confusion Matrix used for?',
        options: ['Measuring the performance/accuracy of a classification model', 'Calculating loss in a neural net', 'Measuring execution speed', 'Reducing model size'],
        correctAnswer: 'Measuring the performance/accuracy of a classification model'
    },
    {
        type: 'MCQ',
        text: 'What is the correct formula for Precision?',
        options: ['TP / (TP + FP)', 'TP / (TP + FN)', '(TP + TN) / Total', 'TN / (TN + FP)'],
        correctAnswer: 'TP / (TP + FP)'
    },
    {
        type: 'MCQ',
        text: 'What is the correct formula for Recall?',
        options: ['TP / (TP + FP)', 'TP / (TP + FN)', '(TP + TN) / Total', 'TN / (TN + FP)'],
        correctAnswer: 'TP / (TP + FN)'
    },
    {
        type: 'MCQ',
        text: 'What is the F1 Score?',
        options: ['The arithmetic mean of Precision and Recall', 'The harmonic mean of Precision and Recall', 'Total accuracy', 'The false positive rate'],
        correctAnswer: 'The harmonic mean of Precision and Recall'
    },
    {
        type: 'MCQ',
        text: 'What is K-Fold Cross-Validation used for?',
        options: ['To arbitrarily shuffle data', 'To assess how the results of a statistical analysis will generalize to an independent dataset', 'To increase dataset size', 'To encrypt data'],
        correctAnswer: 'To assess how the results of a statistical analysis will generalize to an independent dataset'
    },
    {
        type: 'MCQ',
        text: 'What does ROC-AUC measure?',
        options: ['The physical size of the model', 'The ability of a classifier to distinguish between classes across all threshold values', 'The training time', 'The number of features'],
        correctAnswer: 'The ability of a classifier to distinguish between classes across all threshold values'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of Grid Search in Machine Learning?',
        options: ['To search the web for datasets', 'To perform exhaustive parameter tuning by trying all specified parameter combinations', 'To display data on a grid UI', 'To detect grid-like patterns in images'],
        correctAnswer: 'To perform exhaustive parameter tuning by trying all specified parameter combinations'
    },
    {
        type: 'MCQ',
        text: 'Why is Feature Scaling (like normalization/standardization) important?',
        options: ['It changes the meaning of the data entirely', 'It helps algorithms that are sensitive to the magnitude of features (like KNN, SVM) converge faster and perform better', 'It reduces the number of features', 'It compresses the dataset to save disk space'],
        correctAnswer: 'It helps algorithms that are sensitive to the magnitude of features (like KNN, SVM) converge faster and perform better'
    },
    {
        type: 'MCQ',
        text: 'What is Principal Component Analysis (PCA) used for?',
        options: ['Classification', 'Regression', 'Dimensionality Reduction', 'Data labeling'],
        correctAnswer: 'Dimensionality Reduction'
    },

    // Deep Learning (26–40)
    {
        type: 'MCQ',
        text: 'What is the basic fundamental unit of an Artificial Neural Network?',
        options: ['Node / Neuron (Perceptron)', 'Layer', 'Weight', 'Bias'],
        correctAnswer: 'Node / Neuron (Perceptron)'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is an example of an Activation Function?',
        options: ['ReLU', 'Sigmoid', 'Tanh', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'Convolutional Neural Networks (CNNs) are primarily used for what type of data?',
        options: ['Text data', 'Image / Grid data', 'Audio data', 'Tabular data'],
        correctAnswer: 'Image / Grid data'
    },
    {
        type: 'MCQ',
        text: 'Recurrent Neural Networks (RNNs) are mainly used for:',
        options: ['Sequential or time-series data (like text or speech)', 'Static images', 'Relational database tables', 'None of the above'],
        correctAnswer: 'Sequential or time-series data (like text or speech)'
    },
    {
        type: 'MCQ',
        text: 'What major problem does LSTM (Long Short-Term Memory) solve in RNNs?',
        options: ['The vanishing / exploding gradient problem in long sequences', 'Overfitting', 'Feature scaling', 'Audio noise reduction'],
        correctAnswer: 'The vanishing / exploding gradient problem in long sequences'
    },
    {
        type: 'MCQ',
        text: 'What architecture introduced the Self-Attention mechanism and largely replaced RNNs in NLP?',
        options: ['CNNs', 'Transformers', 'Autoencoders', 'GANs'],
        correctAnswer: 'Transformers'
    },
    {
        type: 'MCQ',
        text: 'What is the core concept behind the Attention Mechanism in Deep Learning?',
        options: ['Allowing the model to focus on specific, relevant parts of the input sequence while generating output', 'Forcing the model to look at the whole input equally', 'Deleting irrelevant data permanently', 'Compressing images'],
        correctAnswer: 'Allowing the model to focus on specific, relevant parts of the input sequence while generating output'
    },
    {
        type: 'MCQ',
        text: 'What does BERT stand for?',
        options: ['Binary Encoder Representation Transformer', 'Bidirectional Encoder Representations from Transformers', 'Basic Entity Recognition Tool', 'Broad Evaluation of Recurrent Text'],
        correctAnswer: 'Bidirectional Encoder Representations from Transformers'
    },
    {
        type: 'MCQ',
        text: 'Generative Pre-trained Transformer (GPT) models primarily utilize which part of the Transformer architecture?',
        options: ['Decoder-only', 'Encoder-only', 'Encoder-Decoder jointly', 'Discriminator'],
        correctAnswer: 'Decoder-only'
    },
    {
        type: 'MCQ',
        text: 'Diffusion models are highly popular today for which generative task?',
        options: ['Text-to-Text translation', 'High-quality Image Generation (e.g., Midjourney, Stable Diffusion)', 'Relational data synthesis', 'Audio compression'],
        correctAnswer: 'High-quality Image Generation (e.g., Midjourney, Stable Diffusion)'
    },
    {
        type: 'MCQ',
        text: 'What are the two main components of a Generative Adversarial Network (GAN)?',
        options: ['Encoder and Decoder', 'Generator and Discriminator', 'Actor and Critic', 'Policy and Value networks'],
        correctAnswer: 'Generator and Discriminator'
    },
    {
        type: 'MCQ',
        text: 'What is an Autoencoder primarily used for?',
        options: ['Unsupervised representation learning and dimensionality reduction', 'Playing video games automatically', 'Supervised text classification', 'Deploying models to the cloud'],
        correctAnswer: 'Unsupervised representation learning and dimensionality reduction'
    },
    {
        type: 'MCQ',
        text: 'What is the purpose of the Dropout layer in neural networks?',
        options: ['To speed up the network', 'To randomly drop nodes during training to prevent overfitting', 'To drop missing values in the dataset', 'To reduce the learning rate dynamically'],
        correctAnswer: 'To randomly drop nodes during training to prevent overfitting'
    },
    {
        type: 'MCQ',
        text: 'What does Batch Normalization do?',
        options: ['It batches data for distributed storage', 'It normalizes the inputs of a layer to accelerate training and provide some regularization', 'It standardizes the text corpus', 'It prevents data leakage'],
        correctAnswer: 'It normalizes the inputs of a layer to accelerate training and provide some regularization'
    },
    {
        type: 'MCQ',
        text: 'What is Transfer Learning?',
        options: ['Transferring entire datasets via API', 'Using a pre-trained model (trained on a large dataset) and fine-tuning it on a smaller, specific target dataset', 'Moving models from AWS to GCP', 'Changing the programming language of a model'],
        correctAnswer: 'Using a pre-trained model (trained on a large dataset) and fine-tuning it on a smaller, specific target dataset'
    },

    // NLP + LLMs (41–50)
    {
        type: 'MCQ',
        text: 'What does NLP stand for in AI?',
        options: ['Neural Language Processing', 'Natural Language Processing', 'Native Language Program', 'Network Language Protocol'],
        correctAnswer: 'Natural Language Processing'
    },
    {
        type: 'MCQ',
        text: 'What is Tokenization in NLP?',
        options: ['The process of breaking down text into smaller units (tokens) like words or subwords', 'Encrypting text with a token', 'Translating text to a different language', 'Compressing a text file'],
        correctAnswer: 'The process of breaking down text into smaller units (tokens) like words or subwords'
    },
    {
        type: 'MCQ',
        text: 'What do Word Embeddings essentially represent?',
        options: ['Pixel values of text images', 'Dense vector representations of words capturing semantic meaning', 'Audio frequencies of spoken words', 'HTML labels for text formatting'],
        correctAnswer: 'Dense vector representations of words capturing semantic meaning'
    },
    {
        type: 'MCQ',
        text: 'Which of the following is considered a Large Language Model (LLM)?',
        options: ['GPT-4', 'LLaMA 3', 'Mistral', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        type: 'MCQ',
        text: 'What is Prompt Engineering?',
        options: ['Training an LLM from scratch', 'Designing and optimizing natural language inputs (prompts) to get the best possible output from an LLM', 'Cleaning datasets with Python', 'Fine-tuning the model weights layer by layer'],
        correctAnswer: 'Designing and optimizing natural language inputs (prompts) to get the best possible output from an LLM'
    },
    {
        type: 'MCQ',
        text: 'What does Fine-Tuning a Large Language Model mean?',
        options: ['Lowering the volume of the audio output', 'Taking a pre-trained model and updating its weights on a smaller, task-specific dataset', 'Changing the UI color theme of the chatbot', 'Only changing the system prompt text'],
        correctAnswer: 'Taking a pre-trained model and updating its weights on a smaller, task-specific dataset'
    },
    {
        type: 'MCQ',
        text: 'What does RLHF stand for in the context of tuning models like ChatGPT?',
        options: ['Reinforcement Learning from Human Feedback', 'Recurrent Logic Heuristic Function', 'Random Layer Hidden Features', 'Real-time Language Handling Framework'],
        correctAnswer: 'Reinforcement Learning from Human Feedback'
    },
    {
        type: 'MCQ',
        text: 'What does the "Context Window" refer to in an LLM?',
        options: ['The physical UI window size of the chatbot app', 'The maximum number of tokens (input + output) the model can process and remember at one time', 'The time it takes to generate a response', 'The operating system window context'],
        correctAnswer: 'The maximum number of tokens (input + output) the model can process and remember at one time'
    },
    {
        type: 'MCQ',
        text: 'What is an AI "Hallucination"?',
        options: ['When the AI sees images in text', 'When the model generates factually incorrect, nonsensical, or made-up information presented as truth', 'When the GPU overheating causes visual glitches', 'When the AI refuses to answer a prompt'],
        correctAnswer: 'When the model generates factually incorrect, nonsensical, or made-up information presented as truth'
    },
    {
        type: 'MCQ',
        text: 'What effect does increasing the "Temperature" parameter have on an LLM\'s output?',
        options: ['It makes the hardware run hotter', 'It makes the model\'s responses more random, creative, and diverse', 'It strictly limits the output to one exact deterministic answer', 'It increases the processing speed'],
        correctAnswer: 'It makes the model\'s responses more random, creative, and diverse'
    },

    // Vector DB + RAG (51–55)
    {
        type: 'MCQ',
        text: 'Which of the following is an example of a Vector Database?',
        options: ['Pinecone / ChromaDB / Milvus', 'MySQL', 'MongoDB', 'Redis (pure key-value mode)'],
        correctAnswer: 'Pinecone / ChromaDB / Milvus'
    },
    {
        type: 'MCQ',
        text: 'What is the main goal of Similarity Search in a Vector DB?',
        options: ['Finding exact keyword matches like SQL LIKE query', 'Finding vectors (and thus documents) that are semantically closest to a query vector in high-dimensional space', 'Searching for files by their exact filename', 'Sorting numbers in ascending order'],
        correctAnswer: 'Finding vectors (and thus documents) that are semantically closest to a query vector in high-dimensional space'
    },
    {
        type: 'MCQ',
        text: 'What does RAG stand for in modern AI architectures?',
        options: ['Recurrent Artificial Generator', 'Retrieval-Augmented Generation', 'Random Array Gathering', 'Relational Algorithm Graph'],
        correctAnswer: 'Retrieval-Augmented Generation'
    },
    {
        type: 'MCQ',
        text: 'Where are document embeddings typically stored in a RAG pipeline?',
        options: ['In standard SQL tables as strings', 'In local text files', 'In a Vector Database or Vector Store array', 'Directly inside the LLM weights'],
        correctAnswer: 'In a Vector Database or Vector Store array'
    },
    {
        type: 'MCQ',
        text: 'Why is "Chunking" necessary before storing long documents in a Vector DB?',
        options: ['To fit within the embedding model\'s token limit and retrieve precise, relevant context snippets rather than whole books', 'To compress the text size on disk', 'To translate different chunks into different languages automatically', 'Because Vector DBs only accept exactly 10 words at a time'],
        correctAnswer: 'To fit within the embedding model\'s token limit and retrieve precise, relevant context snippets rather than whole books'
    },

    // MLOps (56–60)
    {
        type: 'MCQ',
        text: 'Which of the following is commonly used for serving and deploying Machine Learning models?',
        options: ['Docker / Kubernetes / FastAPI / Sagemaker', 'Photoshop', 'Microsoft Word', 'CSS Modules'],
        correctAnswer: 'Docker / Kubernetes / FastAPI / Sagemaker'
    },
    {
        type: 'MCQ',
        text: 'What is the role of CI/CD in Machine Learning (MLOps)?',
        options: ['To automatically format code only', 'To automate testing, building, and deploying AI models and their APIs continuously', 'To manually copy files to servers via FTP', 'To monitor battery life'],
        correctAnswer: 'To automate testing, building, and deploying AI models and their APIs continuously'
    },
    {
        type: 'MCQ',
        text: 'Why is Model Versioning (e.g., using MLflow or DVC) critical?',
        options: ['To keep track of different datasets, hyperparameters, and model iterations to ensure reproducibility and easy rollbacks', 'To change the model name frequently', 'To hide the model from other developers', 'To compress the model weights randomly'],
        correctAnswer: 'To keep track of different datasets, hyperparameters, and model iterations to ensure reproducibility and easy rollbacks'
    },
    {
        type: 'MCQ',
        text: 'What does Monitoring Data/Concept Drift mean in production ML?',
        options: ['Tracking if the server physically moves', 'Observing if the real-world input data distribution or relationships change over time, degrading model accuracy', 'Monitoring network latency', 'Checking if logs are drifting into other folders'],
        correctAnswer: 'Observing if the real-world input data distribution or relationships change over time, degrading model accuracy'
    },
    {
        type: 'MCQ',
        text: 'What is A/B Testing for ML models?',
        options: ['Testing models blindly without data', 'Serving Model A to one group of users and Model B to another to statistically compare their real-world performance', 'A unit testing framework for Python', 'Testing alphabetical outputs'],
        correctAnswer: 'Serving Model A to one group of users and Model B to another to statistically compare their real-world performance'
    },

    // AI Security + Ethics (61–70)
    {
        type: 'MCQ',
        text: 'What is AI Bias?',
        options: ['When AI refuses to work', 'When an AI system produces systematically prejudiced results due to flawed assumptions in the training process or unbalanced data', 'When a model is perfectly neutral', 'When the model runs too fast'],
        correctAnswer: 'When an AI system produces systematically prejudiced results due to flawed assumptions in the training process or unbalanced data'
    },
    {
        type: 'MCQ',
        text: 'What is an Adversarial Attack in Deep Learning?',
        options: ['A physical attack on servers', 'Deliberately applying small, often imperceptible perturbations to inputs (like images) to cause the model to make a classification mistake', 'Spamming the model API with plain text', 'DDoS attack'],
        correctAnswer: 'Deliberately applying small, often imperceptible perturbations to inputs (like images) to cause the model to make a classification mistake'
    },
    {
        type: 'MCQ',
        text: 'What does Data Poisoning refer to in ML security?',
        options: ['Deleting data permanently', 'Maliciously injecting corrupted or misleading data into the training set to compromise the final model\'s behavior', 'Corrupting the RAM physically', 'Encrypting the dataset'],
        correctAnswer: 'Maliciously injecting corrupted or misleading data into the training set to compromise the final model\'s behavior'
    },
    {
        type: 'MCQ',
        text: 'What is Model Inversion / Model Stealing?',
        options: ['Reversing the order of layers in a neural network', 'Extracting proprietary model details or reconstructing sensitive training data by repeatedly querying the model API', 'Stealing the physical GPU', 'Copying open-source code'],
        correctAnswer: 'Extracting proprietary model details or reconstructing sensitive training data by repeatedly querying the model API'
    },
    {
        type: 'MCQ',
        text: 'What is the primary security risk associated with Deepfakes?',
        options: ['High GPU electricity usage', 'AI-generated hyper-realistic fake audio/video used for misinformation, fraud, or social engineering', 'Slow video rendering', 'Poor audio quality'],
        correctAnswer: 'AI-generated hyper-realistic fake audio/video used for misinformation, fraud, or social engineering'
    },
    {
        type: 'MCQ',
        text: 'What is AI Governance?',
        options: ['AI replacing politicians', 'The frameworks, policies, and structures established to ensure AI safety, compliance, and ethical use within an organization', 'A specific ML model type', 'A government database of AI engineers'],
        correctAnswer: 'The frameworks, policies, and structures established to ensure AI safety, compliance, and ethical use within an organization'
    },
    {
        type: 'MCQ',
        text: 'What is Explainable AI (XAI)?',
        options: ['AI that speaks in multiple languages', 'Techniques and methods (like SHAP, LIME) used to understand and interpret how "black-box" ML models make their decisions', 'AI that explains physics concepts', 'AI that writes its own documentation'],
        correctAnswer: 'Techniques and methods (like SHAP, LIME) used to understand and interpret how "black-box" ML models make their decisions'
    },
    {
        type: 'MCQ',
        text: 'What is Differential Privacy in machine learning?',
        options: ['A way to privately share passwords', 'A mathematical framework to ensure that the inclusion or exclusion of any single data instance does not significantly affect the model\'s output, protecting individual privacy', 'Making models private source', 'Encrypting network traffic'],
        correctAnswer: 'A mathematical framework to ensure that the inclusion or exclusion of any single data instance does not significantly affect the model\'s output, protecting individual privacy'
    },
    {
        type: 'MCQ',
        text: 'What describes Federated Learning?',
        options: ['Learning from a single centralized database only', 'Training a centralized model collaboratively across decentralized edge devices or servers holding local data samples, without exchanging the raw data', 'Joining AI communities online', 'Learning using federal government datasets'],
        correctAnswer: 'Training a centralized model collaboratively across decentralized edge devices or servers holding local data samples, without exchanging the raw data'
    },
    {
        type: 'MCQ',
        text: 'Which is a core principle of Responsible AI?',
        options: ['Fairness, Transparency, Accountability, and Privacy', 'Maximum profit regardless of bias', 'Hiding all algorithmic logic', 'Replacing human workers immediately'],
        correctAnswer: 'Fairness, Transparency, Accountability, and Privacy'
    }
];

// Add 30 Coding/Practical Questions Programmatically to reach 100
const practicalQuestions = [
    // ML Coding (71–80)
    { text: 'Mathematical Modelling: Write a Python function from scratch that calculates the Gradient Descent for a simple Linear Regression.' },
    { text: 'Sklearn Implementations: Write a basic script to train a Logistic Regression model on a Pandas DataFrame and predict new values.' },
    { text: 'Algorithm implementation: Write a raw Python snippet that calculates the Euclidean distance and implements a K-Nearest Neighbors classifer.' },
    { text: 'Tree Models: Use Scikit-Learn to build, train, and visualize a Decision Tree Classifier on the Iris dataset.' },
    { text: 'Model Evaluation: Write code to compute Accuracy, Precision, Recall, and F1-Score for given `y_true` and `y_pred` arrays.' },
    { text: 'Metrics Visualization: Write a Matplotlib / Seaborn snippet to plot a Confusion Matrix vividly.' },
    { text: 'Data Preprocessing: Write code using `StandardScaler` or `MinMaxScaler` to normalize features in a NumPy array.' },
    { text: 'Dimensionality Reduction: Implement PCA to reduce a 10-dimensional dataset down to 2 dimensions for 2D scatter plotting.' },
    { text: 'Hyperparameter Tuning: Setup and run a `GridSearchCV` on a RandomForestClassifier to find the optimal `n_estimators` and `max_depth`.' },
    { text: 'Pipeline Construction: Write a Scikit-Learn Pipeline that chains an Imputer, a Scaler, and an SVM Classifier sequentially.' },

    // Deep Learning Coding (81–88)
    { text: 'Neural Networks: Write a basic Multi-Layer Perceptron (ANN) using Keras Sequential API with 2 hidden dense layers and an output layer.' },
    { text: 'Computer Vision: Build a small Convolutional Neural Network (CNN) in PyTorch containing Conv2d, MaxPool2d, and Linear layers.' },
    { text: 'Transfer Learning: Write a script to load a pre-trained ResNet50 model from `torchvision`, freeze its base layers, and modify the final classifier head.' },
    { text: 'Sequence Processing: Write a basic skeleton for an LSTM model in TensorFlow/Keras tailored for text generation.' },
    { text: 'Transformer Basics: Implement a simple scaled dot-product attention function in PyTorch using query, key, and value tensors.' },
    { text: 'Generative Adversarial Nets: Write the pseudo-code architecture for a basic Generator and Discriminator class in PyTorch.' },
    { text: 'Anomaly Detection: Build an Autoencoder model in Keras that compresses an input vector to a bottleneck and reconstructs it.' },
    { text: 'NLP Fine-Tuning: Write the basic HuggingFace `Trainer` boilerplate required to fine-tune a pre-trained BERT model on a bespoke categorization dataset.' },

    // LLM + GenAI (89–95)
    { text: 'API Integration: Write a Node.js or Python snippet to call the OpenAI `chat/completions` API and return a streaming response.' },
    { text: 'Local Inference: Describe the CLI commands or write a python wrapper script to load and infer from a local `.gguf` LLaMA model using `llama.cpp`.' },
    { text: 'Prompt Engineering Framework: Implement a LangChain snippet that creates a PromptTemplate chaining an extraction prompt into a summarization prompt.' },
    { text: 'Retrieval Augmented Generation: Write an end-to-end pseudo-pipeline taking a query, embedding it, fetching top-k vectors, and feeding the context to an LLM.' },
    { text: 'Vector Store Usage: Write Python code to initialize a ChromaDB or Pinecone client, generate embeddings via OpenAI, and upsert them into an index.' },
    { text: 'Document Parsing: Write a loader script using PyPDF2 or LangChain Document Loaders to extract and chunk text from a 100-page PDF.' },
    { text: 'AI Agents: Write code using LangChain Agents to give an LLM access to a custom Python `calculator_tool` and a `search_tool`.' },

    // Advanced / System Design (96–100)
    { text: 'System Architecture (Web/AI): Design an asynchronous architecture diagram describing how a React frontend communicates via a FastAPI backend to load a heavy PyTorch inference model (using RabbitMQ/Celery).' },
    { text: 'Scalable MLOps: Describe a system architecture that uses Kubernetes, Triton Inference Server, and load balancers to serve 10,000 requests/sec for a Transformer model.' },
    { text: 'Multi-Agent Collaboration: Design a conceptual framework where a "Researcher" LLM Agent gathers data and a "Writer" LLM Agent drafts a report, managed by a "Supervisor" Agent loop.' },
    { text: 'Security Threat Detection: Design an architecture for a real-time SIEM system that uses an ensemble of unsupervised Autoencoders and LLMs to flag anomalous network packets.' },
    { text: 'Enterprise RAG System: Architect a secure RAG Assistant for a bank that includes Role-Based Access Control (RBAC) at the embedding level, ensuring users only retrieve context they have permission to read.' }
];

practicalQuestions.forEach((pq) => {
    fullExamQuestions.push({
        type: 'Coding',
        text: pq.text,
        options: [],
        correctAnswer: '' // Handled by manual review or specialized UI
    });
});

const seedAI100QuestionExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');

        await Exam.deleteOne({ title: 'AI Engineer – 100 Questions Exam' });

        // Check if AI domain exists
        let domain = await Domain.findOne({ name: 'Artificial Intelligence' });
        if (!domain) {
            domain = new Domain({
                name: 'Artificial Intelligence',
                description: 'Machine Learning, Deep Learning, GenAI, and MLOps fundamentals.'
            });
            await domain.save();
        }

        const examObj = new Exam({
            title: 'AI Engineer – 100 Questions Exam',
            type: 'Full-length Mock',
            durationMinutes: 180,
            domainId: domain._id,
            questions: fullExamQuestions
        });

        await examObj.save();
        console.log('Successfully seeded AI Engineer 100 question exam. Total length: ', examObj.questions.length);

        process.exit(0);
    } catch (err) {
        console.error('Failed to seed exam:');
        console.error(err);
        process.exit(1);
    }
};

seedAI100QuestionExam();
