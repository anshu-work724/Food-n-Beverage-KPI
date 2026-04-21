import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import KPICard from '../components/KPICard';
import RevenueTrendChart from '../components/charts/RevenueTrendChart';
import ChannelMixChart from '../components/charts/ChannelMixChart';
import HourlyHeatmapChart from '../components/charts/HourlyHeatmapChart';
import { useAppContext } from '../context/AppContext';

const Revenue = () => {
  Revenue.displayName = 'Revenue';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const { dateRange } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchRevenueKPIs();
  }, [dateRange.startDate, dateRange.endDate]);

  const fetchRevenueKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/Revenue?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      const data = await response.json();

      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching revenue KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Revenue Intelligence
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track revenue performance, RevPASH, and channel mix
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={24} className="text-green-600" />
          Key Metrics
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
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

      {/* Charts */}
      <div className="space-y-8">
        {/* Revenue Trend */}
        <RevenueTrendChart days={30} />

        {/* Channel Mix and Hourly Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChannelMixChart />
          <HourlyHeatmapChart />
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Revenue Optimization Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedSuggestion('Run peak-hour bundled promotions and prioritize table turns.')}
            className="text-left p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:ring-2 hover:ring-blue-400"
          >
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📊 Peak Hours Strategy
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Focus marketing efforts during peak hours (lunch 12-2pm, dinner 7-11pm)
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSuggestion('Increase ad spend for delivery channels with better conversion.')}
            className="text-left p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:ring-2 hover:ring-green-400"
          >
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              🎯 Channel Growth
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              Optimize delivery partners and consider expanding online presence
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSuggestion('Train servers on upselling premium add-ons and combos.')}
            className="text-left p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:ring-2 hover:ring-amber-400"
          >
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              💰 Upsell Opportunities
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Bundle items and offer premium options to increase average bill value
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSuggestion('Improve seating optimization during peak windows to raise RevPASH.')}
            className="text-left p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:ring-2 hover:ring-purple-400"
          >
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              🚀 RevPASH Improvement
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Increase table occupancy and optimize seating to maximize revenue per seat
            </p>
          </button>
        </div>
        {selectedSuggestion && (
          <p className="mt-4 text-sm font-medium text-blue-700 dark:text-blue-300">
            Selected action: {selectedSuggestion}
          </p>
        )}
      </div>
    </div>
  );
};

export default Revenue;
