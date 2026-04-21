import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TimeSelector = () => {
  const { dateRange, setDateRange, addToast, setTimePeriod } = useAppContext();

  const updateRange = (key, value) => {
    const next = { ...dateRange, [key]: value };
    const start = new Date(next.startDate);
    const end = new Date(next.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      setDateRange(next);
      return;
    }
    const dayMs = 24 * 60 * 60 * 1000;
    const days = Math.floor((end - start) / dayMs) + 1;
    if (days <= 1 || days >= 62) {
      addToast('Range must be more than 1 day and less than 2 months.', 'warning');
      return;
    }
    setDateRange(next);
    setTimePeriod('custom');
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
      <Calendar size={18} className="text-slate-500 dark:text-slate-400 ml-2" />
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => updateRange('startDate', e.target.value)}
          className="px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
        />
        <span className="text-slate-500 dark:text-slate-400 text-sm">to</span>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => updateRange('endDate', e.target.value)}
          className="px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
        />
      </div>
    </div>
  );
};

export default TimeSelector;
