import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import WeekCard from '../components/WeekCard';
import { mockWeeks } from '../data/mockData';
import { Plus, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter weeks based on search
  const filteredWeeks = mockWeeks.filter(week =>
    week.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    week.goal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate overall stats
  const totalTasks = mockWeeks.reduce((sum, week) => sum + week.tasks.length, 0);
  const completedTasks = mockWeeks.reduce(
    (sum, week) => sum + week.tasks.filter(t => t.status === 'done').length,
    0
  );
  const inProgressTasks = mockWeeks.reduce(
    (sum, week) => sum + week.tasks.filter(t => t.status === 'in-progress').length,
    0
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onSearchChange={setSearchQuery} searchPlaceholder="Search weeks..." />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                  <p className="text-gray-600">Track your weekly development plans and progress</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-500/30">
                  <Plus className="w-5 h-5" />
                  New Week
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Total</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{totalTasks}</p>
                <p className="text-sm text-gray-600">All Tasks</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Completed</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{completedTasks}</p>
                <p className="text-sm text-gray-600">
                  {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% of total
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Active</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{inProgressTasks}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>

            {/* Weeks Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Weeks</h2>
                <span className="text-sm text-gray-500">{filteredWeeks.length} weeks</span>
              </div>

              {filteredWeeks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWeeks.map((week) => (
                    <WeekCard key={week.id} week={week} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-500">No weeks found matching your search</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
