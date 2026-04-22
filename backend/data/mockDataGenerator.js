/**
 * MOCK DATA GENERATOR
 * Realistic F&B restaurant data simulation
 * 60-seat restaurant, 12hrs/day (11am-11pm), dine-in + delivery mix
 */

// Business Profile Constants
const BUSINESS_PROFILE = {
  seats: 60,
  hoursPerDay: 12,
  openingHour: 11,
  closingHour: 23,
  dineInPercentage: 0.65,
  deliveryPercentage: 0.35,
  avgDiningDuration: 75, // minutes
};

// KPI Ranges (realistic benchmarks)
const KPI_RANGES = {
  avgBillValue: { min: 350, max: 600 }, // INR
  foodCostPercent: { min: 29, max: 34 },
  kitchenTicketTime: { min: 9, max: 16 }, // minutes
  deliveryTime: { min: 20, max: 45 }, // minutes
  tableOccupancyPercent: { min: 45, max: 95 },
  nps: { min: 45, max: 85 },
  labourCostPercent: { min: 18, max: 24 },
  wastagePercent: { min: 2, max: 5 },
};

/**
 * Generate realistic daily revenue based on day of week
 */
function generateDailyRevenue(date) {
  const dayOfWeek = date.getDay();
  const baseRevenue = 5500;

  // Day multipliers
  const dayMultipliers = {
    0: 1.4, // Sunday
    1: 0.8, // Monday (low)
    2: 1.0, // Tuesday
    3: 1.05, // Wednesday
    4: 1.1, // Thursday
    5: 1.35, // Friday (peak)
    6: 1.4, // Saturday (peak)
  };

  const multiplier = dayMultipliers[dayOfWeek];
  const variance = (Math.random() - 0.5) * 300; // ±150 variance
  return Math.round(baseRevenue * multiplier + variance);
}

/**
 * Generate hourly breakdown (realistic peak patterns)
 */
function generateHourlyBreakdown(dailyRevenue) {
  const hours = {};
  const lunchPeak = [12, 13]; // 12-2pm
  const dinnerPeak = [19, 20, 21]; // 7-11pm

  // Base distribution across 12 hours (11am-11pm)
  const basePerHour = dailyRevenue / 12;

  for (let hour = 11; hour < 23; hour++) {
    let multiplier = 0.7; // base multiplier

    if (lunchPeak.includes(hour)) multiplier = 1.3; // lunch spike
    if (dinnerPeak.includes(hour)) multiplier = 1.4; // dinner spike
    if (hour === 11 || hour === 22) multiplier = 0.5; // opening/closing hours
    if (hour === 14 || hour === 15) multiplier = 0.6; // afternoon slump

    const variance = (Math.random() - 0.5) * 200;
    hours[hour] = Math.round(basePerHour * multiplier + variance);
  }

  return hours;
}

/**
 * Generate order details (dine-in vs delivery)
 */
function generateOrderMetrics(dailyRevenue, date) {
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;

  // Adjust delivery % on weekends
  const deliveryPercent = isWeekend ? 0.32 : 0.35;
  const dineInPercent = 1 - deliveryPercent;

  const dineInRevenue = dailyRevenue * dineInPercent;
  const deliveryRevenue = dailyRevenue * deliveryPercent;

  // Avg bill value variance
  const avgBills = {
    dineIn: Math.round(400 + (Math.random() - 0.5) * 100),
    delivery: Math.round(350 + (Math.random() - 0.5) * 80),
  };

  return {
    dineInRevenue,
    deliveryRevenue,
    dineInOrders: Math.round(dineInRevenue / avgBills.dineIn),
    deliveryOrders: Math.round(deliveryRevenue / avgBills.delivery),
    avgBills,
  };
}

/**
 * Generate operational KPIs
 */
function generateOperationalKPIs(date) {
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;

  return {
    kitchenTicketTime: Math.round(11 + (Math.random() - 0.5) * 5 + (isWeekend ? 2 : 0)),
    tableOccupancy: Math.round(65 + (Math.random() - 0.5) * 25 + (isWeekend ? 20 : 0)),
    deliveryTime: Math.round(28 + (Math.random() - 0.5) * 15 + (isWeekend ? 3 : 0)),
    avgTableTurnover: (75 + (Math.random() - 0.5) * 10) / 60, // in hours
  };
}

/**
 * Generate cost metrics
 */
function generateCostMetrics(dailyRevenue) {
  const foodCostPercent = 31 + (Math.random() - 0.5) * 4;
  const labourCostPercent = 20 + (Math.random() - 0.5) * 4;
  const wastagePercent = 3 + (Math.random() - 0.5) * 2;

  return {
    foodCostPercent: parseFloat(foodCostPercent.toFixed(2)),
    labourCostPercent: parseFloat(labourCostPercent.toFixed(2)),
    wastagePercent: parseFloat(wastagePercent.toFixed(2)),
    foodCost: Math.round(dailyRevenue * (foodCostPercent / 100)),
    labourCost: Math.round(dailyRevenue * (labourCostPercent / 100)),
    wastage: Math.round(dailyRevenue * (wastagePercent / 100)),
  };
}

/**
 * Generate customer metrics
 */
function generateCustomerMetrics(orderMetrics) {
  const totalOrders = orderMetrics.dineInOrders + orderMetrics.deliveryOrders;
  const nps = 55 + (Math.random() - 0.5) * 30;
  const retention = 0.45 + (Math.random() - 0.5) * 0.15;

  return {
    nps: Math.round(nps),
    customerRetention: parseFloat((retention * 100).toFixed(2)),
    repeatCustomers: Math.round(totalOrders * retention),
    totalCustomers: totalOrders,
    avgCustSatisfaction: parseFloat((7 + (Math.random() - 0.5) * 1.5).toFixed(1)),
  };
}

/**
 * Generate single day data
 */
function generateDayData(date) {
  const dateStr = date.toISOString().split('T')[0];
  const dailyRevenue = generateDailyRevenue(date);

  const orderMetrics = generateOrderMetrics(dailyRevenue, date);
  const operationalKPIs = generateOperationalKPIs(date);
  const costMetrics = generateCostMetrics(dailyRevenue);
  const customerMetrics = generateCustomerMetrics(orderMetrics);
  const hourlyBreakdown = generateHourlyBreakdown(dailyRevenue);

  return {
    date: dateStr,
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
    revenue: dailyRevenue,
    target: 5500,
    attainment: parseFloat(((dailyRevenue / 5500) * 100).toFixed(2)),
    ...orderMetrics,
    ...operationalKPIs,
    ...costMetrics,
    ...customerMetrics,
    hourlyBreakdown,
  };
}

/**
 * Generate 90 days historical data + current day
 */
function generate90DaysData() {
  const data = [];
  const today = new Date();

  // Generate 90 days of historical data
  for (let i = 89; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push(generateDayData(date));
  }

  return data;
}

/**
 * Generate current hour data
 */
function getCurrentHourData() {
  const now = new Date();
  const hour = now.getHours();
  const today = now.toISOString().split('T')[0];

  // Revenue for current hour
  const hourlyRevenue = Math.round(500 + (Math.random() - 0.5) * 200);

  return {
    timestamp: now.toISOString(),
    date: today,
    hour,
    revenue: hourlyRevenue,
    orders: Math.round(hourlyRevenue / 400),
    kitchenTicketTime: Math.round(10 + (Math.random() - 0.5) * 4),
    tableOccupancy: Math.round(70 + (Math.random() - 0.5) * 20),
    deliveryTime: Math.round(25 + (Math.random() - 0.5) * 10),
    avgBillValue: Math.round(380 + (Math.random() - 0.5) * 80),
  };
}

/**
 * Generate alerts based on thresholds
 */
function generateAlerts(latestDay) {
  const alerts = [];

  // Alert thresholds
  if (latestDay.kitchenTicketTime > 15) {
    alerts.push({
      id: 'KTT_HIGH',
      domain: 'Operations',
      type: 'Kitchen Ticket Time Exceeded',
      severity: 'high',
      condition: 'KTT > 15 min',
      value: `${latestDay.kitchenTicketTime} min`,
      recommendation: 'Review kitchen workflow, reduce open orders',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.deliveryTime > 40) {
    alerts.push({
      id: 'DEL_SLOW',
      domain: 'Operations',
      type: 'Delivery Time Critical',
      severity: 'critical',
      condition: 'Delivery > 40 min',
      value: `${latestDay.deliveryTime} min`,
      recommendation: 'Check delivery partner, pause new orders if necessary',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.foodCostPercent > 33) {
    alerts.push({
      id: 'FOOD_COST_HIGH',
      domain: 'Inventory',
      type: 'Food Cost Elevated',
      severity: 'medium',
      condition: 'Food Cost > 33%',
      value: `${latestDay.foodCostPercent}%`,
      recommendation: 'Review supplier pricing, check waste levels',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.attainment < 90) {
    alerts.push({
      id: 'REV_LOW',
      domain: 'Revenue',
      type: 'Revenue Below Target',
      severity: 'medium',
      condition: 'Attainment < 90%',
      value: `${latestDay.attainment}%`,
      recommendation: 'Review marketing, launch promotions',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.nps < 50) {
    alerts.push({
      id: 'NPS_LOW',
      domain: 'Customer',
      type: 'NPS Declining',
      severity: 'medium',
      condition: 'NPS < 50',
      value: `${latestDay.nps}`,
      recommendation: 'Gather feedback, improve service standards',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.labourCostPercent > 23) {
    alerts.push({
      id: 'LABOUR_HIGH',
      domain: 'Staff',
      type: 'Labour Cost Excessive',
      severity: 'medium',
      condition: 'Labour Cost > 23%',
      value: `${latestDay.labourCostPercent}%`,
      recommendation: 'Review shift scheduling, optimize staffing',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.tableOccupancy < 50) {
    alerts.push({
      id: 'OCC_LOW',
      domain: 'Operations',
      type: 'Low Table Occupancy',
      severity: 'low',
      condition: 'Occupancy < 50%',
      value: `${latestDay.tableOccupancy}%`,
      recommendation: 'Increase marketing, run table management experiments',
      timestamp: new Date().toISOString(),
    });
  }

  if (latestDay.wastagePercent > 4) {
    alerts.push({
      id: 'WASTE_HIGH',
      domain: 'Inventory',
      type: 'High Food Waste',
      severity: 'medium',
      condition: 'Waste > 4%',
      value: `${latestDay.wastagePercent}%`,
      recommendation: 'Review portion control, optimize inventory',
      timestamp: new Date().toISOString(),
    });
  }

  return alerts;
}

/**
 * Main function to generate complete dataset
 */
function generateCompleteDataset() {
  const historicalData = generate90DaysData();
  const currentHourData = getCurrentHourData();
  const latestDay = historicalData[historicalData.length - 1];
  const alerts = generateAlerts(latestDay);

  return {
    metadata: {
      restaurantName: 'The Culinary Nest',
      location: 'Downtown',
      seats: BUSINESS_PROFILE.seats,
      hoursPerDay: BUSINESS_PROFILE.hoursPerDay,
      generatedAt: new Date().toISOString(),
    },
    historicalData,
    currentHourData,
    alerts,
    businessProfile: BUSINESS_PROFILE,
    kpiRanges: KPI_RANGES,
  };
}

export {
  generateCompleteDataset,
  generateDayData,
  generateAlerts,
  KPI_RANGES,
  BUSINESS_PROFILE,
};
