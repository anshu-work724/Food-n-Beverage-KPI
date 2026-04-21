# F&B KPI Intelligence System - Working Flow and Component Overview

## Project Overview

The F&B KPI Intelligence System is a comprehensive full-stack application designed to provide real-time operational intelligence for restaurant management. It transforms raw restaurant data into actionable KPIs, alerts, and visualizations to help managers and owners make data-driven decisions.

## System Architecture

The system follows a client-server architecture with:
- **Backend**: Node.js/Express API server that generates and serves KPI data
- **Frontend**: React-based dashboard application with interactive visualizations

## Working Flow

### 1. Data Generation (Backend)
- **mockDataGenerator.js**: Generates realistic restaurant operational data including revenue, orders, costs, and hourly breakdowns
- **kpiConfig.js**: Defines all KPI configurations with formulas, benchmarks, and thresholds
- **kpiUtils.js**: Calculates derived KPIs and builds data structures for frontend consumption

### 2. API Serving (Backend)
- **server.js**: Express server that:
  - Generates complete dataset on startup
  - Provides endpoints for dashboard KPIs and category-specific KPIs
  - Supports time period filtering (today, week, month, custom date ranges)
  - Calculates trends and status based on benchmarks

### 3. Data Consumption (Frontend)
- **AppContext.jsx**: Manages global application state including time periods, user roles, alerts, and theme
- **Pages**: Individual dashboard views for different KPI categories (Revenue, Operations, Orders, etc.)
- **Components**: Reusable UI elements for displaying KPIs, charts, and alerts
- **Charts**: Data visualizations using Recharts library

### 4. User Interaction Flow
1. User selects time period via TimeSelector component
2. AppContext updates date range state
3. Pages fetch relevant KPI data from API
4. KPICard components display individual metrics with status indicators
5. Charts visualize trends and distributions
6. AlertPanel shows critical issues requiring attention

## Component Breakdown

### Backend Components

#### Data Layer
- **mockDataGenerator.js**: 
  - Generates 60-day historical dataset
  - Simulates realistic restaurant operations (60 seats, 12-hour days)
  - Includes seasonal variations, day-of-week patterns, and random variance

- **kpiConfig.js**:
  - Defines 40+ KPIs across categories: Revenue, Operations, Orders, Staff, Customer, Inventory, ROI
  - Each KPI includes: formula, benchmarks, alert thresholds, formatting rules
  - Examples: Daily Revenue, RevPASH, Kitchen Ticket Time, NPS Score

- **kpiUtils.js**:
  - `calculateDerivedKPIs()`: Computes complex metrics from raw data
  - `buildKPICardData()`: Creates display-ready KPI objects with trends and status
  - `buildDashboardKPIs()`: Filters and prioritizes top-level KPIs

#### API Layer
- **server.js**:
  - `/api/dashboard`: Returns top-level KPIs for command center view
  - `/api/kpis/:category`: Returns all KPIs for specific category
  - Supports query parameters for time periods and date ranges
  - Includes error handling and data aggregation


#### Page Components
- **Home.jsx**: Command center dashboard with KPI summary and key charts
- **Revenue.jsx**: Revenue-specific KPIs and trends
- **Operations.jsx**: Operational efficiency metrics
- **Orders.jsx**: Order processing and channel mix analysis
- **Staff.jsx**: Labor cost and productivity metrics
- **Customer.jsx**: Customer satisfaction and NPS tracking
- **Inventory.jsx**: Food cost and wastage monitoring
- **ROI.jsx**: Return on investment and profitability analysis

#### Chart Components
- **RevenueTrendChart.jsx**: Time-series revenue visualization
- **ChannelMixChart.jsx**: Dine-in vs delivery revenue breakdown
- **HourlyHeatmapChart.jsx**: Hourly performance heatmap
- **MenuEngineeringChart.jsx**: Menu item profitability analysis

## Data Flow

1. **Initialization**: Backend generates complete dataset on server start
2. **API Request**: Frontend components fetch data based on selected time period
3. **Data Processing**: Backend aggregates and calculates KPIs for requested period
4. **Response**: JSON data with KPI values, trends, status, and benchmarks
5. **Rendering**: Frontend displays data in cards, charts, and alerts
6. **Interaction**: User actions trigger state updates and new API calls

## Key Features

- **Real-time Monitoring**: Live KPI tracking with status indicators
- **Intelligent Alerts**: Automated alerts based on benchmark deviations
- **Multi-role Support**: Different views for managers vs owners
- **Responsive Design**: Mobile-friendly interface with dark mode
- **Interactive Charts**: Drill-down capabilities and time period selection
- **Benchmarking**: Industry-standard KPI thresholds and targets

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React 18, Vite, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
