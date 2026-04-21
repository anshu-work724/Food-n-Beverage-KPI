import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import KPICard from '../components/KPICard';
import MenuEngineeringChart from '../components/charts/MenuEngineeringChart';
import { useAppContext } from '../context/AppContext';

class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('MenuEngineeringChart failed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-700 dark:text-red-300">
          Menu engineering chart is unavailable right now.
        </div>
      );
    }

    return this.props.children;
  }
}

const Orders = () => {
  Orders.displayName = 'Orders & Menu';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dateRange, userRole } = useAppContext();
  const [ownerMessage, setOwnerMessage] = useState('');
  const [selectedInsight, setSelectedInsight] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchOrderKPIs();
  }, [dateRange.startDate, dateRange.endDate]);

  const fetchOrderKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/Customer?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      const data = await response.json();

      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching order KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Orders & Menu Intelligence
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Analyze menu performance and optimize item profitability
        </p>
      </div>

      {/* Order Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ShoppingCart size={24} className="text-blue-600" />
          Order Metrics
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
            {kpis.slice(0, 3).map((kpi) => (
              <KPICard key={kpi.kpiId} kpi={kpi} />
            ))}
          </div>
        )}
      </div>

      {/* Menu Engineering Matrix */}
      <div className="mb-8">
        <ChartErrorBoundary>
          <MenuEngineeringChart />
        </ChartErrorBoundary>
      </div>

      {userRole === 'owner' && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800 mb-8">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
            Owner Decision Console
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Modify menu pricing',
              'Approve staff shift changes',
              'Promote trending dish',
              'Remove low-margin products',
            ].map((action) => (
              <button
                key={action}
                onClick={() => setOwnerMessage(`Queued owner action: ${action}`)}
                className="text-left px-4 py-3 rounded border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 text-sm font-semibold text-indigo-800 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
              >
                {action}
              </button>
            ))}
          </div>
          {ownerMessage && <p className="mt-3 text-sm text-indigo-700 dark:text-indigo-300">{ownerMessage}</p>}
        </div>
      )}

      {/* Menu Strategy */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          📋 Menu Item Management Strategy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stars Strategy */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              ⭐ Stars (High Demand, High Margin)
            </h4>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Maintain consistent quality</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Consider premium pricing</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Feature prominently on menu</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use as anchor items</span>
              </li>
            </ul>
          </div>

          {/* Plowhorses Strategy */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              💪 Plowhorses (High Demand, Low Margin)
            </h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Optimize portion control</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Reduce ingredient costs</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Bundle with high-margin items</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use as traffic drivers</span>
              </li>
            </ul>
          </div>

          {/* Puzzles Strategy */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🤔 Puzzles (Low Demand, High Margin)
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Improve presentation & description</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Train staff on upselling</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Test pricing strategy</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Consider repositioning on menu</span>
              </li>
            </ul>
          </div>

          {/* Dogs Strategy */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              🐕 Dogs (Low Demand, Low Margin)
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Consider removing from menu</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Discontinue if unprofitable</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Or completely revamp recipe</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Monitor quarterly only</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Order Insights */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💡 Key Insights
        </h3>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedInsight('Bundle combos for lunch and dinner set menus this week.')}
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg hover:ring-2 hover:ring-blue-400"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              🎯 Item Bundling Opportunities
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Bundle high-demand items with high-margin complementary items to increase overall profitability.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedInsight('Move stars to top-left of printed and digital menu.')}
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg hover:ring-2 hover:ring-blue-400"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              📍 Menu Placement Strategy
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Place Stars and Puzzles prominently (top 30% of page). Use Plowhorses as traffic drivers.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedInsight('Pilot a 6% price test on top 3 high-demand items.')}
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg hover:ring-2 hover:ring-blue-400"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              💰 Pricing Elasticity
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Test 5-10% price increases on high-demand items to optimize revenue without demand loss.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedInsight('Prepare seasonal menu refresh and A/B test presentation.')}
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg hover:ring-2 hover:ring-blue-400"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              📊 Seasonal Variations
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track seasonal demand patterns and adjust menu offerings quarterly.
            </p>
          </button>
        </div>
        {selectedInsight && (
          <p className="mt-4 text-sm font-medium text-blue-700 dark:text-blue-300">Action selected: {selectedInsight}</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
