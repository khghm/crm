import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Save, Key, Monitor, Smartphone, Mail, Moon, Sun, Camera, Check } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, dealUpdates: true, taskReminders: true, newCustomers: true });

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: User },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'appearance', label: 'ظاهر', icon: Palette },
  ];

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? '' : 'bg-white/10'}`} style={{ background: enabled ? 'var(--gradient-primary)' : undefined }}>
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all absolute top-0.5 ${enabled ? 'right-[22px]' : 'right-0.5'}`}></div>
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">تنظیمات</h1>
        <p className="text-sm text-white/40">مدیریت حساب کاربری و تنظیمات سیستم</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass-card p-2 sticky top-6">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeTab === tab.id ? 'text-cyan-400' : 'text-white/60 hover:text-white/90'
                }`}
                style={{ background: activeTab === tab.id ? 'rgba(0,217,255,0.05)' : 'transparent' }}>
                <tab.icon size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="glass-card overflow-hidden">
              <div className="p-6 relative overflow-hidden" style={{ background: 'var(--gradient-primary)' }}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white/30 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>م</div>
                    <button className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform" style={{ background: 'var(--gradient-secondary)' }}>
                      <Camera size={12} className="text-white" />
                    </button>
                  </div>
                  <div className="text-white">
                    <h2 className="text-lg font-bold">محمد رضوی</h2>
                    <p className="text-sm opacity-90">مدیر فروش</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">نام</label>
                    <input type="text" defaultValue="محمد" className="input-premium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">نام خانوادگی</label>
                    <input type="text" defaultValue="رضوی" className="input-premium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">ایمیل</label>
                    <input type="email" defaultValue="m.rezavi@company.com" className="input-premium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">تلفن</label>
                    <input type="tel" defaultValue="09121234567" className="input-premium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">سمت</label>
                    <input type="text" defaultValue="مدیر فروش" className="input-premium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">دپارتمان</label>
                    <select className="input-premium">
                      <option>فروش</option>
                      <option>بازاریابی</option>
                      <option>پشتیبانی</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="btn-premium btn-primary-premium">
                    <Save size={16} />ذخیره تغییرات
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">کانال‌های اعلان</h3>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'اعلان‌های ایمیلی', desc: 'دریافت اعلان‌ها از طریق ایمیل', icon: Mail },
                    { key: 'push', label: 'اعلان‌های پوش', desc: 'دریافت اعلان‌ها در مرورگر', icon: Bell },
                    { key: 'sms', label: 'پیامک', desc: 'دریافت اعلان‌ها از طریق SMS', icon: Smartphone },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,217,255,0.1)' }}>
                          <item.icon size={16} style={{ color: 'var(--neon-cyan)' }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-xs text-white/40">{item.desc}</p>
                        </div>
                      </div>
                      <Toggle enabled={notifications[item.key as keyof typeof notifications]} onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">انواع اعلان‌ها</h3>
                <div className="space-y-3">
                  {[
                    { key: 'dealUpdates', label: 'بروزرسانی معاملات' },
                    { key: 'taskReminders', label: 'یادآوری وظایف' },
                    { key: 'newCustomers', label: 'مشتریان جدید' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <Toggle enabled={notifications[item.key as keyof typeof notifications]} onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card p-6 space-y-6">
              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.1)' }}>
                    <Key size={16} style={{ color: 'var(--neon-purple)' }} />
                  </div>
                  <h3 className="text-sm font-bold text-white">تغییر رمز عبور</h3>
                </div>
                <div className="space-y-3">
                  <input type="password" className="input-premium" placeholder="رمز عبور فعلی" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="password" className="input-premium" placeholder="رمز عبور جدید" />
                    <input type="password" className="input-premium" placeholder="تکرار رمز عبور" />
                  </div>
                  <button className="btn-premium btn-primary-premium">تغییر رمز عبور</button>
                </div>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
                      <Shield size={16} style={{ color: 'var(--neon-green)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">احراز هویت دو مرحله‌ای</p>
                      <p className="text-xs text-white/40">افزایش امنیت حساب</p>
                    </div>
                  </div>
                  <span className="badge-premium badge-green"><Check size={12} /> فعال</span>
                </div>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,217,255,0.1)' }}>
                    <Monitor size={16} style={{ color: 'var(--neon-cyan)' }} />
                  </div>
                  <h3 className="text-sm font-bold text-white">جلسات فعال</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-3">
                      <Monitor size={14} className="text-white/40" />
                      <div>
                        <p className="text-sm font-medium text-white">Chrome - Windows</p>
                        <p className="text-xs text-white/40">تهران • اکنون</p>
                      </div>
                    </div>
                    <span className="badge-premium badge-green">فعال</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="glass-card p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">تم سیستم</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'روشن', icon: Sun },
                    { id: 'dark', label: 'تاریک', icon: Moon },
                    { id: 'system', label: 'سیستم', icon: Monitor },
                  ].map((t) => (
                    <button key={t.id} onClick={() => setTheme(t.id)}
                      className={`p-5 rounded-xl border-2 text-center transition-all ${theme === t.id ? '' : 'hover:border-white/20'}`}
                      style={{ borderColor: theme === t.id ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.1)', background: theme === t.id ? 'rgba(0,217,255,0.05)' : 'transparent' }}>
                      <t.icon size={20} className="mx-auto mb-2" style={{ color: theme === t.id ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.4)' }} />
                      <p className="text-sm font-medium" style={{ color: theme === t.id ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.6)' }}>{t.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">زبان سیستم</h3>
                <select className="input-premium">
                  <option>فارسی</option>
                  <option>English</option>
                  <option>العربية</option>
                </select>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">فرمت تاریخ</h3>
                <select className="input-premium">
                  <option>شمسی (۱۴۰۳/۰۱/۱۵)</option>
                  <option>میلادی (2024/01/15)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
