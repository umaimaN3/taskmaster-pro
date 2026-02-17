import { AlertTriangle } from 'lucide-react'
import Modal from '../UI/Modal'
import Button from '../UI/Button'

/**
 * DeleteConfirmationModal Component
 * Confirmation dialog for destructive actions
 */
function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Task',
  itemName,
  loading = false
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong className="text-gray-900">{itemName}</strong>?
          This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal
