import React from 'react';
import { Menu, X, BarChart3, Home, Utensils, ShoppingCart, Users, TrendingUp, Package, Wallet } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = ({ currentPage, onNavigate, isOpen, onClose }) => {
  const { userRole } = useAppContext();

  const menuItems = [
    { id: 'home', label: 'Command Centre', icon: Home },
    { id: 'revenue', label: 'Revenue', icon: TrendingUp },
    { id: 'operations', label: 'Operations', icon: Utensils },
    { id: 'orders', label: 'Orders & Menu', icon: ShoppingCart },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'customer', label: 'Customer', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'roi', label: 'ROI & Growth', icon: Wallet },
  ];

  // Filter based on role
  const visibleMenuItems = userRole === 'owner' ? menuItems : menuItems.slice(0, 4);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 dark:bg-slate-950 text-white z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={32} className="text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">F&B KPI</h1>
              <p className="text-xs text-slate-400">Intelligence System</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">The Culinary Nest • Downtown</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            Role: <span className="text-slate-300 capitalize">{userRole}</span>
          </p>
        </div>

        {/* Close button (Mobile) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
