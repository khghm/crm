import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  Plus,
  Target,
  Zap,
  Award,
  UserPlus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { mockCustomers, mockDeals, mockTasks, mockActivities, revenueData, dealStageData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const totalRevenue = mockDeals
    .filter(d => d.stage === 'closed_won')
    .reduce((sum, d) => sum + d.value, 0);

  const activeDeals = mockDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length;
  const pendingTasks = mockTasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length;
  const conversionRate = 67;

  const stats = [
    {
      title: 'کل مشتریان',
      value: mockCustomers.length.toLocaleString('fa-IR'),
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: '#3b82f6',
      bgColor: 'bg-blue-50',
      trend: [20, 25, 22, 30, 28, 35, 40]
    },
    {
      title: 'معاملات فعال',
      value: activeDeals.toLocaleString('fa-IR'),
      change: '+8%',
      isPositive: true,
      icon: Briefcase,
      color: '#8b5cf6',
      bgColor: 'bg-purple-50',
      trend: [10, 15, 12, 18, 16, 20, 22]
    },
    {
      title: 'درآمد کل',
      value: `${(totalRevenue / 1000000).toLocaleString('fa-IR')}M`,
      change: '+23%',
      isPositive: true,
      icon: DollarSign,
      color: '#10b981',
      bgColor: 'bg-emerald-50',
      trend: [50, 65, 55, 80, 75, 90, 110]
    },
    {
      title: 'نرخ تبدیل',
      value: `${conversionRate}%`,
      change: '+5%',
      isPositive: true,
      icon: Target,
      color: '#f59e0b',
      bgColor: 'bg-amber-50',
      trend: [45, 50, 48, 55, 58, 62, 67]
    }
  ];

  const quickActions = [
    { icon: UserPlus, label: 'مشتری جدید', color: 'from-blue-500 to-blue-600', path: '/customers' },
    { icon: Briefcase, label: 'معامله جدید', color: 'from-purple-500 to-purple-600', path: '/deals' },
    { icon: Plus, label: 'وظیفه جدید', color: 'from-emerald-500 to-emerald-600', path: '/tasks' },
    { icon: Phone, label: 'ثبت تماس', color: 'from-amber-500 to-amber-600', path: '/activities' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={16} className="text-blue-500" />;
      case 'email': return <Mail size={16} className="text-purple-500" />;
      case 'meeting': return <Calendar size={16} className="text-emerald-500" />;
      case 'note': return <FileText size={16} className="text-amber-500" />;
      case 'task': return <CheckCircle2 size={16} className="text-teal-500" />;
      default: return <FileText size={16} />;
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'low': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTaskPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'فوری';
      case 'high': return 'بالا';
      case 'medium': return 'متوسط';
      case 'low': return 'کم';
      default: return priority;
    }
  };

  const performanceData = [
    { name: 'فروردین', target: 100, actual: 85 },
    { name: 'اردیبهشت', target: 100, actual: 92 },
    { name: 'خرداد', target: 100, actual: 78 },
    { name: 'تیر', target: 100, actual: 105 },
    { name: 'مرداد', target: 100, actual: 95 },
    { name: 'شهریور', target: 100, actual: 110 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">داشبورد</h1>
          <p className="text-slate-500 mt-1">خوش آمدید! خلاصه وضعیت سیستم شما</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {[
              { id: 'week', label: 'هفته' },
              { id: 'month', label: 'ماه' },
              { id: 'quarter', label: 'فصل' },
              { id: 'year', label: 'سال' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTimeRange(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === item.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 p-4 bg-gradient-to-l ${action.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]`}
          >
            <action.icon size={22} />
            <span className="font-medium text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
            {/* Mini sparkline */}
            <div className="mt-3 flex items-end gap-1 h-8">
              {stat.trend.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${(value / Math.max(...stat.trend)) * 100}%`,
                    backgroundColor: stat.color,
                    opacity: 0.2 + (i / stat.trend.length) * 0.6
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">نمودار درآمد</h3>
              <p className="text-sm text-slate-500">درآمد ماهانه در سال جاری</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg">
              <TrendingUp size={18} className="text-emerald-500" />
              <span className="text-emerald-600 font-medium text-sm">+23% رشد</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl', fontFamily: 'Vazirmatn' }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون تومان`, 'درآمد']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">وضعیت معاملات</h3>
          <p className="text-sm text-slate-500 mb-4">توزیع معاملات بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dealStageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl', fontFamily: 'Vazirmatn' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">عملکرد فروش</h3>
            <p className="text-sm text-slate-500">مقایسه هدف و عملکرد واقعی</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-slate-500">هدف</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-500">عملکرد</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl', fontFamily: 'Vazirmatn' }}
            />
            <Bar dataKey="target" name="هدف" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.3} />
            <Bar dataKey="actual" name="عملکرد" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-lg">فعالیت‌های اخیر</h3>
            <Zap size={18} className="text-amber-500" />
          </div>
          <div className="space-y-3">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{activity.title}</p>
                  <p className="text-xs text-slate-500 truncate">{activity.customerName || activity.description}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {new Date(activity.date).toLocaleDateString('fa-IR')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-lg">وظایف در انتظار</h3>
            <Clock size={18} className="text-blue-500" />
          </div>
          <div className="space-y-3">
            {mockTasks.filter(t => t.status !== 'completed').slice(0, 5).map((task) => (
              <div key={task.id} className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-700 truncate flex-1">{task.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getTaskPriorityColor(task.priority)}`}>
                    {getTaskPriorityLabel(task.priority)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{task.assignedTo}</span>
                  <span className="text-xs text-slate-400">{new Date(task.dueDate).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Deals */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-lg">برترین معاملات</h3>
            <Award size={18} className="text-purple-500" />
          </div>
          <div className="space-y-3">
            {mockDeals
              .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((deal) => (
                <div key={deal.id} className="p-3 rounded-xl border border-slate-100 hover:border-purple-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-700 truncate flex-1">{deal.title}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{deal.customerName}</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {(deal.value / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-l from-blue-500 to-purple-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    ></div>
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
