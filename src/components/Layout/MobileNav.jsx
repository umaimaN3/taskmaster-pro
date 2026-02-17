import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListTodo, Plus } from 'lucide-react'
import clsx from 'clsx'

/**
 * MobileNav Component
 * Bottom navigation bar for mobile devices
 * Fixed at bottom of viewport
 */
function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 z-40">
      <div className="flex justify-around items-center">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
              isActive ? 'text-indigo-600' : 'text-gray-500'
            )
          }
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/tasks/new"
          className="flex flex-col items-center -mt-6"
        >
          <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
            <Plus className="w-7 h-7 text-white" />
          </div>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
              isActive ? 'text-indigo-600' : 'text-gray-500'
            )
          }
        >
          <ListTodo className="w-6 h-6" />
          <span className="text-xs mt-1">Tasks</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default MobileNav
