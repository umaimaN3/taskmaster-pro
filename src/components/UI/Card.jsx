import clsx from 'clsx'

/**
 * Card Component
 * Container with consistent styling for content blocks
 */
function Card({ 
  children, 
  className, 
  padding = 'md',
  hover = false,
  onClick
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200',
        paddings[padding],
        hover && 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
