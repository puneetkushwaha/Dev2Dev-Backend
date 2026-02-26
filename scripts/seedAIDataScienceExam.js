const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
require('dotenv').config();

const questions = [
    // --- MCQs (1-15: Statistics & Mathematics) ---
    { questionText: "Mean calculate kaise hota hai?", type: "mcq", options: ["Sum / Count", "Max value", "Min value", "Median"], correctAnswer: "Sum / Count", difficulty: "Easy" },
    { questionText: "Median kya hota hai?", type: "mcq", options: ["Middle value", "Average", "Mode", "Range"], correctAnswer: "Middle value", difficulty: "Easy" },
    { questionText: "Mode kya hota hai?", type: "mcq", options: ["Most frequent value", "Middle value", "Difference", "Sum"], correctAnswer: "Most frequent value", difficulty: "Easy" },
    { questionText: "Standard deviation measure karta hai:", type: "mcq", options: ["Spread of data", "Mean", "Mode", "Count"], correctAnswer: "Spread of data", difficulty: "Medium" },
    { questionText: "Variance kya hai?", type: "mcq", options: ["Square of std deviation", "Mean", "Median", "Range"], correctAnswer: "Square of std deviation", difficulty: "Medium" },
    { questionText: "Probability range hoti hai:", type: "mcq", options: ["0–1", "1–10", "-1–1", "0–100"], correctAnswer: "0–1", difficulty: "Easy" },
    { questionText: "Normal distribution shape:", type: "mcq", options: ["Bell curve", "Square", "Triangle", "Flat"], correctAnswer: "Bell curve", difficulty: "Easy" },
    { questionText: "Correlation coefficient range:", type: "mcq", options: ["-1 to 1", "0 to 10", "1 to 100", "-10 to 10"], correctAnswer: "-1 to 1", difficulty: "Medium" },
    { questionText: "Positive correlation ka matlab:", type: "mcq", options: ["Variables move same direction", "Opposite direction", "No relation", "Random"], correctAnswer: "Variables move same direction", difficulty: "Easy" },
    { questionText: "Hypothesis testing me p-value kya indicate karti hai?", type: "mcq", options: ["Significance", "Accuracy", "Loss", "Bias"], correctAnswer: "Significance", difficulty: "Medium" },
    { questionText: "Z-score kya batata hai?", type: "mcq", options: ["How many standard deviations a point is from mean", "Total count", "Max value", "Median"], correctAnswer: "How many standard deviations a point is from mean", difficulty: "Medium" },
    { questionText: "T-test kab use hota hai?", type: "mcq", options: ["Comparing means of two groups", "Comparing 10 groups", "Only for median", "Graphic display"], correctAnswer: "Comparing means of two groups", difficulty: "Medium" },
    { questionText: "ANOVA (Analysis of Variance) ka use?", type: "mcq", options: ["Comparing means of 3+ groups", "Only 2 groups", "Median calculation", "Sum"], correctAnswer: "Comparing means of 3+ groups", difficulty: "Hard" },
    { questionText: "Confidence interval kya represent karta hai?", type: "mcq", options: ["Range where population parameter likely lies", "Single point", "Error code", "Count"], correctAnswer: "Range where population parameter likely lies", difficulty: "Medium" },
    { questionText: "Simple Random Sampling me kya hota hai?", type: "mcq", options: ["Every member has equal chance", "Only first 10", "Only last 10", "Manual choice"], correctAnswer: "Every member has equal chance", difficulty: "Easy" },

    // --- MCQs (16-25: Python for Data Science) ---
    { questionText: "Data analysis ke liye best language?", type: "mcq", options: ["Python", "HTML", "CSS", "PHP"], correctAnswer: "Python", difficulty: "Easy" },
    { questionText: "Numpy use hota hai:", type: "mcq", options: ["Numerical computing", "UI", "API", "Security"], correctAnswer: "Numerical computing", difficulty: "Easy" },
    { questionText: "Pandas ka primary use?", type: "mcq", options: ["Data manipulation", "Networking", "AI training", "Encryption"], correctAnswer: "Data manipulation", difficulty: "Easy" },
    { questionText: "DataFrame kya hota hai?", type: "mcq", options: ["2D table", "Image", "Graph", "Model"], correctAnswer: "2D table", difficulty: "Easy" },
    { questionText: "Series kya hoti hai?", type: "mcq", options: ["1D labeled array", "2D", "3D", "Graph"], correctAnswer: "1D labeled array", difficulty: "Easy" },
    { questionText: "Missing values detect kaise karte hain?", type: "mcq", options: ["isnull()", "drop()", "fill()", "remove()"], correctAnswer: "isnull()", difficulty: "Easy" },
    { questionText: "CSV read function?", type: "mcq", options: ["read_csv()", "open_csv()", "csv_read()", "load_csv()"], correctAnswer: "read_csv()", difficulty: "Easy" },
    { questionText: "Pandas me 'groupby' ka use?", type: "mcq", options: ["Split data into groups based on some criteria", "Deleting rows", "Plotting", "Sorting"], correctAnswer: "Split data into groups based on some criteria", difficulty: "Medium" },
    { questionText: "Merge function ka logic?", type: "mcq", options: ["Join two DataFrames on a key", "Column rename", "Row delete", "Plotting"], correctAnswer: "Join two DataFrames on a key", difficulty: "Medium" },
    { questionText: "Apply function ka purpose?", type: "mcq", options: ["Applying function along axis of DataFrame", "API call", "Closing file", "None"], correctAnswer: "Applying function along axis of DataFrame", difficulty: "Medium" },

    // --- MCQs (26-35: Data Visualization) ---
    { questionText: "Matplotlib use hota hai:", type: "mcq", options: ["Visualization", "DB", "ML", "Security"], correctAnswer: "Visualization", difficulty: "Easy" },
    { questionText: "Seaborn kis par based hai?", type: "mcq", options: ["Matplotlib", "Pandas", "Numpy", "Plotly"], correctAnswer: "Matplotlib", difficulty: "Easy" },
    { questionText: "Bar chart use hota hai:", type: "mcq", options: ["Category comparison", "Time series", "Correlation", "Distribution"], correctAnswer: "Category comparison", difficulty: "Easy" },
    { questionText: "Histogram show karta hai:", type: "mcq", options: ["Distribution", "Category", "Relation", "Rank"], correctAnswer: "Distribution", difficulty: "Easy" },
    { questionText: "Scatter plot use hota hai:", type: "mcq", options: ["Relationship show", "Distribution", "Text", "Ranking"], correctAnswer: "Relationship show", difficulty: "Easy" },
    { questionText: "Heatmap kya visualize karta hai?", type: "mcq", options: ["Correlation matrix in colors", "Images", "Text", "Bar"], correctAnswer: "Correlation matrix in colors", difficulty: "Medium" },
    { questionText: "Boxplot kya identify karta hai?", type: "mcq", options: ["Outliers and quartiles", "Sum", "Average", "Mode"], correctAnswer: "Outliers and quartiles", difficulty: "Medium" },
    { questionText: "Pairplot ka primary use?", type: "mcq", options: ["Visualizing pairwise relationships in dataset", "Single variable", "Only 3D", "None"], correctAnswer: "Visualizing pairwise relationships in dataset", difficulty: "Hard" },
    { questionText: "Line chart best hai:", type: "mcq", options: ["Time Series data", "Category", "Static count", "None"], correctAnswer: "Time Series data", difficulty: "Easy" },
    { questionText: "Common Dashboard tool?", type: "mcq", options: ["Tableau", "Notepad", "Calculator", "Browser"], correctAnswer: "Tableau", difficulty: "Easy" },

    // --- MCQs (36-50: Machine Learning) ---
    { questionText: "Supervised learning me kya hota hai?", type: "mcq", options: ["Labeled data", "No labels", "Random choice", "Only images"], correctAnswer: "Labeled data", difficulty: "Easy" },
    { questionText: "Unsupervised learning ka example?", type: "mcq", options: ["Clustering", "Regression", "Classification", "None"], correctAnswer: "Clustering", difficulty: "Easy" },
    { questionText: "Regression ka goal?", type: "mcq", options: ["Predict continuous value", "Predict category", "Group data", "None"], correctAnswer: "Predict continuous value", difficulty: "Easy" },
    { questionText: "Classification me kya predict hota hai?", type: "mcq", options: ["Discrete categories", "Continuous numbers", "Cluster", "Range"], correctAnswer: "Discrete categories", difficulty: "Easy" },
    { questionText: "Clustering me:", type: "mcq", options: ["Groups similar data points", "Predicts label", "Deletes data", "None"], correctAnswer: "Groups similar data points", difficulty: "Medium" },
    { questionText: "Decision Tree algorithm logic:", type: "mcq", options: ["Flow-chart like structure", "Circular", "Linear only", "None"], correctAnswer: "Flow-chart like structure", difficulty: "Medium" },
    { questionText: "Random Forest kya hai?", type: "mcq", options: ["Ensemble of Decision Trees", "Single tree", "Linear model", "None"], correctAnswer: "Ensemble of Decision Trees", difficulty: "Medium" },
    { questionText: "KMeans is a type of:", type: "mcq", options: ["Clustering", "Regression", "Classification", "Deep Learning"], correctAnswer: "Clustering", difficulty: "Medium" },
    { questionText: "SVM (Support Vector Machine) maximizes:", type: "mcq", options: ["Margin between classes", "Error", "Loss", "None"], correctAnswer: "Margin between classes", difficulty: "Hard" },
    { questionText: "Naive Bayes is based on:", type: "mcq", options: ["Bayes Theorem", "Algebra", "Calculus", "Geometry"], correctAnswer: "Bayes Theorem", difficulty: "Medium" },
    { questionText: "Overfitting ka matlab?", type: "mcq", options: ["Model fits training data too well but fails on test", "Poor performance everywhere", "Perfect model", "None"], correctAnswer: "Model fits training data too well but fails on test", difficulty: "Medium" },
    { questionText: "Cross-validation kyu zaruri hai?", type: "mcq", options: ["To assess model performance on unseen data", "To increase speed", "To delete data", "None"], correctAnswer: "To assess model performance on unseen data", difficulty: "Medium" },
    { questionText: "ROC curve measures:", type: "mcq", options: ["Trade-off between Sensitivity and Specificity", "Only accuracy", "Loss", "Count"], correctAnswer: "Trade-off between Sensitivity and Specificity", difficulty: "Hard" },
    { questionText: "Feature scaling kyu krte hain?", type: "mcq", options: ["To bring features to same scale", "To delete features", "To change labels", "None"], correctAnswer: "To bring features to same scale", difficulty: "Medium" },
    { questionText: "Dimensionality reduction ka tool?", type: "mcq", options: ["PCA", "Linear Regression", "Decision Tree", "None"], correctAnswer: "PCA", difficulty: "Hard" },

    // --- MCQs (51-60: Deep Learning) ---
    { questionText: "Neural network ki basic unit?", type: "mcq", options: ["Neuron/Perceptron", "Layer", "Node", "Cluster"], correctAnswer: "Neuron/Perceptron", difficulty: "Easy" },
    { questionText: "Activation function ka goal?", type: "mcq", options: ["Add non-linearity", "Linear transformation", "Delete node", "None"], correctAnswer: "Add non-linearity", difficulty: "Medium" },
    { questionText: "CNN (Convolutional Neural Network) best hai:", type: "mcq", options: ["Image recognition", "Text sequence", "Tabular only", "None"], correctAnswer: "Image recognition", difficulty: "Medium" },
    { questionText: "RNN (Recurrent Neural Network) ka use?", type: "mcq", options: ["Sequential/Time-series data", "Only static images", "Regression", "None"], correctAnswer: "Sequential/Time-series data", difficulty: "Medium" },
    { questionText: "LSTM (Long Short-Term Memory) handles:", type: "mcq", options: ["Vanishing gradient in RNNs", "Speed", "Only memory", "None"], correctAnswer: "Vanishing gradient in RNNs", difficulty: "Hard" },
    { questionText: "Transformers paper 'Attention is All You Need' foundation of:", type: "mcq", options: ["LLMs like GPT", "Standard Regression", "CNN", "None"], correctAnswer: "LLMs like GPT", difficulty: "Hard" },
    { questionText: "Attention mechanism helps model focus on:", type: "mcq", options: ["Relevant parts of input sequence", "All parts equally", "Only first word", "None"], correctAnswer: "Relevant parts of input sequence", difficulty: "Hard" },
    { questionText: "Transfer learning kya hai?", type: "mcq", options: ["Using a pre-trained model for a new task", "Teaching a person", "Moving files", "None"], correctAnswer: "Using a pre-trained model for a new task", difficulty: "Medium" },
    { questionText: "Dropout layer prevents:", type: "mcq", options: ["Overfitting", "Underfitting", "Speed", "None"], correctAnswer: "Overfitting", difficulty: "Medium" },
    { questionText: "Batch normalization logic?", type: "mcq", options: ["Normalizing inputs for each layer", "Deleting data", "Security", "None"], correctAnswer: "Normalizing inputs for each layer", difficulty: "Hard" },

    // --- MCQs (61-70: Big Data & Tools) ---
    { questionText: "Big Data 3Vs are:", type: "mcq", options: ["Volume, Velocity, Variety", "Video, Virtual, Voice", "Version, Value, View", "None"], correctAnswer: "Volume, Velocity, Variety", difficulty: "Easy" },
    { questionText: "Hadoop kya hai?", type: "mcq", options: ["Distributed storage and processing framework", "Only storage", "Single machine tool", "None"], correctAnswer: "Distributed storage and processing framework", difficulty: "Medium" },
    { questionText: "Apache Spark feature:", type: "mcq", options: ["In-memory processing", "Only disk-based", "Slow", "None"], correctAnswer: "In-memory processing", difficulty: "Medium" },
    { questionText: "Data Lake store karta hai:", type: "mcq", options: ["Raw, unstructured data", "Structured only", "Only logs", "None"], correctAnswer: "Raw, unstructured data", difficulty: "Medium" },
    { questionText: "ETL stands for:", type: "mcq", options: ["Extract, Transform, Load", "Exit, Trip, Log", "Edit, Track, Link", "None"], correctAnswer: "Extract, Transform, Load", difficulty: "Easy" },
    { questionText: "Apache Kafka ka use?", type: "mcq", options: ["Real-time data streaming", "Static DB", "Web design", "None"], correctAnswer: "Real-time data streaming", difficulty: "Medium" },
    { questionText: "Airflow ka role?", type: "mcq", options: ["Workflow orchestration", "Only coding", "UI design", "None"], correctAnswer: "Workflow orchestration", difficulty: "Medium" },
    { questionText: "Data pipeline flow:", type: "mcq", options: ["Source to Destination with processing", "Static files", "Only backup", "None"], correctAnswer: "Source to Destination with processing", difficulty: "Easy" },
    { questionText: "Real-time analytics means:", type: "mcq", options: ["Analyzing data as it is generated", "Analyzing old data", "Manual reports", "None"], correctAnswer: "Analyzing data as it is generated", difficulty: "Medium" },
    { questionText: "Cloud ML tool example:", type: "mcq", options: ["AWS SageMaker", "Notepad", "Calculator", "VLC"], correctAnswer: "AWS SageMaker", difficulty: "Easy" },

    // --- Coding / Practical Questions (71-100) ---
    { questionText: "Coding Question: Write a Python function to calculate the mean, median, and mode of a list of numbers without using external libraries except 'statistics'.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Load a CSV using Pandas and print the first 5 rows, summary statistics, and info description.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Identify missing values in a DataFrame and fill numerical ones with mean and categorical ones with mode.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Perform groupby on a 'Sales' DataFrame by 'Category' and calculate sum of 'Revenue' and count of 'Orders'.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Merge two DataFrames 'Customers' and 'Orders' on 'customer_id' and handle non-matching rows.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Create a correlation matrix for a DataFrame and visualization code using Seaborn heatmap.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Detect outliers in a column using the IQR (Interquartile Range) method and filter them out.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Implement Min-Max normalization (scaling between 0 and 1) for a specific column using Pandas.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Encode categorical features using One-Hot Encoding for a specific column.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Write code to generate a basic Exploratory Data Analysis (EDA) report (plotting 3 relevant charts).", type: "coding", difficulty: "Hard" },

    { questionText: "Coding Question: Create a Bar chart comparison of 5 different product categories and their sales.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Plot a Histogram to show the age distribution of a sample population (e.g. 1000 people).", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Create a Scatter plot to show relationship between 'Advertising Budget' and 'Sales'.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Generate a Heatmap from a correlation matrix with annotations and a custom color map.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Build code for a dashboard layout showing a Bar chart and a Scatter plot side-by-side using Matplotlib subplots.", type: "coding", difficulty: "Hard" },

    { questionText: "Coding Question: Implement a Simple Linear Regression model to predict house prices based on 'Square Footage'.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Build a Logistic Regression classifier to predict if a customer will churn based on 'Usage' and 'Contract Length'.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Create a Decision Tree model with a maximum depth of 5 and show how to plot the tree.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Train a Random Forest model with 100 estimators and evaluate using Mean Absolute Error.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement KMeans clustering with k=3 and visualize the resulting clusters.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Write code to calculate Accuracy, Precision, Recall, and F1-score for a classification model.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Generate and plot a Confusion Matrix for a classification problem.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement GridSearchCV for hyperparameter tuning of a Random Forest (search for 'n_estimators' and 'max_depth').", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Apply PCA to reduce a 10-feature dataset to 2 principal components and plot the result.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build an end-to-end ML pipeline using Scikit-Learn: Imputer -> Scaler -> Model.", type: "coding", difficulty: "Hard" },

    { questionText: "Coding Question: Create a Time Series forecasting model (e.g. using simple moving average or ARIMA concept) for stock data.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build a basic content-based recommendation system logic using Cosine Similarity.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Write an NLP sentiment analysis code using a library like TextBlob or NLTK for customer reviews.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Build a basic Image Classifier using CNN (concept code: Convolution -> Pooling -> Dense).", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Design and describe (in code-ready pseudocode) an end-to-end Data Science project: Data Ingestion to Deployment.", type: "coding", difficulty: "Hard" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'AI & Data Science' });
        if (!domain) {
            console.error('AI & Data Science domain not found. Please ensure domains are seeded first.');
            process.exit(1);
        }

        // Delete existing AI & DS exams to avoid duplicates
        await Exam.deleteMany({ title: "AI & Data Science – 100 Questions Exam" });

        const aiExam = new Exam({
            domainId: domain._id,
            title: "AI & Data Science – 100 Questions Exam",
            type: "Full-length Mock",
            durationMinutes: 120, // 2 hours
            questions: questions
        });

        await aiExam.save();
        console.log('Successfully seeded AI & Data Science - 100 Questions Exam');

        await mongoose.connection.close();
        console.log('Done');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
