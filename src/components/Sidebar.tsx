import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  ChevronRight,
  Calendar,
  Zap,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'داشبورد', badge: null },
  { path: '/customers', icon: Users, label: 'مشتریان', badge: null },
  { path: '/deals', icon: Briefcase, label: 'معاملات', badge: '5' },
  { path: '/tasks', icon: CheckSquare, label: 'وظایف', badge: '3' },
  { path: '/activities', icon: MessageSquare, label: 'فعالیت‌ها', badge: null },
  { path: '/reports', icon: BarChart3, label: 'گزارشات', badge: null },
  { path: '/settings', icon: Settings, label: 'تنظیمات', badge: null },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <aside className={`fixed top-0 right-0 h-full transition-all duration-500 ease-in-out z-50 ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/30">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight text-white">CRM Pro</h1>
                <p className="text-xs text-slate-400">مدیریت هوشمند</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg mx-auto shadow-lg shadow-purple-500/30">
              <Zap size={22} className="text-white" />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -left-3 top-24 w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-slate-900"
        >
          {collapsed ? <ChevronLeft size={14} className="text-white" /> : <ChevronRight size={14} className="text-white" />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-3 overflow-y-auto">
          {!collapsed && (
            <p className="text-xs text-slate-500 font-medium px-4 mb-3 uppercase tracking-wider">منوی اصلی</p>
          )}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1.5 transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-l from-blue-600/20 to-purple-600/20 text-white shadow-lg shadow-blue-500/10'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-full"></div>
                )}
                <item.icon size={20} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-400' : ''}`} />
                {!collapsed && (
                  <>
                    <span className="font-medium text-sm flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isActive ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10">
          {!collapsed && (
            <div className="bg-gradient-to-l from-blue-600/10 to-purple-600/10 rounded-xl p-4 mb-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-blue-400" />
                <span className="text-xs font-medium text-slate-300">جلسه امروز</span>
              </div>
              <p className="text-sm text-white font-medium">جلسه با علی محمدی</p>
              <p className="text-xs text-slate-400 mt-1">ساعت ۱۰:۰۰ صبح</p>
            </div>
          )}
          
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                م
              </div>
              <div className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">محمد رضوی</p>
                <p className="text-xs text-slate-400 truncate">مدیر فروش</p>
              </div>
            )}
            {!collapsed && (
              <button className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
