import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Globe,
  Database,
  Key,
  Mail,
  Smartphone,
  Monitor,
  Check
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    dealUpdates: true,
    taskReminders: true,
    newCustomers: true,
    weeklyReport: true,
    monthlyReport: false
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: User },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'appearance', label: 'ظاهر', icon: Palette },
    { id: 'integrations', label: 'اتصالات', icon: Database },
  ];

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform absolute top-0.5 ${enabled ? 'left-0.5' : 'left-[26px]'}`}></div>
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">تنظیمات</h1>
        <p className="text-slate-500 mt-1">مدیریت تنظیمات حساب کاربری و سیستم</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-l from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 mb-6">اطلاعات پروفایل</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  م
                </div>
                <div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    تغییر تصویر
                  </button>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG یا GIF. حداکثر 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">نام</label>
                  <input
                    type="text"
                    defaultValue="محمد"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    defaultValue="رضوی"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    defaultValue="m.rezavi@company.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">تلفن</label>
                  <input
                    type="tel"
                    defaultValue="09121234567"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">سمت</label>
                  <input
                    type="text"
                    defaultValue="مدیر فروش"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">دپارتمان</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
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
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button 
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all shadow-lg ${
                    saved 
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25'
                  }`}
                >
                  {saved ? <Check size={18} /> : <Save size={18} />}
                  <span className="font-medium">{saved ? 'ذخیره شد!' : 'ذخیره تغییرات'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">کانال‌های اعلان</h2>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'اعلان‌های ایمیلی', desc: 'دریافت اعلان‌ها از طریق ایمیل', icon: Mail },
                    { key: 'push', label: 'اعلان‌های مرورگر', desc: 'دریافت اعلان‌ها در مرورگر', icon: Monitor },
                    { key: 'sms', label: 'پیامک', desc: 'دریافت اعلان‌ها از طریق SMS', icon: Smartphone },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <item.icon size={18} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <ToggleSwitch 
                        enabled={notifications[item.key as keyof typeof notifications]} 
                        onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">اعلان‌های سیستم</h2>
                <div className="space-y-4">
                  {[
                    { key: 'dealUpdates', label: 'بروزرسانی معاملات', desc: 'اطلاع‌رسانی تغییرات وضعیت معاملات' },
                    { key: 'taskReminders', label: 'یادآوری وظایف', desc: 'یادآوری وظایف نزدیک به موعد' },
                    { key: 'newCustomers', label: 'مشتریان جدید', desc: 'اطلاع‌رسانی ثبت مشتری جدید' },
                    { key: 'weeklyReport', label: 'گزارش هفتگی', desc: 'ارسال گزارش عملکرد هفتگی' },
                    { key: 'monthlyReport', label: 'گزارش ماهانه', desc: 'ارسال گزارش عملکرد ماهانه' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <ToggleSwitch 
                        enabled={notifications[item.key as keyof typeof notifications]} 
                        onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">تغییر رمز عبور</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور فعلی</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور جدید</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">تکرار رمز عبور جدید</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
                  >
                    <Key size={18} />
                    <span className="font-medium">تغییر رمز عبور</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">احراز هویت دو مرحله‌ای</h2>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-slate-700">فعال‌سازی احراز هویت دو مرحله‌ای</p>
                    <p className="text-xs text-slate-500 mt-1">افزایش امنیت حساب کاربری با تأیید دو مرحله‌ای</p>
                  </div>
                  <ToggleSwitch enabled={false} onToggle={() => {}} />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">جلسات فعال</h2>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome - Windows', location: 'تهران، ایران', time: 'اکنون', active: true },
                    { device: 'Safari - iPhone', location: 'تهران، ایران', time: '۲ ساعت پیش', active: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">{session.device}</p>
                          <p className="text-xs text-slate-500">{session.location} • {session.time}</p>
                        </div>
                      </div>
                      {session.active && (
                        <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">فعال</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 mb-6">تنظیمات ظاهری</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">تم رنگی</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'روشن', color: 'bg-white border-2 border-blue-500', active: true },
                      { name: 'تاریک', color: 'bg-slate-800', active: false },
                      { name: 'خودکار', color: 'bg-gradient-to-l from-white to-slate-800', active: false },
                    ].map((theme, i) => (
                      <button key={i} className={`p-4 rounded-xl border-2 transition-all ${theme.active ? 'border-blue-500 shadow-lg' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className={`w-full h-16 rounded-lg ${theme.color} mb-2`}></div>
                        <p className="text-sm font-medium text-slate-700">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">رنگ اصلی</label>
                  <div className="flex items-center gap-3">
                    {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map((color, i) => (
                      <button
                        key={i}
                        className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${i === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">زبان</label>
                  <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <option>فارسی</option>
                    <option>English</option>
                    <option>العربية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">تقویم</label>
                  <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <option>شمسی</option>
                    <option>میلادی</option>
                    <option>قمری</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 mb-6">اتصالات و یکپارچه‌سازی</h2>
              
              <div className="space-y-4">
                {[
                  { name: 'گوگل', desc: 'اتصال به Gmail و Google Calendar', connected: true, color: 'bg-red-500' },
                  { name: 'اسلک', desc: 'ارسال اعلان‌ها به Slack', connected: false, color: 'bg-purple-500' },
                  { name: 'تلگرام', desc: 'ارسال اعلان‌ها به تلگرام', connected: true, color: 'bg-blue-400' },
                  { name: 'واتساپ', desc: 'ارسال پیام از طریق واتساپ', connected: false, color: 'bg-emerald-500' },
                  { name: 'ایران‌کیش', desc: 'درگاه پرداخت آنلاین', connected: false, color: 'bg-amber-500' },
                ].map((integration, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                        {integration.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{integration.name}</p>
                        <p className="text-xs text-slate-500">{integration.desc}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                      integration.connected 
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}>
                      {integration.connected ? 'متصل ✓' : 'اتصال'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
