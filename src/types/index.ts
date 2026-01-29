// IMC Study Hub - Type Definitions
// These types will map to Firebase/Firestore collections when backend is integrated

export interface Module {
  id: string;
  title: string;
  semester: number;
  lecturers: string[];
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  updatedAt: string;
  description: string;
  outcomes: string[];
}

export interface Note {
  id: string;
  moduleId: string;
  title: string;
  topic: string;
  author: string;
  format: 'markdown' | 'pdf';
  upvotes: number;
  views: number;
  updatedAt: string;
  tags: string[];
  markdownContent: string;
}

export interface Paper {
  id: string;
  moduleId: string;
  title: string;
  semester: number;
  assessmentType: 'Midterm' | 'Final' | 'Retake' | 'Assignment';
  hasSolutions: boolean;
  topics: string[];
  tags: string[];
  uploadedAt: string;
}

export interface QAQuestion {
  id: string;
  moduleId: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  createdAt: string;
  author: string;
}

export interface PracticeSet {
  id: string;
  moduleId: string;
  title: string;
  topic: string;
  questionCount: number;
  popularity: number;
}

export interface PracticeQuestion {
  id: string;
  moduleId: string;
  topic: string;
  type: 'mcq' | 'short';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  date: string;
  type: 'Exam' | 'Assignment' | 'Quiz' | 'Project';
}
