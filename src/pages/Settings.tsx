import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Save, Key, Monitor, Smartphone, Mail, Moon, Sun, Camera, Check } from 'lucide-react';

interface SettingsState {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    bio: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    dealUpdates: boolean;
    taskReminders: boolean;
    newCustomers: boolean;
  };
  appearance: {
    theme: string;
    language: string;
    dateFormat: string;
  };
}

const defaultSettings: SettingsState = {
  profile: {
    firstName: 'محمد',
    lastName: 'رضوی',
    email: 'm.rezavi@company.com',
    phone: '09121234567',
    position: 'مدیر فروش',
    department: 'فروش',
    bio: 'مدیر فروش با بیش از ۵ سال تجربه'
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    dealUpdates: true,
    taskReminders: true,
    newCustomers: true
  },
  appearance: {
    theme: 'light',
    language: 'فارسی',
    dateFormat: 'شمسی (۱۴۰۳/۰۱/۱۵)'
  }
};

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('crm_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: User },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'appearance', label: 'ظاهر', icon: Palette },
  ];

  const handleSave = () => {
    localStorage.setItem('crm_settings', JSON.stringify(settings));
    setSaveMessage('تنظیمات با موفقیت ذخیره شد');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-blue-500' : 'bg-slate-300'}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute top-0.5 ${enabled ? 'right-[22px]' : 'right-0.5'}`}></div>
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-heading-1">تنظیمات</h1>
        <p className="text-body-sm mt-1">مدیریت حساب کاربری و تنظیمات سیستم</p>
      </div>

      {saveMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
          <Check size={18} />
          <span className="text-sm font-medium">{saveMessage}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="card p-2 sticky top-6">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                }`}>
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card overflow-hidden">
              <div className="p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white/30 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      {settings.profile.firstName.charAt(0)}
                    </div>
                    <button className="absolute -bottom-1 -left-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                      <Camera size={12} className="text-blue-600" />
                    </button>
                  </div>
                  <div className="text-white">
                    <h2 className="text-lg font-bold">{settings.profile.firstName} {settings.profile.lastName}</h2>
                    <p className="text-sm opacity-90">{settings.profile.position}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-label block mb-1.5">نام</label>
                    <input type="text" value={settings.profile.firstName} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, firstName: e.target.value } })} className="input" />
                  </div>
                  <div>
                    <label className="text-label block mb-1.5">نام خانوادگی</label>
                    <input type="text" value={settings.profile.lastName} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, lastName: e.target.value } })} className="input" />
                  </div>
                  <div>
                    <label className="text-label block mb-1.5">ایمیل</label>
                    <input type="email" value={settings.profile.email} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, email: e.target.value } })} className="input" />
                  </div>
                  <div>
                    <label className="text-label block mb-1.5">تلفن</label>
                    <input type="tel" value={settings.profile.phone} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, phone: e.target.value } })} className="input" />
                  </div>
                  <div>
                    <label className="text-label block mb-1.5">سمت</label>
                    <input type="text" value={settings.profile.position} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, position: e.target.value } })} className="input" />
                  </div>
                  <div>
                    <label className="text-label block mb-1.5">دپارتمان</label>
                    <select value={settings.profile.department} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, department: e.target.value } })} className="input">
                      <option>فروش</option>
                      <option>بازاریابی</option>
                      <option>پشتیبانی</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-label block mb-1.5">بیوگرافی</label>
                  <textarea rows={3} value={settings.profile.bio} onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, bio: e.target.value } })} className="input resize-none" />
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={handleSave} className="btn btn-primary">
                    <Save size={16} />ذخیره تغییرات
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6 space-y-6">
              <div>
                <h3 className="text-heading-2 mb-4">کانال‌های اعلان</h3>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'اعلان‌های ایمیلی', desc: 'دریافت اعلان‌ها از طریق ایمیل', icon: Mail },
                    { key: 'push', label: 'اعلان‌های پوش', desc: 'دریافت اعلان‌ها در مرورگر', icon: Bell },
                    { key: 'sms', label: 'پیامک', desc: 'دریافت اعلان‌ها از طریق SMS', icon: Smartphone },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <item.icon size={16} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <Toggle enabled={settings.notifications[item.key as keyof typeof settings.notifications]} onChange={() => setSettings({ ...settings, notifications: { ...settings.notifications, [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications] } })} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-heading-2 mb-4">انواع اعلان‌ها</h3>
                <div className="space-y-3">
                  {[
                    { key: 'dealUpdates', label: 'بروزرسانی معاملات' },
                    { key: 'taskReminders', label: 'یادآوری وظایف' },
                    { key: 'newCustomers', label: 'مشتریان جدید' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm font-medium text-slate-800">{item.label}</p>
                      <Toggle enabled={settings.notifications[item.key as keyof typeof settings.notifications]} onChange={() => setSettings({ ...settings, notifications: { ...settings.notifications, [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications] } })} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn btn-primary">
                  <Save size={16} />ذخیره تنظیمات
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6 space-y-6">
              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Key size={16} className="text-purple-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">تغییر رمز عبور</h3>
                </div>
                <div className="space-y-3">
                  <input type="password" className="input" placeholder="رمز عبور فعلی" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="password" className="input" placeholder="رمز عبور جدید" />
                    <input type="password" className="input" placeholder="تکرار رمز عبور" />
                  </div>
                  <button onClick={() => alert('رمز عبور با موفقیت تغییر کرد')} className="btn btn-primary">تغییر رمز عبور</button>
                </div>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Shield size={16} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">احراز هویت دو مرحله‌ای</p>
                      <p className="text-xs text-slate-500">افزایش امنیت حساب</p>
                    </div>
                  </div>
                  <span className="badge badge-success"><Check size={12} /> فعال</span>
                </div>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Monitor size={16} className="text-blue-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">جلسات فعال</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor size={14} className="text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Chrome - Windows</p>
                        <p className="text-xs text-slate-500">تهران • اکنون</p>
                      </div>
                    </div>
                    <span className="badge badge-success">فعال</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card p-6 space-y-6">
              <div>
                <h3 className="text-heading-2 mb-4">تم سیستم</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'روشن', icon: Sun },
                    { id: 'dark', label: 'تاریک', icon: Moon },
                    { id: 'system', label: 'سیستم', icon: Monitor },
                  ].map((t) => (
                    <button key={t.id} onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme: t.id } })}
                      className={`p-5 rounded-xl border-2 text-center transition-all ${settings.appearance.theme === t.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <t.icon size={20} className={`mx-auto mb-2 ${settings.appearance.theme === t.id ? 'text-blue-500' : 'text-slate-400'}`} />
                      <p className={`text-sm font-medium ${settings.appearance.theme === t.id ? 'text-blue-700' : 'text-slate-600'}`}>{t.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-heading-2 mb-4">زبان سیستم</h3>
                <select value={settings.appearance.language} onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, language: e.target.value } })} className="input">
                  <option>فارسی</option>
                  <option>English</option>
                  <option>العربية</option>
                </select>
              </div>
              <div>
                <h3 className="text-heading-2 mb-4">فرمت تاریخ</h3>
                <select value={settings.appearance.dateFormat} onChange={(e) => setSettings({ ...settings, appearance: { ...settings.appearance, dateFormat: e.target.value } })} className="input">
                  <option>شمسی (۱۴۰۳/۰۱/۱۵)</option>
                  <option>میلادی (2024/01/15)</option>
                </select>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn btn-primary">
                  <Save size={16} />ذخیره تنظیمات
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
