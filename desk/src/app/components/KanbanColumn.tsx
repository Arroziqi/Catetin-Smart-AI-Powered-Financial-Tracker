import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';
import { CheckCircle2, Clock, Inbox } from 'lucide-react';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDrop: (taskId: string, newStatus: TaskStatus) => void;
}

const statusConfig: Record<TaskStatus, { icon: any; color: string; bgColor: string }> = {
  backlog: {
    icon: Inbox,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  'in-progress': {
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  done: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
};

export default function KanbanColumn({ title, status, tasks, onTaskClick, onTaskDrop }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { task: Task }) => {
      if (item.task.status !== status) {
        onTaskDrop(item.task.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 ${config.bgColor} rounded`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="ml-auto text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={drop}
        className={`min-h-[500px] p-3 rounded-lg transition-colors ${
          isOver ? 'bg-indigo-50 border-2 border-dashed border-indigo-300' : 'bg-gray-50 border-2 border-transparent'
        }`}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              No tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
