import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Menu, X, Command } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass shadow-lg z-40 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Menu size={24} className="text-slate-700" />
        </button>
        <h1 className="font-bold text-lg gradient-text">CRM Pro</h1>
        <div className="relative">
          <Bell size={20} className="text-slate-600" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full">
            <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-500 ${collapsed ? 'lg:mr-20' : 'lg:mr-72'} pt-16 lg:pt-0`}>
        {/* Top Bar */}
        <header className="hidden lg:flex items-center justify-between glass shadow-sm px-8 py-4 sticky top-0 z-30 border-b border-white/50">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="جستجوی هوشمند... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowCommandPalette(true)}
                className="w-full pr-11 pl-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm hover:shadow-md"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg">
                <Command size={12} className="text-slate-400" />
                <span className="text-xs text-slate-400">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <button className="hidden xl:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple">
              <span>ایجاد سریع</span>
              <span className="text-xs opacity-75">⌘N</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 rounded-xl hover:bg-slate-100/80 transition-all group"
              >
                <Bell size={20} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white pulse-glow"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">اعلان‌ها</h3>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:text-blue-700">علامت‌گذاری همه به‌عنوان خوانده‌شده</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(notification.date).toLocaleDateString('fa-IR')}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100 text-center">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700">مشاهده همه اعلان‌ها</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                  م
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">محمد رضوی</p>
                <p className="text-xs text-slate-400">مدیر فروش</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Command Palette */}
      {showCommandPalette && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCommandPalette(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-slate-100">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="جستجو یا اجرای دستور..."
                className="flex-1 text-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setShowCommandPalette(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              <p className="text-xs text-slate-400 font-medium px-3 py-2">پیشنهادات</p>
              {['مشتریان', 'معاملات', 'وظایف', 'گزارشات', 'ایجاد مشتری جدید', 'ایجاد معامله جدید'].map((item, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-right">
                  <span className="text-sm text-slate-700">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
