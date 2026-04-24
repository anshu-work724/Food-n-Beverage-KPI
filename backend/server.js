/**
 * SERVER.JS
 * Express backend for F&B KPI Intelligence System
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { generateCompleteDataset, generateAlerts } from './data/mockDataGenerator.js';
import {
  calculateDerivedKPIs,
  buildDashboardKPIs,
  buildKPICategoryCards,
} from './data/kpiUtils.js';
import { KPIConfig } from './data/kpiConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

// Middleware - Configure CORS for both localhost and production
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5000',
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    if (
      !origin ||
      allowedOrigins.some((allowed) => origin.includes(allowed) || allowed.includes(origin))
    ) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in production, can be restricted later
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Store dataset in memory (for development)
let dataset = generateCompleteDataset();

const getPeriodData = (period = 'today') => {
  let startIndex = dataset.historicalData.length - 1;
  if (period === 'week') {
    startIndex = Math.max(0, dataset.historicalData.length - 7);
  } else if (period === 'month') {
    startIndex = Math.max(0, dataset.historicalData.length - 30);
  }
  return dataset.historicalData.slice(startIndex).map((day) => calculateDerivedKPIs(day));
};

const getRangeData = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  if (end < start) return null;
  const dayMs = 24 * 60 * 60 * 1000;
  const rangeDays = Math.floor((end - start) / dayMs) + 1;
  if (rangeDays <= 1 || rangeDays >= 62) return null;
  return dataset.historicalData
    .filter((day) => {
      const current = new Date(day.date);
      return current >= start && current <= end;
    })
    .map((day) => calculateDerivedKPIs(day));
};

const aggregatePeriodData = (days) => {
  if (!days.length) return null;
  if (days.length === 1) return days[0];

  const base = { ...days[days.length - 1] };
  const numericKeys = Object.keys(base).filter((key) => typeof base[key] === 'number');
  numericKeys.forEach((key) => {
    base[key] = days.reduce((sum, day) => sum + (Number(day[key]) || 0), 0) / days.length;
  });
  return base;
};

// ===== API ROUTES =====

/**
 * GET /api/dashboard
 * Returns top-level dashboard KPIs
 */
app.get('/api/dashboard', (req, res) => {
  try {
    const latestDay = calculateDerivedKPIs(
      dataset.historicalData[dataset.historicalData.length - 1]
    );
    const previousDay = calculateDerivedKPIs(
      dataset.historicalData[dataset.historicalData.length - 2]
    );

    const dashboardKPIs = buildDashboardKPIs(latestDay, previousDay);

    res.json({
      success: true,
      data: {
        date: latestDay.date,
        dayOfWeek: latestDay.dayOfWeek,
        kpis: dashboardKPIs,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Dashboard route failed', details: error.message });
  }
});

/**
 * GET /api/kpis/:category
 * Returns all KPIs for a specific category
 */
app.get('/api/kpis/:category', (req, res) => {
  try {
    const { category } = req.params;
    const { period = 'today', startDate, endDate } = req.query;
    const periodData = getRangeData(startDate, endDate) || getPeriodData(period);
    const currentData = aggregatePeriodData(periodData);
    const previousData =
      periodData.length > 1 ? aggregatePeriodData(periodData.slice(0, -1)) : null;

    const categoryKPIs = buildKPICategoryCards(currentData, category, previousData);

    res.json({
      success: true,
      category,
      period,
      startDate: startDate || null,
      endDate: endDate || null,
      kpis: categoryKPIs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Category KPI route failed', details: error.message });
  }
});

/**
 * GET /api/historical/:days
 * Returns historical data for trending
 */
app.get('/api/historical/:days', (req, res) => {
  const { days } = req.params;
  const numDays = Math.min(parseInt(days) || 30, 90);

  const historicalData = dataset.historicalData
    .slice(-numDays)
    .map((day) => calculateDerivedKPIs(day));

  res.json({
    success: true,
    period: `Last ${numDays} days`,
    data: historicalData,
  });
});

/**
 * GET /api/kpi/:kpiId/trend
 * Returns trending data for a specific KPI
 */
app.get('/api/kpi/:kpiId/trend', (req, res) => {
  const { kpiId } = req.params;
  const { days = 30 } = req.query;
  const numDays = Math.min(parseInt(days), 90);

  const historicalData = dataset.historicalData
    .slice(-numDays)
    .map((day) => calculateDerivedKPIs(day));

  // Find KPI config
  const kpi = Object.values(KPIConfig).find((k) => k.id === kpiId);

  if (!kpi) {
    return res.status(404).json({ error: 'KPI not found' });
  }

  const trendData = historicalData.map((day) => ({
    date: day.date,
    dayOfWeek: day.dayOfWeek,
    value: day[kpi.dataKey],
    formatted: kpi.format(day[kpi.dataKey]),
  }));

  res.json({
    success: true,
    kpiId,
    kpiName: kpi.name,
    unit: kpi.unit,
    benchmark: kpi.benchmark,
    data: trendData,
  });
});

/**
 * GET /api/revenue/channel-mix
 * Returns dine-in vs delivery breakdown
 */
app.get('/api/revenue/channel-mix', (req, res) => {
  const latestDay = calculateDerivedKPIs(dataset.historicalData[dataset.historicalData.length - 1]);

  const channelMix = [
    {
      name: 'Dine-In',
      value: latestDay.dineInRevenue,
      percentage: (latestDay.dineInRevenue / latestDay.revenue) * 100,
      orders: latestDay.dineInOrders,
    },
    {
      name: 'Delivery',
      value: latestDay.deliveryRevenue,
      percentage: (latestDay.deliveryRevenue / latestDay.revenue) * 100,
      orders: latestDay.deliveryOrders,
    },
  ];

  res.json({
    success: true,
    date: latestDay.date,
    total: latestDay.revenue,
    channels: channelMix,
  });
});

/**
 * GET /api/hourly/:date
 * Returns hourly breakdown for a specific date
 */
app.get('/api/hourly/:date', (req, res) => {
  const { date } = req.params;
  const dayData = dataset.historicalData.find((d) => d.date === date);

  if (!dayData || !dayData.hourlyBreakdown) {
    return res.status(404).json({ error: 'No data for this date' });
  }

  const hourlyData = Object.entries(dayData.hourlyBreakdown).map(([hour, revenue]) => ({
    hour: parseInt(hour),
    revenue,
    percentage: (revenue / dayData.revenue) * 100,
  }));

  res.json({
    success: true,
    date,
    totalRevenue: dayData.revenue,
    hourlyData,
  });
});

/**
 * GET /api/alerts
 * Returns current alerts
 */
app.get('/api/alerts', (req, res) => {
  const { severity = null } = req.query;

  let alerts = dataset.alerts || [];

  if (severity) {
    alerts = alerts.filter((alert) => alert.severity === severity);
  }

  res.json({
    success: true,
    totalAlerts: alerts.length,
    alerts,
  });
});

/**
 * GET /api/metadata
 * Returns restaurant metadata
 */
app.get('/api/metadata', (req, res) => {
  res.json({
    success: true,
    metadata: dataset.metadata,
  });
});

/**
 * GET /api/time/:period
 * Returns KPIs for a time period (today, week, month)
 */
app.get('/api/time/:period', (req, res) => {
  try {
    const { period } = req.params;
    const { startDate, endDate } = req.query;

    let startIndex;
    if (period === 'today') {
      startIndex = dataset.historicalData.length - 1;
    } else if (period === 'week') {
      startIndex = Math.max(0, dataset.historicalData.length - 7);
    } else if (period === 'month') {
      startIndex = Math.max(0, dataset.historicalData.length - 30);
    } else {
      return res.status(400).json({ error: 'Invalid period' });
    }

    const periodData = getRangeData(startDate, endDate) || getPeriodData(period);

    // Calculate aggregates
    const totalRevenue = periodData.reduce((sum, day) => sum + day.revenue, 0);
    const avgRevenue = totalRevenue / periodData.length;
    const avgFoodCost =
      periodData.reduce((sum, day) => sum + day.foodCostPercent, 0) / periodData.length;
    const avgLabourCost =
      periodData.reduce((sum, day) => sum + day.labourCostPercent, 0) / periodData.length;

    const latestDay = periodData[periodData.length - 1];
    const previousDay = periodData.length > 1 ? periodData[periodData.length - 2] : null;
    const dashboardKPIs = buildDashboardKPIs(latestDay, previousDay);

    res.json({
      success: true,
      period,
      duration: periodData.length,
      summary: {
        totalRevenue,
        avgRevenue,
        avgFoodCost,
        avgLabourCost,
      },
      kpis: dashboardKPIs,
      data: periodData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Time period route failed', details: error.message });
  }
});

/**
 * POST /api/simulate/alert
 * Simulate triggering an alert
 */
app.post('/api/simulate/alert', (req, res) => {
  const { alertType } = req.body;

  // Modify data to trigger alert
  const latestDay = dataset.historicalData[dataset.historicalData.length - 1];

  const simulatedAlerts = {
    high_ktt: {
      ...latestDay,
      kitchenTicketTime: 18, // Exceeds threshold
    },
    slow_delivery: {
      ...latestDay,
      deliveryTime: 45, // Critical
    },
    high_food_cost: {
      ...latestDay,
      foodCostPercent: 35.5, // Exceeds threshold
    },
    low_revenue: {
      ...latestDay,
      revenue: 4000,
      attainment: 72.7,
    },
  };

  if (alertType && simulatedAlerts[alertType]) {
    dataset.alerts = generateAlerts(simulatedAlerts[alertType]);

    return res.json({
      success: true,
      message: `Alert simulation: ${alertType}`,
      alerts: dataset.alerts,
    });
  }

  res.status(400).json({ error: 'Invalid alert type' });
});

/**
 * GET /api/regenerate
 * Regenerate mock data
 */
app.get('/api/regenerate', (req, res) => {
  dataset = generateCompleteDataset();

  res.json({
    success: true,
    message: 'Data regenerated',
    metadata: dataset.metadata,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server when running locally; when deployed to Vercel export the app
const isVercel = Boolean(process.env.VERCEL || process.env.NOW_REGION);

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`🚀 F&B KPI Server running on http://localhost:${PORT}`);
    console.log(`📊 API ready at http://localhost:${PORT}/api`);
  });
}

// Export the Express app so Vercel (or other serverless platforms) can use it
export default app;
