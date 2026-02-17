import { Search, SlidersHorizontal, X } from 'lucide-react'
import Input from '../UI/Input'
import Select from '../UI/Select'
import Button from '../UI/Button'

/**
 * FilterBar Component
 * Search and filter controls for task lists
 */
function FilterBar({ 
  filters, 
  onFilterChange,
  onClearFilters
}) {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ]

  const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all' || filters.search

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <Select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            options={statusOptions}
            className="w-40"
          />
          <Select
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value })}
            options={priorityOptions}
            className="w-40"
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="px-3"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar
