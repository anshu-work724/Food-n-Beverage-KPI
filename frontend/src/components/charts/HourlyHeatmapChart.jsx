import React, { useState, useEffect } from 'react';

const HourlyHeatmapChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHourlyData();
  }, []);

  const fetchHourlyData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/api/hourly/${today}`);
      const result = await response.json();

      if (result.success) {
        const heatmapData = result.hourlyData.map((item) => ({
          hour: `${item.hour}:00`,
          revenue: item.revenue,
          percentage: item.percentage,
        }));
        setData(heatmapData);
      }
    } catch (error) {
      console.error('Error fetching hourly data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHeatColor = (percentage) => {
    if (percentage >= 12) return 'bg-green-600 dark:bg-green-700';
    if (percentage >= 10) return 'bg-green-500 dark:bg-green-600';
    if (percentage >= 8) return 'bg-blue-500 dark:bg-blue-600';
    if (percentage >= 6) return 'bg-amber-500 dark:bg-amber-600';
    if (percentage >= 4) return 'bg-orange-500 dark:bg-orange-600';
    return 'bg-red-400 dark:bg-red-500';
  };

  if (loading) {
    return (
      <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-slate-500 dark:text-slate-400">Loading heatmap...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Hourly Performance Heatmap
      </h3>

      <div className="overflow-x-auto">
        <div className="flex gap-2 min-w-full pb-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {/* Heatmap Box */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${getHeatColor(item.percentage)}`}
                title={`${item.hour}: ₹${item.revenue}`}
              >
                <span className="text-xs font-bold text-white text-center">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>

              {/* Hour Label */}
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                {item.hour}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Legend (% of Daily Revenue)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: '≥ 12%', color: 'bg-green-600' },
            { label: '10-12%', color: 'bg-green-500' },
            { label: '8-10%', color: 'bg-blue-500' },
            { label: '6-8%', color: 'bg-amber-500' },
            { label: '4-6%', color: 'bg-orange-500' },
            { label: '< 4%', color: 'bg-red-400' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color}`} />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyHeatmapChart;
