import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import TaskForm from './pages/TaskForm'
import NotFound from './pages/NotFound'

/**
 * Main App Component
 * Defines all application routes using React Router v6
 * Layout component wraps all routes for consistent UI (nav, sidebar, etc.)
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default redirect to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Main routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/new" element={<TaskForm />} />
        <Route path="tasks/edit/:id" element={<TaskForm />} />

        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App