import { Week, Task, Deliverable } from '../types';

export const mockWeeks: Week[] = [
  {
    id: 'week-1',
    name: 'Foundation (Backend Core + Basic Web)',
    goal: 'User bisa login, input transaksi manual, dan melihat data di dashboard',
    tasks: [
      {
        id: 'w1-d1',
        title: 'Project Setup',
        description: 'Initialize project dan setup basic backend',
        day: 1,
        status: 'done',
        category: 'backend',
        priority: 'high',
        subtasks: [
          { id: 'st-1', title: 'Initialize Go project', completed: true },
          { id: 'st-2', title: 'Setup folder structure', completed: true },
          { id: 'st-3', title: 'Install Fiber/Gin', completed: true },
          { id: 'st-4', title: 'Setup HTTP server', completed: true },
          { id: 'st-5', title: 'Create /health endpoint', completed: true },
          { id: 'st-6', title: 'Setup .env', completed: true },
          { id: 'st-7', title: 'Init Git repo', completed: true },
        ],
        weekId: 'week-1',
      },
      {
        id: 'w1-d2',
        title: 'Database Setup',
        description: 'Setup PostgreSQL dan schema',
        day: 2,
        status: 'done',
        category: 'db',
        priority: 'high',
        subtasks: [
          { id: 'st-8', title: 'Setup PostgreSQL', completed: true },
          { id: 'st-9', title: 'Design schema', completed: true },
          { id: 'st-10', title: 'DB connection', completed: true },
          { id: 'st-11', title: 'Migration setup', completed: true },
          { id: 'st-12', title: 'Create tables', completed: true },
        ],
        weekId: 'week-1',
      },
      {
        id: 'w1-d3',
        title: 'Auth Register',
        description: 'Implement register endpoint',
        day: 3,
        status: 'in-progress',
        category: 'auth',
        priority: 'high',
        subtasks: [
          { id: 'st-13', title: 'Create user model', completed: true },
          { id: 'st-14', title: 'POST /register', completed: true },
          { id: 'st-15', title: 'Hash password', completed: true },
          { id: 'st-16', title: 'Validate input', completed: false },
        ],
        weekId: 'week-1',
      },
      {
        id: 'w1-d4',
        title: 'Auth Login',
        description: 'Implement login + JWT',
        day: 4,
        status: 'in-progress',
        category: 'auth',
        priority: 'high',
        subtasks: [
          { id: 'st-17', title: 'POST /login', completed: true },
          { id: 'st-18', title: 'Compare password', completed: true },
          { id: 'st-19', title: 'Generate JWT', completed: false },
          { id: 'st-20', title: 'Auth middleware', completed: false },
        ],
        weekId: 'week-1',
      },
      {
        id: 'w1-d5',
        title: 'Transaction CRUD',
        description: 'Implement CRUD transaksi',
        day: 5,
        status: 'backlog',
        category: 'backend',
        priority: 'high',
        subtasks: [
          { id: 'st-21', title: 'Create transaction', completed: false },
          { id: 'st-22', title: 'Get transactions', completed: false },
          { id: 'st-23', title: 'Update transaction', completed: false },
          { id: 'st-24', title: 'Delete transaction', completed: false },
        ],
        weekId: 'week-1',
      },
      {
        id: 'w1-d6',
        title: 'Filtering & Aggregation',
        description: 'Summary endpoint dan filter',
        day: 6,
        status: 'backlog',
        category: 'backend',
        priority: 'medium',
        subtasks: [
          { id: 'st-25', title: 'Filter by date', completed: false },
          { id: 'st-26', title: 'Total income', completed: false },
          { id: 'st-27', title: 'Total expense', completed: false },
          { id: 'st-28', title: 'GET /summary', completed: false },
        ],
        weekId: 'week-1',
      },
      {
        id: 'w1-d7',
        title: 'Frontend Basic',
        description: 'Setup Next.js dan dashboard',
        day: 7,
        status: 'backlog',
        category: 'frontend',
        priority: 'medium',
        subtasks: [
          { id: 'st-29', title: 'Init Next.js', completed: false },
          { id: 'st-30', title: 'Login UI', completed: false },
          { id: 'st-31', title: 'Dashboard page', completed: false },
        ],
        weekId: 'week-1',
      },
    ],
    deliverables: [
      { id: 'del-1', title: 'Backend Go API running', completed: false },
      { id: 'del-2', title: 'Auth system working', completed: false },
      { id: 'del-3', title: 'Transaction CRUD working', completed: false },
    ],
  },

  {
    id: 'week-2',
    name: 'AI Integration + Core Experience',
    goal: 'User bisa scan dan dapat AI insight',
    tasks: [
      {
        id: 'w2-d1',
        title: 'AI Service Setup',
        description: 'Setup AI microservice',
        day: 1,
        status: 'backlog',
        category: 'backend',
        priority: 'high',
        subtasks: [
          { id: 'st-40', title: 'Create AI service', completed: false },
          { id: 'st-41', title: 'Define API contract', completed: false },
        ],
        weekId: 'week-2',
      },
      {
        id: 'w2-d2',
        title: 'OCR Integration',
        description: 'Scan receipt pakai OCR',
        day: 2,
        status: 'backlog',
        category: 'ai',
        priority: 'high',
        subtasks: [
          { id: 'st-42', title: 'Setup Tesseract', completed: false },
          { id: 'st-43', title: 'Extract text', completed: false },
        ],
        weekId: 'week-2',
      },
      {
        id: 'w2-d5',
        title: 'Ollama + LangChain',
        description: 'Setup LLM',
        day: 5,
        status: 'backlog',
        category: 'ai',
        priority: 'high',
        subtasks: [
          { id: 'st-44', title: 'Install Ollama', completed: false },
          { id: 'st-45', title: 'Connect LangChain', completed: false },
        ],
        weekId: 'week-2',
      },
    ],
    deliverables: [
      { id: 'del-4', title: 'AI service running', completed: false },
      { id: 'del-5', title: 'Insight generation working', completed: false },
    ],
  },

  {
    id: 'week-3',
    name: 'Mobile + Polish + Deployment',
    goal: 'App siap demo dan deployed',
    tasks: [
      {
        id: 'w3-d1',
        title: 'Mobile Setup',
        description: 'Setup Android Kotlin',
        day: 1,
        status: 'backlog',
        category: 'mobile',
        priority: 'high',
        subtasks: [
          { id: 'st-50', title: 'Init Android project', completed: false },
          { id: 'st-51', title: 'Setup MVVM', completed: false },
        ],
        weekId: 'week-3',
      },
      {
        id: 'w3-d7',
        title: 'Deployment',
        description: 'Deploy semua service',
        day: 7,
        status: 'backlog',
        category: 'devops',
        priority: 'high',
        subtasks: [
          { id: 'st-52', title: 'Deploy backend', completed: false },
          { id: 'st-53', title: 'Deploy frontend', completed: false },
          { id: 'st-54', title: 'Test production', completed: false },
        ],
        weekId: 'week-3',
      },
    ],
    deliverables: [
      { id: 'del-6', title: 'Mobile app APK', completed: false },
      { id: 'del-7', title: 'Deployment live', completed: false },
    ],
  },
];

// Helper function to calculate week progress
export const calculateWeekProgress = (week: Week): number => {
  if (week.tasks.length === 0) return 0;
  const completedTasks = week.tasks.filter(task => task.status === 'done').length;
  return Math.round((completedTasks / week.tasks.length) * 100);
};

// Helper function to get task counts
export const getTaskCounts = (week: Week) => {
  const total = week.tasks.length;
  const completed = week.tasks.filter(task => task.status === 'done').length;
  const inProgress = week.tasks.filter(task => task.status === 'in-progress').length;
  const backlog = week.tasks.filter(task => task.status === 'backlog').length;

  return { total, completed, inProgress, backlog };
};
