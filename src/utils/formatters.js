/**
 * Formatting Utilities
 * Helper functions for formatting data display
 */

/**
 * Format date to readable string
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  const date = new Date(dateString)
  const options = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

/**
 * Format date relative to now (e.g., "2 days ago")
 * @param {string} dateString 
 * @returns {string}
 */
export const formatRelativeDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'Overdue'
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  return `Due in ${diffDays} days`
}

/**
 * Get status color for UI
 * @param {string} status 
 * @returns {string}
 */
export const getStatusColor = (status) => {
  const colors = {
    'todo': 'var(--gray-500)',
    'in-progress': 'var(--primary)',
    'completed': 'var(--success)'
  }
  return colors[status] || colors['todo']
}

/**
 * Get priority color for UI
 * @param {string} priority 
 * @returns {string}
 */
export const getPriorityColor = (priority) => {
  const colors = {
    'low': 'var(--gray-400)',
    'medium': 'var(--warning)',
    'high': 'var(--error)'
  }
  return colors[priority] || colors['low']
}

/**
 * Capitalize first letter
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
