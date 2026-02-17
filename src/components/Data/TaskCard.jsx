import { Calendar, User, Edit2, Trash2 } from 'lucide-react'
import Card from '../UI/Card'
import Badge from '../UI/Badge'
import { formatDate, formatRelativeDate, getStatusColor, getPriorityColor, capitalize } from '../../utils/formatters'

/**
 * TaskCard Component
 * Displays individual task information in a card format
 * Used in task lists and grids
 */
function TaskCard({ 
  task, 
  onEdit, 
  onDelete,
  view = 'list' // 'list' or 'grid'
}) {
  const statusColors = {
    'todo': 'gray',
    'in-progress': 'blue',
    'completed': 'green'
  }

  const priorityColors = {
    'low': 'gray',
    'medium': 'yellow',
    'high': 'red'
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'

  return (
    <Card 
      className={`
        group relative transition-all duration-200 hover:shadow-md
        ${view === 'grid' ? 'h-full' : ''}
      `}
    >
      <div className={`
        flex ${view === 'grid' ? 'flex-col h-full' : 'items-center justify-between'}
      `}>
        {/* Main Content */}
        <div className={`flex-1 ${view === 'grid' ? '' : 'min-w-0 mr-4'}`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-gray-900 truncate pr-2">
              {task.title}
            </h3>
            {isOverdue && (
              <Badge variant="red" size="sm">Overdue</Badge>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {task.description || 'No description'}
          </p>

          {/* Meta Info */}
          <div className={`flex items-center gap-3 text-xs text-gray-500 ${view === 'grid' ? 'flex-wrap' : ''}`}>
            <Badge variant={statusColors[task.status]} size="sm">
              {capitalize(task.status.replace('-', ' '))}
            </Badge>

            <Badge variant={priorityColors[task.priority]} size="sm">
              {capitalize(task.priority)} Priority
            </Badge>

            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {formatRelativeDate(task.dueDate)}
              </span>
            </div>

            {task.assignee && (
              <div className="flex items-center">
                <User className="w-3.5 h-3.5 mr-1" />
                <span className="truncate max-w-[100px]">{task.assignee}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`
          flex items-center gap-2
          ${view === 'grid' ? 'mt-4 pt-4 border-t border-gray-100' : ''}
        `}>
          <button
            onClick={() => onEdit(task.id)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
