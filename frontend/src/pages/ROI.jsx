import React, { useState, useEffect } from 'react';
import { TrendingUp, Wallet } from 'lucide-react';
import KPICard from '../components/KPICard';
import { useAppContext } from '../context/AppContext';

const ROI = () => {
  ROI.displayName = 'ROI & Growth';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { timePeriod } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchROIKPIs();
  }, [timePeriod]);

  const fetchROIKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/ROI?period=${timePeriod}`);
      const data = await response.json();
      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching ROI KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          ROI & Growth Strategy
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Monitor profitability and strategic growth metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Wallet size={24} className="text-green-600" />
          Profitability Metrics
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
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

      {/* Financial Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Daily Revenue</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">₹5,500</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">+2.3% vs yesterday</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">EBITDA Margin</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">32.5%</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">Target: 30-35%</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Break-Even</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">₹3,300</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">67% of revenue</p>
        </div>
      </div>

      {/* Growth Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            📈 Revenue Growth
          </h3>
          <div className="space-y-3">
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Increase average bill value by 8-10%</li>
              <li>✓ Expand delivery coverage area</li>
              <li>✓ Launch loyalty/subscription programs</li>
              <li>✓ Develop catering & events business</li>
              <li>✓ Optimize peak-hour capacity</li>
              <li>✓ Seasonal menu special editions</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            💪 Cost Optimization
          </h3>
          <div className="space-y-3">
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Reduce food cost to 30% (from 31.5%)</li>
              <li>✓ Optimize labour scheduling</li>
              <li>✓ Reduce kitchen waste by 20%</li>
              <li>✓ Negotiate better supplier rates</li>
              <li>✓ Implement energy efficiency</li>
              <li>✓ Streamline operations & automation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Growth Roadmap */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          🗺️ 12-Month Growth Roadmap
        </h3>

        <div className="space-y-4">
          {[
            {
              quarter: 'Q1',
              goals: 'Optimize current operations, improve food cost',
              target: 'EBITDA: 32%',
            },
            {
              quarter: 'Q2',
              goals: 'Expand delivery, launch loyalty program',
              target: 'Revenue +10%, EBITDA: 33%',
            },
            {
              quarter: 'Q3',
              goals: 'Increase capacity, staff training',
              target: 'Peak hour efficiency +15%',
            },
            {
              quarter: 'Q4',
              goals: 'Catering launch, holiday campaigns',
              target: 'Revenue +15%, PnL break-even point',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-slate-900 dark:text-white">{item.quarter}</p>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded">
                  {item.target}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.goals}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Profitability Drivers */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp size={24} className="text-green-600" />
          Key Profitability Drivers
        </h3>

        <div className="space-y-4">
          {[
            {
              driver: 'Revenue per Seat (RevPASH)',
              impact: 'High',
              action: 'Increase occupancy & avg bill value',
            },
            {
              driver: 'Food Cost %',
              impact: 'Critical',
              action: 'Negotiate suppliers, reduce waste',
            },
            {
              driver: 'Labour Cost %',
              impact: 'High',
              action: 'Optimize scheduling, staff productivity',
            },
            {
              driver: 'Operating Expenses',
              impact: 'Medium',
              action: 'Energy efficiency, reduce overhead',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  item.impact === 'Critical'
                    ? 'bg-red-500'
                    : item.impact === 'High'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                }`}
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">{item.driver}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.action}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  item.impact === 'Critical'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : item.impact === 'High'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                }`}
              >
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ROI;
