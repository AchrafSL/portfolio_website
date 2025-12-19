import PythonIcon from '../assets/logos/Python-logo.svg?raw';
import JavaIcon from '../assets/logos/Java-logo.svg?raw';
import AstroIcon from '../assets/logos/Astro-logo.svg?raw';
import PosthogIcon from '../assets/logos/posthog-logo.svg?raw';
import GitIcon from '../assets/logos/Git-logo.svg?raw';
import PostgresIcon from '../assets/logos/Postgres-logo.svg?raw';

export const projects = [
	{
		title: "When Was the Golden Era of Video Games?",
		techStack: "Python • SQL • Jupyter Notebook",
		description: "Analyzing critic/user scores & sales of 400 top games (1977–2017) with PostgreSQL.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/When-Was-the-Golden-Era-of-Video-Games-DataCamp",
		icon: PostgresIcon
	},
	{
		title: "Analyzing Students Mental Health",
		techStack: "Python • SQL • Analytics",
		description: "Analyzing mental health survey data from 286 students to assess depression risk.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Analyzing-Students-Mental-Health-DataCamp",
		icon: PostgresIcon
	},
	{
		title: "Predicting Movie Rental Durations",
		techStack: "Python • Scikit-Learn • Random Forest",
		description: "Regression project to forecast DVD rental length using Linear, Ridge, Decision Tree & Random Forest models.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Predicting-Movie-Rental-Durations-DataCamp",
		icon: PythonIcon
	},
	{
		title: "Clustering Antarctic Penguin Species",
		techStack: "Python • K-Means • Clustering",
		description: "Unsupervised machine learning project using K-Means clustering to identify distinct penguin species.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Clustering-Antarctic-Penguin-Species-DataCamp",
		icon: PythonIcon
	},
	{
		title: "Predictive Modeling for Agriculture",
		techStack: "Python • Scikit-Learn • Classification",
		description: "Machine learning project that helps farmers choose the best crop based on soil metrics.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Predictive-Modeling-for-Agriculture-DataCamp",
		icon: PythonIcon
	},
	{
		title: "Hypothesis Testing: Soccer Matches",
		techStack: "Python • Hypothesis Testing • Pandas",
		description: "Hypothesis test on FIFA World Cup matches to compare goal totals in men's vs women's soccer.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Hypothesis-Testing-with-Men-s-and-Women-s-Soccer-Matches-DataCamp",
		icon: PythonIcon
	},
	{
		title: "Car Insurance Claim Modeling",
		techStack: "Python • Logistic Regression • Machine Learning",
		description: "Predictive model to identify features impacting car insurance claims using logistic regression.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Modeling-Car-Insurance-Claim-Outcomes-DataCamp",
		icon: PythonIcon
	},

	{
		title: "Exploring Airbnb Market Trends",
		techStack: "Python • Pandas • Data Cleaning",
		description: "Analyzing prices, reviews, and room types in NYC’s rental market using pandas.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Exploring-Airbnb-Market-Trends-Datacamp",
		icon: PythonIcon
	},
	{
		title: "Customer Analytics: Preparing Data",
		techStack: "Python • Data Manipulation • Optimization",
		description: "Prepare customer data for modeling by converting data types and optimizing memory usage.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Customer-Analytics-Preparing-Data-for-Modeling-Datacamp",
		icon: PythonIcon
	},
	{
		title: "Analyzing Crime in Los Angeles",
		techStack: "Python • Data Analysis • Pandas",
		description: "Identify peak crime hours, high-risk locations, and age group trends in Los Angeles.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Analyzing-Crime-in-Los-Angeles-Datacamp",
		icon: PythonIcon
	},
	{
		title: "History of Nobel Prize Winners",
		techStack: "Python • Data Visualization • Pandas",
		description: "Explore Nobel Prize data (1901–2023) to analyzing gender, nationality, and category trends.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Visualizing-the-History-of-Nobel-Prize-Winners-DataCamp",
		icon: PythonIcon
	},
	{
		title: "NYC Public School Test Scores",
		techStack: "Python • EDA • Statistics",
		description: "Analyze SAT scores across NYC public high schools to find borough-wise variability.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Exploring-NYC-Public-School-Test-Result-Scores-Datacamp",
		icon: PythonIcon
	},
	{
		title: "Investigating Netflix Movies",
		techStack: "Python • EDA • Pandas",
		description: "Exploratory data analysis of 1990s Netflix movies focusing on durations and genres.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Investigating-Netflix-Movies-DataCamp-",
		icon: PythonIcon
	},

	{
		title: "Java Task Tracker",
		techStack: "Java • CLI • JSON",
		description: "Lightweight command-line task manager using JSON for storage.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Java_Task-Tracker",
		icon: JavaIcon
	},
	{
		title: "UIT bachlor Final Project (DAMSO_STREAM)",
		techStack: "Python • Flask • Web App",
		description: "Web application for selling digital products with role-based access control.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/UIT_Final_Project",
		icon: PythonIcon
	},
	{
		title: "Java Simple Chat App",
		techStack: "Java • Socket Programming • Swing",
		description: "Simple Chat App in Java using Socket Programming and Swing GUI.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/JavaSimpleChatApp_v0_One_Sided",
		icon: JavaIcon
	},
	{
		title: "EdiMyDar - Android To-Do App",
		techStack: "Java • Android • Firebase • AI",
		description: "Android To-Do app with Firebase Auth, Firestore, and Gemini AI integration.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/EdiMyDar",
		icon: JavaIcon
	},
	{
		title: "CS50 Problem Sets",
		techStack: "C • Python • SQL",
		description: "My personal solutions to CS50 problem sets written in various programming languages.",
		ctaText: "View Repo →",
		ctaLink: "https://github.com/AchrafSL/Cs50_ProblemSets_Repo",
		icon: PosthogIcon
	}
];