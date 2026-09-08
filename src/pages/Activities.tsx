import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, Calendar, FileText, CheckCircle2, MessageSquare, File, X } from 'lucide-react';
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
      case 'call': return <Phone size={14} className="text-blue-500" />;
      case 'email': return <Mail size={14} className="text-purple-500" />;
      case 'meeting': return <Calendar size={14} className="text-emerald-500" />;
      case 'note': return <FileText size={14} className="text-amber-500" />;
      case 'task': return <CheckCircle2 size={14} className="text-pink-500" />;
      case 'sms': return <MessageSquare size={14} className="text-pink-500" />;
      case 'document': return <File size={14} className="text-indigo-500" />;
      default: return <FileText size={14} />;
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

  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.date).toLocaleDateString('fa-IR');
    if (!groups[date]) groups[date] = [];
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">فعالیت‌ها</h1>
          <p className="text-body-sm mt-1">تایم‌لاین تمام تعاملات و فعالیت‌ها</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /><span>ثبت فعالیت</span>
        </button>
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { type: 'all', label: 'همه' }, { type: 'call', label: 'تماس' }, { type: 'email', label: 'ایمیل' },
          { type: 'meeting', label: 'جلسه' }, { type: 'note', label: 'یادداشت' }, { type: 'sms', label: 'پیامک' }, { type: 'document', label: 'سند' },
        ].map((item) => (
          <button key={item.type} onClick={() => setFilterType(item.type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === item.type
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="جستجو..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pr-10" />
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">{date}</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[10px] text-slate-400">{dateActivities.length} فعالیت</span>
            </div>
            <div className="space-y-2 mr-4 border-r-2 border-slate-100 pr-6">
              {dateActivities.map((activity) => (
                <div key={activity.id} className="relative">
                  <div className="absolute -right-[31px] top-4 w-3 h-3 bg-white border-2 border-blue-400 rounded-full"></div>
                  <div className="card card-hover p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-50">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-medium text-slate-800">{activity.title}</h4>
                              <span className="badge badge-gray">{getActivityLabel(activity.type)}</span>
                            </div>
                            <p className="text-xs text-slate-500">{activity.description}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">
                            {new Date(activity.date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          {activity.customerName && (
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                                {activity.customerName.charAt(0)}
                              </span>
                              <span>{activity.customerName}</span>
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
      </div>

      {/* Add Activity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in bg-white shadow-xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-heading-2">ثبت فعالیت جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-label block mb-2">نوع فعالیت</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { type: 'call', icon: Phone, label: 'تماس' },
                    { type: 'email', icon: Mail, label: 'ایمیل' },
                    { type: 'meeting', icon: Calendar, label: 'جلسه' },
                    { type: 'note', icon: FileText, label: 'یادداشت' },
                  ].map((item) => (
                    <button key={item.type} onClick={() => setFormData({ ...formData, type: item.type as Activity['type'] })}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.type === item.type
                          ? 'border-blue-300 bg-blue-50 text-blue-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}>
                      <item.icon size={16} className="mx-auto mb-1" />
                      <span className="text-[11px] font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-label block mb-1.5">عنوان</label>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input" placeholder="عنوان فعالیت" />
              </div>
              <div>
                <label className="text-label block mb-1.5">مشتری</label>
                <select value={formData.customerId || ''} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} className="input">
                  <option value="">بدون مشتری</option>
                  {mockCustomers.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
              </div>
              <div>
                <label className="text-label block mb-1.5">توضیحات</label>
                <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="input resize-none" placeholder="توضیحات..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-slate-200 bg-white">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary px-4 py-2 text-sm">انصراف</button>
              <button onClick={handleAddActivity} className="btn btn-primary px-4 py-2 text-sm">ثبت فعالیت</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
