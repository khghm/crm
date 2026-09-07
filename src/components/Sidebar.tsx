import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'داشبورد' },
  { path: '/customers', icon: Users, label: 'مشتریان' },
  { path: '/deals', icon: Briefcase, label: 'معاملات' },
  { path: '/tasks', icon: CheckSquare, label: 'وظایف' },
  { path: '/reports', icon: BarChart3, label: 'گزارشات' },
  { path: '/settings', icon: Settings, label: 'تنظیمات' },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <aside className={`fixed top-0 right-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
              C
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">CRM Pro</h1>
              <p className="text-xs text-slate-400">مدیریت هوشمند</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg mx-auto shadow-lg">
            C
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-20 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
      >
        {collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border-r-4 border-blue-400 shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon size={20} />
            {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-sm font-bold">
            م
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">محمد رضوی</p>
              <p className="text-xs text-slate-400 truncate">مدیر فروش</p>
            </div>
          )}
          {!collapsed && (
            <button className="text-slate-400 hover:text-red-400 transition-colors">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Notification Badge */}
      {!collapsed && (
        <div className="absolute top-4 left-4">
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
