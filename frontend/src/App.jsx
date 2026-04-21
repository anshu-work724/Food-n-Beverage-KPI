import React, { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TimeSelector from './components/TimeSelector';
import AlertPanel from './components/AlertPanel';
import { AppProvider, useAppContext } from './context/AppContext';

// Pages
import Home from './pages/Home';
import Revenue from './pages/Revenue';
import Operations from './pages/Operations';
import Orders from './pages/Orders';
import Staff from './pages/Staff';
import Customer from './pages/Customer';
import Inventory from './pages/Inventory';
import ROI from './pages/ROI';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const { darkMode, setDarkMode, userRole, setUserRole, alerts, toasts } = useAppContext();

  const pages = {
    home: Home,
    revenue: Revenue,
    operations: Operations,
    orders: Orders,
    staff: Staff,
    customer: Customer,
    inventory: Inventory,
    roi: ROI,
  };

  const CurrentPage = pages[currentPage] || Home;

  return (
    <div className={`flex h-screen bg-slate-50 dark:bg-slate-900 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          {/* Left */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu size={24} />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
              {pages[currentPage]?.displayName || 'Dashboard'}
            </h2>
          </div>

          {/* Center - Time Selector */}
          <div className="hidden md:block">
            <TimeSelector />
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-4">
            {/* Alerts Badge */}
            <button
              onClick={() => setAlertsOpen(!alertsOpen)}
              className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {alerts && alerts.length > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {Math.min(alerts.length, 9)}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Role Selector */}
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              <option value="manager">Manager</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="md:hidden px-4 py-3">
            <TimeSelector />
          </div>
          <CurrentPage />
        </main>
      </div>

      {/* Alert Panel */}
      <AlertPanel isOpen={alertsOpen} onClose={() => setAlertsOpen(false)} />

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-[60] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium border ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : toast.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
