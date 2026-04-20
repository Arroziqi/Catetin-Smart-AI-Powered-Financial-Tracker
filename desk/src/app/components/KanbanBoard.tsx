import { Task, TaskStatus } from '../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export default function KanbanBoard({ tasks, onTaskClick, onTaskStatusChange }: KanbanBoardProps) {
  const backlogTasks = tasks.filter(task => task.status === 'backlog');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      <KanbanColumn
        title="Backlog"
        status="backlog"
        tasks={backlogTasks}
        onTaskClick={onTaskClick}
        onTaskDrop={onTaskStatusChange}
      />
      <KanbanColumn
        title="In Progress"
        status="in-progress"
        tasks={inProgressTasks}
        onTaskClick={onTaskClick}
        onTaskDrop={onTaskStatusChange}
      />
      <KanbanColumn
        title="Done"
        status="done"
        tasks={doneTasks}
        onTaskClick={onTaskClick}
        onTaskDrop={onTaskStatusChange}
      />
    </div>
  );
}
