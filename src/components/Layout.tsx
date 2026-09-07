import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'وظیفه جدید', desc: 'تماس پیگیری با علی محمدی', time: '۵ دقیقه پیش', read: false },
    { id: 2, title: 'معامله جدید', desc: 'پروژه اپلیکیشن موبایل اضافه شد', time: '۱ ساعت پیش', read: false },
    { id: 3, title: 'جلسه امروز', desc: 'جلسه با فاطمه نوری ساعت ۱۴:۰۰', time: '۲ ساعت پیش', read: true },
    { id: 4, title: 'یادآوری', desc: 'ارسال فاکتور به گروه صنعتی پارس', time: '۳ ساعت پیش', read: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-slate-100">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">C</div>
          <h1 className="font-bold text-lg text-slate-800">CRM Pro</h1>
        </div>
        <div className="relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">۳</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full animate-slide-in-right">
            <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${collapsed ? 'lg:mr-20' : 'lg:mr-64'} pt-16 lg:pt-0`}>
        {/* Top Bar */}
        <header className="hidden lg:flex items-center justify-between bg-white shadow-sm px-8 py-4 sticky top-0 z-30 border-b border-slate-100">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="جستجو در مشتریان، معاملات، وظایف..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse-soft"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-scale-in">
                  <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">اعلان‌ها</h3>
                    <button onClick={() => setShowNotifications(false)} className="p-1 rounded-lg hover:bg-slate-100">
                      <X size={16} className="text-slate-400" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex items-start gap-3">
                          {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>}
                          <div className={!notif.read ? '' : 'mr-5'}>
                            <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{notif.desc}</p>
                            <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700">مشاهده همه اعلان‌ها</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                م
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">محمد رضوی</p>
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
    </div>
  );
};

export default Layout;
