import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageSquare,
  Zap
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
    <aside 
      className={`fixed top-0 right-0 h-full bg-white border-l border-gray-200 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col ${
        collapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <Zap size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">CRM Pro</h1>
              <p className="text-[11px] text-gray-500 leading-tight">مدیریت ارتباط</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm mx-auto">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all z-10"
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <ChevronLeft size={14} className="text-gray-600" />
        ) : (
          <ChevronRight size={14} className="text-gray-600" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {!collapsed && (
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            منو
          </p>
        )}
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 relative ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 rounded-l-full"></div>
                )}
                <item.icon 
                  size={18} 
                  strokeWidth={isActive ? 2 : 1.75}
                  className={isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                />
                {!collapsed && (
                  <>
                    <span className={`text-sm flex-1 ${isActive ? 'font-medium' : 'font-normal'}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[11px] font-medium rounded-md ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Quick Info */}
        {!collapsed && (
          <div className="mt-6">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              جلسه امروز
            </p>
            <div className="mx-1 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar size={13} className="text-blue-600" />
                <span className="text-[11px] font-medium text-blue-700">10:00 صبح</span>
              </div>
              <p className="text-sm font-medium text-gray-900 leading-tight">جلسه با علی محمدی</p>
              <p className="text-xs text-gray-500 mt-0.5">بررسی قرارداد</p>
            </div>
          </div>
        )}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-3 flex-shrink-0">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              م
            </div>
            <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">محمد رضوی</p>
                <p className="text-xs text-gray-500 truncate">مدیر فروش</p>
              </div>
              <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
