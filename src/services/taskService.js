/**
 * Task Service - API Integration Layer
 * Simulates API calls with localStorage persistence
 * Can be easily swapped with real HTTP requests (axios/fetch)
 */

const STORAGE_KEY = 'taskmaster_tasks'

// Simulate network delay for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

// Get tasks from localStorage
const getStoredTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// Initialize with sample data if empty
const initializeData = () => {
  const existing = getStoredTasks()
  if (existing.length === 0) {
    const sampleTasks = [
      {
        id: generateId(),
        title: 'Design System Architecture',
        description: 'Create comprehensive design system documentation and component library',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        assignee: 'Sarah Chen'
      },
      {
        id: generateId(),
        title: 'API Integration',
        description: 'Integrate REST API endpoints with frontend components',
        status: 'todo',
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        assignee: 'Mike Johnson'
      },
      {
        id: generateId(),
        title: 'User Authentication',
        description: 'Implement JWT-based authentication and authorization',
        status: 'completed',
        priority: 'medium',
        dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        assignee: 'Emma Wilson'
      },
      {
        id: generateId(),
        title: 'Performance Optimization',
        description: 'Optimize bundle size and implement code splitting',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        assignee: 'David Lee'
      },
      {
        id: generateId(),
        title: 'Unit Testing',
        description: 'Write comprehensive unit tests for all components',
        status: 'in-progress',
        priority: 'low',
        dueDate: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        assignee: 'Lisa Park'
      }
    ]
    saveTasks(sampleTasks)
  }
}

// Initialize on load
initializeData()

export const taskService = {
  /**
   * Get all tasks
   * @returns {Promise<Array>} Array of tasks
   */
  async getAll() {
    await delay(600) // Simulate network latency
    return getStoredTasks()
  },

  /**
   * Get single task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Task object
   */
  async getById(id) {
    await delay(400)
    const tasks = getStoredTasks()
    const task = tasks.find(t => t.id === id)
    if (!task) throw new Error('Task not found')
    return task
  },

  /**
   * Create new task
   * @param {Object} taskData - Task data without ID
   * @returns {Promise<Object>} Created task with ID
   */
  async create(taskData) {
    await delay(800)
    const tasks = getStoredTasks()
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    tasks.unshift(newTask)
    saveTasks(tasks)
    return newTask
  },

  /**
   * Update existing task
   * @param {string} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated task
   */
  async update(id, updates) {
    await delay(600)
    const tasks = getStoredTasks()
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')

    const updatedTask = { ...tasks[index], ...updates }
    tasks[index] = updatedTask
    saveTasks(tasks)
    return updatedTask
  },

  /**
   * Delete task
   * @param {string} id - Task ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await delay(500)
    const tasks = getStoredTasks()
    const filtered = tasks.filter(t => t.id !== id)
    if (filtered.length === tasks.length) throw new Error('Task not found')
    saveTasks(filtered)
  }
}