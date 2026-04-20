import { Task, TaskPriority, TaskCategory } from '../types';
import { GripVertical, Calendar, Tag, AlertCircle } from 'lucide-react';
import { useDrag } from 'react-dnd';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const categoryColors: Record<TaskCategory, { bg: string; text: string; border: string }> = {
  backend: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  frontend: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  auth: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  db: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  api: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  testing: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  devops: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
};

const priorityConfig: Record<TaskPriority, { color: string; label: string }> = {
  low: { color: 'text-gray-500', label: 'Low' },
  medium: { color: 'text-yellow-600', label: 'Med' },
  high: { color: 'text-red-600', label: 'High' },
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const categoryStyle = categoryColors[task.category];
  const priorityStyle = priorityConfig[task.priority];

  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const hasSubtasks = task.subtasks.length > 0;

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all duration-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{task.title}</h4>
        </div>
      </div>

      {/* Tags and Labels */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Day Label */}
        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
          <Calendar className="w-3 h-3" />
          <span>Day {task.day}</span>
        </div>

        {/* Category Tag */}
        <div
          className={`flex items-center gap-1 px-2 py-1 ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} rounded text-xs font-medium`}
        >
          <Tag className="w-3 h-3" />
          <span className="capitalize">{task.category}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Subtasks Progress */}
        {hasSubtasks && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center bg-gray-50">
              <span className="text-[10px] font-medium">{completedSubtasks}</span>
            </div>
            <span>
              {completedSubtasks}/{task.subtasks.length}
            </span>
          </div>
        )}

        {/* Priority Indicator */}
        <div className={`flex items-center gap-1 ml-auto ${priorityStyle.color}`}>
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{priorityStyle.label}</span>
        </div>
      </div>
    </div>
  );
}
