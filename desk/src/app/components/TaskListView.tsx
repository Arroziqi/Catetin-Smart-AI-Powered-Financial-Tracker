import { Task } from '../types';
import { Calendar, CheckSquare } from 'lucide-react';

interface TaskListViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  backend: { bg: 'bg-blue-50', text: 'text-blue-700' },
  frontend: { bg: 'bg-purple-50', text: 'text-purple-700' },
  auth: { bg: 'bg-green-50', text: 'text-green-700' },
  db: { bg: 'bg-orange-50', text: 'text-orange-700' },
  api: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  testing: { bg: 'bg-pink-50', text: 'text-pink-700' },
  devops: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
};

const statusColors: Record<string, { bg: string; text: string }> = {
  backlog: { bg: 'bg-gray-100', text: 'text-gray-700' },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700' },
  done: { bg: 'bg-green-100', text: 'text-green-700' },
};

export default function TaskListView({ tasks, onTaskClick }: TaskListViewProps) {
  // Group tasks by day
  const tasksByDay = tasks.reduce((acc, task) => {
    if (!acc[task.day]) {
      acc[task.day] = [];
    }
    acc[task.day].push(task);
    return acc;
  }, {} as Record<number, Task[]>);

  const days = Object.keys(tasksByDay)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {days.map((day) => {
        const dayTasks = tasksByDay[day];
        const completedCount = dayTasks.filter(t => t.status === 'done').length;

        return (
          <div key={day} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Day Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Day {day}</h3>
                    <p className="text-sm text-gray-600">
                      {completedCount}/{dayTasks.length} tasks completed
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="divide-y divide-gray-100">
              {dayTasks.map((task) => {
                const categoryStyle = categoryColors[task.category];
                const statusStyle = statusColors[task.status];
                const completedSubtasks = task.subtasks.filter(st => st.completed).length;

                return (
                  <div
                    key={task.id}
                    onClick={() => onTaskClick(task)}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Indicator */}
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            task.status === 'done'
                              ? 'bg-green-500'
                              : task.status === 'in-progress'
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      </div>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <span
                            className={`flex-shrink-0 px-2 py-1 ${statusStyle.bg} ${statusStyle.text} rounded text-xs font-medium`}
                          >
                            {task.status === 'in-progress' ? 'In Progress' : task.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {task.description}
                        </p>

                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className={`px-2 py-1 ${categoryStyle.bg} ${categoryStyle.text} rounded text-xs font-medium capitalize`}
                          >
                            {task.category}
                          </span>

                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium capitalize">
                            {task.priority} Priority
                          </span>

                          {task.subtasks.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <CheckSquare className="w-3 h-3" />
                              {completedSubtasks}/{task.subtasks.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {days.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No tasks found</p>
        </div>
      )}
    </div>
  );
}
