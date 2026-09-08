import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Menu, X, Command, Plus } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Menu size={20} className="text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800">CRM Pro</h1>
        <div className="relative">
          <Bell size={20} className="text-slate-600" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full">
            <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content - Fixed margin to prevent overlap */}
      <main 
        className={`transition-all duration-300 ${collapsed ? 'lg:mr-[72px]' : 'lg:mr-[280px]'} pt-16 lg:pt-0`}
        style={{ minHeight: '100vh' }}
      >
        {/* Top Bar */}
        <header className="hidden lg:flex items-center justify-between bg-white border-b border-slate-200 px-6 h-16 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-16 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded">
                <Command size={10} className="text-slate-400" />
                <span className="text-[10px] text-slate-400 font-medium">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Create Button */}
            <button className="btn btn-primary px-3 py-2 text-sm">
              <Plus size={16} />
              <span className="hidden xl:inline">ایجاد</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Bell size={18} className="text-slate-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-96 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50 animate-scale-in">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">اعلان‌ها</h3>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:text-blue-700">همه خوانده شد</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-base">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(notification.date).toLocaleDateString('fa-IR')}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  م
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">محمد رضوی</p>
                <p className="text-xs text-slate-500">مدیر فروش</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
