import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [timePeriod, setTimePeriod] = useState('today'); // today, week, month
  const [userRole, setUserRole] = useState('manager'); // manager, owner
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Revenue');
  const [alerts, setAlerts] = useState([]);
  const [alertSimulation, setAlertSimulation] = useState(false);
  const [informedAlertIds, setInformedAlertIds] = useState([]);
  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2800);
  };

  const informOwner = (alert) => {
    if (!alert?.id) return;
    setInformedAlertIds((prev) => (prev.includes(alert.id) ? prev : [...prev, alert.id]));
    setAlertHistory((prev) => [
      {
        id: `history_${Date.now()}`,
        alertId: alert.id,
        actor: 'manager',
        action: `Manager informed owner about ${alert.type || alert.kpiName}`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const acknowledgeAlert = (alert, actor = 'manager') => {
    if (!alert?.id) return;
    setAcknowledgedAlertIds((prev) => (prev.includes(alert.id) ? prev : [...prev, alert.id]));
    setAlertHistory((prev) => [
      {
        id: `history_${Date.now()}`,
        alertId: alert.id,
        actor,
        action: `${actor === 'manager' ? 'Manager' : 'Owner'} acknowledged ${alert.type || alert.kpiName}`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  // Update dark mode in localStorage and DOM
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const value = {
    timePeriod,
    setTimePeriod,
    userRole,
    setUserRole,
    darkMode,
    setDarkMode,
    selectedCategory,
    setSelectedCategory,
    alerts,
    setAlerts,
    alertSimulation,
    setAlertSimulation,
    informedAlertIds,
    acknowledgedAlertIds,
    alertHistory,
    acknowledgeAlert,
    informOwner,
    toasts,
    addToast,
    userRole,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
