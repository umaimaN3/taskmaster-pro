import { createContext, useContext, useReducer, useCallback } from 'react'
import { taskService } from '../services/taskService'

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
    search: ''
  }
}

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_FILTERS: 'SET_FILTERS'
}

// Reducer function - pure function to handle state updates
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null }

    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload }

    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, loading: false }

    case ACTIONS.ADD_TASK:
      return { 
        ...state, 
        tasks: [action.payload, ...state.tasks],
        loading: false 
      }

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false
      }

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        loading: false
      }

    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } }

    default:
      return state
  }
}

// Create context
const TaskContext = createContext(null)

/**
 * TaskProvider Component
 * Provides global state and actions to all child components
 * Uses useReducer for predictable state updates
 */
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Async action: Fetch all tasks
  const fetchTasks = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const tasks = await taskService.getAll()
      dispatch({ type: ACTIONS.SET_TASKS, payload: tasks })
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
    }
  }, [])

  // Async action: Create task
  const createTask = useCallback(async (taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const newTask = await taskService.create(taskData)
      dispatch({ type: ACTIONS.ADD_TASK, payload: newTask })
      return newTask
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    }
  }, [])

  // Async action: Update task
  const updateTask = useCallback(async (id, taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const updatedTask = await taskService.update(id, taskData)
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask })
      return updatedTask
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    }
  }, [])

  // Async action: Delete task
  const deleteTask = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      await taskService.delete(id)
      dispatch({ type: ACTIONS.DELETE_TASK, payload: id })
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    }
  }, [])

  // Update filters
  const setFilters = useCallback((filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters })
  }, [])

  // Get filtered tasks
  const getFilteredTasks = useCallback(() => {
    return state.tasks.filter(task => {
      const matchesStatus = state.filters.status === 'all' || task.status === state.filters.status
      const matchesPriority = state.filters.priority === 'all' || task.priority === state.filters.priority
      const matchesSearch = !state.filters.search || 
        task.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(state.filters.search.toLowerCase())

      return matchesStatus && matchesPriority && matchesSearch
    })
  }, [state.tasks, state.filters])

  // Get task statistics for dashboard
  const getStats = useCallback(() => {
    const total = state.tasks.length
    const completed = state.tasks.filter(t => t.status === 'completed').length
    const inProgress = state.tasks.filter(t => t.status === 'in-progress').length
    const todo = state.tasks.filter(t => t.status === 'todo').length
    const highPriority = state.tasks.filter(t => t.priority === 'high').length

    return { total, completed, inProgress, todo, highPriority }
  }, [state.tasks])

  const value = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
    getFilteredTasks,
    getStats
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

/**
 * Custom hook to use TaskContext
 * Throws error if used outside of TaskProvider
 */
export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}