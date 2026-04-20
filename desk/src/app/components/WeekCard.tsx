import { Week } from '../types';
import { calculateWeekProgress, getTaskCounts } from '../data/mockData';
import { ArrowRight, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { Link } from 'react-router';

interface WeekCardProps {
  week: Week;
}

export default function WeekCard({ week }: WeekCardProps) {
  const progress = calculateWeekProgress(week);
  const { total, completed, inProgress } = getTaskCounts(week);

  return (
    <Link
      to={`/week/${week.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{week.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{week.goal}</p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
          <ArrowRight className="w-5 h-5 text-indigo-600" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded">
            <ListTodo className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-sm font-semibold text-gray-900">{total}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 rounded">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Done</p>
            <p className="text-sm font-semibold text-green-600">{completed}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-sm font-semibold text-blue-600">{inProgress}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
