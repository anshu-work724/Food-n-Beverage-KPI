import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import KPICard from '../components/KPICard';
import { useAppContext } from '../context/AppContext';

const Customer = () => {
  Customer.displayName = 'Customer';

  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useAppContext();

  useEffect(() => {
    setLoading(true);
    fetchCustomerKPIs();
  }, [dateRange.startDate, dateRange.endDate]);

  const fetchCustomerKPIs = async () => {
    try {
      const response = await fetch(`/api/kpis/Customer?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      const data = await response.json();
      if (data.success) {
        setKpis(data.kpis || []);
      }
    } catch (error) {
      console.error('Error fetching customer KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Customer Experience
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Monitor NPS, retention, and customer satisfaction
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Heart size={24} className="text-red-600" />
          Customer Metrics
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
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

      {/* Customer Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            📈 NPS Improvement
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
              <p className="font-semibold text-green-900 dark:text-green-100">Target: 65+ NPS</p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">Focus on reducing detractors</p>
            </div>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Collect feedback after every meal</li>
              <li>✓ Address complaints within 24hrs</li>
              <li>✓ Implement loyalty rewards program</li>
              <li>✓ Train staff on service excellence</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            🔄 Retention Strategy
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
              <p className="font-semibold text-blue-900 dark:text-blue-100">Target: 50%+ Retention</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Personalize customer experience</p>
            </div>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li>✓ Personalized offers to repeat customers</li>
              <li>✓ Email/SMS marketing campaigns</li>
              <li>✓ Birthday and anniversary specials</li>
              <li>✓ VIP customer recognition program</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Customer Journey */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          🎯 Customer Journey Touchpoints
        </h3>

        <div className="space-y-4">
          {[
            { stage: 'Pre-Visit', actions: 'Digital marketing, reservations, reviews' },
            { stage: 'Arrival', actions: 'Welcome, ambiance, seating experience' },
            { stage: 'Ordering', actions: 'Menu description, recommendations, assistance' },
            { stage: 'Service', actions: 'Food quality, speed, attentiveness' },
            { stage: 'Payment', actions: 'Billing clarity, payment options, gratitude' },
            { stage: 'Post-Visit', actions: 'Follow-up, feedback request, re-engagement' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 pb-4" style={{ borderBottom: idx !== 5 ? '1px solid #e2e8f0' : 'none' }}>
              <div className="w-24 flex-shrink-0">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded">
                  {item.stage}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{item.actions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customer;
