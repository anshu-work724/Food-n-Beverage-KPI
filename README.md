# 🧠 F&B KPI Intelligence System

**Production-Grade Operational Nerve Centre for Restaurant Management**

## Overview

A comprehensive, full-stack F&B (Food & Beverage) Key Performance Indicator Intelligence System designed to transform restaurant operations into a data-driven, intelligent operational nerve centre.

## 🎯 System Vision

This is NOT just a dashboard. This is a **5-layer intelligence system** that helps restaurant managers and owners answer critical operational questions:

- ✅ **Are we on track today?**
- ✅ **Where is the bottleneck?**
- ✅ **What action should be taken?**

---

## 🚀 Quick Start

### Prerequisites
```
Node.js >= 14.0.0
npm or yarn
```

### Installation & Setup

#### 1. **Backend Setup**
```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:5000
```

#### 2. **Frontend Setup** (in new terminal)
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### Accessing the System
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api

---

## 📊 System Architecture

### **Layer 1: Data Layer**
- Realistic mock data (90 days historical + current hourly)
- 60-seat restaurant with dine-in & delivery mix
- Realistic patterns: weekend peaks, Monday lows, lunch/dinner spikes

### **Layer 2: Logic Layer**
- 25+ KPIs across 6 business domains
- Strict formulas with tier classification
- Benchmark comparisons and trend calculations

### **Layer 3: Intelligence Layer**
- Smart alert system (8-18+ alert types)
- Threshold-based triggers with severity levels
- Recommended actions for each alert

### **Layer 4: UI Layer**
- Reusable KPI card components
- Interactive Recharts visualizations
- Real-time data updates
- Mobile-responsive design

### **Layer 5: Experience Layer**
- Role-based filtering (Manager/Owner)
- Time-period filtering (Today/Week/Month)
- Dark mode support
- 8 domain-specific pages

---

## 📈 KPI Coverage

### Revenue KPIs
- Daily Revenue, Revenue Attainment, RevPASH
- Dine-In Revenue, Delivery Revenue, Avg Bill Value

### Operations KPIs
- Kitchen Ticket Time, Table Occupancy, Delivery Time, Table Turnover

### Inventory & Cost KPIs
- Food Cost %, Labour Cost %, Waste %

### Customer KPIs
- NPS, Customer Retention, Total Orders, Satisfaction

### Profitability KPIs
- EBITDA Margin %, Break-Even Point, Profit Per Seat

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── KPICard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TimeSelector.jsx
│   │   ├── AlertPanel.jsx
│   │   └── charts/
│   │       ├── RevenueTrendChart.jsx
│   │       ├── ChannelMixChart.jsx
│   │       ├── HourlyHeatmapChart.jsx
│   │       └── MenuEngineeringChart.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Revenue.jsx
│   │   ├── Operations.jsx
│   │   ├── Orders.jsx
│   │   ├── Staff.jsx
│   │   ├── Customer.jsx
│   │   ├── Inventory.jsx
│   │   └── ROI.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json

backend/
├── server.js
├── data/
│   ├── mockDataGenerator.js
│   ├── kpiConfig.js
│   └── kpiUtils.js
└── package.json
```

---

## ✨ Key Features

1. **Real-Time KPI Monitoring** - 25+ KPIs with live updates
2. **Smart Alert System** - Automatic threshold-based alerts with recommended actions
3. **Interactive Visualizations** - Revenue trends, channel mix, heatmaps, menu engineering
4. **Domain-Specific Pages** - 8 domain pages with actionable insights
5. **Role-Based Access** - Manager & Owner views
6. **Time Period Flexibility** - Today/Week/Month filtering
7. **Dark Mode Support** - Full UI dark mode
8. **Mobile Optimization** - 375px+ responsive design

---

## 💻 Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Recharts
- Lucide React

### Backend
- Node.js
- Express 4
- Mock data generation

---

## 📊 KPI Examples

### Sample Benchmarks
```
Revenue:           ₹4,200 - ₹7,800 (Target: ₹5,500)
Food Cost %:       29% - 34% (Target: 31.5%)
Kitchen Ticket:    9 - 16 min (Target: 12 min)
Delivery Time:     20 - 45 min (Target: 32 min)
Table Occupancy:   45% - 95% (Target: 75%)
NPS:               45 - 85 (Target: 65)
```

### Alert Types
- High Kitchen Ticket Time
- Slow Delivery Time
- High Food Cost
- Low Revenue
- Low NPS
- High Wastage
- Low Table Occupancy
- High Labour Cost

---

## 🎮 Domain Pages

- 🏠 **Home**: Command Centre with top KPIs & alerts
- 💰 **Revenue**: Revenue tracking & channel mix
- ⚡ **Operations**: Kitchen, tables, delivery performance
- 🍽️ **Orders**: Menu engineering matrix
- 👥 **Staff**: Labour metrics & productivity
- ❤️ **Customer**: NPS, retention, satisfaction
- 📦 **Inventory**: Food costs, waste management
- 📈 **ROI**: Profitability & growth strategy

---

## 🧪 Testing

### 1. Start Both Servers
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### 2. Access System
- Open http://localhost:3000

### 3. Test Features
- ✅ Switch time periods
- ✅ Switch user roles
- ✅ Toggle dark mode
- ✅ View KPI cards & charts
- ✅ Simulate alerts
- ✅ Navigate pages

---

## 📞 Troubleshooting

**Port already in use?**
```bash
PORT=5001 npm run dev  # Backend
# Change port in vite.config.js for frontend
```

**CORS error?**
- CORS is enabled for all origins in dev mode

**Mock data not updating?**
- Click "🧪 Simulate Alert" in Alert Panel

---

## 🎓 Learning Value

This project demonstrates:
- ✅ Clean, modular code architecture
- ✅ Realistic business logic
- ✅ User-centric design
- ✅ Production-ready patterns
- ✅ Full-stack JavaScript development
- ✅ React hooks & Context API
- ✅ Express RESTful API design
- ✅ Responsive Tailwind CSS

---

**Built with ❤️ for restaurant success**

**Version: 1.0.0** | **Status: Production-Ready**