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
    { title: 'درآمد کل', value: `${(totalRevenue / 1000000).toLocaleString('fa-IR')}`, suffix: 'میلیون', change: '+23%', isPositive: true, icon: DollarSign, color: 'var(--neon-green)', gradient: 'var(--gradient-forest)' },
    { title: 'مشتریان فعال', value: mockCustomers.filter(c => c.status === 'active' || c.status === 'vip').length.toLocaleString('fa-IR'), suffix: 'نفر', change: '+12%', isPositive: true, icon: Users, color: 'var(--neon-cyan)', gradient: 'var(--gradient-ocean)' },
    { title: 'معاملات فعال', value: activeDeals.toLocaleString('fa-IR'), suffix: 'معامله', change: '+8%', isPositive: true, icon: Briefcase, color: 'var(--neon-purple)', gradient: 'var(--gradient-secondary)' },
    { title: 'نرخ تبدیل', value: '68', suffix: 'درصد', change: '+5%', isPositive: true, icon: Target, color: 'var(--neon-amber)', gradient: 'var(--gradient-sunset)' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={14} style={{ color: 'var(--neon-cyan)' }} />;
      case 'email': return <Mail size={14} style={{ color: 'var(--neon-purple)' }} />;
      case 'meeting': return <Calendar size={14} style={{ color: 'var(--neon-green)' }} />;
      case 'note': return <FileText size={14} style={{ color: 'var(--neon-amber)' }} />;
      case 'task': return <CheckCircle2 size={14} style={{ color: 'var(--neon-pink)' }} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl p-8 border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(0,217,255,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(236,72,153,0.05) 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--neon-cyan)' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--neon-purple)' }}></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">خوش آمدید</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              سلام، <span className="text-gradient-primary">محمد</span> 👋
            </h1>
            <p className="text-white/50 text-sm">امروز ۳ جلسه و ۵ وظیفه در انتظار شماست</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="btn-premium btn-secondary-premium">
              <span>دانلود گزارش</span>
            </button>
            <button className="btn-premium btn-primary-premium">
              <Plus size={16} />
              <span>ایجاد سریع</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card group" style={{ ['--accent-color' as any]: `${stat.color}20` }}>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3" style={{ background: stat.gradient, boxShadow: `0 8px 20px -8px ${stat.color}` }}>
                  <stat.icon size={22} className="text-white" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <ArrowUpRight size={12} style={{ color: 'var(--neon-green)' }} />
                  <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>{stat.change}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <h3 className="text-3xl font-bold text-white num">{stat.value}</h3>
                <span className="text-sm text-white/40">{stat.suffix}</span>
              </div>
              <p className="text-sm text-white/50">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">نمودار درآمد</h3>
              <p className="text-xs text-white/40">درآمد ماهانه در سال جاری</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <TrendingUp size={14} style={{ color: 'var(--neon-green)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>+23% رشد</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--neon-cyan)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--neon-cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(19,24,37,0.95)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  direction: 'rtl'
                }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, 'درآمد']}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--neon-cyan)" strokeWidth={2.5} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-1">وضعیت معاملات</h3>
          <p className="text-xs text-white/40 mb-4">توزیع معاملات بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dealStageData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(19,24,37,0.95)', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
                <span className="text-xs text-white/60">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">فعالیت‌های اخیر</h3>
            </div>
            <button className="text-xs text-cyan-400 font-medium hover:text-cyan-300">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                  <p className="text-xs text-white/40 truncate">{activity.customerName || activity.description}</p>
                </div>
                <span className="text-[10px] text-white/30 flex-shrink-0">
                  {new Date(activity.date).toLocaleDateString('fa-IR')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <h3 className="text-sm font-bold text-white">وظایف در انتظار</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {mockTasks.filter(t => t.status !== 'completed').slice(0, 5).map((task) => (
              <div key={task.id} className="p-3 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-white truncate flex-1 group-hover:text-cyan-400 transition-colors">{task.title}</p>
                  <span className={`badge-premium ${task.priority === 'urgent' ? 'badge-red' : task.priority === 'high' ? 'badge-amber' : task.priority === 'medium' ? 'badge-cyan' : 'badge-neutral'}`}>
                    {task.priority === 'urgent' ? 'فوری' : task.priority === 'high' ? 'بالا' : task.priority === 'medium' ? 'متوسط' : 'کم'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">{task.assignedTo}</span>
                  <span className="text-[10px] text-white/30">{new Date(task.dueDate).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Deals */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-pink-400" />
              <h3 className="text-sm font-bold text-white">برترین معاملات</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {mockDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).sort((a, b) => b.value - a.value).slice(0, 5).map((deal) => (
              <div key={deal.id} className="p-3 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-white truncate flex-1 group-hover:text-pink-400 transition-colors">{deal.title}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">{deal.customerName}</span>
                  <span className="text-sm font-bold num" style={{ color: 'var(--neon-green)' }}>
                    {(deal.value / 1000000).toLocaleString('fa-IR')}M
                  </span>
                </div>
                <div className="mt-2 w-full rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${deal.probability}%`, background: 'var(--gradient-primary)' }}></div>
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
