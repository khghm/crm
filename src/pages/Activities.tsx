import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  X,
  MessageSquare,
  Video,
  Users
} from 'lucide-react';
import { mockActivities, mockCustomers } from '../data/mockData';
import { Activity } from '../types';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Activity>>({
    type: 'call',
    title: '',
    description: '',
    customerId: '',
    customerName: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.title.includes(searchTerm) || 
      a.description.includes(searchTerm) || 
      (a.customerName && a.customerName.includes(searchTerm));
    const matchesType = filterType === 'all' || a.type === filterType;
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={18} className="text-blue-500" />;
      case 'email': return <Mail size={18} className="text-purple-500" />;
      case 'meeting': return <Calendar size={18} className="text-emerald-500" />;
      case 'note': return <FileText size={18} className="text-amber-500" />;
      case 'task': return <CheckCircle2 size={18} className="text-teal-500" />;
      default: return <FileText size={18} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-50 border-blue-200';
      case 'email': return 'bg-purple-50 border-purple-200';
      case 'meeting': return 'bg-emerald-50 border-emerald-200';
      case 'note': return 'bg-amber-50 border-amber-200';
      case 'task': return 'bg-teal-50 border-teal-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'call': return 'تماس تلفنی';
      case 'email': return 'ایمیل';
      case 'meeting': return 'جلسه';
      case 'note': return 'یادداشت';
      case 'task': return 'وظیفه';
      default: return type;
    }
  };

  const handleAddActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: (formData.type as Activity['type']) || 'note',
      title: formData.title || '',
      description: formData.description || '',
      customerId: formData.customerId || '',
      customerName: formData.customerName || '',
      date: formData.date || new Date().toISOString(),
      createdBy: 'محمد رضوی'
    };
    setActivities([newActivity, ...activities]);
    setShowModal(false);
    setFormData({ type: 'call', title: '', description: '', customerId: '', customerName: '', date: new Date().toISOString().split('T')[0] });
  };

  const stats = {
    total: activities.length,
    calls: activities.filter(a => a.type === 'call').length,
    emails: activities.filter(a => a.type === 'email').length,
    meetings: activities.filter(a => a.type === 'meeting').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">فعالیت‌ها و تعاملات</h1>
          <p className="text-slate-500 mt-1">مدیریت و پیگیری تمام فعالیت‌های ارتباطی</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25"
        >
          <Plus size={18} />
          <span className="font-medium">ثبت فعالیت</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Phone size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.calls}</p>
              <p className="text-xs text-slate-500">تماس‌ها</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Mail size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.emails}</p>
              <p className="text-xs text-slate-500">ایمیل‌ها</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Calendar size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.meetings}</p>
              <p className="text-xs text-slate-500">جلسات</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <MessageSquare size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-xs text-slate-500">کل فعالیت‌ها</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="جستجو در فعالیت‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه انواع</option>
              <option value="call">تماس</option>
              <option value="email">ایمیل</option>
              <option value="meeting">جلسه</option>
              <option value="note">یادداشت</option>
              <option value="task">وظیفه</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-6">تایم‌لاین فعالیت‌ها</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          <div className="space-y-6">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="relative flex items-start gap-6 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                {/* Timeline Dot */}
                <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className={`p-4 rounded-xl border ${getActivityColor(activity.type)} transition-all hover:shadow-md`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-800">{activity.title}</h4>
                          <span className="px-2 py-0.5 text-xs font-medium bg-white/80 rounded-full text-slate-600">
                            {getActivityLabel(activity.type)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          {activity.customerName && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Users size={12} />
                              <span>{activity.customerName}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <FileText size={12} />
                            <span>توسط: {activity.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left flex-shrink-0">
                        <p className="text-xs text-slate-400">
                          {new Date(activity.date).toLocaleDateString('fa-IR')}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(activity.date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">فعالیتی یافت نشد</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Activity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">ثبت فعالیت جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">نوع فعالیت</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { type: 'call', icon: Phone, label: 'تماس' },
                    { type: 'email', icon: Mail, label: 'ایمیل' },
                    { type: 'meeting', icon: Calendar, label: 'جلسه' },
                    { type: 'note', icon: FileText, label: 'یادداشت' },
                    { type: 'task', icon: CheckCircle2, label: 'وظیفه' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setFormData({ ...formData, type: item.type as Activity['type'] })}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                        formData.type === item.type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-500'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">عنوان</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="عنوان فعالیت"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">توضیحات</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  placeholder="توضیحات فعالیت..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">مشتری مرتبط</label>
                <select
                  value={formData.customerId || ''}
                  onChange={(e) => {
                    const customer = mockCustomers.find(c => c.id === e.target.value);
                    setFormData({ 
                      ...formData, 
                      customerId: e.target.value,
                      customerName: customer?.name || ''
                    });
                  }}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">انتخاب مشتری (اختیاری)</option>
                  {mockCustomers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">تاریخ</label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleAddActivity}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
              >
                ثبت فعالیت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
