import React, { useState } from 'react';
import { Phone, Mail, Calendar, FileText, CheckCircle2, MessageSquare, File, Plus, Search } from 'lucide-react';
import { mockActivities, mockCustomers } from '../data/mockData';
import { Activity } from '../types';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.title.includes(searchTerm) || a.description.includes(searchTerm) || (a.customerName || '').includes(searchTerm);
    const matchesType = filterType === 'all' || a.type === filterType;
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={14} style={{ color: 'var(--neon-cyan)' }} />;
      case 'email': return <Mail size={14} style={{ color: 'var(--neon-purple)' }} />;
      case 'meeting': return <Calendar size={14} style={{ color: 'var(--neon-green)' }} />;
      case 'note': return <FileText size={14} style={{ color: 'var(--neon-amber)' }} />;
      case 'task': return <CheckCircle2 size={14} style={{ color: 'var(--neon-pink)' }} />;
      case 'sms': return <MessageSquare size={14} style={{ color: 'var(--neon-pink)' }} />;
      case 'document': return <File size={14} style={{ color: 'var(--neon-blue)' }} />;
      default: return <FileText size={14} />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) { case 'call': return 'تماس'; case 'email': return 'ایمیل'; case 'meeting': return 'جلسه'; case 'note': return 'یادداشت'; case 'task': return 'وظیفه'; case 'sms': return 'پیامک'; case 'document': return 'سند'; default: return type; }
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
          <h1 className="text-3xl font-bold text-white mb-1">فعالیت‌ها</h1>
          <p className="text-sm text-white/40">تایم‌لاین تمام تعاملات و فعالیت‌ها</p>
        </div>
        <button className="btn-premium btn-primary-premium">
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
                ? 'text-cyan-400'
                : 'text-white/50 hover:text-white/80'
            }`}
            style={{
              background: filterType === item.type ? 'rgba(0,217,255,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${filterType === item.type ? 'rgba(0,217,255,0.2)' : 'rgba(255,255,255,0.1)'}`
            }}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        <input type="text" placeholder="جستجو..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-premium pr-11" />
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">{date}</h3>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }}></div>
              <span className="text-[10px] text-white/30">{dateActivities.length} فعالیت</span>
            </div>
            <div className="space-y-2 mr-4 border-r-2 border-white/5 pr-6">
              {dateActivities.map((activity) => (
                <div key={activity.id} className="relative">
                  <div className="absolute -right-[31px] top-4 w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--neon-cyan)', background: 'var(--bg-primary)', boxShadow: '0 0 8px var(--neon-cyan)' }}></div>
                  <div className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-medium text-white">{activity.title}</h4>
                              <span className="badge-premium badge-neutral">{getActivityLabel(activity.type)}</span>
                            </div>
                            <p className="text-xs text-white/40">{activity.description}</p>
                          </div>
                          <span className="text-[10px] text-white/30 flex-shrink-0">
                            {new Date(activity.date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          {activity.customerName && (
                            <div className="flex items-center gap-1 text-[10px] text-white/40">
                              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: 'var(--gradient-primary)' }}>
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
    </div>
  );
};

export default Activities;
