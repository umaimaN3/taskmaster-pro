import { FolderOpen, Plus } from 'lucide-react'
import Button from './Button'

/**
 * EmptyState Component
 * Displayed when no data is available
 */
function EmptyState({ 
  title = 'No items found',
  description = 'Get started by creating a new item.',
  actionLabel = 'Create New',
  onAction,
  icon: Icon = FolderOpen
}) {
  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction}>
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
