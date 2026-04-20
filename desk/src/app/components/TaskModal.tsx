import { Task, TaskStatus, TaskPriority, TaskCategory } from '../types';
import { X, Calendar, Tag, AlertCircle, Trash2, Edit2, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSubtaskToggle: (subtaskId: string) => void;
}

const categoryColors: Record<TaskCategory, { bg: string; text: string }> = {
  backend: { bg: 'bg-blue-50', text: 'text-blue-700' },
  frontend: { bg: 'bg-purple-50', text: 'text-purple-700' },
  auth: { bg: 'bg-green-50', text: 'text-green-700' },
  db: { bg: 'bg-orange-50', text: 'text-orange-700' },
  api: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  testing: { bg: 'bg-pink-50', text: 'text-pink-700' },
  devops: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
};

const statusLabels: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  'in-progress': 'In Progress',
  done: 'Done',
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function TaskModal({ task, onClose, onEdit, onDelete, onSubtaskToggle }: TaskModalProps) {
  const categoryStyle = categoryColors[task.category];
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{task.title}</h2>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 ${categoryStyle.bg} ${categoryStyle.text} rounded text-sm font-medium capitalize`}>
                {task.category}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                {statusLabels[task.status]}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Day</span>
              </div>
              <p className="font-medium text-gray-900">Day {task.day}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Priority</span>
              </div>
              <p className="font-medium text-gray-900 capitalize">{priorityLabels[task.priority]}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Tag className="w-4 h-4" />
                <span>Category</span>
              </div>
              <p className="font-medium text-gray-900 capitalize">{task.category}</p>
            </div>
          </div>

          {/* Subtasks */}
          {task.subtasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Subtasks
                </h3>
                <span className="text-sm text-gray-500">
                  {completedSubtasks}/{task.subtasks.length} completed
                </span>
              </div>
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <label
                    key={subtask.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => onSubtaskToggle(subtask.id)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span
                      className={`flex-1 ${
                        subtask.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete Task
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}
