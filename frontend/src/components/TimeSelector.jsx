import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TimeSelector = () => {
  const { timePeriod, setTimePeriod } = useAppContext();

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
      <Calendar size={18} className="text-slate-500 dark:text-slate-400 ml-2" />

      <div className="flex gap-1">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setTimePeriod(period.id)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              timePeriod === period.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
