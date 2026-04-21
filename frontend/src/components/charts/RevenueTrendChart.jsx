import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';

const RevenueTrendChart = ({ days = 30 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { timePeriod } = useAppContext();

  useEffect(() => {
    fetchTrendData();
  }, [timePeriod, days]);

  const fetchTrendData = async () => {
    try {
      const response = await fetch(`/api/kpi/daily_revenue/trend?days=${days}`);
      const result = await response.json();

      if (result.success) {
        const chartData = result.data.map((item) => ({
          date: item.date.substring(5), // MM-DD format
          revenue: item.value,
          formatted: item.formatted,
          dayOfWeek: item.dayOfWeek,
        }));
        setData(chartData);
      }
    } catch (error) {
      console.error('Error fetching trend data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-80 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-slate-500 dark:text-slate-400">Loading chart...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Revenue Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis
            dataKey="date"
            label={{ value: 'Date (MM-DD)', position: 'insideBottom', offset: -5 }}
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            label={{ value: 'Revenue (INR)', angle: -90, position: 'insideLeft' }}
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value) => `₹${value?.toLocaleString('en-IN')}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Daily Revenue"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Average</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ₹
            {Math.round(
              data.reduce((sum, item) => sum + item.revenue, 0) / data.length,
            ).toLocaleString('en-IN')}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Highest</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            ₹{Math.max(...data.map((d) => d.revenue)).toLocaleString('en-IN')}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Lowest</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-400">
            ₹{Math.min(...data.map((d) => d.revenue)).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
