export const skills = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 .93 6 2s-2.13 2-6 2-6-.93-6-2 2.13-2 6-2zm0 6c3.87 0 6 .93 6 2s-2.13 2-6 2-6-.93-6-2 2.13-2 6-2z"/></svg>`,
    title: "Data Analysis",
    description: "Python, SQL, Pandas, NumPy, Git, Data Cleaning & Manipulation, Exploratory Data Analysis (EDA), Statistical Analysis (hypothesis testing, sampling, bootstrapping), Data Visualization (Matplotlib, Seaborn), Communicating Results, etc.",
  },

  {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    title: "Data Science",
    description: "Data Analysis skills plus Machine Learning fundamentals (scikit-learn), Supervised & Unsupervised Learning, Tree-Based Models, Ensemble Learning (Random Forest, Gradient Boosting), Model Fine-Tuning & Hyperparameter Optimization, Dimensionality Reduction (PCA, t-SNE), Feature Engineering, Model Evaluation & Validation, Statistical Modeling (statsmodels), Applied Statistics for Data-Driven Decision Making, Basic Predictive Analytics, etc.",
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 18H6a4 4 0 010-8 5 5 0 019.9-1.5A4.5 4.5 0 1119 18z"/></svg>`,
    title: "Data Engineering",
    description: "Databases & SQL, data pipelines fundamentals, data processing concepts, etc.",
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a3 3 0 110 6 3 3 0 010-6zm0 6v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 0a3 3 0 10-6 0 3 3 0 006 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    title: "Development & CS",
    description: "Python, Java, Spring Boot, Android Development, OOP, Algorithms & Data Structures, etc.",
  },
];

export type Skill = (typeof skills)[number];

