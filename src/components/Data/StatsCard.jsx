import { TrendingUp, TrendingDown } from 'lucide-react'
import Card from '../UI/Card'

/**
 * StatsCard Component
 * Dashboard statistic display with trend indicator
 */
function StatsCard({ 
  title, 
  value, 
  trend,
  trendLabel,
  icon: Icon,
  color = 'indigo'
}) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600'
  }

  return (
    <Card padding="lg" className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>

          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(trend)}%
              </span>
              {trendLabel && (
                <span className="text-sm text-gray-500 ml-1">{trendLabel}</span>
              )}
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}

export default StatsCard
