import React from 'react';
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
  Clock
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
  Bar
} from 'recharts';
import { mockCustomers, mockDeals, mockTasks, mockActivities, revenueData, dealStageData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalRevenue = mockDeals
    .filter(d => d.stage === 'closed_won')
    .reduce((sum, d) => sum + d.value, 0);

  const activeDeals = mockDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length;
  const pendingTasks = mockTasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length;

  const stats = [
    {
      title: 'کل مشتریان',
      value: mockCustomers.length.toLocaleString('fa-IR'),
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'معاملات فعال',
      value: activeDeals.toLocaleString('fa-IR'),
      change: '+8%',
      isPositive: true,
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'درآمد کل',
      value: `${(totalRevenue / 1000000).toLocaleString('fa-IR')}M`,
      change: '+23%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'وظایف در انتظار',
      value: pendingTasks.toLocaleString('fa-IR'),
      change: '-5%',
      isPositive: false,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50'
    }
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">داشبورد</h1>
          <p className="text-slate-500 mt-1">خوش آمدید! خلاصه وضعیت سیستم شما</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>۳۰ روز اخیر</option>
            <option>۷ روز اخیر</option>
            <option>۳ ماه اخیر</option>
            <option>امسال</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#a855f7' : stat.color.includes('emerald') ? '#10b981' : '#f59e0b' }} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
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
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-500" />
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
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون تومان`, 'درآمد']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-2">وضعیت معاملات</h3>
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
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }}
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-4">فعالیت‌های اخیر</h3>
          <div className="space-y-4">
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
          <h3 className="font-bold text-slate-800 text-lg mb-4">وظایف در انتظار</h3>
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
          <h3 className="font-bold text-slate-800 text-lg mb-4">برترین معاملات</h3>
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
