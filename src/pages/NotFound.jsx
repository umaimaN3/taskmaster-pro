import { useNavigate } from 'react-router-dom'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

/**
 * NotFound Page
 * 404 error page with navigation options
 */
function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
      <Card className="max-w-md w-full text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-gray-400" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default NotFound
