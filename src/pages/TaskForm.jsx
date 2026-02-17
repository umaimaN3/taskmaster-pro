import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { taskService } from '../services/taskService'
import { validateTaskForm } from '../utils/validators'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Select from '../components/UI/Select'
import LoadingSpinner from '../components/UI/LoadingSpinner'

/**
 * TaskForm Page
 * Handles both creating new tasks and editing existing ones
 * Form validation and error handling included
 */
function TaskForm() {
  const navigate = useNavigate()
  const { id } = useParams() // undefined for new task, task ID for edit
  const isEditMode = Boolean(id)

  const { createTask, updateTask, loading: contextLoading } = useTasks()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignee: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditMode)

  // Fetch existing task data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadTask = async () => {
        try {
          const task = await taskService.getById(id)
          setFormData({
            title: task.title,
            description: task.description || '',
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            assignee: task.assignee || ''
          })
        } catch (err) {
          alert('Failed to load task')
          navigate('/tasks')
        } finally {
          setFetchLoading(false)
        }
      }
      loadTask()
    }
  }, [id, isEditMode, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateTaskForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      if (isEditMode) {
        await updateTask(id, formData)
      } else {
        await createTask(formData)
      }
      navigate('/tasks')
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save task' })
    } finally {
      setIsLoading(false)
    }
  }

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ]

  if (fetchLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading task..." />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Task' : 'New Task'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isEditMode ? 'Update task details' : 'Create a new task to track'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Enter task title"
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Add task description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
              required
            />
            <Select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              options={priorityOptions}
              required
            />
          </div>

          {/* Due Date & Assignee Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              error={errors.dueDate}
            />
            <Input
              label="Assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Assign to..."
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading || contextLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditMode ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default TaskForm
