import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import KPICard from '../components/KPICard';
import { useAppContext } from '../context/AppContext';

const Operations = () => {
  Operations.displayName = 'Operations';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const { timePeriod } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchOperationalKPIs();
  }, [timePeriod]);

  const fetchOperationalKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/Operations?period=${timePeriod}`);
      const data = await response.json();

      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching operational KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Operations & Efficiency
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Monitor kitchen performance, table turnover, and delivery metrics
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            ⚡ Current Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Kitchen Status</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                Optimal
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Table Occupancy</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                Good
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Delivery Speed</span>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-semibold rounded-full">
                Monitor
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            🎯 Benchmarks
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-600 dark:text-slate-400 mb-1">Kitchen Ticket Time</p>
              <p className="font-semibold text-slate-900 dark:text-white">9-16 min (Target: 12)</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400 mb-1">Table Occupancy</p>
              <p className="font-semibold text-slate-900 dark:text-white">45-95% (Target: 75%)</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400 mb-1">Delivery Time</p>
              <p className="font-semibold text-slate-900 dark:text-white">20-45 min (Target: 32)</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap size={24} className="text-yellow-600" />
          Operational Metrics
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-slate-800 rounded-lg h-32 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <KPICard key={kpi.kpiId} kpi={kpi} />
            ))}
          </div>
        )}
      </div>

      {/* Optimization Strategies */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          🔧 Optimization Strategies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kitchen Optimization */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              🍳 Kitchen Performance
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Implement order batching during peak hours</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Pre-prep high-demand items during off-peak hours</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Optimize station layout for better workflow</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Monitor and reduce ticket hold times</span>
              </li>
            </ul>
          </div>

          {/* Table Management */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              🪑 Table Management
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Optimize reservation system for peak hours</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Implement queue management system</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Track table turnover rates by shift</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Train staff on quick table resets</span>
              </li>
            </ul>
          </div>

          {/* Delivery Optimization */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              🚗 Delivery Excellence
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Coordinate with delivery partners on timing</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use real-time tracking for orders</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Implement packaging QA checks</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Manage delivery zones intelligently</span>
              </li>
            </ul>
          </div>

          {/* Quality Control */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              ✅ Quality Assurance
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Regular food quality audits</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Temperature compliance checks</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Customer satisfaction monitoring</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Staff training on service standards</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottleneck Detection */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🚨 Potential Bottlenecks
        </h3>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setSelectedStrategy('Extend kitchen staff on lunch and dinner peaks for congestion relief.')}
            className="w-full text-left p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:ring-2 hover:ring-amber-400"
          >
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
              Peak Hour Congestion
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Lunch (12-2pm) and dinner (7-9pm) show high occupancy. Consider extended capacity.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStrategy('Create SLA tracking board and partner escalation matrix.')}
            className="w-full text-left p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:ring-2 hover:ring-blue-400"
          >
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Delivery Partner Coordination
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Ensure real-time communication with delivery fleet to maintain SLA.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStrategy('Approve extra staffing for weekends and festival windows.')}
            className="w-full text-left p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:ring-2 hover:ring-green-400"
          >
            <p className="font-semibold text-green-900 dark:text-green-100 mb-1">
              Staff Capacity
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Ensure adequate staffing during peak hours to prevent service degradation.
            </p>
          </button>
        </div>
        {selectedStrategy && (
          <p className="mt-4 text-sm font-medium text-blue-700 dark:text-blue-300">
            Selected action: {selectedStrategy}
          </p>
        )}
      </div>
    </div>
  );
};

export default Operations;
