/**
 * Validation Utilities
 * Reusable validation functions for forms
 */

export const validators = {
  /**
   * Check if value is not empty
   * @param {string} value 
   * @param {string} fieldName 
   * @returns {string|null} Error message or null
   */
  required: (value, fieldName = 'This field') => {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`
    }
    return null
  },

  /**
   * Check minimum length
   * @param {string} value 
   * @param {number} min 
   * @param {string} fieldName 
   * @returns {string|null}
   */
  minLength: (value, min, fieldName = 'This field') => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`
    }
    return null
  },

  /**
   * Check maximum length
   * @param {string} value 
   * @param {number} max 
   * @param {string} fieldName 
   * @returns {string|null}
   */
  maxLength: (value, max, fieldName = 'This field') => {
    if (value && value.length > max) {
      return `${fieldName} must be less than ${max} characters`
    }
    return null
  },

  /**
   * Validate email format
   * @param {string} value 
   * @returns {string|null}
   */
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  /**
   * Validate date is not in past
   * @param {string} dateString 
   * @returns {string|null}
   */
  futureDate: (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) {
      return 'Due date cannot be in the past'
    }
    return null
  }
}

/**
 * Validate task form data
 * @param {Object} values - Form values
 * @returns {Object} Errors object (empty if valid)
 */
export const validateTaskForm = (values) => {
  const errors = {}

  const titleError = validators.required(values.title, 'Title') || 
                     validators.minLength(values.title, 3, 'Title') ||
                     validators.maxLength(values.title, 100, 'Title')
  if (titleError) errors.title = titleError

  const descError = validators.maxLength(values.description, 500, 'Description')
  if (descError) errors.description = descError

  const dateError = validators.futureDate(values.dueDate)
  if (dateError) errors.dueDate = dateError

  return errors
}
