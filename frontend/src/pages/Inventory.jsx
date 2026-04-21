import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import KPICard from '../components/KPICard';
import { useAppContext } from '../context/AppContext';

const Inventory = () => {
  Inventory.displayName = 'Inventory';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { timePeriod } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchInventoryKPIs();
  }, [timePeriod]);

  const fetchInventoryKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/Inventory?period=${timePeriod}`);
      const data = await response.json();
      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching inventory KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Inventory & Costs
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Monitor food costs and waste management
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Package size={24} className="text-orange-600" />
          Inventory Metrics
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

      {/* Cost Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            💰 Food Cost Control (Target: 31.5%)
          </h3>
          <div className="space-y-3">
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Negotiate supplier contracts quarterly</li>
              <li>✓ Monitor portion sizes consistently</li>
              <li>✓ Track weekly food cost %</li>
              <li>✓ Implement recipe costing system</li>
              <li>✓ Review prep waste daily</li>
              <li>✓ Use seasonal/local ingredients</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            ♻️ Waste Reduction (Target: 3.5%)
          </h3>
          <div className="space-y-3">
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Implement FIFO inventory system</li>
              <li>✓ Daily inventory audits</li>
              <li>✓ Staff training on waste prevention</li>
              <li>✓ Track trim waste by item</li>
              <li>✓ Use all perishables creatively</li>
              <li>✓ Accurate forecasting for orders</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Supplier Management */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🤝 Supplier Management Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white mb-2">Negotiate Pricing</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Compare prices quarterly, request volume discounts, and negotiate payment terms.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white mb-2">Quality Assurance</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Inspect deliveries, maintain quality standards, and document issues.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
            <p className="font-semibold text-slate-900 dark:text-white mb-2">Diversify Sources</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Maintain multiple suppliers for key items to negotiate better rates.
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Optimization */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📊 Inventory Optimization
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✅ Par Level System
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Set minimum inventory levels per item. Reorder when stock reaches par level.
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🔄 Stock Rotation
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Use FIFO method. Mark expiry dates clearly. First in, first out principle.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              📈 ABC Analysis
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Classify items by value. Focus inventory management on high-value items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
