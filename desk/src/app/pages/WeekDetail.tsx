import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import KanbanBoard from '../components/KanbanBoard';
import TaskListView from '../components/TaskListView';
import DeliverablesView from '../components/DeliverablesView';
import TaskModal from '../components/TaskModal';
import CreateTaskModal from '../components/CreateTaskModal';
import FilterBar, { FilterState } from '../components/FilterBar';
import { mockWeeks } from '../data/mockData';
import { Task, TaskStatus, Week as WeekType } from '../types';
import {
  ArrowLeft,
  Plus,
  LayoutGrid,
  List,
  Package,
  Target,
  TrendingUp,
} from 'lucide-react';

type TabType = 'kanban' | 'list' | 'deliverables';

export default function WeekDetail() {
  const { weekId } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    days: [],
    categories: [],
    statuses: [],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Find the week (in a real app, this would come from state management or API)
  const [week, setWeek] = useState<WeekType | undefined>(
    mockWeeks.find((w) => w.id === weekId)
  );

  if (!week) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Week not found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return week.tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Day filter
      const matchesDay =
        filters.days.length === 0 || filters.days.includes(task.day);

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(task.category);

      // Status filter
      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(task.status);

      return matchesSearch && matchesDay && matchesCategory && matchesStatus;
    });
  }, [week.tasks, searchQuery, filters]);

  // Calculate stats
  const totalTasks = week.tasks.length;
  const completedTasks = week.tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = week.tasks.filter(
    (t) => t.status === 'in-progress'
  ).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Handle task status change (drag and drop)
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setWeek((prevWeek) => {
      if (!prevWeek) return prevWeek;
      return {
        ...prevWeek,
        tasks: prevWeek.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      };
    });
  };

  // Handle subtask toggle
  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    setWeek((prevWeek) => {
      if (!prevWeek) return prevWeek;
      return {
        ...prevWeek,
        tasks: prevWeek.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((st) =>
                  st.id === subtaskId ? { ...st, completed: !st.completed } : st
                ),
              }
            : task
        ),
      };
    });

    // Update selected task if it's open
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          subtasks: prev.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      });
    }
  };

  // Handle deliverable toggle
  const handleDeliverableToggle = (deliverableId: string) => {
    setWeek((prevWeek) => {
      if (!prevWeek) return prevWeek;
      return {
        ...prevWeek,
        deliverables: prevWeek.deliverables.map((d) =>
          d.id === deliverableId ? { ...d, completed: !d.completed } : d
        ),
      };
    });
  };

  // Handle task save (create or edit)
  const handleTaskSave = (taskData: Partial<Task>) => {
    setWeek((prevWeek) => {
      if (!prevWeek) return prevWeek;

      if (taskToEdit) {
        // Edit existing task
        return {
          ...prevWeek,
          tasks: prevWeek.tasks.map((task) =>
            task.id === taskToEdit.id ? { ...task, ...taskData } : task
          ),
        };
      } else {
        // Create new task
        return {
          ...prevWeek,
          tasks: [...prevWeek.tasks, taskData as Task],
        };
      }
    });

    setTaskToEdit(null);
    setShowCreateModal(false);
  };

  // Handle task delete
  const handleTaskDelete = () => {
    if (!selectedTask) return;

    setWeek((prevWeek) => {
      if (!prevWeek) return prevWeek;
      return {
        ...prevWeek,
        tasks: prevWeek.tasks.filter((task) => task.id !== selectedTask.id),
      };
    });

    setSelectedTask(null);
  };

  const tabs = [
    { id: 'kanban' as TabType, label: 'Kanban', icon: LayoutGrid },
    { id: 'list' as TabType, label: 'List', icon: List },
    { id: 'deliverables' as TabType, label: 'Deliverables', icon: Package },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search tasks..."
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-8">
            {/* Header */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {week.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Target className="w-5 h-5" />
                    <p>{week.goal}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Overall Progress
                      </span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-500/30"
                >
                  <Plus className="w-5 h-5" />
                  New Task
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalTasks}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {completedTasks}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <LayoutGrid className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {inProgressTasks}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab !== 'deliverables' && (
                <div className="text-sm text-gray-600">
                  Showing {filteredTasks.length} of {totalTasks} tasks
                </div>
              )}
            </div>

            {/* Filters (only for kanban and list views) */}
            {activeTab !== 'deliverables' && (
              <div className="mb-6">
                <FilterBar onFilterChange={setFilters} />
              </div>
            )}

            {/* Content */}
            <div>
              {activeTab === 'kanban' && (
                <KanbanBoard
                  tasks={filteredTasks}
                  onTaskClick={setSelectedTask}
                  onTaskStatusChange={handleTaskStatusChange}
                />
              )}

              {activeTab === 'list' && (
                <TaskListView
                  tasks={filteredTasks}
                  onTaskClick={setSelectedTask}
                />
              )}

              {activeTab === 'deliverables' && (
                <DeliverablesView
                  deliverables={week.deliverables}
                  onToggle={handleDeliverableToggle}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={() => {
            setTaskToEdit(selectedTask);
            setSelectedTask(null);
            setShowCreateModal(true);
          }}
          onDelete={handleTaskDelete}
          onSubtaskToggle={(subtaskId) =>
            handleSubtaskToggle(selectedTask.id, subtaskId)
          }
        />
      )}

      {/* Create/Edit Task Modal */}
      {showCreateModal && (
        <CreateTaskModal
          onClose={() => {
            setShowCreateModal(false);
            setTaskToEdit(null);
          }}
          onSave={handleTaskSave}
          weekId={week.id}
          initialData={taskToEdit || undefined}
        />
      )}
    </div>
  );
}
