import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Menu, X, Command, Plus, Sparkles, Zap } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}><div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-green)' }}></div></div>;
      case 'warning': return <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)' }}><div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-amber)' }}></div></div>;
      case 'error': return <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}><div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-red)' }}></div></div>;
      default: return <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,217,255,0.1)' }}><div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-cyan)' }}></div></div>;
    }
  };

  return (
    <div className="min-h-screen relative noise-overlay">
      {/* Aurora Background */}
      <div className="aurora-bg"></div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-header z-40 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Menu size={20} className="text-white/70" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
            <Zap size={14} className="text-white" />
          </div>
          <h1 className="text-sm font-bold text-white">CRM Pro</h1>
        </div>
        <div className="relative">
          <Bell size={20} className="text-white/70" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-bold" style={{ background: 'var(--gradient-secondary)' }}>
              {unreadNotifications}
            </span>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full animate-slide-in-right">
            <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`relative transition-all duration-500 ${collapsed ? 'lg:mr-[76px]' : 'lg:mr-[280px]'} pt-16 lg:pt-0`}>
        {/* Top Bar */}
        <header className="hidden lg:flex items-center justify-between glass-header px-6 h-[72px] sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                type="text"
                placeholder="جستجوی هوشمند..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-11 pl-20 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                <Command size={10} className="text-white/40" />
                <span className="text-[10px] text-white/40 font-mono">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Create Button */}
            <button className="btn-premium btn-primary-premium">
              <Plus size={16} />
              <span className="hidden xl:inline">ایجاد</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <Bell size={18} className="text-white/70" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)' }}></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 top-full mt-3 w-[400px] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-scale-in" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">اعلان‌ها</h3>
                    <span className="text-xs text-cyan-400 font-medium cursor-pointer hover:text-cyan-300">همه خوانده شد</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${!notification.read ? 'bg-cyan-500/[0.03]' : ''}`}>
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{notification.title}</p>
                            <p className="text-xs text-white/50 mt-0.5">{notification.message}</p>
                            <p className="text-[10px] text-white/30 mt-1.5">
                              {new Date(notification.date).toLocaleDateString('fa-IR')}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 6px var(--neon-cyan)' }}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-white/10 mx-1"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-transform group-hover:scale-105" style={{ background: 'var(--gradient-forest)' }}>
                  م
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--bg-primary)]" style={{ boxShadow: '0 0 6px var(--neon-green)' }}></div>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">محمد رضوی</p>
                <p className="text-[11px] text-white/40">مدیر فروش</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="relative z-10 p-4 lg:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
