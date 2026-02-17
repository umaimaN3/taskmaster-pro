import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, List, AlertCircle } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import TaskCard from '../components/Data/TaskCard'
import FilterBar from '../components/Data/FilterBar'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import EmptyState from '../components/UI/EmptyState'
import DeleteConfirmationModal from '../components/Data/DeleteConfirmationModal'

/**
 * TaskList Page
 * Full task management interface with filtering and search
 * Supports both grid and list view modes
 */
function TaskList() {
  const navigate = useNavigate()
  const { 
    loading, 
    error, 
    filters, 
    fetchTasks, 
    setFilters, 
    getFilteredTasks,
    deleteTask 
  } = useTasks()

  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: '' })

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const filteredTasks = getFilteredTasks()

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({ status: 'all', priority: 'all', search: '' })
  }

  const handleDelete = async () => {
    if (!deleteModal.taskId) return
    try {
      await deleteTask(deleteModal.taskId)
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })
    } catch (err) {
      // Error handled by context
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
          </p>
        </div>
        <Button onClick={() => navigate('/tasks/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* View Toggle & Loading */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {loading && (
          <span className="text-sm text-gray-500">Updating...</span>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Task Grid/List */}
      {loading && filteredTasks.length === 0 ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
          }
        `}>
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              view={viewMode}
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
          title="No tasks found"
          description={
            filters.search || filters.status !== 'all' || filters.priority !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first task'
          }
          actionLabel="Create Task"
          onAction={() => navigate('/tasks/new')}
        />
      )}

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

export default TaskList
