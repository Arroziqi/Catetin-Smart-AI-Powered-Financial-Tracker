import { Deliverable } from '../types';
import { CheckCircle2, Circle, Package } from 'lucide-react';

interface DeliverablesViewProps {
  deliverables: Deliverable[];
  onToggle: (deliverableId: string) => void;
}

export default function DeliverablesView({ deliverables, onToggle }: DeliverablesViewProps) {
  const completedCount = deliverables.filter(d => d.completed).length;
  const progress = deliverables.length > 0 ? (completedCount / deliverables.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Package className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Deliverables Progress</h3>
            <p className="text-sm text-gray-600">
              {completedCount} of {deliverables.length} completed
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-indigo-600">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Week Deliverables</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {deliverables.map((deliverable) => (
            <label
              key={deliverable.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <div className="flex-shrink-0">
                {deliverable.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors" />
                )}
              </div>

              <div className="flex-1">
                <input
                  type="checkbox"
                  checked={deliverable.completed}
                  onChange={() => onToggle(deliverable.id)}
                  className="sr-only"
                />
                <p
                  className={`font-medium transition-all ${
                    deliverable.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-900'
                  }`}
                >
                  {deliverable.title}
                </p>
              </div>

              {deliverable.completed && (
                <span className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Completed
                </span>
              )}
            </label>
          ))}
        </div>

        {deliverables.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No deliverables defined for this week</p>
          </div>
        )}
      </div>
    </div>
  );
}
