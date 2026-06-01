export const categories = [
  {
    id: "1",
    name: "Mathematics",
    slug: "mathematics",
    subcategories: [
      { id: "1-1", name: "Linear Algebra", slug: "linear-algebra", entryCount: 7 },
      { id: "1-2", name: "Calculus & Optimization", slug: "calculus-optimization", entryCount: 7 },
      { id: "1-3", name: "Probability Theory", slug: "probability-theory", entryCount: 8 },
      { id: "1-4", name: "Information Theory", slug: "information-theory", entryCount: 4 },
      { id: "1-5", name: "Numerical Methods", slug: "numerical-methods", entryCount: 3 },
    ],
  },
  {
    id: "2",
    name: "Statistics",
    slug: "statistics",
    subcategories: [
      { id: "2-1", name: "Descriptive Statistics", slug: "descriptive-statistics", entryCount: 8 }, // entries: mean, median, mode, variance, std-dev, skewness, kurtosis, percentiles
      { id: "2-2", name: "Inferential Statistics", slug: "inferential-statistics", entryCount: 5 },
      { id: "2-3", name: "Hypothesis Testing", slug: "hypothesis-testing", entryCount: 6 },
      { id: "2-4", name: "Bayesian Statistics", slug: "bayesian-statistics", entryCount: 5 },
      { id: "2-5", name: "Regression Analysis", slug: "regression-analysis", entryCount: 4 },
      { id: "2-6", name: "Sampling Methods", slug: "sampling-methods", entryCount: 4 },
      { id: "2-7", name: "Experimental Design", slug: "experimental-design", entryCount: 4 },
      { id: "2-8", name: "Time Series (Stats)", slug: "time-series-stats", entryCount: 5 },
    ],
  },
  {
    id: "3",
    name: "Data",
    slug: "data",
    subcategories: [
      { id: "3-1", name: "Data Collection & Ingestion", slug: "data-collection", entryCount: 4 },
      { id: "3-2", name: "Data Cleaning", slug: "data-cleaning", entryCount: 4 },
      { id: "3-3", name: "Exploratory Data Analysis", slug: "eda", entryCount: 4 },
      { id: "3-4", name: "Feature Engineering", slug: "feature-engineering", entryCount: 6 },
      { id: "3-5", name: "Data Imbalance", slug: "data-imbalance", entryCount: 4 },
      { id: "3-6", name: "Data Pipelines", slug: "data-pipelines", entryCount: 4 },
      { id: "3-7", name: "Databases & Storage", slug: "databases-storage", entryCount: 5 },
    ],
  },
  {
    id: "4",
    name: "Machine Learning",
    slug: "machine-learning",
    subcategories: [
      { id: "4-1", name: "Regression", slug: "regression", entryCount: 7 },
      { id: "4-2", name: "Classification", slug: "classification", entryCount: 7 },
      { id: "4-3", name: "Clustering", slug: "clustering", entryCount: 7 },
      { id: "4-4", name: "Ensemble Methods", slug: "ensemble-methods", entryCount: 8 },
      { id: "4-5", name: "Dimensionality Reduction", slug: "dimensionality-reduction", entryCount: 5 },
      { id: "4-6", name: "Anomaly Detection", slug: "anomaly-detection", entryCount: 4 },
      { id: "4-7", name: "Recommendation Systems", slug: "recommendation-systems", entryCount: 4 },
      { id: "4-8", name: "Reinforcement Learning", slug: "reinforcement-learning", entryCount: 5 },
    ],
  },
  {
    id: "5",
    name: "Deep Learning",
    slug: "deep-learning",
    subcategories: [
      { id: "5-1", name: "Fundamentals", slug: "dl-fundamentals", entryCount: 4 },
      { id: "5-2", name: "CNNs", slug: "cnns", entryCount: 7 },
      { id: "5-3", name: "RNNs & Sequence Models", slug: "rnns-sequence-models", entryCount: 5 },
      { id: "5-4", name: "Transformers", slug: "transformers", entryCount: 5 },
      { id: "5-5", name: "Generative Models", slug: "generative-models", entryCount: 4 },
      { id: "5-6", name: "Graph Neural Networks", slug: "graph-neural-networks", entryCount: 4 },
      { id: "5-7", name: "Reinforcement Learning (Deep)", slug: "deep-rl", entryCount: 4 },
    ],
  },
  {
    id: "6",
    name: "NLP / LLM",
    slug: "nlp-llm",
    subcategories: [
      { id: "6-1", name: "NLP Fundamentals", slug: "nlp-fundamentals", entryCount: 5 },
      { id: "6-2", name: "Classical NLP", slug: "classical-nlp", entryCount: 6 },
      { id: "6-3", name: "Language Model Fundamentals", slug: "lm-fundamentals", entryCount: 4 },
      { id: "6-4", name: "Large Language Models", slug: "llms", entryCount: 6 },
      { id: "6-5", name: "Prompt Engineering", slug: "prompt-engineering", entryCount: 5 },
      { id: "6-6", name: "Retrieval & Grounding", slug: "retrieval-grounding", entryCount: 5 },
      { id: "6-7", name: "Multimodal", slug: "multimodal", entryCount: 5 },
    ],
  },
  {
    id: "7",
    name: "Training, Optimization & Evaluation",
    slug: "training-optimization-evaluation",
    subcategories: [
      { id: "7-1", name: "Loss Functions", slug: "loss-functions", entryCount: 8 },
      { id: "7-2", name: "Optimization Algorithms", slug: "optimization-algorithms", entryCount: 9 },
      { id: "7-3", name: "Regularization", slug: "regularization", entryCount: 6 },
      { id: "7-4", name: "DL Training Techniques", slug: "dl-training-techniques", entryCount: 9 },
      { id: "7-5", name: "LLM Training & Alignment", slug: "llm-training-alignment", entryCount: 7 },
      { id: "7-6", name: "Classical ML Evaluation", slug: "ml-evaluation", entryCount: 9 },
      { id: "7-7", name: "LLM & DL Evaluation", slug: "llm-dl-evaluation", entryCount: 7 },
      { id: "7-8", name: "Hyperparameter Tuning", slug: "hyperparameter-tuning", entryCount: 5 },
    ],
  },
  {
    id: "8",
    name: "AI Engineering",
    slug: "ai-engineering",
    subcategories: [
      { id: "8-1", name: "AI Agents", slug: "ai-agents", entryCount: 5 },
      { id: "8-2", name: "Memory & State", slug: "memory-state", entryCount: 4 },
      { id: "8-3", name: "Orchestration & Frameworks", slug: "orchestration-frameworks", entryCount: 5 },
      { id: "8-4", name: "RAG Systems", slug: "rag-systems", entryCount: 5 },
      { id: "8-5", name: "Tool & API Integration", slug: "tool-api-integration", entryCount: 5 },
      { id: "8-6", name: "Evaluation & Observability", slug: "evaluation-observability", entryCount: 4 },
      { id: "8-7", name: "Safety & Guardrails", slug: "safety-guardrails", entryCount: 4 },
    ],
  },
  {
    id: "9",
    name: "AI/ML System Design",
    slug: "aiml-system-design",
    subcategories: [
      { id: "9-1", name: "ML System Architecture", slug: "ml-system-architecture", entryCount: 4 },
      { id: "9-2", name: "Feature Stores", slug: "feature-stores", entryCount: 4 },
      { id: "9-3", name: "Model Serving & Inference", slug: "model-serving", entryCount: 5 },
      { id: "9-4", name: "MLOps & CI/CD", slug: "mlops-cicd", entryCount: 4 },
      { id: "9-5", name: "Scalability", slug: "scalability", entryCount: 5 },
      { id: "9-6", name: "Monitoring & Drift", slug: "monitoring-drift", entryCount: 4 },
      { id: "9-7", name: "Case Studies", slug: "case-studies", entryCount: 5 },
    ],
  },
  {
    id: "10",
    name: "Finance (Asset Management)",
    slug: "finance-asset-management",
    subcategories: [
      { id: "10-1", name: "Portfolio Theory", slug: "portfolio-theory", entryCount: 5 },
      { id: "10-2", name: "Fixed Income", slug: "fixed-income", entryCount: 6 },
      { id: "10-3", name: "Derivatives & Hedging", slug: "derivatives-hedging", entryCount: 4 },
      { id: "10-4", name: "Risk Management", slug: "risk-management", entryCount: 5 },
      { id: "10-5", name: "Performance & Attribution", slug: "performance-attribution", entryCount: 5 },
      { id: "10-6", name: "Market Microstructure & Trading", slug: "market-microstructure-trading", entryCount: 5 },
      { id: "10-7", name: "Alternative Investments", slug: "alternative-investments", entryCount: 4 },
      { id: "10-8", name: "Investment Strategy", slug: "investment-strategy", entryCount: 5 },
      { id: "10-9", name: "Equities", slug: "equities", entryCount: 5 },
    ],
  },
  {
    id: "11",
    name: "Quantitative Finance",
    slug: "quantitative-finance",
    subcategories: [
      { id: "11-1", name: "Factor Investing", slug: "factor-investing", entryCount: 5 },
      { id: "11-2", name: "Quantitative Strategies", slug: "quant-strategies", entryCount: 5 },
      { id: "11-3", name: "Stochastic Calculus & Math Finance", slug: "stochastic-calculus", entryCount: 5 },
      { id: "11-4", name: "Backtesting Methodology", slug: "backtesting", entryCount: 5 },
      { id: "11-5", name: "ML in Finance", slug: "ml-finance", entryCount: 5 },
      { id: "11-6", name: "Portfolio Optimization (Advanced)", slug: "portfolio-optimization-advanced", entryCount: 5 },
    ],
  },
]

export type Difficulty = "beginner" | "intermediate" | "advanced"
export type Status = "draft" | "review" | "published"

export type WhenWhyItem = { title: string; body: string }
export type DeepDiveSection = { heading: string; body: string; extraBody?: string[]; formula?: string }
export type EdgeCaseItem = { q: string; a: string }
export type Source = { label: string; url: string }
export type TermItem = { term: string; def: string }

export interface PromptExample {
  label: string
  prompt: string
  response?: string
}

export interface CodeSnapshot {
  label?: string
  code: string
}

export interface WikiEntryContent {
  terms?: TermItem[]
  promptExample?: PromptExample
  codeSnapshot?: CodeSnapshot
  eli3: string[]
  whenWhy: WhenWhyItem[]
  deepDiveIntro?: string[]
  visualizationType?: string
  deepDive: DeepDiveSection[]
  youtubeLabel?: string
  youtubeUrl?: string
  takeaways: string[]
  edgeCases: EdgeCaseItem[]
  sources: Source[]
}

export interface WikiEntry {
  id: string
  title: string
  slug: string
  difficulty: Difficulty
  status: Status
  subcategoryId: string
  tags: string[]
  content?: WikiEntryContent
}

export const mockEntries: WikiEntry[] = [
  {
    id: "e1",
    title: "Linear Regression",
    slug: "linear-regression",
    difficulty: "beginner",
    status: "published",
    subcategoryId: "4-1",
    tags: ["regression", "supervised"],
  },
  {
    id: "e2",
    title: "Ridge Regression",
    slug: "ridge-regression",
    difficulty: "intermediate" as const,
    status: "published" as const,
    subcategoryId: "4-1",
    tags: ["regression", "regularization"],
  },
  {
    id: "e3",
    title: "Lasso Regression",
    slug: "lasso-regression",
    difficulty: "intermediate" as const,
    status: "review" as const,
    subcategoryId: "4-1",
    tags: ["regression", "regularization"],
  },
  { id: "e4", title: "Elastic Net", slug: "elastic-net", difficulty: "intermediate" as const, status: "draft" as const, subcategoryId: "4-1", tags: ["regression", "regularization"] },
  { id: "e5", title: "Polynomial Regression", slug: "polynomial-regression", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-1", tags: ["regression"] },
  { id: "e6", title: "SVR", slug: "svr", difficulty: "advanced" as const, status: "draft" as const, subcategoryId: "4-1", tags: ["regression", "svm"] },
  { id: "e7", title: "Decision Tree Regressor", slug: "decision-tree-regressor", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-1", tags: ["regression", "tree"] },
  { id: "e11", title: "Logistic Regression", slug: "logistic-regression", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "linear"] },
  { id: "e12", title: "SVM", slug: "svm", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "kernel"] },
  { id: "e13", title: "K-Nearest Neighbors", slug: "k-nearest-neighbors", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "instance-based"] },
  { id: "e14", title: "Naive Bayes", slug: "naive-bayes", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "probabilistic"] },
  { id: "e15", title: "Decision Tree Classifier", slug: "decision-tree-classifier", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "tree"] },
  { id: "e16", title: "LDA", slug: "lda", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "generative"] },
  { id: "e17", title: "QDA", slug: "qda", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-2", tags: ["classification", "supervised", "generative"] },
  { id: "e8",  title: "K-Means",                slug: "k-means",                difficulty: "beginner"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised"] },
  { id: "e9",  title: "DBSCAN",                 slug: "dbscan",                 difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "density"] },
  { id: "e18", title: "Hierarchical Clustering", slug: "hierarchical-clustering", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "dendrogram"] },
  { id: "e19", title: "Gaussian Mixture Models", slug: "gaussian-mixture-models", difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "probabilistic", "em"] },
  { id: "e20", title: "Mean Shift",              slug: "mean-shift",              difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "density"] },
  { id: "e21", title: "HDBSCAN",                slug: "hdbscan",                difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "unsupervised", "density", "hierarchy"] },
  { id: "e22", title: "UMAP",                   slug: "umap",                   difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-3", tags: ["clustering", "dimensionality-reduction", "visualization"] },
  // Ensemble Methods (4-4)
  { id: "e23", title: "Random Forest",       slug: "random-forest",       difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "bagging", "tree"] },
  { id: "e24", title: "Gradient Boosting",   slug: "gradient-boosting",   difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "tree"] },
  { id: "e25", title: "XGBoost",             slug: "xgboost",             difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "tree"] },
  { id: "e26", title: "LightGBM",            slug: "lightgbm",            difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "tree"] },
  { id: "e27", title: "CatBoost",            slug: "catboost",            difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting", "categorical"] },
  { id: "e28", title: "Bagging",             slug: "bagging",             difficulty: "beginner"     as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "bagging"] },
  { id: "e29", title: "Stacking",            slug: "stacking",            difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "meta-learning"] },
  { id: "e30", title: "AdaBoost",            slug: "adaboost",            difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-4", tags: ["ensemble", "boosting"] },
  // Dimensionality Reduction (4-5)
  { id: "e31", title: "PCA",                 slug: "pca",                 difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "linear", "unsupervised"] },
  { id: "e32", title: "t-SNE",               slug: "tsne",                difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "visualization"] },
  { id: "e33", title: "UMAP",               slug: "umap",                difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "visualization"] },
  { id: "e34", title: "LDA (dimensionality)", slug: "lda-dimensionality", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "supervised", "linear"] },
  { id: "e35", title: "Autoencoders",        slug: "autoencoders",        difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-5", tags: ["dimensionality-reduction", "deep-learning", "generative"] },
  // Machine Learning — 4-6 Anomaly Detection (e400–e403)
  { id: "e400", title: "Isolation Forest",        slug: "isolation-forest",        difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-6", tags: ["anomaly-detection", "unsupervised", "ensemble", "tree", "outlier"] },
  { id: "e401", title: "One-Class SVM",            slug: "one-class-svm",           difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-6", tags: ["anomaly-detection", "svm", "kernel", "novelty-detection", "boundary"] },
  { id: "e402", title: "Local Outlier Factor",     slug: "lof",                     difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-6", tags: ["anomaly-detection", "density", "local", "knn", "contextual"] },
  { id: "e403", title: "Autoencoders for Anomaly", slug: "autoencoders-anomaly",    difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-6", tags: ["anomaly-detection", "autoencoder", "vae", "reconstruction", "deep-learning"] },
  // Machine Learning — 4-7 Recommendation Systems (e404–e407)
  { id: "e404", title: "Collaborative Filtering",  slug: "collaborative-filtering", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-7", tags: ["recommendation", "collaborative-filtering", "matrix-factorization", "als", "user-based"] },
  { id: "e405", title: "Content-Based Filtering",  slug: "content-based-filtering", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-7", tags: ["recommendation", "content-based", "tfidf", "cosine-similarity", "user-profile"] },
  { id: "e406", title: "Matrix Factorization",     slug: "matrix-factorization",    difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-7", tags: ["recommendation", "matrix-factorization", "svd", "als", "bpr", "latent-factors"] },
  { id: "e407", title: "Hybrid Recommendation",   slug: "hybrid-recommendation",   difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-7", tags: ["recommendation", "hybrid", "two-tower", "retrieval-ranking", "cold-start"] },
  // Machine Learning — 4-8 Reinforcement Learning (e408–e412)
  { id: "e408", title: "Markov Decision Process",  slug: "mdp",                     difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-8", tags: ["reinforcement-learning", "mdp", "value-iteration", "bellman", "policy"] },
  { id: "e409", title: "Q-Learning",               slug: "q-learning",              difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-8", tags: ["reinforcement-learning", "q-learning", "td", "off-policy", "dqn"] },
  { id: "e410", title: "Policy Gradient",          slug: "policy-gradient",         difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-8", tags: ["reinforcement-learning", "policy-gradient", "reinforce", "ppo", "continuous-action"] },
  { id: "e411", title: "Actor-Critic",             slug: "actor-critic",            difficulty: "advanced"     as const, status: "published" as const, subcategoryId: "4-8", tags: ["reinforcement-learning", "actor-critic", "a2c", "a3c", "advantage", "ppo"] },
  { id: "e412", title: "Multi-Armed Bandit",       slug: "multi-armed-bandit",      difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "4-8", tags: ["reinforcement-learning", "bandit", "ucb", "thompson-sampling", "exploration"] },
  { id: "e10", title: "Self-Attention", slug: "self-attention", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "attention", "nlp"] },
  // Descriptive Statistics (2-1)
  { id: "e36", title: "Mean", slug: "mean", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "central-tendency"] },
  { id: "e37", title: "Median", slug: "median", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "central-tendency", "robust"] },
  { id: "e38", title: "Mode", slug: "mode", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "central-tendency", "categorical"] },
  { id: "e39", title: "Variance", slug: "variance", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "spread", "moments"] },
  { id: "e40", title: "Standard Deviation", slug: "standard-deviation", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "spread"] },
  { id: "e41", title: "Skewness", slug: "skewness", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "shape", "moments"] },
  { id: "e42", title: "Kurtosis", slug: "kurtosis", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "shape", "tail-risk"] },
  { id: "e43", title: "Percentiles & Quartiles", slug: "percentiles-quartiles", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-1", tags: ["descriptive", "quantiles", "robust"] },
  // Hypothesis Testing (2-3)
  { id: "e44", title: "Z-test", slug: "z-test", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "parametric", "normal"] },
  { id: "e45", title: "t-test", slug: "t-test", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "parametric"] },
  { id: "e46", title: "Chi-Square Test", slug: "chi-square-test", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "categorical"] },
  { id: "e47", title: "ANOVA", slug: "anova", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "parametric", "multiple-groups"] },
  { id: "e48", title: "Mann-Whitney U", slug: "mann-whitney-u", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "non-parametric"] },
  { id: "e49", title: "Multiple Testing Correction", slug: "multiple-testing-correction", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-3", tags: ["hypothesis-testing", "fdr", "bonferroni"] },
  // Inferential Statistics (2-2)
  { id: "e50", title: "Point Estimation", slug: "point-estimation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["estimation", "mle", "bias-variance"] },
  { id: "e51", title: "Confidence Intervals", slug: "confidence-intervals", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["estimation", "interval", "coverage"] },
  { id: "e52", title: "p-value", slug: "p-value", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-2", tags: ["hypothesis-testing", "significance", "inference"] },
  { id: "e53", title: "Statistical Power", slug: "statistical-power", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["power", "sample-size", "type-ii-error"] },
  { id: "e54", title: "Effect Size", slug: "effect-size", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-2", tags: ["cohen-d", "practical-significance", "meta-analysis"] },
  // Bayesian Statistics (2-4)
  { id: "e55", title: "Prior & Posterior", slug: "prior-posterior", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "conjugate-prior", "credible-interval"] },
  { id: "e56", title: "Bayesian Inference", slug: "bayesian-inference", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "posterior", "bayes-factor"] },
  { id: "e57", title: "MAP Estimation", slug: "map-estimation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "map", "regularization"] },
  { id: "e58", title: "MCMC", slug: "mcmc", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "sampling", "metropolis-hastings"] },
  { id: "e59", title: "Bayesian vs Frequentist", slug: "bayesian-vs-frequentist", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-4", tags: ["bayesian", "frequentist", "philosophy"] },
  // Regression Analysis (2-5)
  { id: "e60", title: "Simple Linear Regression", slug: "simple-linear-regression-stats", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "ols", "gauss-markov"] },
  { id: "e61", title: "Multiple Linear Regression", slug: "multiple-linear-regression", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "ols", "multicollinearity"] },
  { id: "e62", title: "Logistic Regression (Stats)", slug: "logistic-regression-stats", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "mle", "odds-ratio"] },
  { id: "e63", title: "GLMs", slug: "glm", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "2-5", tags: ["regression", "generalized-linear-models", "exponential-family"] },
  // Sampling Methods (2-6)
  { id: "e64", title: "Random Sampling", slug: "random-sampling", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "srs", "finite-population"] },
  { id: "e65", title: "Stratified Sampling", slug: "stratified-sampling", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "stratification", "neyman-allocation"] },
  { id: "e66", title: "Bootstrap", slug: "bootstrap", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "resampling", "confidence-intervals"] },
  { id: "e67", title: "Jackknife", slug: "jackknife", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-6", tags: ["sampling", "resampling", "bias-correction"] },
  // Experimental Design (2-7)
  { id: "e68", title: "A/B Testing", slug: "ab-testing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-7", tags: ["experiment", "hypothesis-testing", "sample-size"] },
  { id: "e69", title: "Randomized Control Trials", slug: "randomized-control-trials", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-7", tags: ["experiment", "rct", "causal-inference"] },
  { id: "e70", title: "Confounding Variables", slug: "confounding-variables", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-7", tags: ["causal-inference", "dag", "confounding"] },
  { id: "e71", title: "Causal Inference", slug: "causal-inference", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "2-7", tags: ["causal-inference", "did", "iv", "rdd"] },
  // Time Series (Stats) (2-8)
  { id: "e72", title: "Stationarity", slug: "stationarity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "unit-root", "cointegration"] },
  { id: "e73", title: "Autocorrelation", slug: "autocorrelation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "acf", "pacf"] },
  { id: "e74", title: "ARIMA", slug: "arima", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "forecasting", "box-jenkins"] },
  { id: "e75", title: "Seasonality", slug: "seasonality", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "seasonal-decomposition", "sarima"] },
  { id: "e76", title: "ADF Test", slug: "adf-test", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "2-8", tags: ["time-series", "unit-root", "stationarity-test"] },
  // NLP Fundamentals (6-1)
  { id: "e77", title: "Tokenization", slug: "tokenization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "bpe", "wordpiece", "sentencepiece"] },
  { id: "e78", title: "Stemming & Lemmatization", slug: "stemming-lemmatization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "morphology", "text-normalization"] },
  { id: "e79", title: "POS Tagging", slug: "pos-tagging", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "sequence-labeling", "syntax"] },
  { id: "e80", title: "Named Entity Recognition", slug: "named-entity-recognition", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "ner", "information-extraction"] },
  { id: "e81", title: "Dependency Parsing", slug: "dependency-parsing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-1", tags: ["nlp", "syntax", "dependency-tree"] },
  // Classical NLP (6-2)
  { id: "e82", title: "Bag of Words", slug: "bag-of-words", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "text-representation", "naive-bayes"] },
  { id: "e83", title: "TF-IDF", slug: "tf-idf", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "information-retrieval", "bm25"] },
  { id: "e84", title: "Word2Vec", slug: "word2vec", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "word-embeddings", "skip-gram", "cbow"] },
  { id: "e85", title: "GloVe", slug: "glove", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "word-embeddings", "co-occurrence"] },
  { id: "e86", title: "FastText", slug: "fasttext", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "word-embeddings", "subword", "oov"] },
  { id: "e87", title: "N-grams", slug: "n-grams", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-2", tags: ["nlp", "language-modeling", "bleu", "smoothing"] },
  // Language Model Fundamentals (6-3)
  { id: "e88", title: "Language Modeling", slug: "language-modeling", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "language-model", "autoregressive", "masked-lm"] },
  { id: "e89", title: "Perplexity", slug: "perplexity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "evaluation", "cross-entropy", "language-model"] },
  { id: "e90", title: "Masked Language Model", slug: "masked-lm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "bert", "mlm", "pre-training"] },
  { id: "e91", title: "Causal Language Model", slug: "causal-lm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-3", tags: ["nlp", "gpt", "autoregressive", "causal-attention"] },
  // Large Language Models (6-4)
  { id: "e92", title: "GPT Architecture", slug: "gpt-architecture", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "gpt", "decoder-only", "transformer"] },
  { id: "e93", title: "BERT Architecture", slug: "bert-architecture", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "bert", "encoder-only", "masked-lm"] },
  { id: "e94", title: "Scaling Laws", slug: "scaling-laws", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "chinchilla", "compute-optimal", "power-law"] },
  { id: "e95", title: "Emergent Abilities", slug: "emergent-abilities", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "emergence", "scale", "chain-of-thought"] },
  { id: "e96", title: "Context Window", slug: "context-window", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "attention", "rope", "flashattention", "kv-cache"] },
  { id: "e97", title: "Llama", slug: "llama", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-4", tags: ["llm", "llama", "open-source", "rmsnorm", "swiglu", "gqa"] },
  // Prompt Engineering (6-5)
  { id: "e98", title: "Zero-Shot Prompting", slug: "zero-shot-prompting", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "zero-shot", "instruction-tuning"] },
  { id: "e99", title: "Few-Shot Prompting", slug: "few-shot-prompting", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "few-shot", "in-context-learning"] },
  { id: "e100", title: "Chain-of-Thought", slug: "chain-of-thought", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "cot", "reasoning", "self-consistency"] },
  { id: "e101", title: "ReAct Prompting", slug: "react-prompting", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-5", tags: ["prompting", "react", "tool-use", "agents"] },
  { id: "e102", title: "Prompt Injection", slug: "prompt-injection", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-5", tags: ["security", "prompt-injection", "adversarial", "llm-security"] },
  // Retrieval & Grounding (6-6)
  { id: "e103", title: "RAG", slug: "rag", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "retrieval", "vector-database", "grounding"] },
  { id: "e104", title: "Chunking Strategies", slug: "chunking-strategies", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "chunking", "document-processing"] },
  { id: "e105", title: "Embedding Models", slug: "embedding-models", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["embeddings", "bi-encoder", "contrastive-learning", "mteb"] },
  { id: "e106", title: "Reranking", slug: "reranking", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "cross-encoder", "reranking", "rrf"] },
  { id: "e107", title: "Hybrid Search", slug: "hybrid-search", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-6", tags: ["rag", "bm25", "dense-retrieval", "rrf", "splade"] },
  // Multimodal (6-7)
  { id: "e108", title: "Vision-Language Models", slug: "vision-language-models", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "vlm", "vit", "visual-instruction-tuning"] },
  { id: "e109", title: "CLIP", slug: "clip", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "clip", "contrastive-learning", "zero-shot-classification"] },
  { id: "e110", title: "GPT-4V", slug: "gpt-4v", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "gpt-4v", "visual-qa", "document-understanding"] },
  { id: "e111", title: "Image Captioning", slug: "image-captioning", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "captioning", "cider", "blip"] },
  { id: "e112", title: "Speech-to-Text", slug: "speech-to-text", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "6-7", tags: ["multimodal", "asr", "whisper", "wer", "ctc"] },
  // AI Agents (8-1)
  { id: "e113", title: "Agent Loop", slug: "agent-loop", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-1", tags: ["agents", "observe-think-act", "react", "termination"] },
  { id: "e114", title: "Tool Use", slug: "tool-use", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-1", tags: ["agents", "toolformer", "tool-calling", "function-calling"] },
  { id: "e115", title: "Function Calling", slug: "function-calling", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-1", tags: ["agents", "function-calling", "json-schema", "structured-output"] },
  { id: "e116", title: "ReAct Pattern", slug: "react-pattern", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-1", tags: ["agents", "react", "reasoning", "acting", "observation"] },
  { id: "e117", title: "Plan-and-Execute", slug: "plan-and-execute", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "8-1", tags: ["agents", "planning", "orchestration", "langgraph"] },
  // Memory & State (8-2)
  { id: "e118", title: "Short-term Memory", slug: "short-term-memory", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-2", tags: ["memory", "context-window", "token-budget", "summarisation"] },
  { id: "e119", title: "Long-term Memory", slug: "long-term-memory", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-2", tags: ["memory", "vector-store", "memgpt", "persistence"] },
  { id: "e120", title: "Episodic vs Semantic Memory", slug: "episodic-vs-semantic", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-2", tags: ["memory", "episodic", "semantic", "reflection", "generative-agents"] },
  { id: "e121", title: "Memory Architectures", slug: "memory-architectures", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "8-2", tags: ["memory", "memgpt", "virtual-context", "multi-agent"] },
  // Orchestration & Frameworks (8-3)
  { id: "e122", title: "LangChain", slug: "langchain", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-3", tags: ["frameworks", "langchain", "lcel", "langgraph"] },
  { id: "e123", title: "LlamaIndex", slug: "llamaindex", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-3", tags: ["frameworks", "llamaindex", "rag", "retrieval"] },
  { id: "e124", title: "CrewAI", slug: "crewai", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-3", tags: ["frameworks", "crewai", "multi-agent", "roles"] },
  { id: "e125", title: "AutoGen", slug: "autogen", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-3", tags: ["frameworks", "autogen", "multi-agent", "conversational"] },
  { id: "e126", title: "Claude Agent SDK", slug: "claude-agent-sdk", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-3", tags: ["frameworks", "anthropic", "computer-use", "prompt-caching"] },
  // RAG Systems (8-4)
  { id: "e127", title: "RAG Pipeline Design", slug: "rag-pipeline-design", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-4", tags: ["rag", "pipeline", "ingestion", "retrieval", "generation"] },
  { id: "e128", title: "Chunking Strategies (RAG)", slug: "rag-chunking", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-4", tags: ["rag", "chunking", "parent-child", "late-chunking"] },
  { id: "e129", title: "Vector Search", slug: "vector-search", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-4", tags: ["rag", "hnsw", "ann", "vector-database", "pgvector"] },
  { id: "e130", title: "Reranking Systems", slug: "reranking-systems", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-4", tags: ["rag", "cross-encoder", "rrf", "two-stage-retrieval"] },
  { id: "e131", title: "RAG Evaluation", slug: "rag-evaluation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-4", tags: ["rag", "ragas", "faithfulness", "context-precision", "llm-as-judge"] },
  // Tool & API Integration (8-5)
  { id: "e132", title: "MCP (Model Context Protocol)", slug: "mcp", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-5", tags: ["mcp", "protocol", "tools", "resources", "anthropic"] },
  { id: "e133", title: "API Design for AI", slug: "api-design-ai", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-5", tags: ["api", "streaming", "sse", "rate-limiting", "token-budgeting"] },
  { id: "e134", title: "Structured Outputs", slug: "structured-outputs", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-5", tags: ["structured-outputs", "json-schema", "constrained-decoding", "pydantic"] },
  { id: "e135", title: "JSON Mode", slug: "json-mode", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "8-5", tags: ["json-mode", "structured-output", "constrained-decoding"] },
  { id: "e136", title: "Tool Calling Patterns", slug: "tool-calling-patterns", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-5", tags: ["agents", "parallel-tool-calls", "fallback", "caching", "idempotency"] },
  // Evaluation & Observability (8-6)
  { id: "e137", title: "LLM Tracing", slug: "llm-tracing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-6", tags: ["observability", "tracing", "langsmith", "langfuse", "opentelemetry"] },
  { id: "e138", title: "LLM Logging", slug: "llm-logging", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-6", tags: ["observability", "logging", "token-tracking", "cost-attribution"] },
  { id: "e139", title: "LLM Evaluation Frameworks", slug: "llm-eval-frameworks", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-6", tags: ["evaluation", "ragas", "deepeval", "llm-as-judge", "regression"] },
  { id: "e140", title: "Regression Testing for LLMs", slug: "regression-testing-llm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-6", tags: ["evaluation", "regression", "ci-cd", "golden-dataset", "a-b-testing"] },
  // Safety & Guardrails (8-7)
  { id: "e141", title: "Input/Output Filtering", slug: "input-output-filtering", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-7", tags: ["safety", "filtering", "llama-guard", "moderation", "classifier"] },
  { id: "e142", title: "Content Moderation", slug: "content-moderation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "8-7", tags: ["safety", "content-moderation", "trust-safety", "human-review"] },
  { id: "e143", title: "Prompt Injection Defense", slug: "prompt-injection-defense", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "8-7", tags: ["security", "prompt-injection", "indirect-injection", "privilege-separation"] },
  { id: "e144", title: "Red Teaming", slug: "red-teaming", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "8-7", tags: ["safety", "red-teaming", "adversarial", "harmbench", "jailbreak"] },
  // ── Category 11: Quantitative Finance ─────────────────────────────────────
  // Factor Investing (11-1)
  { id: "e145", title: "Fama-French Factor Models", slug: "fama-french", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-1", tags: ["fama-french", "smb", "hml", "rmw", "cma", "factor-model"] },
  { id: "e146", title: "Value Factor", slug: "value-factor", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-1", tags: ["value", "book-to-market", "pe-ratio", "ev-ebitda", "factor-investing"] },
  { id: "e147", title: "Momentum Factor", slug: "momentum-factor", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-1", tags: ["momentum", "cross-sectional", "time-series", "wml", "trend-following"] },
  { id: "e148", title: "Quality Factor", slug: "quality-factor", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-1", tags: ["quality", "profitability", "piotroski", "accruals", "gross-profit"] },
  { id: "e149", title: "Low-Volatility Factor", slug: "low-volatility-factor", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-1", tags: ["low-volatility", "bab", "minimum-variance", "defensive", "beta-anomaly"] },
  // Quantitative Strategies (11-2)
  { id: "e150", title: "Statistical Arbitrage", slug: "statistical-arbitrage", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-2", tags: ["stat-arb", "cointegration", "pairs-trading", "market-neutral", "mean-reversion"] },
  { id: "e151", title: "Mean Reversion", slug: "mean-reversion", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-2", tags: ["mean-reversion", "ornstein-uhlenbeck", "adf-test", "hurst-exponent", "contrarian"] },
  { id: "e152", title: "Trend Following", slug: "trend-following", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-2", tags: ["trend-following", "momentum", "cta", "managed-futures", "moving-average"] },
  { id: "e153", title: "Signal Generation", slug: "signal-generation", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-2", tags: ["signal", "alpha", "ic", "information-coefficient", "alternative-data"] },
  // Stochastic Calculus & Math Finance (11-3)
  { id: "e154", title: "Geometric Brownian Motion", slug: "geometric-brownian-motion", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-3", tags: ["gbm", "stochastic-process", "log-normal", "black-scholes", "drift"] },
  { id: "e155", title: "Ito's Lemma", slug: "ito-lemma", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-3", tags: ["ito-lemma", "stochastic-calculus", "quadratic-variation", "chain-rule", "sde"] },
  { id: "e156", title: "Risk-Neutral Pricing", slug: "risk-neutral-pricing", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-3", tags: ["risk-neutral", "girsanov", "martingale", "q-measure", "no-arbitrage"] },
  { id: "e157", title: "Monte Carlo in Finance", slug: "monte-carlo-finance", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-3", tags: ["monte-carlo", "simulation", "var", "option-pricing", "variance-reduction"] },
  { id: "e158", title: "Interest Rate Models", slug: "interest-rate-models", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-3", tags: ["vasicek", "hull-white", "cir", "hjm", "term-structure"] },
  // Backtesting Methodology (11-4)
  { id: "e159", title: "Backtesting Framework", slug: "backtesting-framework", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-4", tags: ["backtesting", "walk-forward", "sharpe", "transaction-costs", "point-in-time"] },
  { id: "e160", title: "Look-Ahead Bias", slug: "lookahead-bias", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-4", tags: ["lookahead-bias", "data-leakage", "survivorship-bias", "point-in-time", "backtest"] },
  { id: "e161", title: "Survivorship Bias", slug: "survivorship-bias", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-4", tags: ["survivorship-bias", "crsp", "delisting", "hedge-fund-database", "backfill"] },
  { id: "e162", title: "Walk-Forward Testing", slug: "walk-forward-testing", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-4", tags: ["walk-forward", "purged-cv", "cpcv", "pbo", "time-series-cv"] },
  { id: "e163", title: "Multiple Testing in Finance", slug: "multiple-testing-finance", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-4", tags: ["multiple-testing", "p-hacking", "deflated-sharpe", "bonferroni", "fdr"] },
  // ML in Finance (11-5)
  { id: "e164", title: "Return Prediction with ML", slug: "return-prediction-ml", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-5", tags: ["return-prediction", "xgboost", "neural-network", "ic", "feature-engineering"] },
  { id: "e165", title: "Regime Detection", slug: "regime-detection", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-5", tags: ["regime", "hmm", "change-point", "garch", "macro-indicators"] },
  { id: "e166", title: "Alternative Data", slug: "alternative-data", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-5", tags: ["alternative-data", "satellite", "credit-card", "mnpi", "signal-decay"] },
  { id: "e167", title: "NLP in Finance", slug: "nlp-finance", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "11-5", tags: ["nlp", "finbert", "earnings-call", "sentiment", "loughran-mcdonald"] },
  { id: "e168", title: "ML Risk Models", slug: "ml-risk-models", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-5", tags: ["risk-model", "covariance", "barra", "ledoit-wolf", "rmt"] },
  // Portfolio Optimization Advanced (11-6)
  { id: "e169", title: "Black-Litterman Model", slug: "black-litterman", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-6", tags: ["black-litterman", "bayesian", "equilibrium", "views", "reverse-optimisation"] },
  { id: "e170", title: "Risk Parity", slug: "risk-parity", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-6", tags: ["risk-parity", "all-weather", "risk-contribution", "leverage", "diversification"] },
  { id: "e171", title: "Convex Optimisation for Portfolios", slug: "convex-optimization-portfolio", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-6", tags: ["convex-optimization", "cvxpy", "qp", "transaction-costs", "constraints"] },
  { id: "e172", title: "Transaction Cost Modeling", slug: "transaction-cost-modeling", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-6", tags: ["transaction-costs", "market-impact", "almgren-chriss", "vwap", "implementation-shortfall"] },
  { id: "e173", title: "Robust Optimisation", slug: "robust-optimization", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "11-6", tags: ["robust-optimization", "uncertainty-set", "minimax", "dro", "wasserstein"] },
  // Finance (Asset Management) — Category 10
  // Portfolio Theory (10-1)
  { id: "e174", title: "Efficient Frontier", slug: "efficient-frontier", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-1", tags: ["efficient-frontier", "markowitz", "mvo", "gmv", "cml"] },
  { id: "e175", title: "CAPM", slug: "capm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-1", tags: ["capm", "beta", "sml", "risk-premium", "alpha"] },
  { id: "e176", title: "Mean-Variance Optimisation", slug: "mean-variance-optimization", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-1", tags: ["mvo", "markowitz", "covariance", "efficient-frontier", "quadratic-programming"] },
  { id: "e177", title: "Sharpe Ratio", slug: "sharpe-ratio", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-1", tags: ["sharpe-ratio", "risk-adjusted-return", "volatility", "cml", "sortino"] },
  { id: "e178", title: "Alpha & Beta", slug: "alpha-beta", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-1", tags: ["alpha", "beta", "capm", "factor-loading", "r-squared"] },
  // Fixed Income (10-2)
  { id: "e179", title: "Bonds", slug: "bonds", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-2", tags: ["bonds", "coupon", "ytm", "duration", "credit-spread"] },
  { id: "e180", title: "Duration", slug: "duration", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-2", tags: ["duration", "modified-duration", "dv01", "interest-rate-risk", "macaulay"] },
  { id: "e181", title: "Convexity", slug: "convexity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-2", tags: ["convexity", "duration", "price-yield", "barbell", "mbs"] },
  { id: "e182", title: "Credit Spread", slug: "credit-spread", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-2", tags: ["credit-spread", "oas", "z-spread", "investment-grade", "high-yield"] },
  { id: "e183", title: "Interest Rate Risk", slug: "interest-rate-risk", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-2", tags: ["interest-rate-risk", "dv01", "key-rate-duration", "basis-risk", "swap"] },
  { id: "e184", title: "Yield Curve", slug: "yield-curve", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-2", tags: ["yield-curve", "term-structure", "inversion", "nelson-siegel", "bootstrapping"] },
  // Derivatives & Hedging (10-3)
  { id: "e185", title: "Options", slug: "options", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-3", tags: ["options", "call", "put", "black-scholes", "implied-volatility"] },
  { id: "e186", title: "Futures", slug: "futures", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-3", tags: ["futures", "basis", "contango", "backwardation", "roll-yield"] },
  { id: "e187", title: "Option Greeks", slug: "greeks", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "10-3", tags: ["greeks", "delta", "gamma", "theta", "vega"] },
  { id: "e188", title: "Hedging Strategies", slug: "hedging-strategies", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-3", tags: ["hedging", "hedge-ratio", "protective-put", "collar", "delta-hedging"] },
  // Risk Management (10-4)
  { id: "e189", title: "CVaR / Expected Shortfall", slug: "cvar", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "10-4", tags: ["cvar", "expected-shortfall", "var", "tail-risk", "coherent"] },
  { id: "e190", title: "Drawdown", slug: "drawdown", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-4", tags: ["drawdown", "mdd", "calmar-ratio", "high-water-mark", "underwater"] },
  { id: "e191", title: "Correlation Risk", slug: "correlation-risk", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-4", tags: ["correlation", "diversification", "tail-correlation", "copula", "crisis"] },
  { id: "e192", title: "Value at Risk (VaR)", slug: "var", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-4", tags: ["var", "value-at-risk", "historical-simulation", "parametric", "backtesting"] },
  { id: "e193", title: "Stress Testing", slug: "stress-testing", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "10-4", tags: ["stress-testing", "scenario-analysis", "ccar", "reverse-stress-test", "tail-risk"] },
  // Performance & Attribution (10-5)
  { id: "e194", title: "Brinson Attribution", slug: "brinson-attribution", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-5", tags: ["brinson", "attribution", "allocation-effect", "selection-effect", "active-return"] },
  { id: "e195", title: "Information Ratio", slug: "information-ratio", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-5", tags: ["information-ratio", "active-return", "tracking-error", "ic", "breadth"] },
  { id: "e196", title: "Benchmark Selection", slug: "benchmark-selection", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-5", tags: ["benchmark", "active-share", "tracking-error", "msci", "closet-indexing"] },
  { id: "e197", title: "Tracking Error", slug: "tracking-error", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-5", tags: ["tracking-error", "active-return", "information-ratio", "factor-te", "transfer-coefficient"] },
  { id: "e198", title: "Sortino Ratio", slug: "sortino-ratio", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-5", tags: ["sortino-ratio", "downside-deviation", "sharpe-ratio", "risk-adjusted", "calmar"] },
  // Market Microstructure & Trading (10-6)
  { id: "e199", title: "Market Microstructure", slug: "market-microstructure", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-6", tags: ["microstructure", "bid-ask", "market-impact", "price-discovery", "adverse-selection"] },
  { id: "e200", title: "Market Making", slug: "market-making", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "10-6", tags: ["market-making", "bid-ask", "inventory-risk", "adverse-selection", "hft"] },
  { id: "e201", title: "Order Types", slug: "order-types", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-6", tags: ["order-types", "limit-order", "market-order", "stop-order", "slippage"] },
  { id: "e202", title: "Execution Strategies", slug: "execution-strategies", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-6", tags: ["execution", "vwap", "twap", "implementation-shortfall", "market-impact"] },
  { id: "e203", title: "Liquidity", slug: "liquidity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-6", tags: ["liquidity", "bid-ask", "amihud", "price-impact", "illiquidity-premium"] },
  // Alternative Investments (10-7)
  { id: "e204", title: "Hedge Funds", slug: "hedge-funds", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-7", tags: ["hedge-funds", "2-and-20", "long-short", "high-water-mark", "lock-up"] },
  { id: "e205", title: "Private Equity", slug: "private-equity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-7", tags: ["private-equity", "irr", "moic", "carried-interest", "lbo"] },
  { id: "e206", title: "Real Assets", slug: "real-assets", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-7", tags: ["real-assets", "real-estate", "infrastructure", "cap-rate", "inflation-hedge"] },
  { id: "e207", title: "Commodities", slug: "commodities", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-7", tags: ["commodities", "contango", "backwardation", "roll-yield", "convenience-yield"] },
  // Investment Strategy (10-8)
  { id: "e208", title: "Asset Classes", slug: "asset-classes", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-8", tags: ["asset-classes", "equity", "fixed-income", "alternatives", "diversification"] },
  { id: "e209", title: "Strategic Asset Allocation", slug: "strategic-asset-allocation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-8", tags: ["strategic-asset-allocation", "policy-portfolio", "risk-tolerance", "rebalancing", "liability-matching"] },
  { id: "e210", title: "Tactical Asset Allocation", slug: "tactical-asset-allocation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-8", tags: ["tactical-asset-allocation", "market-timing", "factor-tilts", "regime", "active-allocation"] },
  { id: "e211", title: "Active vs Passive Investing", slug: "active-vs-passive", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-8", tags: ["active", "passive", "index-fund", "etf", "cost-alpha"] },
  { id: "e212", title: "Portfolio Rebalancing", slug: "rebalancing", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "10-8", tags: ["rebalancing", "drift", "transaction-costs", "threshold", "calendar"] },
  // Equities (10-9)
  { id: "e213", title: "Equity Valuation Multiples", slug: "equity-valuation-multiples", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-9", tags: ["p-e-ratio", "ev-ebitda", "multiples", "peer-comps", "valuation"] },
  { id: "e214", title: "DCF Analysis", slug: "dcf-analysis", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "10-9", tags: ["dcf", "wacc", "terminal-value", "fcf", "roic"] },
  { id: "e215", title: "Dividend Discount Model", slug: "dividend-discount-model", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-9", tags: ["ddm", "gordon-growth", "dividend-yield", "cost-of-equity", "payout"] },
  { id: "e216", title: "Earnings Analysis", slug: "earnings-analysis", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-9", tags: ["eps", "earnings-surprise", "guidance", "consensus", "pead"] },
  { id: "e217", title: "Fundamental Analysis", slug: "fundamental-analysis", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "10-9", tags: ["moat", "roic", "porter", "competitive-advantage", "dupont"] },
  { id: "e218", title: "Vectors & Matrices", slug: "vectors-matrices", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-1", tags: ["vectors", "matrices", "linear-transformations"] },
  { id: "e219", title: "Matrix Operations", slug: "matrix-operations", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-1", tags: ["matrix-multiplication", "transpose", "inverse", "trace", "determinant"] },
  { id: "e220", title: "Eigenvalues & Eigenvectors", slug: "eigenvalues-eigenvectors", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-1", tags: ["eigenvalues", "eigenvectors", "eigendecomposition", "spectral-theorem"] },
  { id: "e221", title: "SVD", slug: "svd", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-1", tags: ["singular-value-decomposition", "low-rank-approximation", "pseudo-inverse"] },
  { id: "e222", title: "PCA (Math)", slug: "pca-math", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-1", tags: ["pca", "covariance", "eigendecomposition", "dimensionality-reduction"] },
  { id: "e223", title: "Dot Product & Projections", slug: "dot-product-projections", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-1", tags: ["dot-product", "projections", "orthogonality", "gram-schmidt"] },
  { id: "e224", title: "Norms", slug: "norms", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-1", tags: ["lp-norms", "matrix-norms", "frobenius", "spectral-norm"] },
  { id: "e225", title: "Derivatives & Gradients", slug: "derivatives-gradients", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-2", tags: ["derivatives", "gradients", "jacobian", "hessian"] },
  { id: "e226", title: "Chain Rule", slug: "chain-rule", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-2", tags: ["chain-rule", "backpropagation", "jacobian-chain-rule"] },
  { id: "e227", title: "Partial Derivatives", slug: "partial-derivatives", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-2", tags: ["partial-derivatives", "gradient", "directional-derivative"] },
  { id: "e228", title: "Gradient Descent", slug: "gradient-descent-math", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-2", tags: ["gradient-descent", "convergence", "momentum", "learning-rate"] },
  { id: "e229", title: "Convexity", slug: "convexity", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-2", tags: ["convex-functions", "convex-sets", "jensen-inequality"] },
  { id: "e230", title: "Lagrange Multipliers", slug: "lagrange-multipliers", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "1-2", tags: ["lagrange-multipliers", "constrained-optimization", "kkt-conditions"] },
  { id: "e231", title: "Taylor Series", slug: "taylor-series", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-2", tags: ["taylor-series", "approximation", "newtons-method"] },
  { id: "e232", title: "Sample Space & Events", slug: "sample-space-events", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-3", tags: ["sample-space", "events", "sigma-algebra", "probability-measure"] },
  { id: "e233", title: "Conditional Probability", slug: "conditional-probability", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-3", tags: ["conditional-probability", "bayes-theorem", "independence", "chain-rule"] },
  { id: "e234", title: "Bayes' Theorem", slug: "bayes-theorem", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-3", tags: ["bayes-theorem", "posterior", "prior", "likelihood", "map"] },
  { id: "e235", title: "Distributions (Discrete)", slug: "distributions-discrete", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-3", tags: ["bernoulli", "binomial", "poisson", "geometric", "multinomial"] },
  { id: "e236", title: "Distributions (Continuous)", slug: "distributions-continuous", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-3", tags: ["normal", "exponential", "gamma", "beta", "log-normal"] },
  { id: "e237", title: "Expectation & Variance", slug: "expectation-variance", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "1-3", tags: ["expectation", "variance", "covariance", "correlation", "moments"] },
  { id: "e238", title: "Law of Large Numbers", slug: "law-of-large-numbers", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-3", tags: ["law-of-large-numbers", "convergence", "monte-carlo", "consistency"] },
  { id: "e239", title: "Central Limit Theorem", slug: "central-limit-theorem", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-3", tags: ["central-limit-theorem", "normal-approximation", "berry-esseen"] },
  { id: "e240", title: "Entropy", slug: "entropy", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-4", tags: ["entropy", "shannon-entropy", "joint-entropy", "conditional-entropy"] },
  { id: "e241", title: "KL Divergence", slug: "kl-divergence", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "1-4", tags: ["kl-divergence", "relative-entropy", "variational-inference", "forward-kl", "reverse-kl"] },
  { id: "e242", title: "Cross-Entropy", slug: "cross-entropy", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-4", tags: ["cross-entropy", "log-loss", "binary-cross-entropy", "focal-loss"] },
  { id: "e243", title: "Mutual Information", slug: "mutual-information", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "1-4", tags: ["mutual-information", "information-gain", "feature-selection"] },
  { id: "e244", title: "Floating Point Precision", slug: "floating-point-precision", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "1-5", tags: ["ieee-754", "machine-epsilon", "catastrophic-cancellation", "overflow", "underflow"] },
  { id: "e245", title: "Numerical Stability", slug: "numerical-stability", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "1-5", tags: ["condition-number", "backward-stability", "lu-decomposition", "qr-decomposition"] },
  { id: "e246", title: "Matrix Decomposition Methods", slug: "matrix-decomposition-methods", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "1-5", tags: ["lu", "cholesky", "qr", "svd", "eigendecomposition", "iterative-methods"] },
  { id: "e247", title: "End-to-End ML Pipeline", slug: "end-to-end-ml-pipeline", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-1", tags: ["ml-pipeline", "data-validation", "training-serving-skew", "orchestration"] },
  { id: "e248", title: "Batch vs Real-time", slug: "batch-vs-real-time", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "9-1", tags: ["batch-processing", "stream-processing", "latency", "throughput"] },
  { id: "e249", title: "Lambda Architecture", slug: "lambda-architecture", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-1", tags: ["lambda", "batch-layer", "speed-layer", "serving-layer"] },
  { id: "e250", title: "Online Learning", slug: "online-learning", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-1", tags: ["online-learning", "concept-drift", "ftrl", "catastrophic-forgetting"] },
  { id: "e251", title: "Feature Store Design", slug: "feature-store-design", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-2", tags: ["feature-store", "offline-store", "online-store", "training-serving-skew"] },
  { id: "e252", title: "Point-in-Time Correctness", slug: "point-in-time-correctness", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-2", tags: ["point-in-time", "data-leakage", "temporal-joins", "event-time"] },
  { id: "e253", title: "Feast", slug: "feast", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-2", tags: ["feast", "open-source", "feature-platform", "kubernetes"] },
  { id: "e254", title: "Tecton", slug: "tecton", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-2", tags: ["tecton", "managed", "feature-platform", "streaming"] },
  { id: "e255", title: "REST API Serving", slug: "rest-api-serving", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "9-3", tags: ["rest-api", "fastapi", "flask", "model-serving"] },
  { id: "e256", title: "gRPC", slug: "grpc", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-3", tags: ["grpc", "protobuf", "http2", "performance"] },
  { id: "e257", title: "Model Batching", slug: "model-batching", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-3", tags: ["batching", "dynamic-batching", "throughput", "latency"] },
  { id: "e258", title: "Latency vs Throughput", slug: "latency-vs-throughput", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-3", tags: ["latency", "throughput", "tradeoffs", "slo"] },
  { id: "e259", title: "Edge Deployment", slug: "edge-deployment", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-3", tags: ["edge", "mobile", "tensorflow-lite", "core-ml", "quantization"] },
  { id: "e260", title: "Model Registry", slug: "model-registry", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-4", tags: ["model-registry", "mlflow", "versioning", "governance"] },
  { id: "e261", title: "MLflow", slug: "mlflow", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "9-4", tags: ["mlflow", "experiment-tracking", "model-management", "open-source"] },
  { id: "e262", title: "CI/CD for ML", slug: "cicd-for-ml", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-4", tags: ["cicd", "ml-pipelines", "testing", "deployment"] },
  { id: "e263", title: "Shadow Deployment", slug: "shadow-deployment", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-4", tags: ["shadow", "canary", "testing", "zero-downtime"] },
  { id: "e264", title: "Distributed Training", slug: "distributed-training", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-5", tags: ["distributed-training", "data-parallelism", "model-parallelism", "horovod"] },
  { id: "e265", title: "Data Parallelism", slug: "data-parallelism", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-5", tags: ["data-parallelism", "ddp", "allreduce", "synchronization"] },
  { id: "e266", title: "Model Parallelism", slug: "model-parallelism", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-5", tags: ["model-parallelism", "tensor-parallelism", "pipeline-parallelism", "megatron"] },
  { id: "e267", title: "Parameter Servers", slug: "parameter-servers", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-5", tags: ["parameter-servers", "distributed", "sparse", "asynchronous"] },
  { id: "e268", title: "Data Drift", slug: "data-drift", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-6", tags: ["data-drift", "psi", "ks-test", "distribution-shift"] },
  { id: "e269", title: "Concept Drift", slug: "concept-drift", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-6", tags: ["concept-drift", "model-degradation", "adaptation", "online-learning"] },
  { id: "e270", title: "Model Degradation", slug: "model-degradation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-6", tags: ["model-degradation", "monitoring", "alerts", "retraining"] },
  { id: "e271", title: "Alerting Strategies", slug: "alerting-strategies", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "9-6", tags: ["alerting", "slo", "on-call", "incident-response"] },
  { id: "e272", title: "Search Ranking System", slug: "search-ranking-system", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-7", tags: ["search", "ranking", "learning-to-rank", "multi-stage"] },
  { id: "e273", title: "Recommendation at Scale", slug: "recommendation-at-scale", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-7", tags: ["recommendation", "collaborative-filtering", "two-tower", "candidate-generation"] },
  { id: "e274", title: "Fraud Detection", slug: "fraud-detection", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-7", tags: ["fraud-detection", "class-imbalance", "real-time", "adversarial"] },
  { id: "e275", title: "Ad Click Prediction", slug: "ad-click-prediction", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-7", tags: ["ctr-prediction", "online-learning", "ftrl", "auction"] },
  { id: "e276", title: "LLM Serving at Scale", slug: "llm-serving-at-scale", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "9-7", tags: ["llm", "kv-cache", "continuous-batching", "speculative-decoding"] },
  // Deep Learning — 5-1 Fundamentals (e277–e280)
  { id: "e277", title: "Perceptron", slug: "perceptron", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "5-1", tags: ["deep-learning", "fundamentals", "neural-networks", "linear-classifier"] },
  { id: "e278", title: "Activation Functions", slug: "activation-functions", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "5-1", tags: ["deep-learning", "fundamentals", "relu", "gelu", "vanishing-gradient"] },
  { id: "e279", title: "Neural Network Architecture", slug: "neural-network-architecture", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-1", tags: ["deep-learning", "fundamentals", "mlp", "backpropagation", "weight-initialization"] },
  { id: "e280", title: "Universal Approximation Theorem", slug: "universal-approximation-theorem", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-1", tags: ["deep-learning", "fundamentals", "theory", "expressiveness"] },
  // Deep Learning — 5-2 CNNs (e281–e287)
  { id: "e281", title: "Convolution Operation", slug: "convolution-operation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-2", tags: ["cnn", "convolution", "feature-maps", "parameter-sharing"] },
  { id: "e282", title: "Pooling", slug: "pooling", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "5-2", tags: ["cnn", "max-pooling", "average-pooling", "translation-invariance"] },
  { id: "e283", title: "Stride and Padding", slug: "stride-padding", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-2", tags: ["cnn", "stride", "padding", "dilated-convolution", "transposed-convolution"] },
  { id: "e284", title: "ResNet", slug: "resnet", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-2", tags: ["cnn", "residual-connections", "skip-connections", "deep-networks"] },
  { id: "e285", title: "VGG", slug: "vgg", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-2", tags: ["cnn", "vgg16", "vgg19", "architecture", "style-transfer"] },
  { id: "e286", title: "EfficientNet", slug: "efficientnet", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-2", tags: ["cnn", "compound-scaling", "mbconv", "squeeze-excitation", "neural-architecture-search"] },
  { id: "e287", title: "Transfer Learning", slug: "transfer-learning", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-2", tags: ["transfer-learning", "fine-tuning", "feature-extraction", "catastrophic-forgetting"] },
  // Deep Learning — 5-3 RNNs & Sequence Models (e288–e292)
  { id: "e288", title: "RNN", slug: "rnn", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-3", tags: ["rnn", "sequence-models", "bptt", "vanishing-gradient"] },
  { id: "e289", title: "LSTM", slug: "lstm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-3", tags: ["lstm", "sequence-models", "gates", "cell-state", "long-term-dependencies"] },
  { id: "e290", title: "GRU", slug: "gru", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-3", tags: ["gru", "sequence-models", "gates", "update-gate", "reset-gate"] },
  { id: "e291", title: "Seq2Seq", slug: "seq2seq", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-3", tags: ["seq2seq", "encoder-decoder", "machine-translation", "teacher-forcing"] },
  { id: "e292", title: "Attention Mechanism", slug: "attention-mechanism", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-3", tags: ["attention", "bahdanau", "luong", "sequence-models", "alignment"] },
  // Deep Learning — 5-4 Transformers (e293–e296)
  { id: "e293", title: "Multi-Head Attention", slug: "multi-head-attention", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "attention", "multi-head", "query-key-value", "flash-attention"] },
  { id: "e294", title: "Positional Encoding", slug: "positional-encoding", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "positional-encoding", "rope", "alibi", "sinusoidal"] },
  { id: "e295", title: "Encoder-Decoder Transformer", slug: "encoder-decoder-transformer", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "encoder", "decoder", "cross-attention", "seq2seq"] },
  { id: "e296", title: "Vision Transformer (ViT)", slug: "vit", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-4", tags: ["transformers", "vit", "patch-embedding", "image-classification", "self-supervised"] },
  // Deep Learning — 5-5 Generative Models (e297–e300)
  { id: "e297", title: "GANs", slug: "gans", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-5", tags: ["gans", "generative", "discriminator", "generator", "wgan", "mode-collapse"] },
  { id: "e298", title: "VAEs", slug: "vaes", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-5", tags: ["vae", "generative", "elbo", "reparameterization", "latent-space"] },
  { id: "e299", title: "Diffusion Models", slug: "diffusion-models", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-5", tags: ["diffusion", "ddpm", "ddim", "score-matching", "stable-diffusion"] },
  { id: "e300", title: "Normalizing Flows", slug: "normalizing-flows", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-5", tags: ["normalizing-flows", "realnvp", "maf", "iaf", "change-of-variables"] },
  // Deep Learning — 5-6 Graph Neural Networks (e301–e304)
  { id: "e301", title: "GCN", slug: "gcn", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-6", tags: ["gnn", "gcn", "graph-convolution", "message-passing", "node-classification"] },
  { id: "e302", title: "GAT", slug: "gat", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-6", tags: ["gnn", "gat", "attention", "graph-attention", "gatv2"] },
  { id: "e303", title: "GraphSAGE", slug: "graphsage", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-6", tags: ["gnn", "graphsage", "inductive", "neighbourhood-sampling", "pinsage"] },
  { id: "e304", title: "Message Passing Neural Networks", slug: "message-passing", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-6", tags: ["gnn", "mpnn", "message-passing", "aggregation", "gin"] },
  // Deep Learning — 5-7 Reinforcement Learning Deep (e305–e308)
  { id: "e305", title: "DQN", slug: "dqn", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-7", tags: ["deep-rl", "dqn", "q-learning", "replay-buffer", "target-network"] },
  { id: "e306", title: "PPO", slug: "ppo", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-7", tags: ["deep-rl", "ppo", "policy-gradient", "clipped-objective", "rlhf"] },
  { id: "e307", title: "DDPG", slug: "ddpg", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-7", tags: ["deep-rl", "ddpg", "actor-critic", "deterministic-policy", "continuous-control"] },
  { id: "e308", title: "A3C", slug: "a3c", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "5-7", tags: ["deep-rl", "a3c", "a2c", "async", "advantage", "parallel-workers"] },

  // Training, Optimization & Evaluation — 7-1 Loss Functions (e309–e316)
  { id: "e309", title: "MSE Loss", slug: "mse-loss", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "mse", "regression", "squared-error", "gaussian-noise"] },
  { id: "e310", title: "MAE Loss", slug: "mae-loss", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "mae", "regression", "absolute-error", "robust"] },
  { id: "e311", title: "Cross-Entropy Loss", slug: "cross-entropy-loss", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "cross-entropy", "classification", "softmax", "negative-log-likelihood"] },
  { id: "e312", title: "Hinge Loss", slug: "hinge-loss", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "hinge", "svm", "margin", "max-margin"] },
  { id: "e313", title: "Huber Loss", slug: "huber-loss", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "huber", "robust", "outliers", "delta"] },
  { id: "e314", title: "KL Divergence Loss", slug: "kl-divergence-loss", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "kl-divergence", "information-theory", "vae", "distillation"] },
  { id: "e315", title: "Contrastive Loss", slug: "contrastive-loss", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "contrastive", "self-supervised", "simclr", "infonce"] },
  { id: "e316", title: "Triplet Loss", slug: "triplet-loss", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-1", tags: ["loss", "triplet", "metric-learning", "hard-negative-mining", "facenet"] },

  // Training, Optimization & Evaluation — 7-2 Optimization Algorithms (e317–e325)
  { id: "e317", title: "SGD", slug: "sgd", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-2", tags: ["optimizer", "sgd", "stochastic-gradient-descent", "mini-batch", "convergence"] },
  { id: "e318", title: "Momentum Optimizer", slug: "momentum-optimizer", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-2", tags: ["optimizer", "momentum", "polyak", "nesterov", "acceleration"] },
  { id: "e319", title: "Adam Optimizer", slug: "adam-optimizer", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["optimizer", "adam", "adaptive", "moments", "bias-correction"] },
  { id: "e320", title: "AdaGrad", slug: "adagrad", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["optimizer", "adagrad", "adaptive", "sparse", "dying-lr"] },
  { id: "e321", title: "RMSProp", slug: "rmsprop", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["optimizer", "rmsprop", "adaptive", "ema", "centered"] },
  { id: "e322", title: "AdamW", slug: "adamw", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["optimizer", "adamw", "weight-decay", "decoupled", "regularization"] },
  { id: "e323", title: "LR Schedules", slug: "lr-schedules", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["lr-schedule", "cosine", "step-decay", "polynomial", "cyclical"] },
  { id: "e324", title: "Warmup", slug: "warmup", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["warmup", "learning-rate", "radam", "linear-warmup", "transformers"] },
  { id: "e325", title: "Cosine Annealing", slug: "cosine-annealing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-2", tags: ["cosine-annealing", "sgdr", "warm-restarts", "lr-schedule", "cyclical"] },

  // Training, Optimization & Evaluation — 7-3 Regularization (e326–e331)
  { id: "e326", title: "L1 Regularization", slug: "l1-regularization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-3", tags: ["regularization", "l1", "lasso", "sparsity", "feature-selection"] },
  { id: "e327", title: "L2 Regularization", slug: "l2-regularization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-3", tags: ["regularization", "l2", "ridge", "weight-decay", "gaussian-prior"] },
  { id: "e328", title: "Dropout", slug: "dropout", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-3", tags: ["regularization", "dropout", "mc-dropout", "inverted-dropout", "ensemble"] },
  { id: "e329", title: "Early Stopping", slug: "early-stopping", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-3", tags: ["regularization", "early-stopping", "patience", "validation", "overfitting"] },
  { id: "e330", title: "Weight Decay", slug: "weight-decay", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-3", tags: ["regularization", "weight-decay", "l2", "decoupled", "adamw"] },
  { id: "e331", title: "Label Smoothing", slug: "label-smoothing", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-3", tags: ["regularization", "label-smoothing", "calibration", "soft-targets", "classification"] },

  // Training, Optimization & Evaluation — 7-4 DL Training Techniques (e332–e340)
  { id: "e332", title: "Backpropagation", slug: "backpropagation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["backprop", "chain-rule", "autodiff", "gradients", "reverse-mode"] },
  { id: "e333", title: "Vanishing & Exploding Gradients", slug: "vanishing-exploding-gradients", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["vanishing-gradients", "exploding-gradients", "skip-connections", "bptt", "spectral-radius"] },
  { id: "e334", title: "Weight Initialization", slug: "weight-initialization", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["initialization", "xavier", "he", "glorot", "kaiming"] },
  { id: "e335", title: "Batch Normalization", slug: "batch-norm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["batch-norm", "normalization", "internal-covariate-shift", "gamma", "beta"] },
  { id: "e336", title: "Layer Normalization", slug: "layer-norm", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["layer-norm", "rmsnorm", "pre-norm", "post-norm", "transformers"] },
  { id: "e337", title: "Gradient Clipping", slug: "gradient-clipping", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["gradient-clipping", "max-norm", "exploding-gradients", "rnn", "llm-training"] },
  { id: "e338", title: "Mixed Precision Training", slug: "mixed-precision-training", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["mixed-precision", "fp16", "bf16", "amp", "gradscaler"] },
  { id: "e339", title: "Data Augmentation", slug: "data-augmentation", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-4", tags: ["augmentation", "mixup", "cutmix", "randaugment", "regularization"] },
  { id: "e340", title: "Curriculum Learning", slug: "curriculum-learning", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-4", tags: ["curriculum-learning", "self-paced", "difficulty", "progressive-resizing", "ordering"] },

  // Training, Optimization & Evaluation — 7-5 LLM Training & Alignment (e341–e347)
  { id: "e341", title: "Pre-training", slug: "pre-training", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "7-5", tags: ["pre-training", "clm", "mlm", "chinchilla", "scaling-laws"] },
  { id: "e342", title: "SFT", slug: "sft", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-5", tags: ["sft", "supervised-fine-tuning", "instruction-masking", "lima", "lora"] },
  { id: "e343", title: "RLHF", slug: "rlhf", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "7-5", tags: ["rlhf", "ppo", "reward-model", "bradley-terry", "alignment"] },
  { id: "e344", title: "DPO", slug: "dpo", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "7-5", tags: ["dpo", "direct-preference-optimization", "alignment", "beta", "reference-model"] },
  { id: "e345", title: "Constitutional AI", slug: "constitutional-ai", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "7-5", tags: ["constitutional-ai", "rlaif", "critique-revision", "alignment", "claude"] },
  { id: "e346", title: "Instruction Tuning", slug: "instruction-tuning", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-5", tags: ["instruction-tuning", "flan", "zero-shot", "multi-task", "task-diversity"] },
  { id: "e347", title: "LoRA / QLoRA", slug: "lora-qlora", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-5", tags: ["lora", "qlora", "peft", "low-rank", "nf4"] },

  // Training, Optimization & Evaluation — 7-6 Classical ML Evaluation (e348–e356)
  { id: "e348", title: "Train / Val / Test Split", slug: "train-val-test-split", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-6", tags: ["train-val-test", "data-split", "stratified", "temporal-split", "data-leakage"] },
  { id: "e349", title: "Cross-Validation", slug: "cross-validation", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-6", tags: ["cross-validation", "k-fold", "loocv", "nested-cv", "group-kfold"] },
  { id: "e350", title: "Bias-Variance Tradeoff", slug: "bias-variance-tradeoff", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-6", tags: ["bias-variance", "overfitting", "underfitting", "double-descent", "regularization"] },
  { id: "e351", title: "Confusion Matrix", slug: "confusion-matrix", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-6", tags: ["confusion-matrix", "tp-fp-fn-tn", "precision", "recall", "mcc"] },
  { id: "e352", title: "ROC-AUC", slug: "roc-auc", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-6", tags: ["roc", "auc", "tpr", "fpr", "ranking"] },
  { id: "e353", title: "F1 Score", slug: "f1-score", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-6", tags: ["f1", "precision", "recall", "harmonic-mean", "fbeta"] },
  { id: "e354", title: "RMSE", slug: "rmse-metric", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-6", tags: ["rmse", "mse", "r-squared", "regression-metric", "rmsle"] },
  { id: "e355", title: "Log-Loss", slug: "log-loss", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-6", tags: ["log-loss", "cross-entropy", "calibration", "proper-scoring", "negative-log-likelihood"] },
  { id: "e356", title: "PR Curve", slug: "pr-curve", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-6", tags: ["pr-curve", "average-precision", "map", "imbalanced", "recall"] },

  // Training, Optimization & Evaluation — 7-7 LLM & DL Evaluation (e357–e363)
  { id: "e357", title: "Perplexity", slug: "perplexity-eval", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["perplexity", "language-model", "cross-entropy", "bits-per-character", "evaluation"] },
  { id: "e358", title: "BLEU", slug: "bleu", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["bleu", "machine-translation", "n-gram", "brevity-penalty", "sacrebleu"] },
  { id: "e359", title: "ROUGE", slug: "rouge", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["rouge", "summarization", "recall", "lcs", "rouge-l"] },
  { id: "e360", title: "BERTScore", slug: "bertscore", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["bertscore", "semantic-similarity", "bert", "contextual-embeddings", "idf"] },
  { id: "e361", title: "HumanEval", slug: "human-eval-benchmark", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["humaneval", "pass-at-k", "code-generation", "unit-tests", "mbpp"] },
  { id: "e362", title: "LLM-as-Judge", slug: "llm-as-judge", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["llm-as-judge", "mt-bench", "elo", "pairwise", "position-bias"] },
  { id: "e363", title: "LLM Benchmarks", slug: "llm-benchmarks", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-7", tags: ["mmlu", "hellaswag", "gsm8k", "arc", "benchmark"] },

  // Training, Optimization & Evaluation — 7-8 Hyperparameter Tuning (e364–e368)
  { id: "e364", title: "Grid Search", slug: "grid-search", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-8", tags: ["grid-search", "hyperparameter", "exhaustive", "gridsearchcv", "cross-validation"] },
  { id: "e365", title: "Random Search", slug: "random-search", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "7-8", tags: ["random-search", "hyperparameter", "hyperband", "successive-halving", "sampling"] },
  { id: "e366", title: "Bayesian Optimization", slug: "bayesian-optimization-hpo", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "7-8", tags: ["bayesian-optimization", "gaussian-process", "acquisition-function", "ei", "tpe"] },
  { id: "e367", title: "AutoML", slug: "automl", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "7-8", tags: ["automl", "cash", "auto-sklearn", "autogluon", "ensemble"] },
  { id: "e368", title: "Neural Architecture Search", slug: "neural-architecture-search", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "7-8", tags: ["nas", "darts", "one-shot", "weight-sharing", "efficientnet"] },

  // Data — 3-1 Data Collection & Ingestion (e369–e372)
  { id: "e369", title: "Data Sources", slug: "data-sources", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-1", tags: ["data-sources", "structured", "semi-structured", "unstructured", "synthetic"] },
  { id: "e370", title: "Web Scraping", slug: "web-scraping", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-1", tags: ["web-scraping", "beautifulsoup", "scrapy", "playwright", "robots-txt"] },
  { id: "e371", title: "APIs for Data Ingestion", slug: "apis-data-ingestion", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-1", tags: ["rest-api", "pagination", "rate-limiting", "webhooks", "oauth"] },
  { id: "e372", title: "Streaming vs Batch Ingestion", slug: "streaming-vs-batch", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-1", tags: ["streaming", "batch", "kafka", "flink", "lambda-architecture"] },

  // Data — 3-2 Data Cleaning (e373–e376)
  { id: "e373", title: "Handling Missing Values", slug: "handling-missing-values", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-2", tags: ["missing-values", "imputation", "mcar", "mar", "mnar", "mice"] },
  { id: "e374", title: "Outlier Detection", slug: "outlier-detection", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-2", tags: ["outliers", "iqr", "z-score", "mahalanobis", "isolation-forest"] },
  { id: "e375", title: "Data Deduplication", slug: "data-deduplication", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-2", tags: ["deduplication", "record-linkage", "fuzzy-matching", "minhash", "lsh"] },
  { id: "e376", title: "Data Type Casting", slug: "data-type-casting", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-2", tags: ["dtypes", "pandas", "categorical", "datetime", "memory-optimization"] },

  // Data — 3-3 Exploratory Data Analysis (e377–e380)
  { id: "e377", title: "Univariate Analysis", slug: "univariate-analysis", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-3", tags: ["eda", "histogram", "boxplot", "skewness", "kurtosis", "qq-plot"] },
  { id: "e378", title: "Bivariate Analysis", slug: "bivariate-analysis", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-3", tags: ["eda", "scatter-plot", "correlation", "crosstab", "chi-square", "anova"] },
  { id: "e379", title: "Correlation", slug: "correlation", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-3", tags: ["pearson", "spearman", "kendall", "vif", "multicollinearity", "spurious-correlation"] },
  { id: "e380", title: "Visualization Techniques", slug: "visualization-techniques", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-3", tags: ["matplotlib", "seaborn", "plotly", "heatmap", "pairplot", "grammar-of-graphics"] },

  // Data — 3-4 Feature Engineering (e381–e386)
  { id: "e381", title: "One-Hot Encoding", slug: "one-hot-encoding", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-4", tags: ["one-hot-encoding", "target-encoding", "ordinal-encoding", "dummy-variable-trap", "high-cardinality"] },
  { id: "e382", title: "Scaling & Normalization", slug: "scaling-normalization", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-4", tags: ["standardscaler", "minmax", "robust-scaler", "log-transform", "power-transform"] },
  { id: "e383", title: "Binning", slug: "binning", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-4", tags: ["binning", "discretization", "quantile-binning", "decision-tree-binning", "kbinsdiscretizer"] },
  { id: "e384", title: "Interaction Features", slug: "interaction-features", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-4", tags: ["interaction-features", "polynomial-features", "ratio-features", "shap-interaction", "ridge"] },
  { id: "e385", title: "Date/Time Features", slug: "datetime-features", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-4", tags: ["datetime", "cyclical-encoding", "lag-features", "rolling-window", "rfm"] },
  { id: "e386", title: "Embeddings as Features", slug: "embeddings-as-features", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "3-4", tags: ["embeddings", "sentence-transformers", "entity-embeddings", "pca", "transfer-learning"] },

  // Data — 3-5 Data Imbalance (e387–e390)
  { id: "e387", title: "SMOTE", slug: "smote", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-5", tags: ["smote", "oversampling", "borderline-smote", "adasyn", "imbalanced-learn"] },
  { id: "e388", title: "Undersampling", slug: "undersampling", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-5", tags: ["undersampling", "tomek-links", "nearmiss", "enn", "balanced-bagging"] },
  { id: "e389", title: "Class Weights", slug: "class-weights", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-5", tags: ["class-weights", "scale-pos-weight", "balanced", "sample-weight", "imbalance"] },
  { id: "e390", title: "Evaluation under Imbalance", slug: "evaluation-under-imbalance", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-5", tags: ["f1-score", "pr-auc", "roc-auc", "mcc", "threshold-tuning", "imbalance"] },

  // Data — 3-6 Data Pipelines (e391–e394)
  { id: "e391", title: "ETL vs ELT", slug: "etl-vs-elt", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-6", tags: ["etl", "elt", "dbt", "cdc", "scd-type-2", "data-pipeline"] },
  { id: "e392", title: "Feature Stores", slug: "feature-stores", difficulty: "advanced" as const, status: "published" as const, subcategoryId: "3-6", tags: ["feature-store", "feast", "offline-store", "online-store", "point-in-time", "training-serving-skew"] },
  { id: "e393", title: "Data Versioning (DVC)", slug: "data-versioning-dvc", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-6", tags: ["dvc", "data-versioning", "reproducibility", "mlops", "content-addressing"] },
  { id: "e394", title: "Workflow Orchestration", slug: "workflow-orchestration", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-6", tags: ["airflow", "prefect", "dagster", "dag", "orchestration", "scheduling"] },

  // Data — 3-7 Databases & Storage (e395–e399)
  { id: "e395", title: "SQL Fundamentals", slug: "sql-fundamentals", difficulty: "beginner" as const, status: "published" as const, subcategoryId: "3-7", tags: ["sql", "window-functions", "joins", "group-by", "indexes", "acid"] },
  { id: "e396", title: "NoSQL Databases", slug: "nosql", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-7", tags: ["nosql", "mongodb", "redis", "cassandra", "neo4j", "cap-theorem"] },
  { id: "e397", title: "Vector Databases", slug: "vector-databases", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-7", tags: ["vector-database", "faiss", "hnsw", "ann", "pinecone", "rag"] },
  { id: "e398", title: "Data Warehouses", slug: "data-warehouses", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-7", tags: ["data-warehouse", "columnar-storage", "star-schema", "scd", "redshift", "snowflake"] },
  { id: "e399", title: "Data Lakes", slug: "data-lakes", difficulty: "intermediate" as const, status: "published" as const, subcategoryId: "3-7", tags: ["data-lake", "delta-lake", "iceberg", "medallion-architecture", "bronze-silver-gold", "lakehouse"] },
]

export const difficultyColors = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-rose-50 text-rose-700 border-rose-200",
}


export const mockUsage = {
  todayTokens: 124500,
  todayCost: 1.84,
  monthTokens: 2100000,
  monthCost: 31.20,
  breakdown: {
    interview: { tokens: 1500000, cost: 22.50 },
    sparring: { tokens: 200000, cost: 3.00 },
    digest: { tokens: 100000, cost: 0.50 },
  }
}
