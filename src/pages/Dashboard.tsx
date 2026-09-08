import React from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  Target,
  Activity,
  Plus,
  Filter,
  MoreHorizontal
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
      title: 'درآمد کل',
      value: `${(totalRevenue / 1000000).toLocaleString('fa-IR')}`,
      suffix: 'میلیون',
      change: '+23%',
      isPositive: true,
      icon: DollarSign,
      color: '#12B76A'
    },
    {
      title: 'مشتریان فعال',
      value: mockCustomers.filter(c => c.status === 'active' || c.status === 'vip').length.toLocaleString('fa-IR'),
      suffix: 'نفر',
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: '#2E90FA'
    },
    {
      title: 'معاملات فعال',
      value: activeDeals.toLocaleString('fa-IR'),
      suffix: 'معامله',
      change: '+8%',
      isPositive: true,
      icon: Briefcase,
      color: '#7A5AF8'
    },
    {
      title: 'نرخ تبدیل',
      value: '68',
      suffix: 'درصد',
      change: '+5%',
      isPositive: true,
      icon: Target,
      color: '#F79009'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={14} className="text-blue-600" />;
      case 'email': return <Mail size={14} className="text-purple-600" />;
      case 'meeting': return <Calendar size={14} className="text-emerald-600" />;
      case 'note': return <FileText size={14} className="text-amber-600" />;
      case 'task': return <CheckCircle2 size={14} className="text-teal-600" />;
      default: return <FileText size={14} />;
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'badge-error';
      case 'high': return 'badge-warning';
      case 'medium': return 'badge-brand';
      case 'low': return 'badge-gray';
      default: return 'badge-gray';
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
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1">داشبورد</h1>
          <p className="text-body-sm mt-1">خوش آمدید! خلاصه وضعیت سیستم شما</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary px-3 py-2 text-sm">
            <Filter size={16} />
            <span>فیلتر</span>
          </button>
          <button className="btn btn-primary px-3 py-2 text-sm">
            <Plus size={16} />
            <span>ایجاد</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        {stats.map((stat, index) => (
          <div key={index} className="card card-hover p-5">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
                <ArrowUpRight size={12} />
                {stat.change}
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-semibold text-gray-900 num">{stat.value}</h3>
              <span className="text-sm text-gray-500">{stat.suffix}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading-3">نمودار درآمد</h3>
              <p className="text-caption mt-0.5">درآمد ماهانه در سال جاری</p>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 rounded-full">
              <TrendingUp size={14} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">+23%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E90FA" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2E90FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #EAECF0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  direction: 'rtl'
                }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, 'درآمد']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2E90FA" strokeWidth={2.5} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages Pie Chart */}
        <div className="card p-6">
          <h3 className="text-heading-3 mb-1">وضعیت معاملات</h3>
          <p className="text-caption mb-4">توزیع معاملات بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dealStageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #EAECF0',
                  direction: 'rtl'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}</span>
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
              <Activity size={16} className="text-gray-400" />
              <h3 className="text-heading-3">فعالیت‌های اخیر</h3>
            </div>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.customerName || activity.description}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
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
              <Clock size={16} className="text-gray-400" />
              <h3 className="text-heading-3">وظایف در انتظار</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {mockTasks.filter(t => t.status !== 'completed').slice(0, 5).map((task) => (
              <div key={task.id} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-gray-900 truncate flex-1">{task.title}</p>
                  <span className={`badge ${getTaskPriorityColor(task.priority)}`}>
                    {getTaskPriorityLabel(task.priority)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{task.assignedTo}</span>
                  <span className="text-xs text-gray-400">{new Date(task.dueDate).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Deals */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-gray-400" />
              <h3 className="text-heading-3">برترین معاملات</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {mockDeals
              .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((deal) => (
                <div key={deal.id} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium text-gray-900 truncate flex-1">{deal.title}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{deal.customerName}</span>
                    <span className="text-sm font-semibold text-emerald-600 num">
                      {(deal.value / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1">
                    <div
                      className="bg-gradient-to-l from-blue-500 to-indigo-500 h-1 rounded-full transition-all"
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
