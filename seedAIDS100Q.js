require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const fullExamQuestions = [
    // Section A — MCQ (1–70)
    // Statistics & Mathematics (1–15)
    {
        type: 'MCQ',
        text: 'How is the Mean calculated in statistics?',
        options: ['Sum of all values divided by the count', 'The maximum value in the dataset', 'The minimum value in the dataset', 'The middle value when sorted'],
        correctAnswer: 'Sum of all values divided by the count'
    },
    {
        type: 'MCQ',
        text: 'What is the Median?',
        options: ['The exact middle value in a sorted array of data', 'The calculated average', 'The most frequently occurring value', 'The difference between the max and min values'],
        correctAnswer: 'The exact middle value in a sorted array of data'
    },
    {
        type: 'MCQ',
        text: 'What is the Mode?',
        options: ['The value that appears most frequently in a data set', 'The middle value', 'The difference between highest and lowest', 'The total sum'],
        correctAnswer: 'The value that appears most frequently in a data set'
    },
    {
        type: 'MCQ',
        text: 'What does Standard Deviation measure?',
        options: ['The spread or dispersion of data relative to its mean', 'The calculated average mean', 'The most frequent value', 'The total number of rows'],
        correctAnswer: 'The spread or dispersion of data relative to its mean'
    },
    {
        type: 'MCQ',
        text: 'What is Variance?',
        options: ['The square of the standard deviation', 'The arithmetic mean', 'The median value', 'The range minimum'],
        correctAnswer: 'The square of the standard deviation'
    },
    {
        type: 'MCQ',
        text: 'What is the possible range of a Probability value?',
        options: ['0 to 1 (inclusive)', '1 to 10', '-1 to 1', '0 to 100'],
        correctAnswer: '0 to 1 (inclusive)'
    },
    {
        type: 'MCQ',
        text: 'What shape characterizes a Normal Distribution (Gaussian)?',
        options: ['A symmetrical bell curve', 'A square box', 'A sharply skewed triangle', 'A flat horizontal line'],
        correctAnswer: 'A symmetrical bell curve'
    },
    {
        type: 'MCQ',
        text: 'What is the range of the Pearson Correlation Coefficient (r)?',
        options: ['-1 to +1', '0 to 10', '1 to 100', '-10 to +10'],
        correctAnswer: '-1 to +1'
    },
    {
        type: 'MCQ',
        text: 'What does a Positive Correlation indicate?',
        options: ['As one variable increases, the other variable also tends to increase', 'The variables move in completely opposite directions', 'There is no relationship at all', 'The variables fluctuate randomly independent of each other'],
        correctAnswer: 'As one variable increases, the other variable also tends to increase'
    },
    {
        type: 'MCQ',
        text: 'In Hypothesis Testing, what does the p-value typically indicate?',
        options: ['The probability of observing the test results under the null hypothesis (statistical significance)', 'The accuracy of the machine learning model', 'The loss function over time', 'The bias measurement in the dataset'],
        correctAnswer: 'The probability of observing the test results under the null hypothesis (statistical significance)'
    },
    {
        type: 'MCQ',
        text: 'What does a Z-score describe?',
        options: ['The exact number of standard deviations a data point is from the mean', 'The absolute average error', 'The number of clusters in data', 'The learning rate of an algorithm'],
        correctAnswer: 'The exact number of standard deviations a data point is from the mean'
    },
    {
        type: 'MCQ',
        text: 'When is a T-test generally used?',
        options: ['To compare the means of two groups, often when sample sizes are small', 'To build a deep neural network', 'To connect to a SQL database', 'To clean missing text files'],
        correctAnswer: 'To compare the means of two groups, often when sample sizes are small'
    },
    {
        type: 'MCQ',
        text: 'What does ANOVA stand for?',
        options: ['Analysis of Variance', 'Array Normalization over Verification', 'Absolute Number of Variables', 'Average Normalization of Vectors'],
        correctAnswer: 'Analysis of Variance'
    },
    {
        type: 'MCQ',
        text: 'What does a 95% Confidence Interval mean?',
        options: ['We are 95% confident that the true population parameter lies within that calculated range', 'It guarantees 95% model accuracy', 'It drops 5% of the outliers in the data', 'It represents 95 units of time'],
        correctAnswer: 'We are 95% confident that the true population parameter lies within that calculated range'
    },
    {
        type: 'MCQ',
        text: 'Which is an example of a random sampling method?',
        options: ['Stratified Sampling', 'Hardcoding an array', 'Always picking the first 10 rows', 'Copying data manually'],
        correctAnswer: 'Stratified Sampling'
    },

    // Python for Data Science (16–25)
    {
        type: 'MCQ',
        text: 'Which programming language is predominantly considered the industry standard for Data Analysis?',
        options: ['Python', 'HTML', 'CSS', 'PHP'],
        correctAnswer: 'Python'
    },
    {
        type: 'MCQ',
        text: 'What is the primary use of the NumPy library in Python?',
        options: ['Fast, efficient numerical computing and multi-dimensional array operations', 'Building Graphical User Interfaces (UI)', 'Creating REST APIs', 'Cybersecurity encryption'],
        correctAnswer: 'Fast, efficient numerical computing and multi-dimensional array operations'
    },
    {
        type: 'MCQ',
        text: 'What is the primary use of the Pandas library?',
        options: ['Data manipulation, cleaning, and analysis using tabular structures', 'Hardware networking', 'Training advanced Deep Learning text models', 'Encrypting passwords'],
        correctAnswer: 'Data manipulation, cleaning, and analysis using tabular structures'
    },
    {
        type: 'MCQ',
        text: 'What is a Pandas DataFrame?',
        options: ['A 2-Dimensional labeled data structure with columns of potentially different types (like a table)', 'A compressed Image file format', 'A 3D visualization graph object', 'A pre-trained ML Model matrix'],
        correctAnswer: 'A 2-Dimensional labeled data structure with columns of potentially different types (like a table)'
    },
    {
        type: 'MCQ',
        text: 'What is a Pandas Series?',
        options: ['A 1-Dimensional labeled array capable of holding any data type (like a single column)', 'A 2-Dimensional array', 'A complete 3D tensor', 'A visual node graph'],
        correctAnswer: 'A 1-Dimensional labeled array capable of holding any data type (like a single column)'
    },
    {
        type: 'MCQ',
        text: 'Which Pandas function is used to detect missing (NaN) values?',
        options: ['isnull() / isna()', 'drop()', 'fill()', 'remove()'],
        correctAnswer: 'isnull() / isna()'
    },
    {
        type: 'MCQ',
        text: 'Which function is used in Pandas to efficiently read a CSV file into a DataFrame?',
        options: ['pd.read_csv()', 'pd.open_csv()', 'csv_read()', 'load.csv()'],
        correctAnswer: 'pd.read_csv()'
    },
    {
        type: 'MCQ',
        text: 'What does the groupby() function do in Pandas?',
        options: ['It groups DataFrame rows sharing the same value in a column, allowing for aggregation (e.g., mean, sum)', 'It groups python source files together', 'It randomly shuffles dataset rows', 'It creates visual dashboards'],
        correctAnswer: 'It groups DataFrame rows sharing the same value in a column, allowing for aggregation (e.g., mean, sum)'
    },
    {
        type: 'MCQ',
        text: 'How do you combine/join two DataFrames based on a common key in Pandas?',
        options: ['pd.merge()', 'pd.concatenate_keys()', 'df.add()', 'df.group()'],
        correctAnswer: 'pd.merge()'
    },
    {
        type: 'MCQ',
        text: 'What does the df.apply() function do?',
        options: ['It applies a custom function along an axis (rows or columns) of the DataFrame', 'It applies a system boot update', 'It plots the data automatically', 'It requests API data'],
        correctAnswer: 'It applies a custom function along an axis (rows or columns) of the DataFrame'
    },

    // Data Visualization (26–35)
    {
        type: 'MCQ',
        text: 'What is Matplotlib primarily used for?',
        options: ['Creating static, animated, and interactive Data Visualizations in Python', 'Managing SQL Databases', 'Training ML models', 'Security testing networks'],
        correctAnswer: 'Creating static, animated, and interactive Data Visualizations in Python'
    },
    {
        type: 'MCQ',
        text: 'The statistical visualization library Seaborn is built directly on top of which library?',
        options: ['Matplotlib', 'Pandas purely', 'Numpy purely', 'Plotly'],
        correctAnswer: 'Matplotlib'
    },
    {
        type: 'MCQ',
        text: 'When is a Bar chart most appropriate to use?',
        options: ['For comparing categorical quantities against each other', 'For tracking stock market prices over time', 'For predicting future ML correlations', 'For plotting raw geographic coordinates'],
        correctAnswer: 'For comparing categorical quantities against each other'
    },
    {
        type: 'MCQ',
        text: 'What does a Histogram show?',
        options: ['The frequency distribution of a continuous numeric variable grouped into bins', 'The exact ranking of categorical strings', 'The direct relationship between 5 different variables', 'The text values in a CSV'],
        correctAnswer: 'The frequency distribution of a continuous numeric variable grouped into bins'
    },
    {
        type: 'MCQ',
        text: 'When is a Scatter plot typically used?',
        options: ['To show and observe relationships/correlations between two continuous variables', 'To display the exact distribution of one single variable', 'To render long blocks of text', 'To rank categories by total sum'],
        correctAnswer: 'To show and observe relationships/correlations between two continuous variables'
    },
    {
        type: 'MCQ',
        text: 'What is a Heatmap visualization?',
        options: ['A 2D graphical representation of data where individual numeric values within a matrix are represented as colors', 'A map tracking CPU temperature in real time', 'A pie chart with hot colors', 'A 3D topographical map'],
        correctAnswer: 'A 2D graphical representation of data where individual numeric values within a matrix are represented as colors'
    },
    {
        type: 'MCQ',
        text: 'What does a Boxplot (Box-and-Whisker plot) help identify?',
        options: ['The statistical quartiles, median, and potential outliers in a numeric dataset', 'The total count of strings in a file', 'The network latency graph', 'The exact neural network architecture'],
        correctAnswer: 'The statistical quartiles, median, and potential outliers in a numeric dataset'
    },
    {
        type: 'MCQ',
        text: 'What does a Pairplot do in Seaborn?',
        options: ['It plots pairwise relationships across an entire dataframe to immediately see grid correlations', 'It pairs Bluetooth devices', 'It pairs two distinct machine learning models', 'It only plots exactly two rows'],
        correctAnswer: 'It plots pairwise relationships across an entire dataframe to immediately see grid correlations'
    },
    {
        type: 'MCQ',
        text: 'What is a Line chart primarily used for?',
        options: ['Displaying continuous data/trends over an interval of time (Time Series)', 'Showing parts of a whole (like a pie chart)', 'Comparing exact discrete string frequencies', 'Viewing system error logs'],
        correctAnswer: 'Displaying continuous data/trends over an interval of time (Time Series)'
    },
    {
        type: 'MCQ',
        text: 'Which of the following BI tools are widely used for building interactive Data Dashboards?',
        options: ['Tableau, PowerBI', 'Adobe Premiere, After Effects', 'Notepad, Vim', 'Docker, Kubernetes'],
        correctAnswer: 'Tableau, PowerBI'
    },

    // Machine Learning (36–50)
    {
        type: 'MCQ',
        text: 'What defines Supervised Learning?',
        options: ['Training algorithms using explicitly labeled datasets where the expected outcome (target) is known', 'Giving the model completely raw, untagged data', 'Learning by randomly guessing', 'No training data is used'],
        correctAnswer: 'Training algorithms using explicitly labeled datasets where the expected outcome (target) is known'
    },
    {
        type: 'MCQ',
        text: 'What defines Unsupervised Learning?',
        options: ['Finding hidden patterns or intrinsic structures within data that is entirely unlabeled', 'Predicting house prices using labeled CSVs', 'Playing video games via reward signals', 'Manually tagging cats and dogs in images'],
        correctAnswer: 'Finding hidden patterns or intrinsic structures within data that is entirely unlabeled'
    },
    {
        type: 'MCQ',
        text: 'What is the goal of a Regression model?',
        options: ['To predict a continuous numerical output (e.g., price, temperature)', 'To predict a discrete category (e.g., spam vs non-spam)', 'To group users into unknown segments', 'To generate realistic human faces'],
        correctAnswer: 'To predict a continuous numerical output (e.g., price, temperature)'
    },
    {
        type: 'MCQ',
        text: 'What is the goal of a Classification model?',
        options: ['To categorize data points into distinct, predefined discrete classes/labels', 'To predict an exact floating-point temperature', 'To blindly cluster items without labels', 'To reduce the number of features via PCA'],
        correctAnswer: 'To categorize data points into distinct, predefined discrete classes/labels'
    },
    {
        type: 'MCQ',
        text: 'What type of learning is Clustering?',
        options: ['Unsupervised Learning', 'Supervised Learning', 'Reinforcement Learning', 'Deep Learning only'],
        correctAnswer: 'Unsupervised Learning'
    },
    {
        type: 'MCQ',
        text: 'Decision Trees can be prone to which problem if not pruned?',
        options: ['Severe Overfitting on the training data', 'Always Underfitting', 'Corrupting the CSV file', 'Crashing the RAM strictly due to small data size'],
        correctAnswer: 'Severe Overfitting on the training data'
    },
    {
        type: 'MCQ',
        text: 'How does a Random Forest model make predictions?',
        options: ['By constructing a multitude of decision trees at training time and outputting the mode of the classes (or mean prediction)', 'By using a single massively deep tree', 'By using standard algebraic formulas with no learning', 'By connecting directly to an LLM API'],
        correctAnswer: 'By constructing a multitude of decision trees at training time and outputting the mode of the classes (or mean prediction)'
    },
    {
        type: 'MCQ',
        text: 'K-Means is a popular algorithm for:',
        options: ['Clustering unlabeled data into K distinct groups', 'Classifying labeled images as dogs or cats', 'Predicting the stock market value precisely', 'Translating text from English to French'],
        correctAnswer: 'Clustering unlabeled data into K distinct groups'
    },
    {
        type: 'MCQ',
        text: 'What does SVM (Support Vector Machine) aim to find in classification?',
        options: ['The optimal hyperplane that maximizes the margin (distance) between the different classes', 'The cheapest computational route', 'The most frequent text word', 'The exact mean of all points'],
        correctAnswer: 'The optimal hyperplane that maximizes the margin (distance) between the different classes'
    },
    {
        type: 'MCQ',
        text: 'Naive Bayes classifiers heavily rely on which mathematical principle?',
        options: ['Bayes’ Theorem of conditional probability with an independence assumption', 'The Pythagorean theorem', 'Calculus integrals mostly', 'Deep neural networking exclusively'],
        correctAnswer: 'Bayes’ Theorem of conditional probability with an independence assumption'
    },
    {
        type: 'MCQ',
        text: 'How do you commonly mitigate Overfitting in machine learning?',
        options: ['Implementing regularization, gathering more data, or tuning complexity down (e.g., pruning trees)', 'Making the model 10x deeper and more complex', 'Training on less data specifically', 'Hard-coding the answers'],
        correctAnswer: 'Implementing regularization, gathering more data, or tuning complexity down (e.g., pruning trees)'
    },
    {
        type: 'MCQ',
        text: 'What is the standard purpose of K-Fold Cross-Validation?',
        options: ['To robustly evaluate a model’s unseen testing performance by training on K-1 folds and validating on the remaining 1 fold iteratively', 'To split a folder into sub-directories', 'To mix audio files together', 'To quickly encrypt data records'],
        correctAnswer: 'To robustly evaluate a model’s unseen testing performance by training on K-1 folds and validating on the remaining 1 fold iteratively'
    },
    {
        type: 'MCQ',
        text: 'What does an ROC Curve visualize?',
        options: ['The trade-off between the True Positive Rate and False Positive Rate across different classification thresholds', 'The time taken to train per epoch', 'The loss slope of linear regression', 'A 3D render of the data'],
        correctAnswer: 'The trade-off between the True Positive Rate and False Positive Rate across different classification thresholds'
    },
    {
        type: 'MCQ',
        text: 'What is Feature Scaling?',
        options: ['Transforming features to be on a similar scale (e.g., Normalization 0-1) to help gradient-based algorithms converge evenly', 'Scaling up hardware servers in the cloud', 'Buying more features for an App API', 'Creating new random columns'],
        correctAnswer: 'Transforming features to be on a similar scale (e.g., Normalization 0-1) to help gradient-based algorithms converge evenly'
    },
    {
        type: 'MCQ',
        text: 'PCA (Principal Component Analysis) is primarily used for:',
        options: ['Dimensionality reduction (compressing many features into fewer principal components while retaining variance)', 'Image upscaling', 'Spam email classification directly', 'Connecting to relational databases'],
        correctAnswer: 'Dimensionality reduction (compressing many features into fewer principal components while retaining variance)'
    },

    // Deep Learning (51–60)
    {
        type: 'MCQ',
        text: 'What is the base unit of an Artificial Neural Network?',
        options: ['Neuron / Perceptron', 'Hyperplane', 'Decision Node', 'Centroid'],
        correctAnswer: 'Neuron / Perceptron'
    },
    {
        type: 'MCQ',
        text: 'What does an Activation Function do in a neural network?',
        options: ['It introduces non-linearity, allowing the network to learn complex patterns', 'It provides battery power to the GPU', 'It connects the DB to the code', 'It disables the network to prevent overheating'],
        correctAnswer: 'It introduces non-linearity, allowing the network to learn complex patterns'
    },
    {
        type: 'MCQ',
        text: 'What are Convolutional Neural Networks (CNNs) most successful at?',
        options: ['Computer Vision tasks like image classification and object detection', 'Time Series Forecasting solely', 'Text translation', 'Calculating compound interest'],
        correctAnswer: 'Computer Vision tasks like image classification and object detection'
    },
    {
        type: 'MCQ',
        text: 'What is a core use-case for Recurrent Neural Networks (RNNs)?',
        options: ['Processing sequential and temporal data (like natural language or speech audio)', 'Static image classification', 'Data scraping from websites', 'Writing SQL queries automatically'],
        correctAnswer: 'Processing sequential and temporal data (like natural language or speech audio)'
    },
    {
        type: 'MCQ',
        text: 'What critical issue does an LSTM (Long Short-Term Memory) network solve in standard RNNs?',
        options: ['The vanishing and exploding gradient problem that prevents learning long-term dependencies', 'It compresses images automatically', 'It eliminates the need for any training data', 'It stops the system from using RAM'],
        correctAnswer: 'The vanishing and exploding gradient problem that prevents learning long-term dependencies'
    },
    {
        type: 'MCQ',
        text: 'The "Transformer" architecture (like GPT and BERT) abandoned recurrence in favor of which mechanism?',
        options: ['Self-Attention mechanism entirely', 'Random convolutions', 'Manual human scripting', 'K-Means clustering loops'],
        correctAnswer: 'Self-Attention mechanism entirely'
    },
    {
        type: 'MCQ',
        text: 'What does the Attention mechanism allow a Deep Learning model to do in NLP?',
        options: ['Dynamically weigh the importance of different words in a sentence when computing a representation', 'Ignore the entire input arbitrarily', 'Focus purely on the last word ignoring context', 'Sleep when inactive'],
        correctAnswer: 'Dynamically weigh the importance of different words in a sentence when computing a representation'
    },
    {
        type: 'MCQ',
        text: 'What is Transfer Learning?',
        options: ['Taking a complex model pre-trained on massive datasets (like ImageNet or Wikipedia) and fine-tuning it on a smaller, specialized dataset', 'Transferring hardware from one data center to another physically', 'Copying files via USB sticks', 'Changing the programming language of a codebase'],
        correctAnswer: 'Taking a complex model pre-trained on massive datasets (like ImageNet or Wikipedia) and fine-tuning it on a smaller, specialized dataset'
    },
    {
        type: 'MCQ',
        text: 'What does the Dropout layer accomplish?',
        options: ['It randomly zeroes out a fraction of input units during training to strictly prevent overfitting', 'It drops the database connection', 'It logs out active users', 'It crashes the application on error'],
        correctAnswer: 'It randomly zeroes out a fraction of input units during training to strictly prevent overfitting'
    },
    {
        type: 'MCQ',
        text: 'Why use Batch Normalization?',
        options: ['It standardizes intermediate layer activations, accelerating training speed and stabilizing the learning process', 'It makes the batch size infinite', 'It groups users by alphabetical names', 'It ensures data privacy cryptographically'],
        correctAnswer: 'It standardizes intermediate layer activations, accelerating training speed and stabilizing the learning process'
    },

    // Big Data & Tools (61–70)
    {
        type: 'MCQ',
        text: 'What are the classic "3 Vs" of Big Data?',
        options: ['Volume, Velocity, Variety', 'Vision, Value, Vector', 'Visuals, Voice, Video', 'Variable, Vagrant, Vital'],
        correctAnswer: 'Volume, Velocity, Variety'
    },
    {
        type: 'MCQ',
        text: 'What is Hadoop primarily known for?',
        options: ['A distributed framework allowing storage (HDFS) and processing (MapReduce) of massive datasets across clusters of computers', 'A visual CSS styling framework', 'A JavaScript web frontend tool', 'A local text editor'],
        correctAnswer: 'A distributed framework allowing storage (HDFS) and processing (MapReduce) of massive datasets across clusters of computers'
    },
    {
        type: 'MCQ',
        text: 'Why is Apache Spark often preferred over traditional Hadoop MapReduce?',
        options: ['Because it processes data in-memory (RAM), making it significantly faster for complex analytic jobs', 'Because it uses floppy disks', 'Because it only runs on Windows 95', 'Because it writes code automatically without prompting'],
        correctAnswer: 'Because it processes data in-memory (RAM), making it significantly faster for complex analytic jobs'
    },
    {
        type: 'MCQ',
        text: 'What is the main difference between a Data Lake and a Data Warehouse?',
        options: ['A Lake stores vast amounts of raw, unstructured data; a Warehouse stores structured, filtered, and organized data ready for BI analysis', 'A Lake is small, a Warehouse is infinite', 'A Lake stores only images; a Warehouse stores only text', 'There is no difference'],
        correctAnswer: 'A Lake stores vast amounts of raw, unstructured data; a Warehouse stores structured, filtered, and organized data ready for BI analysis'
    },
    {
        type: 'MCQ',
        text: 'What does ETL stand for in data engineering?',
        options: ['Extract, Transform, Load', 'Execute, Translate, List', 'Evaluate, Train, Launch', 'Encode, Transfer, Lock'],
        correctAnswer: 'Extract, Transform, Load'
    },
    {
        type: 'MCQ',
        text: 'What is Apache Kafka typically used for?',
        options: ['Building real-time data streaming pipelines and distributed event-driven architectures', 'Styling UI components in React', 'Static file hosting and CDN', 'Word processing'],
        correctAnswer: 'Building real-time data streaming pipelines and distributed event-driven architectures'
    },
    {
        type: 'MCQ',
        text: 'What is Apache Airflow used for?',
        options: ['Programmatically authoring, scheduling, orchestrating, and monitoring complex data workflows/pipelines (DAGs)', 'Ventilating data center server rooms', 'Designing 3D animations', 'Creating mobile apps using Python'],
        correctAnswer: 'Programmatically authoring, scheduling, orchestrating, and monitoring complex data workflows/pipelines (DAGs)'
    },
    {
        type: 'MCQ',
        text: 'What defines a Data Pipeline?',
        options: ['An automated set of processes extracting data from various sources, transforming it, and moving it to a final destination', 'A physical pipe containing ethernet cables', 'A static spreadsheet in Microsoft Excel', 'A local hardware array'],
        correctAnswer: 'An automated set of processes extracting data from various sources, transforming it, and moving it to a final destination'
    },
    {
        type: 'MCQ',
        text: 'What characterizes Real-Time Analytics?',
        options: ['Processing data and providing analytical insights immediately as the data enters the system', 'Analyzing data 10 years after collection', 'Wait for midnight batch processing cron jobs exclusively', 'Running manual mathematical equations on paper'],
        correctAnswer: 'Processing data and providing analytical insights immediately as the data enters the system'
    },
    {
        type: 'MCQ',
        text: 'Which of the following are modern Managed Cloud ML/Data Platforms?',
        options: ['AWS SageMaker, Google Vertex AI, Databricks', 'Notepad++, Vim, Nano', 'React, Vue, Angular', 'Photoshop, Illustrator, Figma'],
        correctAnswer: 'AWS SageMaker, Google Vertex AI, Databricks'
    }
];

// Add 30 Coding/Practical Questions Programmatically to reach 100
const practicalQuestions = [
    // Python + Analysis (71–80)
    { text: 'Statistical Code: Write a python script using base syntax (no libraries) to calculate the mean, median, and mode of a list [10, 20, 20, 30, 40].' },
    { text: 'Pandas Loading: Write the `pandas` code to load "data.csv" and instantly display the `.describe()` summary statistics.' },
    { text: 'Data Imputation: Provide code to identify missing values using `.isnull().sum()` and fill them with the column mean using `.fillna()`.' },
    { text: 'Data Aggregation: Use Pandas `.groupby()` to group sales data by "Region" and return the `.sum()` of "Revenue".' },
    { text: 'DataFrame Merging: Write code to perform an inner join/merge on `df_users` and `df_orders` using the common key `user_id`.' },
    { text: 'Correlation Matrix: Write code using `df.corr()` chained with Seaborn\'s heatmap function to visualize feature correlations.' },
    { text: 'Outlier Removal: Write a custom Python function to detect and remove outliers in a pandas column based on the 1.5 * IQR method.' },
    { text: 'Feature Scaling: Implement Scikit-Learn\'s `StandardScaler` to normalize an array of continuous `X_train` data.' },
    { text: 'Categorical Encoding: Demonstrate how to use `pd.get_dummies()` or `OneHotEncoder` to encode a categorical "City" string column.' },
    { text: 'Exploratory Data Analysis: Given a raw dataset, write a 5-step Python script outlining an automated EDA report generation.' },

    // Visualization Coding (81–85)
    { text: 'Matplotlib Barplot: Write script to generate a Bar Chart comparing 5 different smartphone brands and their quarterly sales.' },
    { text: 'Seaborn Distplot: Write code to plot a Histogram overlaid with a KDE curve to check if a feature follows a normal distribution.' },
    { text: 'Scatter Regression Plot: Use Seaborn\'s `sns.regplot` or `sns.scatterplot` to map \'YearsExperience\' vs \'Salary\'.' },
    { text: 'Advanced Heatmap: Generate a customized Seaborn heatmap passing arguments for `annot=True`, a distinct `cmap`, and `fmt`.' },
    { text: 'Plotly Dashboards: Write the boilerplate initialization snippet required to launch an interactive Plotly Dash visualization app locally.' },

    // ML Coding (86–95)
    { text: 'Linear Regression: Write a complete Scikit-Learn script to fit a `LinearRegression` model and predict `y` given `X`.' },
    { text: 'Logistic Modeling: Write the code to train a `LogisticRegression` classifier and print the `.score()` on the test dataset.' },
    { text: 'Decision Tree Logic: Implement `DecisionTreeClassifier`, define its `max_depth`, and write the code to explicitly view feature importances.' },
    { text: 'Random Forest Ensembling: Instantiate a `RandomForestRegressor` with 100 estimators, fit it, and calculate the MSE of predictions.' },
    { text: 'K-Means Implement: Write a script to fit a `KMeans` cluster model specifying `n_clusters=3` and append the cluster labels to your dataframe.' },
    { text: 'Metrics Implementation: Use `sklearn.metrics` to calculate and print the Accuracy, Precision, and Recall scores for classification predictions.' },
    { text: 'Confusion Matrix Plotting: Provide the snippet using `ConfusionMatrixDisplay` to visually render True vs Predicted classes.' },
    { text: 'GridSearchCV Tuning: Write a dictionary of hyperparameter grids and pass it into a GridSearchCV object for an SVM model.' },
    { text: 'PCA Dimensionality: Write code initializing `PCA(n_components=2)`, applying it via `.fit_transform()` on high-dimensional text embeddings.' },
    { text: 'Scikit-Learn Pipeline: Construct an end-to-end `Pipeline` array containing an imputer, scaler, and XGBoost classifier model.' },

    // Advanced AI / DS (96–100)
    { text: 'Time Series Forecasting: Write the initialization pseudo-code for an ARIMA or Prophet model to predict 30-day future sales.' },
    { text: 'Recommendation Engine: Describe or outline in python a Collaborative Filtering matrix factorization script (using Surprise or implicit array dot products).' },
    { text: 'NLP Sentiment: Code a quick NLP script using NLTK or HuggingFace pipeline to classify text sequences as Positive or Negative.' },
    { text: 'CNN Architecture Code: Write out the exact sequential block using Keras to define a Conv2D -> MaxPooling2D -> Flatten CNN architecture for image inputs.' },
    { text: 'End-to-End DS Pipeline Design: Sketch out the pseudo-code logic of a system that automatically fetches raw DB data, triggers an Airflow ETL DAG, trains the model, and uploads the `.pkl` artifact.' }
];

practicalQuestions.forEach((pq) => {
    fullExamQuestions.push({
        type: 'Coding',
        text: pq.text,
        options: [],
        correctAnswer: '' // Handled by manual grading UI
    });
});

const seedAIDataScience100QuestionExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');

        await Exam.deleteOne({ title: 'AI & Data Science – 100 Questions Exam' });

        // Ensure Domain exists
        let domain = await Domain.findOne({ name: 'Data Science & Analytics' });
        if (!domain) {
            domain = new Domain({
                name: 'Data Science & Analytics',
                description: 'Statistics, Machine Learning, Data Visualization, ETL, and AI integration.'
            });
            await domain.save();
        }

        const examObj = new Exam({
            title: 'AI & Data Science – 100 Questions Exam',
            type: 'Full-length Mock',
            durationMinutes: 180,
            domainId: domain._id,
            questions: fullExamQuestions
        });

        await examObj.save();
        console.log('Successfully seeded AI & Data Science 100 question exam. Total length: ', examObj.questions.length);

        process.exit(0);
    } catch (err) {
        console.error('Failed to seed exam:');
        console.error(err);
        process.exit(1);
    }
};

seedAIDataScience100QuestionExam();
