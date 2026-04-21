import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import KPICard from '../components/KPICard';
import { useAppContext } from '../context/AppContext';

const Staff = () => {
  Staff.displayName = 'Staff';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchStaffKPIs();
  }, [dateRange.startDate, dateRange.endDate]);

  const fetchStaffKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/Staff?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      const data = await response.json();
      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching staff KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Staff & Labour
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track labour costs and staff productivity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Users size={24} className="text-purple-600" />
          Labour Metrics
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-lg h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kpis.map((kpi) => (
              <KPICard key={kpi.kpiId} kpi={kpi} />
            ))}
          </div>
        )}
      </div>

      {/* Staff Optimization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            📊 Labour Cost Optimization
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
              <p className="font-semibold text-blue-900 dark:text-blue-100">Benchmark: 18-24%</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Current: Keep within target range</p>
            </div>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Optimize shift scheduling</li>
              <li>✓ Implement time tracking system</li>
              <li>✓ Cross-train staff for flexibility</li>
              <li>✓ Reduce overtime hours</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            🎯 Productivity Metrics
          </h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Revenue per Staff</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹1,200</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Orders per Staff</span>
                <span className="font-semibold text-slate-900 dark:text-white">18</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
