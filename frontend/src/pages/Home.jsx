import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, X } from 'lucide-react';
import KPICard from '../components/KPICard';
import RevenueTrendChart from '../components/charts/RevenueTrendChart';
import ChannelMixChart from '../components/charts/ChannelMixChart';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  Home.displayName = 'Command Centre';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [expandedChart, setExpandedChart] = useState(null);
  const { timePeriod, setAlerts } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchDashboardKPIs();
    fetchAlerts();
  }, [timePeriod]);

  const fetchDashboardKPIs = async () => {
    try {
      let endpoint = '/api/dashboard';
      if (timePeriod !== 'today') {
        endpoint = `/api/time/${timePeriod}`;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success) {
        setKpis(data.data?.kpis || data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const criticalAlerts = (kpis.length && kpis.filter((kpi) => kpi.status === 'critical')) || [];
  const warningAlerts = (kpis.length && kpis.filter((kpi) => kpi.status === 'warning')) || [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Operational Nerve Centre
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Real-time KPI monitoring and intelligent alerts
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">Total KPIs</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{kpis.length}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-700 dark:text-green-300 font-semibold">Healthy</p>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">
            {kpis.filter((k) => k.status === 'healthy').length}
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold">Warnings</p>
          <p className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-2">
            {warningAlerts.length}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-700 dark:text-red-300 font-semibold">Critical</p>
          <p className="text-3xl font-bold text-red-900 dark:text-red-100 mt-2">
            {criticalAlerts.length}
          </p>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="mb-8 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4 rounded">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                Critical Issues Detected
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {criticalAlerts.length} KPI(s) require immediate attention
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={24} className="text-blue-600" />
          Top KPIs
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-slate-800 rounded-lg h-48 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.slice(0, 4).map((kpi) => (
              <KPICard key={kpi.kpiId} kpi={kpi} onClick={() => setSelectedKpi(kpi)} />
            ))}
          </div>
        )}
      </div>

      {/* All KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">All KPIs</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-slate-800 rounded-lg h-32 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <KPICard key={kpi.kpiId} kpi={kpi} onClick={() => setSelectedKpi(kpi)} />
            ))}
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div onClick={() => setExpandedChart('revenue')} className="cursor-pointer">
          <RevenueTrendChart days={30} />
        </div>
        <div onClick={() => setExpandedChart('channel')} className="cursor-pointer">
          <ChannelMixChart />
        </div>
      </div>

      {(selectedKpi || expandedChart) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-lg border border-slate-200 dark:border-slate-700 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {selectedKpi ? `${selectedKpi.name} - Detailed View` : 'Expanded Chart'}
              </h3>
              <button
                onClick={() => {
                  setSelectedKpi(null);
                  setExpandedChart(null);
                }}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={22} />
              </button>
            </div>
            {selectedKpi && (
              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Current:</strong> {selectedKpi.formattedValue}</p>
                <p><strong>Trend:</strong> {selectedKpi.trend.toFixed(2)}%</p>
                <p><strong>Formula:</strong> {selectedKpi.formula}</p>
                <p><strong>Benchmark:</strong> Min {selectedKpi.benchmark.min} - Target {selectedKpi.benchmark.target} - Max {selectedKpi.benchmark.max}</p>
                <p><strong>Axis label:</strong> X-axis = time period progression, Y-axis = KPI value in {selectedKpi.unit}</p>
              </div>
            )}
            {expandedChart === 'revenue' && (
              <div>
                <RevenueTrendChart days={30} />
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  Axis labels: X-axis represents date; Y-axis represents daily revenue in INR.
                </p>
              </div>
            )}
            {expandedChart === 'channel' && (
              <div>
                <ChannelMixChart />
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  Chart labels: each slice represents a revenue channel; value and percentage are shown in the legend cards.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
