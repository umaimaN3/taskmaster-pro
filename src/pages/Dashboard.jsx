import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import StatsCard from '../components/Data/StatsCard'
import TaskCard from '../components/Data/TaskCard'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import EmptyState from '../components/UI/EmptyState'
import DeleteConfirmationModal from '../components/Data/DeleteConfirmationModal'
import { useState } from 'react'

/**
 * Dashboard Page
 * Main overview page showing statistics and recent tasks
 * First page users see after login
 */
function Dashboard() {
  const navigate = useNavigate()
  const { 
    tasks, 
    loading, 
    error, 
    fetchTasks, 
    getStats,
    deleteTask 
  } = useTasks()

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: '' })

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const stats = getStats()
  const recentTasks = tasks.slice(0, 5)
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').slice(0, 3)

  const handleDelete = async () => {
    if (!deleteModal.taskId) return
    try {
      await deleteTask(deleteModal.taskId)
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })
    } catch (err) {
      // Error handled by context
    }
  }

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load dashboard</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <Button onClick={fetchTasks}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your task overview.</p>
        </div>
        <Button onClick={() => navigate('/tasks/new')}>
          <ListTodo className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          color="indigo"
          trend={12}
          trendLabel="vs last week"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          color="green"
          trend={8}
          trendLabel="vs last week"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="High Priority"
          value={stats.highPriority}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <button 
                onClick={() => navigate('/tasks')}
                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(id) => navigate(`/tasks/edit/${id}`)}
                    onDelete={(id) => setDeleteModal({ 
                      isOpen: true, 
                      taskId: id, 
                      taskTitle: task.title 
                    })}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No tasks yet"
                description="Create your first task to get started"
                actionLabel="Create Task"
                onAction={() => navigate('/tasks/new')}
              />
            )}
          </Card>
        </div>

        {/* Sidebar: High Priority & Quick Stats */}
        <div className="space-y-6">
          {/* High Priority Alert */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              High Priority
            </h2>

            {highPriorityTasks.length > 0 ? (
              <div className="space-y-3">
                {highPriorityTasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => navigate(`/tasks/edit/${task.id}`)}
                    className="p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                  >
                    <p className="font-medium text-red-900 text-sm">{task.title}</p>
                    <p className="text-xs text-red-600 mt-1">
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No high priority tasks
              </p>
            )}
          </Card>

          {/* Quick Tip */}
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
            <Calendar className="w-8 h-8 mb-3 opacity-80" />
            <h3 className="font-semibold mb-1">Pro Tip</h3>
            <p className="text-sm opacity-90 mb-4">
              Break large tasks into smaller subtasks to track progress more effectively.
            </p>
            <button 
              onClick={() => navigate('/tasks')}
              className="text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              Manage Tasks
            </button>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
        onConfirm={handleDelete}
        itemName={deleteModal.taskTitle}
      />
    </div>
  )
}

export default Dashboard
