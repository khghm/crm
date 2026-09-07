import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Globe,
  Lock,
  Key,
  Smartphone,
  Mail,
  Moon,
  Sun,
  Monitor,
  Check,
  Camera
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    dealUpdates: true,
    taskReminders: true,
    newCustomers: true,
    weeklyReport: true,
    securityAlerts: true
  });

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: User, description: 'اطلاعات شخصی' },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell, description: 'تنظیمات اعلان' },
    { id: 'security', label: 'امنیت', icon: Shield, description: 'رمز عبور و امنیت' },
    { id: 'appearance', label: 'ظاهر', icon: Palette, description: 'تم و نمایش' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">تنظیمات</h1>
        <p className="text-slate-500 mt-1">مدیریت حساب کاربری و تنظیمات سیستم</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-3 sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-right transition-all mb-1 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-l from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100/50'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  <tab.icon size={18} />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-bold">{tab.label}</p>
                  <p className="text-xs text-slate-400">{tab.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-l from-blue-600 to-purple-600 p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
                </div>
                <div className="relative flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-3xl font-bold border-2 border-white/30 shadow-xl">
                      م
                    </div>
                    <button className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera size={14} className="text-blue-600" />
                    </button>
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold">محمد رضوی</h2>
                    <p className="text-sm opacity-80 mt-1">مدیر فروش • عضو از فروردین ۱۴۰۳</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6">اطلاعات شخصی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">نام</label>
                    <input
                      type="text"
                      defaultValue="محمد"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">نام خانوادگی</label>
                    <input
                      type="text"
                      defaultValue="رضوی"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ایمیل</label>
                    <input
                      type="email"
                      defaultValue="m.rezavi@company.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">تلفن</label>
                    <input
                      type="tel"
                      defaultValue="09121234567"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">سمت</label>
                    <input
                      type="text"
                      defaultValue="مدیر فروش"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">دپارتمان</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>فروش</option>
                      <option>بازاریابی</option>
                      <option>پشتیبانی</option>
                      <option>مدیریت</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">بیوگرافی</label>
                  <textarea
                    rows={3}
                    defaultValue="مدیر فروش با بیش از ۵ سال تجربه در زمینه مدیریت ارتباط با مشتری"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  />
                </div>

                <div className="flex justify-end mt-8">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple">
                    <Save size={18} />
                    <span>ذخیره تغییرات</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-2">تنظیمات اعلان‌ها</h2>
              <p className="text-sm text-slate-500 mb-8">نحوه دریافت اعلان‌ها را مدیریت کنید</p>
              
              <div className="space-y-6">
                {/* Channel Settings */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Globe size={16} className="text-blue-500" />
                    کانال‌های اعلان
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'email', label: 'اعلان‌های ایمیلی', desc: 'دریافت اعلان‌ها از طریق ایمیل', icon: Mail },
                      { key: 'push', label: 'اعلان‌های پوش', desc: 'دریافت اعلان‌ها در مرورگر', icon: Bell },
                      { key: 'sms', label: 'پیامک', desc: 'دریافت اعلان‌ها از طریق SMS', icon: Smartphone },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <item.icon size={18} className="text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                          className={`w-14 h-7 rounded-full transition-all relative ${notifications[item.key as keyof typeof notifications] ? 'bg-gradient-to-l from-blue-500 to-purple-500' : 'bg-slate-300'}`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all absolute top-0.5 ${notifications[item.key as keyof typeof notifications] ? 'right-0.5' : 'right-7'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Types */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Bell size={16} className="text-purple-500" />
                    انواع اعلان‌ها
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'dealUpdates', label: 'بروزرسانی معاملات', desc: 'تغییر وضعیت معاملات' },
                      { key: 'taskReminders', label: 'یادآوری وظایف', desc: 'اعلان سررسید وظایف' },
                      { key: 'newCustomers', label: 'مشتریان جدید', desc: 'ثبت مشتری جدید' },
                      { key: 'weeklyReport', label: 'گزارش هفتگی', desc: 'خلاصه عملکرد هفتگی' },
                      { key: 'securityAlerts', label: 'هشدارهای امنیتی', desc: 'اعلان‌های مربوط به امنیت' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-purple-200 transition-all">
                        <div>
                          <p className="text-sm font-bold text-slate-700">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                          className={`w-14 h-7 rounded-full transition-all relative ${notifications[item.key as keyof typeof notifications] ? 'bg-gradient-to-l from-blue-500 to-purple-500' : 'bg-slate-300'}`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all absolute top-0.5 ${notifications[item.key as keyof typeof notifications] ? 'right-0.5' : 'right-7'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple">
                    <Save size={18} />
                    <span>ذخیره تنظیمات</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-2">امنیت حساب</h2>
              <p className="text-sm text-slate-500 mb-8">مدیریت رمز عبور و تنظیمات امنیتی</p>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Key size={18} className="text-blue-500" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700">تغییر رمز عبور</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور فعلی</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور جدید</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">تکرار رمز عبور</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                      تغییر رمز عبور
                    </button>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Shield size={18} className="text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-700">احراز هویت دو مرحله‌ای</h3>
                        <p className="text-xs text-slate-500 mt-0.5">افزایش امنیت حساب با تایید دو مرحله‌ای</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2">
                      <Check size={16} />
                      فعال
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Monitor size={18} className="text-purple-500" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700">جلسات فعال</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Monitor size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">Chrome - Windows</p>
                          <p className="text-xs text-slate-500">تهران، ایران • اکنون</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">فعال</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Smartphone size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">Safari - iPhone</p>
                          <p className="text-xs text-slate-500">تهران، ایران • ۲ ساعت پیش</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-500 font-medium hover:text-red-600">خروج</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-2">ظاهر سیستم</h2>
              <p className="text-sm text-slate-500 mb-8">شخصی‌سازی ظاهر و نمایش سیستم</p>

              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-4">تم سیستم</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'روشن', icon: Sun, active: true },
                      { id: 'dark', label: 'تاریک', icon: Moon, active: false },
                      { id: 'system', label: 'سیستم', icon: Monitor, active: false },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`p-6 rounded-xl border-2 text-center transition-all ${
                          theme === t.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <t.icon size={24} className={`mx-auto mb-2 ${theme === t.id ? 'text-blue-500' : 'text-slate-400'}`} />
                        <p className={`text-sm font-bold ${theme === t.id ? 'text-blue-600' : 'text-slate-600'}`}>{t.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-4">زبان سیستم</h3>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all">
                    <option>فارسی</option>
                    <option>English</option>
                    <option>العربية</option>
                  </select>
                </div>

                {/* Date Format */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-4">فرمت تاریخ</h3>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all">
                    <option>شمسی (۱۴۰۳/۰۱/۱۵)</option>
                    <option>میلادی (2024/01/15)</option>
                    <option>قمری (۱۴۴۵/۰۷/۰۳)</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple">
                    <Save size={18} />
                    <span>ذخیره تنظیمات</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
