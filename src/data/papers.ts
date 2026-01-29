import { Paper } from '@/types';

// Mock data - will be replaced with Firebase queries
// Firebase integration: collection(db, 'papers')

export const papers: Paper[] = [
  {
    id: 'paper-1',
    moduleId: 'web-tech',
    title: 'Web Technologies Final Exam 2023',
    semester: 4,
    assessmentType: 'Final',
    hasSolutions: true,
    topics: ['React', 'REST APIs', 'JavaScript'],
    tags: ['Final', 'Comprehensive', 'Solutions Available'],
    uploadedAt: '2024-01-10'
  },
  {
    id: 'paper-2',
    moduleId: 'web-tech',
    title: 'Web Technologies Midterm 2023',
    semester: 4,
    assessmentType: 'Midterm',
    hasSolutions: true,
    topics: ['HTML', 'CSS', 'JavaScript Basics'],
    tags: ['Midterm', 'Solutions Available'],
    uploadedAt: '2023-12-15'
  },
  {
    id: 'paper-3',
    moduleId: 'databases',
    title: 'Databases Final Exam Winter 2023',
    semester: 3,
    assessmentType: 'Final',
    hasSolutions: true,
    topics: ['SQL Queries', 'Normalization', 'ER Diagrams'],
    tags: ['Final', 'Comprehensive', 'Solutions Available'],
    uploadedAt: '2024-01-08'
  },
  {
    id: 'paper-4',
    moduleId: 'databases',
    title: 'Databases Midterm 2023',
    semester: 3,
    assessmentType: 'Midterm',
    hasSolutions: false,
    topics: ['SQL Basics', 'Table Design'],
    tags: ['Midterm', 'No Solutions'],
    uploadedAt: '2023-11-20'
  },
  {
    id: 'paper-5',
    moduleId: 'r-programming',
    title: 'R Programming Final 2023',
    semester: 4,
    assessmentType: 'Final',
    hasSolutions: true,
    topics: ['Data Analysis', 'ggplot2', 'dplyr'],
    tags: ['Final', 'Practical', 'Solutions Available'],
    uploadedAt: '2024-01-12'
  },
  {
    id: 'paper-6',
    moduleId: 'r-programming',
    title: 'R Programming Assignment 3',
    semester: 4,
    assessmentType: 'Assignment',
    hasSolutions: true,
    topics: ['Statistical Analysis', 'Visualization'],
    tags: ['Assignment', 'Practical'],
    uploadedAt: '2023-12-01'
  },
  {
    id: 'paper-7',
    moduleId: 'marketing',
    title: 'Marketing Fundamentals Final 2023',
    semester: 2,
    assessmentType: 'Final',
    hasSolutions: false,
    topics: ['Marketing Mix', 'Consumer Behavior', 'Strategy'],
    tags: ['Final', 'Theory-Heavy'],
    uploadedAt: '2024-01-05'
  },
  {
    id: 'paper-8',
    moduleId: 'marketing',
    title: 'Marketing Case Study Assignment',
    semester: 2,
    assessmentType: 'Assignment',
    hasSolutions: true,
    topics: ['Case Analysis', 'Strategy'],
    tags: ['Assignment', 'Case Study'],
    uploadedAt: '2023-11-28'
  },
  {
    id: 'paper-9',
    moduleId: 'project-mgmt',
    title: 'Project Management Final 2023',
    semester: 5,
    assessmentType: 'Final',
    hasSolutions: true,
    topics: ['Agile', 'Scrum', 'Risk Management'],
    tags: ['Final', 'Comprehensive'],
    uploadedAt: '2024-01-14'
  },
  {
    id: 'paper-10',
    moduleId: 'project-mgmt',
    title: 'PM Retake Exam 2023',
    semester: 5,
    assessmentType: 'Retake',
    hasSolutions: false,
    topics: ['Project Planning', 'Stakeholder Management'],
    tags: ['Retake', 'Second Chance'],
    uploadedAt: '2023-10-15'
  },
  {
    id: 'paper-11',
    moduleId: 'statistics',
    title: 'Statistics Final Exam 2023',
    semester: 2,
    assessmentType: 'Final',
    hasSolutions: true,
    topics: ['Hypothesis Testing', 'Regression', 'Probability'],
    tags: ['Final', 'Calculation-Heavy', 'Solutions Available'],
    uploadedAt: '2024-01-11'
  },
  {
    id: 'paper-12',
    moduleId: 'statistics',
    title: 'Statistics Midterm 2023',
    semester: 2,
    assessmentType: 'Midterm',
    hasSolutions: true,
    topics: ['Descriptive Statistics', 'Probability'],
    tags: ['Midterm', 'Solutions Available'],
    uploadedAt: '2023-11-10'
  }
];

export const getPaperById = (id: string): Paper | undefined => {
  return papers.find(p => p.id === id);
};

export const getPapersByModule = (moduleId: string): Paper[] => {
  return papers.filter(p => p.moduleId === moduleId);
};

export const getLatestPapers = (limit: number = 5): Paper[] => {
  return [...papers].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, limit);
};
