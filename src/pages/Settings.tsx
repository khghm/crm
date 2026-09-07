import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    dealUpdates: true,
    taskReminders: true,
    newCustomers: true
  });

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: User },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'appearance', label: 'ظاهر', icon: Palette },
  ];

  return (
    <div className="space-y-6">
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
                    ? 'bg-blue-50 text-blue-700'
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">اطلاعات پروفایل</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    defaultValue="رضوی"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    defaultValue="m.rezavi@company.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">تلفن</label>
                  <input
                    type="tel"
                    defaultValue="09121234567"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">سمت</label>
                  <input
                    type="text"
                    defaultValue="مدیر فروش"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">دپارتمان</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
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
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                  <Save size={18} />
                  <span className="font-medium">ذخیره تغییرات</span>
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">تنظیمات اعلان‌ها</h2>
              
              <div className="space-y-6">
                {/* Channel Settings */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-4">کانال‌های اعلان</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">اعلان‌های ایمیلی</p>
                        <p className="text-xs text-slate-500">دریافت اعلان‌ها از طریق ایمیل</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications.email ? '-translate-x-6' : '-translate-x-0.5'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">اعلان‌های پوش</p>
                        <p className="text-xs text-slate-500">دریافت اعلان‌ها در مرورگر</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications.push ? '-translate-x-6' : '-translate-x-0.5'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">پیامک</p>
                        <p className="text-xs text-slate-500">دریافت اعلان‌ها از طریق SMS</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.sms ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications.sms ? '-translate-x-6' : '-translate-x-0.5'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Event Settings */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-4">رویدادهای اعلان</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">بروزرسانی معاملات</p>
                        <p className="text-xs text-slate-500">تغییر وضعیت معاملات</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, dealUpdates: !notifications.dealUpdates })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.dealUpdates ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications.dealUpdates ? '-translate-x-6' : '-translate-x-0.5'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">یادآوری وظایف</p>
                        <p className="text-xs text-slate-500">اعلان سررسید وظایف</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, taskReminders: !notifications.taskReminders })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.taskReminders ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications.taskReminders ? '-translate-x-6' : '-translate-x-0.5'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-700">مشتریان جدید</p>
                        <p className="text-xs text-slate-500">ثبت مشتری جدید در سیستم</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, newCustomers: !notifications.newCustomers })}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.newCustomers ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications.newCustomers ? '-translate-x-6' : '-translate-x-0.5'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                  <Save size={18} />
                  <span className="font-medium">ذخیره تنظیمات</span>
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">تنظیمات امنیتی</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-4">تغییر رمز عبور</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور فعلی</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="رمز عبور فعلی"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">رمز عبور جدید</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="رمز عبور جدید"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">تکرار رمز عبور جدید</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="تکرار رمز عبور"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-4">احراز هویت دو مرحله‌ای</h3>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-emerald-800">احراز هویت دو مرحله‌ای فعال است</p>
                        <p className="text-xs text-emerald-600">حساب شما با لایه امنیتی اضافی محافظت می‌شود</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-4">جلسات فعال</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">Chrome - Windows</p>
                          <p className="text-xs text-slate-500">تهران، ایران • فعال الان</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">فعال</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">Safari - iPhone</p>
                          <p className="text-xs text-slate-500">تهران، ایران • ۲ ساعت پیش</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                        خروج
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                  <Save size={18} />
                  <span className="font-medium">ذخیره تغییرات</span>
                </button>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">تنظیمات ظاهری</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-4">تم</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`p-4 rounded-xl border-2 transition-all ${!darkMode ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <Sun size={24} className="mx-auto text-amber-500 mb-2" />
                      <p className="text-sm font-medium text-slate-700">روشن</p>
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`p-4 rounded-xl border-2 transition-all ${darkMode ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <Moon size={24} className="mx-auto text-slate-600 mb-2" />
                      <p className="text-sm font-medium text-slate-700">تاریک</p>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                      <Monitor size={24} className="mx-auto text-slate-500 mb-2" />
                      <p className="text-sm font-medium text-slate-700">سیستم</p>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-4">زبان</h3>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-slate-500" />
                    <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex-1">
                      <option>فارسی</option>
                      <option>English</option>
                      <option>العربية</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-4">اندازه فونت</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">کوچک</span>
                    <input type="range" min="12" max="18" defaultValue="14" className="flex-1" />
                    <span className="text-xs text-slate-500">بزرگ</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-medium text-slate-700 mb-4">رنگ اصلی</h3>
                  <div className="flex items-center gap-3">
                    {['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                  <Save size={18} />
                  <span className="font-medium">ذخیره تنظیمات</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
