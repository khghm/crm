import React from 'react';
import {
  Users, Briefcase, TrendingUp, DollarSign, ArrowUpRight, Phone, Mail,
  Calendar, FileText, CheckCircle2, Clock, Target, Activity, Plus, Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { mockCustomers, mockDeals, mockTasks, mockActivities, revenueData, dealStageData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalRevenue = mockDeals.filter(d => d.stage === 'closed_won').reduce((sum, d) => sum + d.value, 0);
  const activeDeals = mockDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length;

  const stats = [
    { title: 'درآمد کل', value: `${(totalRevenue / 1000000).toLocaleString('fa-IR')}`, suffix: 'میلیون', change: '+23%', isPositive: true, icon: DollarSign, color: '#10b981', bg: '#dcfce7' },
    { title: 'مشتریان فعال', value: mockCustomers.filter(c => c.status === 'active' || c.status === 'vip').length.toLocaleString('fa-IR'), suffix: 'نفر', change: '+12%', isPositive: true, icon: Users, color: '#3b82f6', bg: '#dbeafe' },
    { title: 'معاملات فعال', value: activeDeals.toLocaleString('fa-IR'), suffix: 'معامله', change: '+8%', isPositive: true, icon: Briefcase, color: '#8b5cf6', bg: '#ede9fe' },
    { title: 'نرخ تبدیل', value: '68', suffix: 'درصد', change: '+5%', isPositive: true, icon: Target, color: '#f59e0b', bg: '#fef3c7' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={14} className="text-blue-500" />;
      case 'email': return <Mail size={14} className="text-purple-500" />;
      case 'meeting': return <Calendar size={14} className="text-emerald-500" />;
      case 'note': return <FileText size={14} className="text-amber-500" />;
      case 'task': return <CheckCircle2 size={14} className="text-pink-500" />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-white/80" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">خوش آمدید</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              سلام، <span className="text-white/90">محمد</span> 👋
            </h1>
            <p className="text-white/70 text-sm">امروز ۳ جلسه و ۵ وظیفه در انتظار شماست</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="btn bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
              <span>دانلود گزارش</span>
            </button>
            <button className="btn bg-white text-blue-600 hover:bg-white/90">
              <Plus size={16} />
              <span>ایجاد سریع</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        {stats.map((stat, index) => (
          <div key={index} className="card card-hover p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
                <ArrowUpRight size={12} />
                <span className="text-xs font-bold">{stat.change}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <h3 className="text-3xl font-bold text-slate-800 num">{stat.value}</h3>
              <span className="text-sm text-slate-500">{stat.suffix}</span>
            </div>
            <p className="text-sm text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading-2 mb-1">نمودار درآمد</h3>
              <p className="text-body-sm">درآمد ماهانه در سال جاری</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
              <TrendingUp size={14} />
              <span className="text-xs font-bold">+23% رشد</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  direction: 'rtl'
                }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, 'درآمد']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages */}
        <div className="card p-6">
          <h3 className="text-heading-2 mb-1">وضعیت معاملات</h3>
          <p className="text-body-sm mb-4">توزیع معاملات بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dealStageData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              <h3 className="text-heading-3">فعالیت‌های اخیر</h3>
            </div>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:scale-110 transition-transform">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{activity.title}</p>
                  <p className="text-xs text-slate-500 truncate">{activity.customerName || activity.description}</p>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0">
                  {new Date(activity.date).toLocaleDateString('fa-IR')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-500" />
              <h3 className="text-heading-3">وظایف در انتظار</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {mockTasks.filter(t => t.status !== 'completed').slice(0, 5).map((task) => (
              <div key={task.id} className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-slate-800 truncate flex-1 group-hover:text-blue-600 transition-colors">{task.title}</p>
                  <span className={`badge ${task.priority === 'urgent' ? 'badge-error' : task.priority === 'high' ? 'badge-warning' : task.priority === 'medium' ? 'badge-brand' : 'badge-gray'}`}>
                    {task.priority === 'urgent' ? 'فوری' : task.priority === 'high' ? 'بالا' : task.priority === 'medium' ? 'متوسط' : 'کم'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{task.assignedTo}</span>
                  <span className="text-[10px] text-slate-400">{new Date(task.dueDate).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Deals */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-pink-500" />
              <h3 className="text-heading-3">برترین معاملات</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {mockDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).sort((a, b) => b.value - a.value).slice(0, 5).map((deal) => (
              <div key={deal.id} className="p-3 rounded-xl border border-slate-200 hover:border-pink-300 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-slate-800 truncate flex-1 group-hover:text-pink-600 transition-colors">{deal.title}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{deal.customerName}</span>
                  <span className="text-sm font-bold text-emerald-600 num">
                    {(deal.value / 1000000).toLocaleString('fa-IR')}M
                  </span>
                </div>
                <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${deal.probability}%`, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
