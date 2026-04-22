/**
 * KPI UTILITIES
 * Functions to calculate derived KPIs and manage data
 */


import { KPIConfig, calculateKPIStatus, calculateTrend } from './kpiConfig.js';

/**
 * Calculate derived KPIs from raw data
 */
function calculateDerivedKPIs(dayData) {
  const derived = { ...dayData };

  // RevPASH calculation
  derived.revpash = Math.round(dayData.revenue / (60 * 12)); // 60 seats, 12 hours

  // EBITDA Margin
  const varCosts = dayData.foodCost + dayData.labourCost;
  derived.ebitdaMargin = ((dayData.revenue - varCosts) / dayData.revenue) * 100;

  // Break-even point (assuming fixed costs of ~3300)
  derived.breakEvenPoint = Math.round(3300);

  // Profit per seat
  const totalCosts = dayData.foodCost + dayData.labourCost + dayData.wastage;
  derived.profitPerSeat = Math.round((dayData.revenue - totalCosts) / 60);

  // Dine-in orders
  if (!derived.dineInOrders) {
    derived.dineInOrders = Math.round(derived.dineInRevenue / derived.avgBills.dineIn);
  }

  // Delivery orders
  if (!derived.deliveryOrders) {
    derived.deliveryOrders = Math.round(derived.deliveryRevenue / derived.avgBills.delivery);
  }

  // Total orders
  if (!derived.totalOrders) {
    derived.totalOrders = derived.dineInOrders + derived.deliveryOrders;
  }

  return derived;
}

/**
 * Build complete KPI card data from day data
 */
function buildKPICardData(dayData, previousDayData = null) {
  const kpiData = {};

  // For each KPI, calculate current value, trend, and status
  Object.values(KPIConfig).forEach((kpi) => {
    const currentValue = dayData[kpi.dataKey];

    if (currentValue !== undefined && currentValue !== null) {
      const previousValue = previousDayData ? previousDayData[kpi.dataKey] : null;
      const trend = calculateTrend(currentValue, previousValue);
      const status = calculateKPIStatus(currentValue, kpi);

      kpiData[kpi.id] = {
        kpiId: kpi.id,
        name: kpi.name,
        description: kpi.description,
        value: currentValue,
        formattedValue: kpi.format(currentValue),
        trend,
        status,
        category: kpi.category,
        tier: kpi.tier,
        benchmark: kpi.benchmark,
        unit: kpi.unit,
        formula: kpi.formula,
        alertThreshold: kpi.alertThreshold,
      };
    }
  });

  return kpiData;
}

/**
 * Build KPI cards for a specific category
 */
function buildKPICategoryCards(dayData, category, previousDayData = null) {
  const allKPICards = buildKPICardData(dayData, previousDayData);

  return Object.values(allKPICards).filter((card) => card.category === category);
}

/**
 * Build dashboard KPIs (top level overview)
 */
function buildDashboardKPIs(dayData, previousDayData = null) {
  const allKPICards = buildKPICardData(dayData, previousDayData);
  const recommended = [
    'daily_revenue',
    'revenue_attainment',
    'revpash',
    'kitchen_ticket_time',
    'table_occupancy',
    'delivery_time',
    'food_cost_percent',
    'labour_cost_percent',
    'nps',
    'customer_retention',
    'ebitda_margin',
  ];

  return Object.values(allKPICards).filter((card) => recommended.includes(card.kpiId));
}

/**
 * Get KPI metrics for time period
 */
function getKPIMetricsForPeriod(dailyDataArray) {
  const metrics = {};

  // Calculate average, min, max for each KPI
  Object.values(KPIConfig).forEach((kpi) => {
    const values = dailyDataArray
      .map((day) => day[kpi.dataKey])
      .filter((val) => val !== undefined && val !== null && !isNaN(val));

    if (values.length > 0) {
      metrics[kpi.id] = {
        current: values[values.length - 1],
        average: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length,
      };
    }
  });

  return metrics;
}

/**
 * Get trending data for charts (daily values over time)
 */
function getTrendingData(dailyDataArray, kpiId) {
  const kpi = KPIConfig[Object.keys(KPIConfig).find((key) => KPIConfig[key].id === kpiId)];

  if (!kpi) return [];

  return dailyDataArray
    .map((day) => ({
      date: day.date,
      dayOfWeek: day.dayOfWeek,
      value: day[kpi.dataKey],
      formatted: kpi.format(day[kpi.dataKey]),
    }))
    .filter((item) => item.value !== undefined);
}

/**
 * Get revenue breakdown (dine-in vs delivery)
 */
function getRevenueChannelMix(dayData) {
  const dineIn = dayData.dineInRevenue;
  const delivery = dayData.deliveryRevenue;
  const total = dayData.revenue;

  return {
    channels: [
      {
        name: 'Dine-In',
        value: dineIn,
        percentage: (dineIn / total) * 100,
      },
      {
        name: 'Delivery',
        value: delivery,
        percentage: (delivery / total) * 100,
      },
    ],
    total,
  };
}

/**
 * Get hourly heatmap data
 */
function getHourlyHeatmapData(dailyDataArray) {
  const heatmapData = [];

  dailyDataArray.forEach((day) => {
    if (day.hourlyBreakdown) {
      Object.entries(day.hourlyBreakdown).forEach(([hour, value]) => {
        heatmapData.push({
          date: day.date,
          hour: parseInt(hour),
          dayOfWeek: day.dayOfWeek,
          revenue: value,
        });
      });
    }
  });

  return heatmapData;
}

/**
 * Get alert-triggering KPIs
 */
function getAlertsFromData(dayData, previousDayData = null) {
  const alerts = [];
  const allKPICards = buildKPICardData(dayData, previousDayData);

  Object.values(allKPICards).forEach((card) => {
    if (card.status === 'critical' || card.status === 'warning') {
      const severity = card.status === 'critical' ? 'critical' : 'high';
      alerts.push({
        id: `${card.kpiId}_${Date.now()}`,
        kpiId: card.kpiId,
        kpiName: card.name,
        value: card.value,
        formattedValue: card.formattedValue,
        threshold: card.status === 'critical' ? card.alertThreshold.lower : card.alertThreshold.upper,
        severity,
        category: card.category,
        timestamp: new Date().toISOString(),
        recommendation: getRecommendationForKPI(card.kpiId, card.value, card.alertThreshold),
      });
    }
  });

  return alerts;
}

/**
 * Get recommendation text for KPI
 */
function getRecommendationForKPI(kpiId, value, threshold) {
  const recommendations = {
    daily_revenue: 'Check marketing campaigns and peak-hour promotions',
    revenue_attainment: 'Run special promotions or increase marketing spend',
    kitchen_ticket_time: 'Review kitchen workflow and reduce order queue',
    table_occupancy: 'Launch discounts or optimize table management',
    delivery_time: 'Coordinate with delivery partner or pause new orders',
    food_cost_percent: 'Review supplier pricing and portion control',
    labour_cost_percent: 'Optimize shift scheduling and staffing levels',
    waste_percent: 'Implement inventory management and portion control',
    nps: 'Gather customer feedback and improve service standards',
    customer_retention: 'Launch loyalty program or personalized offers',
    ebitda_margin: 'Review operational costs and revenue optimization',
  };

  return recommendations[kpiId] || 'Review and optimize this metric';
}

/**
 * Compare KPIs across periods
 */
function compareKPIPeriods(currentPeriod, previousPeriod) {
  const comparison = {};

  Object.values(KPIConfig).forEach((kpi) => {
    const current = currentPeriod[kpi.dataKey];
    const previous = previousPeriod[kpi.dataKey];

    if (current !== undefined && previous !== undefined) {
      const change = current - previous;
      const changePercent = (change / previous) * 100;

      comparison[kpi.id] = {
        name: kpi.name,
        current,
        previous,
        change,
        changePercent: parseFloat(changePercent.toFixed(2)),
        improved: (kpi.alertThreshold.upper ? current < kpi.alertThreshold.upper && current < previous : current > previous),
      };
    }
  });

  return comparison;
}

export {
  calculateDerivedKPIs,
  buildKPICardData,
  buildKPICategoryCards,
  buildDashboardKPIs,
  getKPIMetricsForPeriod,
  getTrendingData,
  getRevenueChannelMix,
  getHourlyHeatmapData,
  getAlertsFromData,
  getRecommendationForKPI,
  compareKPIPeriods,
};
