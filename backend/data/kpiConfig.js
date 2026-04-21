/**
 * KPI CONFIGURATION SYSTEM
 * Defines all KPIs with formulas, tiers, thresholds, and benchmarks
 * STRICT RULE: No invented KPIs. Each follows standard F&B metrics.
 */

const KPIConfig = {
  // ===== REVENUE KPIs =====
  DAILY_REVENUE: {
    id: 'daily_revenue',
    name: 'Daily Revenue',
    description: 'Total revenue (dine-in + delivery)',
    category: 'Revenue',
    tier: 'Operational',
    formula: 'Dine-In Revenue + Delivery Revenue',
    unit: '₹',
    format: (value) => `₹${value?.toLocaleString('en-IN') || 'N/A'}`,
    benchmark: { min: 4200, max: 7800, target: 5500 },
    alertThreshold: { lower: 4500, upper: 7500 },
    alertSeverity: { lower: 'medium', upper: 'low' },
    recommended: true,
    dataKey: 'revenue',
  },

  REVENUE_TARGET_ATTAINMENT: {
    id: 'revenue_attainment',
    name: 'Revenue Attainment',
    description: 'Actual vs Target revenue %',
    category: 'Revenue',
    tier: 'Operational',
    formula: '(Actual ÷ Target) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(1) || 'N/A'}%`,
    benchmark: { min: 85, max: 110, target: 100 },
    alertThreshold: { lower: 90, upper: 110 },
    alertSeverity: { lower: 'medium', upper: 'low' },
    recommended: true,
    dataKey: 'attainment',
  },

  REVPASH: {
    id: 'revpash',
    name: 'RevPASH',
    description: 'Revenue Per Available Seat Hour',
    category: 'Revenue',
    tier: 'Strategic',
    formula: 'Total Revenue ÷ (Seats × Operating Hours)',
    unit: '₹',
    format: (value) => `₹${value?.toFixed(0) || 'N/A'}`,
    benchmark: { min: 600, max: 1200, target: 900 },
    alertThreshold: { lower: 700, upper: 1100 },
    alertSeverity: { lower: 'medium', upper: 'low' },
    recommended: true,
    calculate: (revenue, seats, hours) => Math.round(revenue / (seats * hours)),
    dataKey: 'revpash',
  },

  DINE_IN_REVENUE: {
    id: 'dine_in_revenue',
    name: 'Dine-In Revenue',
    description: 'Revenue from dine-in customers',
    category: 'Revenue',
    tier: 'Operational',
    formula: 'Revenue × Dine-In %',
    unit: '₹',
    format: (value) => `₹${value?.toLocaleString('en-IN') || 'N/A'}`,
    benchmark: { min: 2700, max: 5100, target: 3600 },
    alertThreshold: { lower: 2900, upper: 5000 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'dineInRevenue',
  },

  DELIVERY_REVENUE: {
    id: 'delivery_revenue',
    name: 'Delivery Revenue',
    description: 'Revenue from delivery orders',
    category: 'Revenue',
    tier: 'Operational',
    formula: 'Revenue × Delivery %',
    unit: '₹',
    format: (value) => `₹${value?.toLocaleString('en-IN') || 'N/A'}`,
    benchmark: { min: 1500, max: 2700, target: 1900 },
    alertThreshold: { lower: 1600, upper: 2600 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'deliveryRevenue',
  },

  AVG_BILL_VALUE: {
    id: 'avg_bill',
    name: 'Avg Bill Value',
    description: 'Average customer bill value',
    category: 'Revenue',
    tier: 'Operational',
    formula: 'Daily Revenue ÷ Total Customers',
    unit: '₹',
    format: (value) => `₹${Number(value)?.toFixed(0)}`,
    benchmark: { min: 350, max: 600, target: 475 },
    alertThreshold: { lower: 375, upper: 580 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'avgBills',
},

// ===== OPERATIONS KPIs =====
KITCHEN_TICKET_TIME: {
    id: 'kitchen_ticket_time',
    name: 'Kitchen Ticket Time',
    description: 'Avg time from order to delivery from kitchen',
    category: 'Operations',
    tier: 'Operational',
    formula: 'Sum of ticket times ÷ Number of tickets',
    unit: 'min',
    format: (value) => `${value?.toFixed(0) || 'N/A'} min`,
    benchmark: { min: 9, max: 16, target: 12 },
    alertThreshold: { lower: 11, upper: 15 },
    alertSeverity: { lower: 'low', upper: 'high' },
    recommended: true,
    dataKey: 'kitchenTicketTime',
  },

  TABLE_OCCUPANCY: {
    id: 'table_occupancy',
    name: 'Table Occupancy %',
    description: 'Percentage of seats occupied at any time',
    category: 'Operations',
    tier: 'Operational',
    formula: '(Active Tables ÷ Total Tables) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(1) || 'N/A'}%`,
    benchmark: { min: 45, max: 95, target: 75 },
    alertThreshold: { lower: 50, upper: 90 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: true,
    dataKey: 'tableOccupancy',
  },

  DELIVERY_TIME: {
    id: 'delivery_time',
    name: 'Delivery Time',
    description: 'Avg time from order to customer doorstep',
    category: 'Operations',
    tier: 'Operational',
    formula: 'Sum of delivery times ÷ Number of deliveries',
    unit: 'min',
    format: (value) => `${value?.toFixed(0) || 'N/A'} min`,
    benchmark: { min: 20, max: 45, target: 32 },
    alertThreshold: { lower: 25, upper: 40 },
    alertSeverity: { lower: 'low', upper: 'critical' },
    recommended: true,
    dataKey: 'deliveryTime',
  },

  TABLE_TURNOVER: {
    id: 'table_turnover',
    name: 'Table Turnover (hrs)',
    description: 'Avg time a table is occupied',
    category: 'Operations',
    tier: 'Operational',
    formula: 'Total covers ÷ Available seats',
    unit: 'hrs',
    format: (value) => `${value?.toFixed(1) || 'N/A'} hrs`,
    benchmark: { min: 1.0, max: 1.5, target: 1.25 },
    alertThreshold: { lower: 1.1, upper: 1.4 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'avgTableTurnover',
  },

  // ===== COST & INVENTORY KPIs =====
  FOOD_COST_PERCENT: {
    id: 'food_cost_percent',
    name: 'Food Cost %',
    description: 'COGS as % of revenue',
    category: 'Inventory',
    tier: 'Strategic',
    formula: '(COGS ÷ Revenue) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(2) || 'N/A'}%`,
    benchmark: { min: 29, max: 34, target: 31.5 },
    alertThreshold: { lower: 30, upper: 33 },
    alertSeverity: { lower: 'low', upper: 'high' },
    recommended: true,
    dataKey: 'foodCostPercent',
  },

  LABOUR_COST_PERCENT: {
    id: 'labour_cost_percent',
    name: 'Labour Cost %',
    description: 'Total labour cost as % of revenue',
    category: 'Staff',
    tier: 'Strategic',
    formula: '(Total Labour Cost ÷ Revenue) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(2) || 'N/A'}%`,
    benchmark: { min: 18, max: 24, target: 21 },
    alertThreshold: { lower: 19, upper: 23 },
    alertSeverity: { lower: 'low', upper: 'high' },
    recommended: true,
    dataKey: 'labourCostPercent',
  },

  WASTE_PERCENT: {
    id: 'waste_percent',
    name: 'Waste %',
    description: 'Food waste as % of revenue',
    category: 'Inventory',
    tier: 'Operational',
    formula: '(Wastage ÷ Revenue) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(2) || 'N/A'}%`,
    benchmark: { min: 2, max: 5, target: 3.5 },
    alertThreshold: { lower: 2.5, upper: 4 },
    alertSeverity: { lower: 'low', upper: 'high' },
    recommended: false,
    dataKey: 'wastagePercent',
  },

  COGS_AMOUNT: {
    id: 'cogs_amount',
    name: 'Food Cost (₹)',
    description: 'Total cost of goods sold',
    category: 'Inventory',
    tier: 'Operational',
    formula: 'Opening Stock + Purchases - Closing Stock',
    unit: '₹',
    format: (value) => `₹${value?.toLocaleString('en-IN') || 'N/A'}`,
    benchmark: { min: 1200, max: 2650, target: 1700 },
    alertThreshold: { lower: 1300, upper: 2550 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'foodCost',
  },

  // ===== CUSTOMER KPIs =====
  NPS: {
    id: 'nps',
    name: 'NPS Score',
    description: "Net Promoter Score: %Promoters − %Detractors",
    category: 'Customer',
    tier: 'Strategic',
    formula: '%Promoters (9-10) − %Detractors (0-6)',
    unit: 'score',
    format: (value) => `${value?.toFixed(0) || 'N/A'}`,
    benchmark: { min: 45, max: 85, target: 65 },
    alertThreshold: { lower: 50, upper: 75 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: true,
    dataKey: 'nps',
  },

  CUSTOMER_RETENTION: {
    id: 'customer_retention',
    name: 'Retention Rate %',
    description: 'Repeat customers as % of total',
    category: 'Customer',
    tier: 'Strategic',
    formula: '(Repeat Customers ÷ Total Customers) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(1) || 'N/A'}%`,
    benchmark: { min: 35, max: 60, target: 48 },
    alertThreshold: { lower: 40, upper: 55 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: true,
    dataKey: 'customerRetention',
  },

  TOTAL_ORDERS: {
    id: 'total_orders',
    name: 'Total Orders',
    description: 'Dine-in + delivery orders',
    category: 'Customer',
    tier: 'Operational',
    formula: 'Dine-In Orders + Delivery Orders',
    unit: 'count',
    format: (value) => `${value?.toLocaleString('en-IN') || 'N/A'}`,
    benchmark: { min: 70, max: 150, target: 110 },
    alertThreshold: { lower: 80, upper: 140 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'totalCustomers',
  },

  CUSTOMER_SATISFACTION: {
    id: 'customer_satisfaction',
    name: 'Avg Satisfaction',
    description: 'Average customer satisfaction (0-10)',
    category: 'Customer',
    tier: 'Operational',
    formula: 'Sum of ratings ÷ Number of ratings',
    unit: 'score',
    format: (value) => `${value?.toFixed(1) || 'N/A'}/10`,
    benchmark: { min: 6.5, max: 8.5, target: 7.5 },
    alertThreshold: { lower: 7, upper: 8.2 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'avgCustSatisfaction',
  },

  // ===== PROFITABILITY KPIs =====
  EBITDA_MARGIN: {
    id: 'ebitda_margin',
    name: 'EBITDA Margin %',
    description: 'Earnings before tax, dep & amortization',
    category: 'ROI',
    tier: 'Strategic',
    formula: '((Revenue - Variable Costs) ÷ Revenue) × 100',
    unit: '%',
    format: (value) => `${value?.toFixed(2) || 'N/A'}%`,
    benchmark: { min: 25, max: 40, target: 32.5 },
    alertThreshold: { lower: 27, upper: 38 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: true,
    calculate: (revenue, foodCost, labourCost) => {
      const varCosts = foodCost + labourCost;
      return ((revenue - varCosts) / revenue) * 100;
    },
    dataKey: 'ebitdaMargin',
  },

  BREAK_EVEN_POINT: {
    id: 'break_even',
    name: 'Break-Even Revenue',
    description: 'Daily revenue needed to cover costs',
    category: 'ROI',
    tier: 'Strategic',
    formula: 'Fixed Costs ÷ Contribution Margin %',
    unit: '₹',
    format: (value) => `₹${value?.toLocaleString('en-IN') || 'N/A'}`,
    benchmark: { min: 2800, max: 3800, target: 3300 },
    alertThreshold: { lower: 3000, upper: 3700 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'breakEvenPoint',
  },

  PROFIT_PER_SEAT: {
    id: 'profit_per_seat',
    name: 'Profit Per Seat',
    description: 'Daily profit divided by seats',
    category: 'ROI',
    tier: 'Strategic',
    formula: '(Revenue - Total Costs) ÷ Seats',
    unit: '₹',
    format: (value) => `₹${value?.toFixed(0) || 'N/A'}`,
    benchmark: { min: 30, max: 80, target: 55 },
    alertThreshold: { lower: 35, upper: 75 },
    alertSeverity: { lower: 'low', upper: 'low' },
    recommended: false,
    dataKey: 'profitPerSeat',
  },
};

/**
 * Categories for filtering
 */
const KPICategories = {
  Revenue: 'Revenue KPIs',
  Operations: 'Operational KPIs',
  Inventory: 'Inventory & Costs',
  Staff: 'Staff & Labour',
  Customer: 'Customer Experience',
  ROI: 'Profitability & ROI',
};

/**
 * Tiers for role-based filtering
 */
const KPITiers = {
  Operational: 'Operational',
  Strategic: 'Strategic',
  SmartAlert: 'Smart Alert',
};

/**
 * Get all KPIs
 */
function getAllKPIs() {
  return Object.values(KPIConfig);
}

/**
 * Get KPI by ID
 */
function getKPIById(id) {
  return Object.values(KPIConfig).find((kpi) => kpi.id === id);
}

/**
 * Get KPIs by category
 */
function getKPIsByCategory(category) {
  return Object.values(KPIConfig).filter((kpi) => kpi.category === category);
}

/**
 * Get KPIs by tier
 */
function getKPIsByTier(tier) {
  return Object.values(KPIConfig).filter((kpi) => kpi.tier === tier);
}

/**
 * Get recommended KPIs only
 */
function getRecommendedKPIs() {
  return Object.values(KPIConfig).filter((kpi) => kpi.recommended);
}

/**
 * Calculate KPI status (green/amber/red)
 */
function calculateKPIStatus(value, kpi) {
  if (value === null || value === undefined) return 'unknown';

  const { alertThreshold, benchmark } = kpi;

  // Lower bound thresholds
  if (value < alertThreshold.lower) {
    return 'critical'; // Red
  }

  // Upper bound thresholds
  if (alertThreshold.upper && value > alertThreshold.upper) {
    return 'warning'; // Amber
  }

  // In range
  if (value >= alertThreshold.lower && (!alertThreshold.upper || value <= alertThreshold.upper)) {
    return 'healthy'; // Green
  }

  return 'warning';
}

/**
 * Calculate trend (vs previous period)
 */
function calculateTrend(current, previous) {
  if (!previous || previous === 0) return 0;
  const change = ((current - previous) / previous) * 100;
  return parseFloat(change.toFixed(2));
}

module.exports = {
  KPIConfig,
  KPICategories,
  KPITiers,
  getAllKPIs,
  getKPIById,
  getKPIsByCategory,
  getKPIsByTier,
  getRecommendedKPIs,
  calculateKPIStatus,
  calculateTrend,
};
