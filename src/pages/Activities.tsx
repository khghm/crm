import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
  MessageSquare,
  Send,
  File,
  Filter,
  Clock,
  User,
  Plus,
  Search,
  X
} from 'lucide-react';
import { mockActivities, mockCustomers } from '../data/mockData';
import { Activity } from '../types';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Activity>>({
    type: 'call',
    title: '',
    description: '',
    customerId: '',
    customerName: ''
  });

  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.title.includes(searchTerm) || a.description.includes(searchTerm) || (a.customerName || '').includes(searchTerm);
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
      case 'sms': return <MessageSquare size={18} className="text-pink-500" />;
      case 'document': return <File size={18} className="text-indigo-500" />;
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
      case 'sms': return 'bg-pink-50 border-pink-200';
      case 'document': return 'bg-indigo-50 border-indigo-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'call': return 'تماس';
      case 'email': return 'ایمیل';
      case 'meeting': return 'جلسه';
      case 'note': return 'یادداشت';
      case 'task': return 'وظیفه';
      case 'sms': return 'پیامک';
      case 'document': return 'سند';
      default: return type;
    }
  };

  const handleAddActivity = () => {
    const customer = mockCustomers.find(c => c.id === formData.customerId);
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: (formData.type as Activity['type']) || 'note',
      title: formData.title || '',
      description: formData.description || '',
      customerId: formData.customerId || '',
      customerName: customer?.name || formData.customerName || '',
      date: new Date().toISOString(),
      createdBy: 'محمد رضوی'
    };
    setActivities([newActivity, ...activities]);
    setShowModal(false);
    setFormData({ type: 'call', title: '', description: '', customerId: '', customerName: '' });
  };

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.date).toLocaleDateString('fa-IR');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  const typeStats = {
    call: activities.filter(a => a.type === 'call').length,
    email: activities.filter(a => a.type === 'email').length,
    meeting: activities.filter(a => a.type === 'meeting').length,
    note: activities.filter(a => a.type === 'note').length,
    sms: activities.filter(a => a.type === 'sms').length,
    document: activities.filter(a => a.type === 'document').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">تایم‌لاین فعالیت‌ها</h1>
          <p className="text-slate-500 mt-1">تمام تعاملات و فعالیت‌ها در یک نگاه</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple"
        >
          <Plus size={18} />
          <span>ثبت فعالیت</span>
        </button>
      </div>

      {/* Type Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { type: 'call', icon: Phone, label: 'تماس', color: 'text-blue-500', bg: 'bg-blue-50' },
          { type: 'email', icon: Mail, label: 'ایمیل', color: 'text-purple-500', bg: 'bg-purple-50' },
          { type: 'meeting', icon: Calendar, label: 'جلسه', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { type: 'note', icon: FileText, label: 'یادداشت', color: 'text-amber-500', bg: 'bg-amber-50' },
          { type: 'sms', icon: MessageSquare, label: 'پیامک', color: 'text-pink-500', bg: 'bg-pink-50' },
          { type: 'document', icon: File, label: 'سند', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((item) => (
          <button
            key={item.type}
            onClick={() => setFilterType(filterType === item.type ? 'all' : item.type)}
            className={`p-4 rounded-xl border transition-all text-center ${
              filterType === item.type 
                ? 'border-blue-300 bg-blue-50 shadow-md' 
                : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
            }`}
          >
            <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <item.icon size={18} className={item.color} />
            </div>
            <p className="text-lg font-bold text-slate-800">
              {typeStats[item.type as keyof typeof typeStats]}
            </p>
            <p className="text-xs text-slate-500">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="جستجو در فعالیت‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-11 pl-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          {filterType !== 'all' && (
            <button
              onClick={() => setFilterType('all')}
              className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <X size={16} />
              حذف فیلتر
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Clock size={14} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-700">{date}</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-xs text-slate-400">{dateActivities.length} فعالیت</span>
            </div>

            <div className="space-y-3 mr-4 border-r-2 border-slate-100 pr-6">
              {dateActivities.map((activity) => (
                <div key={activity.id} className="relative group">
                  {/* Timeline dot */}
                  <div className={`absolute -right-[33px] top-5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${getActivityColor(activity.type).split(' ')[0]}`}>
                  </div>
                  
                  <div className={`bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 hover:shadow-md transition-all ${getActivityColor(activity.type)}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-slate-800 text-sm">{activity.title}</h4>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-white/80 rounded-full text-slate-600">
                                {getActivityLabel(activity.type)}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">{activity.description}</p>
                          </div>
                          <span className="text-xs text-slate-400 flex-shrink-0">
                            {new Date(activity.date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          {activity.customerName && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <User size={12} />
                              <span>{activity.customerName}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <User size={12} />
                            <span>{activity.createdBy}</span>
                          </div>
                          {activity.duration && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock size={12} />
                              <span>{activity.duration} دقیقه</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100/50">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">فعالیتی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-100 rounded-t-3xl">
              <h2 className="text-xl font-bold text-slate-800">ثبت فعالیت جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">نوع فعالیت</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { type: 'call', icon: Phone, label: 'تماس' },
                    { type: 'email', icon: Mail, label: 'ایمیل' },
                    { type: 'meeting', icon: Calendar, label: 'جلسه' },
                    { type: 'note', icon: FileText, label: 'یادداشت' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setFormData({ ...formData, type: item.type as Activity['type'] })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        formData.type === item.type
                          ? 'border-blue-300 bg-blue-50 text-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <item.icon size={18} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">عنوان</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="عنوان فعالیت"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">مشتری (اختیاری)</label>
                <select
                  value={formData.customerId || ''}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">بدون مشتری</option>
                  {mockCustomers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">توضیحات</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  placeholder="توضیحات..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleAddActivity}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-l from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
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
