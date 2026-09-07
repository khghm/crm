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
  Clock,
  Target,
  Activity,
  Sparkles,
  Zap,
  Award
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
  RadialBar,
  Legend
} from 'recharts';
import { mockCustomers, mockDeals, mockTasks, mockActivities, revenueData, dealStageData, teamPerformance } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalRevenue = mockDeals
    .filter(d => d.stage === 'closed_won')
    .reduce((sum, d) => sum + d.value, 0);

  const activeDeals = mockDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length;
  const pendingTasks = mockTasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length;
  const conversionRate = 68;

  const stats = [
    {
      title: 'درآمد کل',
      value: `${(totalRevenue / 1000000).toLocaleString('fa-IR')}`,
      suffix: 'میلیون',
      change: '+23%',
      isPositive: true,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      shadowColor: 'shadow-emerald-500/20'
    },
    {
      title: 'مشتریان فعال',
      value: mockCustomers.filter(c => c.status === 'active' || c.status === 'vip').length.toLocaleString('fa-IR'),
      suffix: 'نفر',
      change: '+12%',
      isPositive: true,
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      title: 'معاملات فعال',
      value: activeDeals.toLocaleString('fa-IR'),
      suffix: 'معامله',
      change: '+8%',
      isPositive: true,
      icon: Briefcase,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      title: 'نرخ تبدیل',
      value: conversionRate.toLocaleString('fa-IR'),
      suffix: 'درصد',
      change: '+5%',
      isPositive: true,
      icon: Target,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
      shadowColor: 'shadow-amber-500/20'
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

  const radialData = [
    { name: 'هدف فروش', value: 78, fill: '#3b82f6' },
    { name: 'رضایت مشتری', value: 92, fill: '#22c55e' },
    { name: 'بهره‌وری تیم', value: 85, fill: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800">داشبورد</h1>
            <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-l from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
              <Sparkles size={12} />
              هوشمند
            </span>
          </div>
          <p className="text-slate-500">خوش آمدید! خلاصه وضعیت سیستم شما در یک نگاه</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2.5 bg-white border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm hover:shadow-md transition-all">
            <option>۳۰ روز اخیر</option>
            <option>۷ روز اخیر</option>
            <option>۳ ماه اخیر</option>
            <option>امسال</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple">
            <Zap size={16} />
            <span>دانلود گزارش</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 card-hover overflow-hidden group`}>
            {/* Background gradient decoration */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-l ${stat.gradient}`}></div>
            <div className={`absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgGradient} rounded-2xl flex items-center justify-center shadow-lg ${stat.shadowColor}`}>
                  <stat.icon size={24} className={`bg-gradient-to-br ${stat.gradient} bg-clip-text`} style={{ color: stat.gradient.includes('emerald') ? '#10b981' : stat.gradient.includes('blue') ? '#3b82f6' : stat.gradient.includes('purple') ? '#8b5cf6' : '#f59e0b' }} />
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                <span className="text-sm text-slate-500">{stat.suffix}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">نمودار درآمد</h3>
              <p className="text-sm text-slate-500">درآمد ماهانه در سال جاری</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-emerald-600 font-bold text-sm">+23% رشد</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', direction: 'rtl', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                formatter={(value: number, name: string) => [`${(value / 1000000).toFixed(0)} میلیون تومان`, name === 'revenue' ? 'درآمد' : 'هدف']}
              />
              <Area type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorTarget)" />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radial */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <h3 className="font-bold text-slate-800 text-lg mb-1">عملکرد کلی</h3>
          <p className="text-sm text-slate-500 mb-4">شاخص‌های کلیدی عملکرد</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
              <RadialBar dataKey="value" cornerRadius={10} />
              <Legend iconSize={10} layout="vertical" verticalAlign="bottom" align="center" />
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {radialData.map((item, i) => (
              <div key={i} className="text-center p-2 bg-slate-50 rounded-xl">
                <p className="text-lg font-bold" style={{ color: item.fill }}>{item.value}%</p>
                <p className="text-xs text-slate-500">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Activity size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">فعالیت‌های اخیر</h3>
            </div>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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

        {/* Team Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Award size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">عملکرد تیم</h3>
            </div>
          </div>
          <div className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-700 truncate">{member.name}</p>
                    <span className="text-xs font-bold text-emerald-600">{member.revenue}M</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-l ${member.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${(member.deals / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Deals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-slate-800">برترین معاملات</h3>
            </div>
          </div>
          <div className="space-y-3">
            {mockDeals
              .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
              .sort((a, b) => b.value - a.value)
              .slice(0, 4)
              .map((deal) => (
                <div key={deal.id} className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-700 truncate flex-1 group-hover:text-blue-600 transition-colors">{deal.title}</p>
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

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-l from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{mockCustomers.length}</p>
            <p className="text-sm opacity-80 mt-1">کل مشتریان</p>
          </div>
          <div className="text-center border-r border-white/20">
            <p className="text-3xl font-bold">{mockDeals.length}</p>
            <p className="text-sm opacity-80 mt-1">کل معاملات</p>
          </div>
          <div className="text-center border-r border-white/20">
            <p className="text-3xl font-bold">{mockTasks.filter(t => t.status === 'completed').length}</p>
            <p className="text-sm opacity-80 mt-1">وظایف تکمیل‌شده</p>
          </div>
          <div className="text-center border-r border-white/20">
            <p className="text-3xl font-bold">{mockActivities.length}</p>
            <p className="text-sm opacity-80 mt-1">فعالیت‌ها</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
