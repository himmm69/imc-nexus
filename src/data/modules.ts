import { Module } from '@/types';

// Mock data - will be replaced with Firebase queries
// Firebase integration: getDoc(doc(db, 'modules', id)) or collection queries

export const modules: Module[] = [
  {
    id: 'web-tech',
    title: 'Web Technologies',
    semester: 2,
    lecturers: ['Prof. Dr. Schmidt', 'Dr. Weber'],
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Programming'],
    difficulty: 3,
    updatedAt: '2024-01-15',
    description: 'Comprehensive introduction to modern web development covering front-end and back-end technologies, including HTML5, CSS3, JavaScript, and popular frameworks.',
    outcomes: [
      'Build responsive web applications using HTML, CSS, and JavaScript',
      'Understand client-server architecture and HTTP protocols',
      'Implement RESTful APIs and database integration',
      'Apply modern front-end frameworks like React',
      'Deploy and maintain web applications'
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    semester: 2,
    lecturers: ['Prof. Dr. Müller'],
    tags: ['SQL', 'PostgreSQL', 'Database Design', 'NoSQL'],
    difficulty: 4,
    updatedAt: '2024-01-10',
    description: 'Deep dive into relational database management systems, SQL programming, database design principles, and introduction to NoSQL databases.',
    outcomes: [
      'Design normalized database schemas',
      'Write complex SQL queries including joins and subqueries',
      'Implement transactions and understand ACID properties',
      'Optimize database performance through indexing',
      'Compare relational and NoSQL database approaches'
    ]
  },
  {
    id: 'r-programming',
    title: 'R Programming',
    semester: 3,
    lecturers: ['Dr. Fischer', 'Prof. Dr. Bauer'],
    tags: ['R', 'Statistics', 'Data Analysis', 'Visualization'],
    difficulty: 3,
    updatedAt: '2024-01-12',
    description: 'Statistical programming with R, covering data manipulation, visualization, statistical analysis, and machine learning basics.',
    outcomes: [
      'Write efficient R code for data analysis',
      'Create professional visualizations with ggplot2',
      'Perform statistical tests and interpret results',
      'Handle large datasets with dplyr and tidyr',
      'Build basic predictive models'
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Fundamentals',
    semester: 1,
    lecturers: ['Prof. Dr. Klein'],
    tags: ['Marketing', 'Strategy', 'Consumer Behavior', 'Digital Marketing'],
    difficulty: 2,
    updatedAt: '2024-01-08',
    description: 'Introduction to marketing principles including market analysis, consumer behavior, branding, and digital marketing strategies.',
    outcomes: [
      'Analyze market segments and target audiences',
      'Develop marketing mix strategies (4Ps)',
      'Understand consumer decision-making processes',
      'Create basic digital marketing campaigns',
      'Evaluate marketing performance metrics'
    ]
  },
  {
    id: 'project-mgmt',
    title: 'Project Management',
    semester: 4,
    lecturers: ['Prof. Dr. Wagner', 'Mag. Huber'],
    tags: ['Agile', 'Scrum', 'Planning', 'Leadership'],
    difficulty: 2,
    updatedAt: '2024-01-05',
    description: 'Modern project management methodologies including Agile, Scrum, and traditional approaches. Covers planning, execution, and team leadership.',
    outcomes: [
      'Apply Agile and Scrum methodologies',
      'Create project plans and manage timelines',
      'Lead cross-functional project teams',
      'Manage project risks and stakeholders',
      'Use project management tools effectively'
    ]
  },
  {
    id: 'statistics',
    title: 'Statistics',
    semester: 1,
    lecturers: ['Prof. Dr. Bauer'],
    tags: ['Statistics', 'Probability', 'Hypothesis Testing', 'Math'],
    difficulty: 4,
    updatedAt: '2024-01-14',
    description: 'Foundation course in descriptive and inferential statistics, probability theory, and hypothesis testing for business applications.',
    outcomes: [
      'Calculate and interpret descriptive statistics',
      'Understand probability distributions',
      'Conduct hypothesis tests and interpret p-values',
      'Perform regression analysis',
      'Apply statistical concepts to business problems'
    ]
  }
];

export const getModuleById = (id: string): Module | undefined => {
  // Firebase: getDoc(doc(db, 'modules', id))
  return modules.find(m => m.id === id);
};

export const getModulesBySemester = (semester: number): Module[] => {
  // Firebase: query(collection(db, 'modules'), where('semester', '==', semester))
  return modules.filter(m => m.semester === semester);
};
