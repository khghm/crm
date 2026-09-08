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
  MessageSquare,
  Zap,
  Sparkles
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
      className={`fixed top-0 right-0 h-full glass-sidebar transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col ${
        collapsed ? 'w-[76px]' : 'w-[280px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-[72px] border-b border-white/5 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow" style={{ background: 'var(--gradient-primary)' }}>
                <Zap size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--bg-primary)] animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">CRM Pro</h1>
              <p className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Enterprise</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg mx-auto" style={{ background: 'var(--gradient-primary)' }}>
            <Zap size={18} className="text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-20 w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10 border border-white/10"
        style={{ background: 'var(--gradient-primary)' }}
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <ChevronLeft size={12} className="text-white" />
        ) : (
          <ChevronRight size={12} className="text-white" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        {!collapsed && (
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-3 mb-3">
            ناوبری
          </p>
        )}
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? 'bg-white/5'
                    : 'hover:bg-white/[0.03]'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                {isActive && (
                  <>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-l-full" style={{ background: 'var(--gradient-primary)' }}></div>
                    <div className="absolute inset-0 rounded-xl opacity-50" style={{ background: 'radial-gradient(circle at right, rgba(0,217,255,0.1), transparent 70%)' }}></div>
                  </>
                )}
                <div className={`relative ${isActive ? 'text-cyan-400' : 'text-white/50 group-hover:text-white/80'} transition-colors`}>
                  <item.icon size={18} strokeWidth={isActive ? 2 : 1.75} />
                  {isActive && (
                    <div className="absolute inset-0 blur-md opacity-50" style={{ background: 'var(--neon-cyan)' }}></div>
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className={`text-sm flex-1 transition-colors ${isActive ? 'text-white font-medium' : 'text-white/70 group-hover:text-white/90'}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                        isActive 
                          ? 'text-cyan-400' 
                          : 'text-white/50'
                      }`} style={{ background: isActive ? 'rgba(0,217,255,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isActive ? 'rgba(0,217,255,0.2)' : 'rgba(255,255,255,0.1)'}` }}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Premium Upgrade Card */}
        {!collapsed && (
          <div className="mt-8 mx-1 relative overflow-hidden rounded-2xl p-4 border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))' }}>
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl" style={{ background: 'var(--neon-purple)', opacity: 0.3 }}></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">نسخه Pro</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-3">
                دسترسی به تمام امکانات پیشرفته و گزارش‌های هوش مصنوعی
              </p>
              <button className="w-full py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-[1.02]" style={{ background: 'var(--gradient-secondary)' }}>
                ارتقا به Pro
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* User Section */}
      <div className="border-t border-white/5 p-3 flex-shrink-0">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors'}`}>
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg" style={{ background: 'var(--gradient-forest)' }}>
              م
            </div>
            <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--bg-primary)]"></div>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">محمد رضوی</p>
                <p className="text-[11px] text-white/40 truncate">مدیر فروش</p>
              </div>
              <button className="p-1.5 rounded-md hover:bg-white/5 transition-colors text-white/40 hover:text-white/70">
                <LogOut size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
