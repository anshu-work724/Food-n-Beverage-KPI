import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const MenuEngineeringChart = () => {
  // Sample menu item data (in production, this would come from API)
  const [data] = useState([
    { name: 'Seabass', popularity: 85, margin: 42 },
    { name: 'Butter Chicken', popularity: 92, margin: 55 },
    { name: 'Paneer Tikka', popularity: 78, margin: 48 },
    { name: 'Biryani', popularity: 88, margin: 52 },
    { name: 'Dal Makhani', popularity: 70, margin: 35 },
    { name: 'Tandoori Chicken', popularity: 95, margin: 58 },
    { name: 'Samosa', popularity: 82, margin: 65 },
    { name: 'Spring Roll', popularity: 75, margin: 62 },
    { name: 'Green Salad', popularity: 45, margin: 72 },
    { name: 'Gulab Jamun', popularity: 88, margin: 70 },
    { name: 'Ice Cream', popularity: 80, margin: 68 },
    { name: 'Lassi', popularity: 65, margin: 75 },
  ]);

  const avgPopularity = data.reduce((sum, item) => sum + item.popularity, 0) / data.length;
  const avgMargin = data.reduce((sum, item) => sum + item.margin, 0) / data.length;

  // Categorize items
  const getCategory = (popularity, margin) => {
    if (popularity >= avgPopularity && margin >= avgMargin) return 'Stars';
    if (popularity >= avgPopularity && margin < avgMargin) return 'Plowhorses';
    if (popularity < avgPopularity && margin >= avgMargin) return 'Puzzles';
    return 'Dogs';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Stars':
        return '#10b981'; // Green
      case 'Plowhorses':
        return '#f59e0b'; // Amber
      case 'Puzzles':
        return '#3b82f6'; // Blue
      case 'Dogs':
        return '#ef4444'; // Red
      default:
        return '#6b7280'; // Gray
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'Stars':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'Plowhorses':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'Puzzles':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'Dogs':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700';
    }
  };

  const categorizedItems = {
    Stars: data.filter((item) => getCategory(item.popularity, item.margin) === 'Stars'),
    Plowhorses: data.filter((item) => getCategory(item.popularity, item.margin) === 'Plowhorses'),
    Puzzles: data.filter((item) => getCategory(item.popularity, item.margin) === 'Puzzles'),
    Dogs: data.filter((item) => getCategory(item.popularity, item.margin) === 'Dogs'),
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Menu Engineering Matrix
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Analyze menu items by popularity (demand) and profit margin
        </p>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis
              type="number"
              dataKey="margin"
              name="Profit Margin %"
              label={{ value: 'Profit Margin (%)', position: 'insideBottomRight', offset: -10 }}
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              type="number"
              dataKey="popularity"
              name="Popularity %"
              label={{ value: 'Popularity (%)', angle: -90, position: 'insideLeft' }}
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#f1f5f9',
              }}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const data = payload[0].payload;
                  const category = getCategory(data.popularity, data.margin);
                  return (
                    <div className="p-3">
                      <p className="font-bold">{data.name}</p>
                      <p className="text-xs mt-1">Popularity: {data.popularity}%</p>
                      <p className="text-xs">Margin: {data.margin}%</p>
                      <p className="text-xs font-semibold mt-2">{category}</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Reference lines */}
            <ReferenceLine
              x={avgMargin}
              stroke="#d1d5db"
              strokeDasharray="5 5"
              label={{ value: `Avg Margin: ${avgMargin.toFixed(1)}%`, position: 'top' }}
            />
            <ReferenceLine
              y={avgPopularity}
              stroke="#d1d5db"
              strokeDasharray="5 5"
              label={{ value: `Avg Popularity: ${avgPopularity.toFixed(1)}%`, position: 'right' }}
            />

            {/* Scatter plot */}
            <Scatter name="Menu Items" data={data} fill="#3b82f6">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getCategoryColor(getCategory(entry.popularity, entry.margin))}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Categories Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(categorizedItems).map(([category, items]) => (
          <div
            key={category}
            className={`border rounded-lg p-4 ${getCategoryBg(category)}`}
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              {category} ({items.length} items)
            </h4>

            {category === 'Stars' && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                ⭐ Focus on maintaining quality and consider premium pricing
              </p>
            )}
            {category === 'Plowhorses' && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                💪 High demand but lower margins - look for cost optimization
              </p>
            )}
            {category === 'Puzzles' && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                🤔 High margin but low demand - improve marketing or presentation
              </p>
            )}
            {category === 'Dogs' && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                🐕 Low demand and low margin - consider removing or revamping
              </p>
            )}

            <div className="flex flex-wrap gap-1">
              {items.map((item) => (
                <span
                  key={item.name}
                  className="inline-block px-2 py-1 bg-white dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuEngineeringChart;
