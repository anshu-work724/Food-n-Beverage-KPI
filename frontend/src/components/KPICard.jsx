import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

const KPICard = ({ kpi, className = '', onClick }) => {
  if (!kpi) return null;

  const { name, value, formattedValue, trend, status, formula, benchmark, unit } = kpi;

  // Determine icon and color based on status
  const getStatusConfig = () => {
    switch (status) {
      case 'healthy':
        return {
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-700 dark:text-green-400',
          icon: CheckCircle,
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
          textColor: 'text-amber-700 dark:text-amber-400',
          icon: AlertTriangle,
        };
      case 'critical':
        return {
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-400',
          icon: AlertCircle,
        };
      default:
        return {
          bgColor: 'bg-slate-50 dark:bg-slate-900/20',
          borderColor: 'border-slate-200 dark:border-slate-700',
          textColor: 'text-slate-700 dark:text-slate-400',
          icon: HelpCircle,
        };
    }
  };

  const { bgColor, borderColor, textColor, icon: StatusIcon } = getStatusConfig();

  // Determine trend icon and color
  const getTrendConfig = () => {
    if (trend > 0)
      return {
        icon: TrendingUp,
        color: 'text-green-600 dark:text-green-400',
      };
    if (trend < 0)
      return {
        icon: TrendingDown,
        color: 'text-red-600 dark:text-red-400',
      };
    return {
      icon: null,
      color: '',
    };
  };

  const { icon: TrendIcon, color: trendColor } = getTrendConfig();

  // Tooltip component
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div
      onClick={onClick}
      className={`${bgColor} ${borderColor} border rounded-lg p-6 hover:shadow-lg transition-shadow animate-slide-in-up ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
            {name}
          </h3>
          <div className="relative group">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <HelpCircle size={14} className="inline mr-1" />
              Formula
            </button>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute z-10 w-48 p-2 text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded shadow-lg bottom-full left-0 mb-2">
                <p className="font-semibold mb-1">{formula}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Target: {benchmark.min} - {benchmark.max}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusIcon size={20} className={textColor} />
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {formattedValue}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Unit: {unit}
        </p>
      </div>

      {/* Trend and Benchmark */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1">
          {TrendIcon && (
            <>
              <TrendIcon size={16} className={trendColor} />
              <span className={`text-xs font-semibold ${trendColor}`}>
                {trend > 0 ? '+' : ''}
                {trend.toFixed(1)}%
              </span>
            </>
          )}
          {!TrendIcon && <span className="text-xs text-slate-500 dark:text-slate-400">Flat</span>}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              status === 'healthy'
                ? 'bg-green-500'
                : status === 'warning'
                  ? 'bg-amber-500'
                  : status === 'critical'
                    ? 'bg-red-500'
                    : 'bg-slate-400'
            }`}
          />
          <span
            className={`text-xs font-semibold ${
              status === 'healthy'
                ? 'text-green-700 dark:text-green-400'
                : status === 'warning'
                  ? 'text-amber-700 dark:text-amber-400'
                  : status === 'critical'
                    ? 'text-red-700 dark:text-red-400'
                    : 'text-slate-700 dark:text-slate-400'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
