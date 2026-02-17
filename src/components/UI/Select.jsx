import { forwardRef } from 'react'
import clsx from 'clsx'

/**
 * Select Component
 * Dropdown select with label and error handling
 */
const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select an option',
  className,
  id,
  ...props
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substr(2, 9)

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          'block w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white',
          error 
            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
        )}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
