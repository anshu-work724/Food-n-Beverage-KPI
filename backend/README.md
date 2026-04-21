# F&B KPI Intelligence System - API Documentation

## Base URL
```
http://localhost:5000
```

---

## Authentication
Currently, no authentication required (development mode).

---

## Endpoints

### 1. Get Dashboard KPIs
```
GET /api/dashboard
```
Returns top-level KPIs for the command centre.

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2025-04-21",
    "dayOfWeek": "Monday",
    "kpis": [
      {
        "kpiId": "daily_revenue",
        "name": "Daily Revenue",
        "value": 5500,
        "formattedValue": "₹5,500",
        "trend": 2.3,
        "status": "healthy",
        "category": "Revenue",
        "benchmark": { "min": 4200, "max": 7800, "target": 5500 }
      }
    ]
  }
}
```

---

### 2. Get Category KPIs
```
GET /api/kpis/:category
```
Get all KPIs for a specific category.

**Categories:**
- `Revenue`
- `Operations`
- `Inventory`
- `Staff`
- `Customer`
- `ROI`

**Example:**
```
GET /api/kpis/Revenue
```

**Response:**
```json
{
  "success": true,
  "category": "Revenue",
  "kpis": [...]
}
```

---

### 3. Get Historical Data
```
GET /api/historical/:days
```
Get historical data for trending (max 90 days).

**Example:**
```
GET /api/historical/30
```

**Response:**
```json
{
  "success": true,
  "period": "Last 30 days",
  "data": [
    {
      "date": "2025-03-22",
      "dayOfWeek": "Saturday",
      "revenue": 7200,
      "target": 5500,
      "attainment": 130.9,
      ...
    }
  ]
}
```

---

### 4. Get KPI Trend Data
```
GET /api/kpi/:kpiId/trend?days=30
```
Get trending data for a specific KPI.

**KPI IDs:**
- `daily_revenue`
- `revenue_attainment`
- `revpash`
- `kitchen_ticket_time`
- `table_occupancy`
- `delivery_time`
- `food_cost_percent`
- `labour_cost_percent`
- `nps`
- `customer_retention`
- `ebitda_margin`
- etc.

**Example:**
```
GET /api/kpi/daily_revenue/trend?days=30
```

**Response:**
```json
{
  "success": true,
  "kpiId": "daily_revenue",
  "kpiName": "Daily Revenue",
  "unit": "₹",
  "benchmark": { "min": 4200, "max": 7800, "target": 5500 },
  "data": [
    {
      "date": "2025-03-22",
      "dayOfWeek": "Saturday",
      "value": 7200,
      "formatted": "₹7,200"
    }
  ]
}
```

---

### 5. Get Revenue Channel Mix
```
GET /api/revenue/channel-mix
```
Get dine-in vs delivery revenue breakdown.

**Response:**
```json
{
  "success": true,
  "date": "2025-04-21",
  "total": 5500,
  "channels": [
    {
      "name": "Dine-In",
      "value": 3575,
      "percentage": 65.0,
      "orders": 12
    },
    {
      "name": "Delivery",
      "value": 1925,
      "percentage": 35.0,
      "orders": 8
    }
  ]
}
```

---

### 6. Get Hourly Breakdown
```
GET /api/hourly/:date
```
Get hourly revenue breakdown for a specific date.

**Format:** YYYY-MM-DD

**Example:**
```
GET /api/hourly/2025-04-21
```

**Response:**
```json
{
  "success": true,
  "date": "2025-04-21",
  "totalRevenue": 5500,
  "hourlyData": [
    {
      "hour": 11,
      "revenue": 275,
      "percentage": 5.0
    },
    {
      "hour": 12,
      "revenue": 1100,
      "percentage": 20.0
    }
  ]
}
```

---

### 7. Get Alerts
```
GET /api/alerts?severity=all
```
Get current alerts. Optional severity filter.

**Severity Options:**
- `all`
- `critical`
- `high`
- `medium`
- `low`

**Example:**
```
GET /api/alerts?severity=critical
```

**Response:**
```json
{
  "success": true,
  "totalAlerts": 2,
  "alerts": [
    {
      "id": "KTT_HIGH",
      "domain": "Operations",
      "type": "Kitchen Ticket Time Exceeded",
      "severity": "high",
      "condition": "KTT > 15 min",
      "value": "16 min",
      "recommendation": "Review kitchen workflow, reduce open orders",
      "timestamp": "2025-04-21T18:45:00Z"
    }
  ]
}
```

---

### 8. Get Time Period KPIs
```
GET /api/time/:period
```
Get KPIs aggregated for a specific time period.

**Periods:**
- `today`
- `week`
- `month`

**Example:**
```
GET /api/time/week
```

**Response:**
```json
{
  "success": true,
  "period": "week",
  "duration": 7,
  "summary": {
    "totalRevenue": 38500,
    "avgRevenue": 5500,
    "avgFoodCost": 31.2,
    "avgLabourCost": 20.8
  },
  "kpis": [...],
  "data": [...]
}
```

---

### 9. Get Metadata
```
GET /api/metadata
```
Get restaurant information and configuration.

**Response:**
```json
{
  "success": true,
  "metadata": {
    "restaurantName": "The Culinary Nest",
    "location": "Downtown",
    "seats": 60,
    "hoursPerDay": 12,
    "generatedAt": "2025-04-21T18:45:00Z"
  }
}
```

---

### 10. Simulate Alert
```
POST /api/simulate/alert
```
Trigger an alert for testing purposes.

**Request Body:**
```json
{
  "alertType": "high_ktt"  // Options: high_ktt, slow_delivery, high_food_cost, low_revenue
}
```

**Response:**
```json
{
  "success": true,
  "message": "Alert simulation: high_ktt",
  "alerts": [...]
}
```

---

### 11. Regenerate Data
```
GET /api/regenerate
```
Generate fresh mock data (useful for testing/demo).

**Response:**
```json
{
  "success": true,
  "message": "Data regenerated",
  "metadata": {...}
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "error": "Route not found"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid period"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## KPI Status Values

```
healthy    - Green (on target)
warning    - Amber (warning range)
critical   - Red (critical range)
unknown    - Gray (no data)
```

---

## Data Types

### KPI Object
```typescript
{
  kpiId: string
  name: string
  description: string
  value: number
  formattedValue: string
  trend: number          // percentage change
  status: "healthy" | "warning" | "critical" | "unknown"
  category: string
  tier: "Operational" | "Strategic" | "SmartAlert"
  formula: string
  unit: string
  benchmark: {
    min: number
    max: number
    target: number
  }
  alertThreshold: {
    lower: number
    upper: number
  }
}
```

### Alert Object
```typescript
{
  id: string
  domain: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  condition: string
  value: string | number
  recommendation: string
  timestamp: ISO8601 string
}
```

### Day Data Object
```typescript
{
  date: YYYY-MM-DD
  dayOfWeek: string
  revenue: number
  target: number
  attainment: number
  dineInRevenue: number
  deliveryRevenue: number
  dineInOrders: number
  deliveryOrders: number
  kitchenTicketTime: number
  tableOccupancy: number
  deliveryTime: number
  foodCostPercent: number
  labourCostPercent: number
  wastagePercent: number
  nps: number
  hourlyBreakdown: { [hour: number]: revenue: number }
}
```

---

## Rate Limiting

Currently no rate limiting (development mode).

For production, implement rate limiting:
- General: 1000 requests/hour
- Alert simulations: 10/minute

---

## Caching

APIs are not cached in development. In production:
- Dashboard: Cache 1 minute
- Historical: Cache 10 minutes
- Trends: Cache 5 minutes
- Alerts: Real-time (no cache)

---

## CORS

**Development:** All origins allowed
**Production:** Restrict to your domain

---

## Example Usage

### curl
```bash
# Get dashboard
curl http://localhost:5000/api/dashboard

# Get revenue trends
curl http://localhost:5000/api/kpi/daily_revenue/trend?days=30

# Simulate alert
curl -X POST http://localhost:5000/api/simulate/alert \
  -H "Content-Type: application/json" \
  -d '{"alertType":"high_ktt"}'
```

### fetch (JavaScript)
```javascript
// Get dashboard KPIs
const response = await fetch('http://localhost:5000/api/dashboard');
const data = await response.json();
console.log(data.data.kpis);

// Get revenue trends
const trendResponse = await fetch('/api/kpi/daily_revenue/trend?days=30');
const trendData = await trendResponse.json();
console.log(trendData.data);
```

---

## Troubleshooting

**Connection refused?**
- Ensure backend is running: `npm run dev` in backend directory
- Check port 5000 is not in use

**CORS errors?**
- In development, CORS is enabled for all origins
- Check browser console for actual error

**Invalid data?**
- Data is generated fresh on server start
- Use `/api/regenerate` to reset data if needed

---

## Future Enhancements

- [ ] Authentication (JWT)
- [ ] Database integration
- [ ] Advanced filtering
- [ ] Custom date ranges
- [ ] Batch operations
- [ ] Webhooks for alerts
- [ ] Export capabilities (CSV, PDF)
- [ ] Real-time WebSocket updates

---

**Version: 1.0.0**
**Last Updated: 2025-04-21**
