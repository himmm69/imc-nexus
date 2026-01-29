import { PracticeSet, PracticeQuestion, QAQuestion, Assessment } from '@/types';

// Mock Practice Sets
export const practiceSets: PracticeSet[] = [
  {
    id: 'ps-1',
    moduleId: 'web-tech',
    title: 'React Fundamentals Quiz',
    topic: 'React',
    questionCount: 15,
    popularity: 234
  },
  {
    id: 'ps-2',
    moduleId: 'web-tech',
    title: 'JavaScript Essentials',
    topic: 'JavaScript',
    questionCount: 20,
    popularity: 189
  },
  {
    id: 'ps-3',
    moduleId: 'databases',
    title: 'SQL Query Mastery',
    topic: 'SQL',
    questionCount: 25,
    popularity: 312
  },
  {
    id: 'ps-4',
    moduleId: 'statistics',
    title: 'Hypothesis Testing Practice',
    topic: 'Hypothesis Testing',
    questionCount: 10,
    popularity: 156
  },
  {
    id: 'ps-5',
    moduleId: 'r-programming',
    title: 'ggplot2 Visualization Quiz',
    topic: 'Data Visualization',
    questionCount: 12,
    popularity: 98
  }
];

// Mock Practice Questions
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'pq-1',
    moduleId: 'web-tech',
    topic: 'React',
    type: 'mcq',
    question: 'What hook is used for side effects in React functional components?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 'useEffect',
    explanation: 'useEffect is the hook designed for handling side effects like data fetching, subscriptions, or DOM manipulation in functional components.'
  },
  {
    id: 'pq-2',
    moduleId: 'web-tech',
    topic: 'React',
    type: 'mcq',
    question: 'Which of the following is NOT a rule of hooks?',
    options: [
      'Only call hooks at the top level',
      'Only call hooks from React functions',
      'Hooks can be called conditionally',
      'Custom hooks should start with "use"'
    ],
    correctAnswer: 'Hooks can be called conditionally',
    explanation: 'Hooks must NOT be called conditionally. They must always be called in the same order on every render.'
  },
  {
    id: 'pq-3',
    moduleId: 'databases',
    topic: 'SQL',
    type: 'mcq',
    question: 'Which SQL clause is used to filter rows after grouping?',
    options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
    correctAnswer: 'HAVING',
    explanation: 'HAVING is used to filter groups after GROUP BY, while WHERE filters individual rows before grouping.'
  },
  {
    id: 'pq-4',
    moduleId: 'databases',
    topic: 'SQL',
    type: 'short',
    question: 'What does ACID stand for in database transactions?',
    correctAnswer: 'Atomicity, Consistency, Isolation, Durability',
    explanation: 'ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid states), Isolation (concurrent transactions don\'t interfere), Durability (committed changes persist).'
  },
  {
    id: 'pq-5',
    moduleId: 'statistics',
    topic: 'Hypothesis Testing',
    type: 'mcq',
    question: 'A p-value of 0.03 with α = 0.05 means:',
    options: [
      'Fail to reject the null hypothesis',
      'Reject the null hypothesis',
      'Accept the alternative hypothesis with certainty',
      'The test is inconclusive'
    ],
    correctAnswer: 'Reject the null hypothesis',
    explanation: 'When p-value (0.03) < α (0.05), we reject the null hypothesis. This suggests statistical significance, though not proof of the alternative.'
  }
];

// Mock Q&A Questions
export const qaQuestions: QAQuestion[] = [
  {
    id: 'qa-1',
    moduleId: 'web-tech',
    title: 'How to handle form validation in React?',
    body: 'I\'m trying to implement form validation in my React app. Should I use a library like react-hook-form or build custom validation? What are the best practices?',
    tags: ['React', 'Forms', 'Validation'],
    votes: 23,
    createdAt: '2024-01-14',
    author: 'StudentA'
  },
  {
    id: 'qa-2',
    moduleId: 'databases',
    title: 'When to use indexes in PostgreSQL?',
    body: 'I understand indexes speed up queries, but when should I actually create them? Are there downsides to having too many indexes?',
    tags: ['PostgreSQL', 'Indexes', 'Performance'],
    votes: 31,
    createdAt: '2024-01-12',
    author: 'StudentB'
  },
  {
    id: 'qa-3',
    moduleId: 'r-programming',
    title: 'Difference between <- and = in R?',
    body: 'I\'ve seen both <- and = used for assignment in R. Is there a difference? Which one should I use?',
    tags: ['R', 'Syntax', 'Basics'],
    votes: 18,
    createdAt: '2024-01-10',
    author: 'StudentC'
  },
  {
    id: 'qa-4',
    moduleId: 'statistics',
    title: 'Type I vs Type II errors explained?',
    body: 'Can someone explain the difference between Type I and Type II errors with a practical example?',
    tags: ['Statistics', 'Errors', 'Hypothesis Testing'],
    votes: 45,
    createdAt: '2024-01-08',
    author: 'StudentD'
  }
];

// Mock Upcoming Assessments
export const assessments: Assessment[] = [
  {
    id: 'assess-1',
    moduleId: 'web-tech',
    title: 'Web Technologies Final Exam',
    date: '2024-02-15',
    type: 'Exam'
  },
  {
    id: 'assess-2',
    moduleId: 'databases',
    title: 'Database Project Submission',
    date: '2024-02-08',
    type: 'Project'
  },
  {
    id: 'assess-3',
    moduleId: 'statistics',
    title: 'Statistics Midterm',
    date: '2024-02-01',
    type: 'Exam'
  },
  {
    id: 'assess-4',
    moduleId: 'r-programming',
    title: 'R Programming Quiz 3',
    date: '2024-01-25',
    type: 'Quiz'
  },
  {
    id: 'assess-5',
    moduleId: 'marketing',
    title: 'Marketing Case Study Due',
    date: '2024-01-22',
    type: 'Assignment'
  }
];

export const getTopPracticeSets = (limit: number = 5): PracticeSet[] => {
  return [...practiceSets].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
};

export const getPracticeQuestionsByModule = (moduleId: string): PracticeQuestion[] => {
  return practiceQuestions.filter(q => q.moduleId === moduleId);
};

export const getQAByModule = (moduleId: string): QAQuestion[] => {
  return qaQuestions.filter(q => q.moduleId === moduleId);
};

export const getUpcomingAssessments = (): Assessment[] => {
  return [...assessments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
