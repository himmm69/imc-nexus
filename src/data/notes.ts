import { Note } from '@/types';

// Mock data - will be replaced with Firebase queries
// Firebase integration: collection(db, 'notes')

export const notes: Note[] = [
  {
    id: 'note-1',
    moduleId: 'web-tech',
    title: 'Complete React Hooks Guide',
    topic: 'React Fundamentals',
    author: 'Maria S.',
    format: 'markdown',
    upvotes: 127,
    views: 1834,
    updatedAt: '2024-01-14',
    tags: ['React', 'Hooks', 'JavaScript'],
    markdownContent: `# Complete React Hooks Guide

## Introduction to Hooks
React Hooks were introduced in React 16.8 to allow functional components to use state and lifecycle features.

## useState Hook
The most basic hook for managing component state.

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

### Key Points
- Always call hooks at the top level
- Only call hooks from React functions
- State updates are asynchronous

## useEffect Hook
For handling side effects like data fetching, subscriptions, or DOM manipulation.

\`\`\`jsx
useEffect(() => {
  document.title = \`Count: \${count}\`;
  return () => {
    // Cleanup function
  };
}, [count]);
\`\`\`

## Custom Hooks
Create reusable logic by extracting into custom hooks.

## Summary
Hooks provide a more direct API to React concepts you already know.`
  },
  {
    id: 'note-2',
    moduleId: 'web-tech',
    title: 'CSS Flexbox & Grid Cheatsheet',
    topic: 'CSS Layout',
    author: 'Thomas K.',
    format: 'markdown',
    upvotes: 98,
    views: 1245,
    updatedAt: '2024-01-10',
    tags: ['CSS', 'Flexbox', 'Grid', 'Layout'],
    markdownContent: `# CSS Flexbox & Grid Cheatsheet

## Flexbox Basics
Use Flexbox for one-dimensional layouts.

### Container Properties
- \`display: flex\`
- \`flex-direction\`: row | column
- \`justify-content\`: flex-start | center | space-between
- \`align-items\`: stretch | center | flex-end

## CSS Grid
Use Grid for two-dimensional layouts.

### Grid Container
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## When to Use What?
- **Flexbox**: Navigation, card layouts, centering
- **Grid**: Page layouts, complex arrangements`
  },
  {
    id: 'note-3',
    moduleId: 'databases',
    title: 'SQL Joins Explained with Examples',
    topic: 'SQL Queries',
    author: 'Lisa M.',
    format: 'markdown',
    upvotes: 156,
    views: 2341,
    updatedAt: '2024-01-12',
    tags: ['SQL', 'Joins', 'Database'],
    markdownContent: `# SQL Joins Explained

## Types of Joins

### INNER JOIN
Returns only matching rows from both tables.

\`\`\`sql
SELECT orders.id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
\`\`\`

### LEFT JOIN
Returns all rows from left table, matched rows from right.

### RIGHT JOIN
Returns all rows from right table, matched rows from left.

### FULL OUTER JOIN
Returns all rows when there's a match in either table.

## Visual Representation
Think of Venn diagrams for understanding joins!`
  },
  {
    id: 'note-4',
    moduleId: 'databases',
    title: 'Database Normalization Guide',
    topic: 'Database Design',
    author: 'Peter H.',
    format: 'markdown',
    upvotes: 89,
    views: 987,
    updatedAt: '2024-01-08',
    tags: ['Normalization', 'Design', 'Database'],
    markdownContent: `# Database Normalization

## Why Normalize?
- Reduce data redundancy
- Improve data integrity
- Simplify queries

## Normal Forms

### 1NF (First Normal Form)
- Atomic values only
- No repeating groups

### 2NF (Second Normal Form)
- Meet 1NF
- No partial dependencies

### 3NF (Third Normal Form)
- Meet 2NF
- No transitive dependencies

## Practical Tips
Don't over-normalize! Sometimes denormalization is appropriate for performance.`
  },
  {
    id: 'note-5',
    moduleId: 'r-programming',
    title: 'ggplot2 Visualization Masterclass',
    topic: 'Data Visualization',
    author: 'Anna B.',
    format: 'markdown',
    upvotes: 112,
    views: 1567,
    updatedAt: '2024-01-11',
    tags: ['R', 'ggplot2', 'Visualization'],
    markdownContent: `# ggplot2 Visualization Masterclass

## Grammar of Graphics
ggplot2 is based on the Grammar of Graphics by Leland Wilkinson.

## Basic Structure
\`\`\`r
ggplot(data, aes(x = var1, y = var2)) +
  geom_point() +
  labs(title = "My Plot")
\`\`\`

## Common Geoms
- \`geom_point()\` - scatter plots
- \`geom_line()\` - line charts
- \`geom_bar()\` - bar charts
- \`geom_histogram()\` - histograms

## Customization
- Themes: \`theme_minimal()\`, \`theme_bw()\`
- Colors: \`scale_color_brewer()\`
- Facets: \`facet_wrap()\``
  },
  {
    id: 'note-6',
    moduleId: 'r-programming',
    title: 'dplyr Data Manipulation',
    topic: 'Data Wrangling',
    author: 'Michael F.',
    format: 'markdown',
    upvotes: 94,
    views: 1123,
    updatedAt: '2024-01-09',
    tags: ['R', 'dplyr', 'Data Wrangling'],
    markdownContent: `# dplyr Data Manipulation

## Core Verbs
- \`select()\` - choose columns
- \`filter()\` - choose rows
- \`mutate()\` - create new columns
- \`summarise()\` - aggregate data
- \`arrange()\` - sort data

## Pipe Operator
\`\`\`r
data %>%
  filter(year > 2020) %>%
  group_by(category) %>%
  summarise(avg = mean(value))
\`\`\``
  },
  {
    id: 'note-7',
    moduleId: 'marketing',
    title: 'Marketing Mix (4Ps) Framework',
    topic: 'Marketing Strategy',
    author: 'Sophie L.',
    format: 'markdown',
    upvotes: 78,
    views: 892,
    updatedAt: '2024-01-06',
    tags: ['Marketing', '4Ps', 'Strategy'],
    markdownContent: `# Marketing Mix (4Ps)

## Product
- Features and quality
- Branding and packaging
- Product lifecycle

## Price
- Pricing strategies
- Discounts and payment terms
- Perceived value

## Place
- Distribution channels
- Market coverage
- Logistics

## Promotion
- Advertising
- Sales promotion
- Public relations`
  },
  {
    id: 'note-8',
    moduleId: 'marketing',
    title: 'Digital Marketing Essentials',
    topic: 'Digital Marketing',
    author: 'Julia R.',
    format: 'markdown',
    upvotes: 103,
    views: 1456,
    updatedAt: '2024-01-13',
    tags: ['Digital Marketing', 'SEO', 'Social Media'],
    markdownContent: `# Digital Marketing Essentials

## SEO Basics
- On-page optimization
- Keyword research
- Technical SEO

## Social Media Marketing
- Platform selection
- Content strategy
- Engagement metrics

## Email Marketing
- List building
- Segmentation
- A/B testing

## Analytics
- Google Analytics
- Conversion tracking
- ROI measurement`
  },
  {
    id: 'note-9',
    moduleId: 'project-mgmt',
    title: 'Agile & Scrum Complete Guide',
    topic: 'Agile Methodology',
    author: 'David W.',
    format: 'markdown',
    upvotes: 134,
    views: 1789,
    updatedAt: '2024-01-14',
    tags: ['Agile', 'Scrum', 'Sprint'],
    markdownContent: `# Agile & Scrum Guide

## Agile Principles
- Individuals over processes
- Working software over documentation
- Customer collaboration
- Responding to change

## Scrum Framework
### Roles
- Product Owner
- Scrum Master
- Development Team

### Events
- Sprint Planning
- Daily Standup
- Sprint Review
- Sprint Retrospective

### Artifacts
- Product Backlog
- Sprint Backlog
- Increment`
  },
  {
    id: 'note-10',
    moduleId: 'project-mgmt',
    title: 'Risk Management Strategies',
    topic: 'Risk Management',
    author: 'Elena K.',
    format: 'markdown',
    upvotes: 67,
    views: 723,
    updatedAt: '2024-01-07',
    tags: ['Risk', 'Management', 'Planning'],
    markdownContent: `# Risk Management

## Risk Identification
- Brainstorming
- Checklists
- Expert interviews

## Risk Assessment
- Probability x Impact matrix
- Qualitative vs Quantitative

## Risk Response
- Avoid
- Transfer
- Mitigate
- Accept`
  },
  {
    id: 'note-11',
    moduleId: 'statistics',
    title: 'Hypothesis Testing Step-by-Step',
    topic: 'Inferential Statistics',
    author: 'Max P.',
    format: 'markdown',
    upvotes: 145,
    views: 2156,
    updatedAt: '2024-01-15',
    tags: ['Statistics', 'Hypothesis Testing', 'p-value'],
    markdownContent: `# Hypothesis Testing

## Steps
1. State hypotheses (H₀ and H₁)
2. Choose significance level (α)
3. Select appropriate test
4. Calculate test statistic
5. Find p-value
6. Make decision

## Common Tests
- t-test (means)
- Chi-square (categories)
- ANOVA (multiple groups)

## Interpreting p-values
- p < 0.05: Reject H₀
- p ≥ 0.05: Fail to reject H₀`
  },
  {
    id: 'note-12',
    moduleId: 'statistics',
    title: 'Probability Distributions Overview',
    topic: 'Probability',
    author: 'Sarah N.',
    format: 'markdown',
    upvotes: 88,
    views: 1034,
    updatedAt: '2024-01-10',
    tags: ['Probability', 'Distributions', 'Statistics'],
    markdownContent: `# Probability Distributions

## Discrete Distributions
- Binomial
- Poisson
- Geometric

## Continuous Distributions
- Normal (Gaussian)
- Exponential
- Uniform

## Normal Distribution
- Bell-shaped curve
- Mean = Median = Mode
- 68-95-99.7 rule`
  },
  {
    id: 'note-13',
    moduleId: 'web-tech',
    title: 'JavaScript Async/Await Patterns',
    topic: 'JavaScript Advanced',
    author: 'Chris D.',
    format: 'markdown',
    upvotes: 118,
    views: 1678,
    updatedAt: '2024-01-13',
    tags: ['JavaScript', 'Async', 'Promises'],
    markdownContent: `# Async/Await Patterns

## Basics
\`\`\`javascript
async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
\`\`\`

## Error Handling
Use try/catch blocks!

## Parallel Execution
\`\`\`javascript
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
\`\`\``
  },
  {
    id: 'note-14',
    moduleId: 'databases',
    title: 'PostgreSQL Advanced Features',
    topic: 'Advanced SQL',
    author: 'Robert M.',
    format: 'markdown',
    upvotes: 76,
    views: 867,
    updatedAt: '2024-01-11',
    tags: ['PostgreSQL', 'Advanced', 'SQL'],
    markdownContent: `# PostgreSQL Advanced Features

## Window Functions
\`\`\`sql
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC)
FROM employees;
\`\`\`

## CTEs (Common Table Expressions)
\`\`\`sql
WITH sales_summary AS (
  SELECT ...
)
SELECT * FROM sales_summary;
\`\`\`

## JSON Support
PostgreSQL has excellent JSON/JSONB support!`
  },
  {
    id: 'note-15',
    moduleId: 'statistics',
    title: 'Linear Regression Explained',
    topic: 'Regression Analysis',
    author: 'Kate T.',
    format: 'markdown',
    upvotes: 92,
    views: 1234,
    updatedAt: '2024-01-12',
    tags: ['Regression', 'Statistics', 'Prediction'],
    markdownContent: `# Linear Regression

## Simple Linear Regression
y = β₀ + β₁x + ε

## Key Concepts
- Slope and intercept
- R² (coefficient of determination)
- Residuals

## Assumptions
1. Linearity
2. Independence
3. Homoscedasticity
4. Normality of residuals

## Model Evaluation
- R² value
- p-values for coefficients
- Residual plots`
  }
];

export const getNoteById = (id: string): Note | undefined => {
  return notes.find(n => n.id === id);
};

export const getNotesByModule = (moduleId: string): Note[] => {
  return notes.filter(n => n.moduleId === moduleId);
};

export const getTrendingNotes = (limit: number = 5): Note[] => {
  return [...notes].sort((a, b) => b.views - a.views).slice(0, limit);
};

export const getLatestNotes = (limit: number = 5): Note[] => {
  return [...notes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, limit);
};
