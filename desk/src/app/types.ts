export type TaskStatus = 'backlog' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'backend' | 'frontend' | 'auth' | 'db' | 'api' | 'testing' | 'devops' | 'mobile' | 'ai';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  day: number; // 1-7
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  subtasks: Subtask[];
  weekId: string;
}

export interface Deliverable {
  id: string;
  title: string;
  completed: boolean;
}

export interface Week {
  id: string;
  name: string;
  goal: string;
  tasks: Task[];
  deliverables: Deliverable[];
}
