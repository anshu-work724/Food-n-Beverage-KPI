import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ChannelMixChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChannelMix();
  }, []);

  const fetchChannelMix = async () => {
    try {
      const response = await fetch('/api/revenue/channel-mix');
      const result = await response.json();

      if (result.success) {
        const chartData = result.channels.map((channel) => ({
          name: channel.name,
          value: channel.value,
          percentage: channel.percentage,
          orders: channel.orders,
        }));
        setData(chartData);
      }
    } catch (error) {
      console.error('Error fetching channel mix:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3b82f6', '#f59e0b'];

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
        Revenue Channel Mix
      </h3>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value?.toLocaleString('en-IN')}`}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          {data.map((channel, index) => (
            <div
              key={channel.name}
              className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-semibold text-slate-900 dark:text-white">
                  {channel.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Revenue</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    ₹{channel.value.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Percentage
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {channel.percentage.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Orders</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {channel.orders}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelMixChart;
