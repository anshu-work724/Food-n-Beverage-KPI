import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  X,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const AlertPanel = ({ isOpen, onClose }) => {
  const {
    alerts,
    setAlerts,
    alertSimulation,
    setAlertSimulation,
    userRole,
    informedAlertIds,
    acknowledgedAlertIds,
    alertHistory,
    acknowledgeAlert,
    informOwner,
    addToast,
  } = useAppContext();
  const [expandedAlerts, setExpandedAlerts] = useState({});
  const [filterBySeverity, setFilterBySeverity] = useState('all');

  // Fetch alerts from API
  useEffect(() => {
    if (isOpen) {
      fetchAlerts();
    }
  }, [isOpen, alertSimulation]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/alerts`);
      const data = await response.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  // Simulate alert
  const simulateAlert = async (alertType) => {
    try {
      const response = await fetch(`${API_BASE}/api/simulate/alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertType }),
      });
      const data = await response.json();
      setAlerts(data.alerts || []);
      setAlertSimulation(!alertSimulation);
    } catch (error) {
      console.error('Error simulating alert:', error);
    }
  };

  const managerVisibleAlerts = alerts.filter((alert) => !acknowledgedAlertIds.includes(alert.id));
  const ownerVisibleAlerts = alerts.filter(
    (alert) => informedAlertIds.includes(alert.id) && !acknowledgedAlertIds.includes(alert.id),
  );

  const baseAlerts = userRole === 'owner' ? ownerVisibleAlerts : managerVisibleAlerts;
  const filteredAlerts =
    filterBySeverity === 'all'
      ? baseAlerts
      : baseAlerts.filter((alert) => alert.severity === filterBySeverity);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'low':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700';
    }
  };

  const getSeverityIcon = (severity) => {
    return severity === 'critical' || severity === 'high' ? (
      <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
    ) : (
      <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />
    );
  };

  const handleAlertAction = (alert, action) => {
    if (action === 'informOwner') {
      informOwner(alert);
      addToast(`Owner notified for ${alert.type || alert.kpiName}`, 'success');
      return;
    }

    if (action === 'acknowledge') {
      acknowledgeAlert(alert, userRole);
      addToast(`Acknowledged ${alert.type || alert.kpiName}`, 'info');
      return;
    }

    if (action === 'callManager') {
      addToast(`Manager contacted for ${alert.type || alert.kpiName}`, 'warning');
      return;
    }

    addToast(`${action} queued for ${alert.type || alert.kpiName}`, 'info');
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-full md:w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Alerts {filteredAlerts.length > 0 && <span className="text-red-600">({filteredAlerts.length})</span>}
        </h2>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <X size={24} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-3">
        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterBySeverity('all')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              filterBySeverity === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterBySeverity('critical')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              filterBySeverity === 'critical'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterBySeverity('high')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              filterBySeverity === 'high'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            High
          </button>
        </div>

        {/* Simulate Alert */}
        <details className="group">
          <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
            <span>🧪 Simulate Alert</span>
            <ChevronDown size={16} className="group-open:hidden" />
            <ChevronUp size={16} className="hidden group-open:block" />
          </summary>

          <div className="mt-3 space-y-2 text-sm">
            <button
              onClick={() => simulateAlert('high_ktt')}
              className="w-full px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded hover:bg-orange-200 dark:hover:bg-orange-900/50"
            >
              High Kitchen Ticket Time
            </button>
            <button
              onClick={() => simulateAlert('slow_delivery')}
              className="w-full px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
            >
              Slow Delivery Time
            </button>
            <button
              onClick={() => simulateAlert('high_food_cost')}
              className="w-full px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded hover:bg-amber-200 dark:hover:bg-amber-900/50"
            >
              High Food Cost
            </button>
            <button
              onClick={() => simulateAlert('low_revenue')}
              className="w-full px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50"
            >
              Low Revenue
            </button>
          </div>
        </details>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No alerts at this time!</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              All KPIs are operating within acceptable ranges.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} cursor-pointer transition-all hover:shadow-md`}
              onClick={() =>
                setExpandedAlerts((prev) => ({
                  ...prev,
                  [alert.id]: !prev[alert.id],
                }))
              }
            >
              {/* Alert Header */}
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {alert.type || alert.kpiName}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {alert.domain} • {alert.severity.toUpperCase()}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {alert.value}
                </span>
              </div>

              {/* Alert Details (Expanded) */}
              {expandedAlerts[alert.id] && (
                <div className="mt-4 pt-4 border-t border-current border-opacity-20 space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                      Condition:
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {alert.condition || 'Threshold exceeded'}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                      Recommendation:
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {alert.recommendation || 'Review and optimize this metric'}
                    </p>
                  </div>

                  {userRole !== 'owner' ? (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertAction(alert, 'acknowledge');
                        }}
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded text-xs font-semibold hover:bg-gray-100 dark:hover:bg-slate-600"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertAction(alert, 'Take Action');
                        }}
                        className="flex-1 px-3 py-2 bg-slate-900 dark:bg-slate-600 text-white rounded text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-500"
                      >
                        Take Action
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertAction(alert, 'informOwner');
                        }}
                        className="flex-1 px-3 py-2 bg-blue-700 text-white rounded text-xs font-semibold hover:bg-blue-800"
                      >
                        Inform Owner
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertAction(alert, 'callManager');
                        }}
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded text-xs font-semibold hover:bg-gray-100 dark:hover:bg-slate-600"
                      >
                        Call Manager
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertAction(alert, 'Take Action');
                        }}
                        className="flex-1 px-3 py-2 bg-slate-900 dark:bg-slate-600 text-white rounded text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-500"
                      >
                        Take Action
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {alertHistory.length > 0 && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Recent History</h3>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {alertHistory.slice(0, 6).map((item) => (
              <p key={item.id} className="text-xs text-slate-600 dark:text-slate-400">
                {userRole === 'owner' && item.actor === 'manager'
                  ? `Manager just acknowledged/informed: ${item.action}`
                  : item.action}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
