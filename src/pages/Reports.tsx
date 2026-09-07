import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { mockCustomers, mockDeals, revenueData, dealStageData } from '../data/mockData';

const Reports: React.FC = () => {
  const totalRevenue = mockDeals
    .filter(d => d.stage === 'closed_won')
    .reduce((sum, d) => sum + d.value, 0);

  const wonDeals = mockDeals.filter(d => d.stage === 'closed_won').length;
  const lostDeals = mockDeals.filter(d => d.stage === 'closed_lost').length;
  const conversionRate = wonDeals + lostDeals > 0 ? ((wonDeals / (wonDeals + lostDeals)) * 100).toFixed(1) : '0';

  const performanceData = [
    { name: 'محمد رضوی', deals: 12, revenue: 450, tasks: 28 },
    { name: 'سارا محمدی', deals: 9, revenue: 320, tasks: 22 },
    { name: 'علی احمدی', deals: 7, revenue: 280, tasks: 18 },
    { name: 'زهرا کریمی', deals: 11, revenue: 390, tasks: 25 },
  ];

  const customerSourceData = [
    { name: 'وب‌سایت', value: 35, color: '#3b82f6' },
    { name: 'ارجاع', value: 25, color: '#8b5cf6' },
    { name: 'شبکه اجتماعی', value: 20, color: '#f59e0b' },
    { name: 'تبلیغات', value: 12, color: '#22c55e' },
    { name: 'سایر', value: 8, color: '#94a3b8' },
  ];

  const monthlyCustomers = [
    { month: 'فروردین', new: 12, lost: 2 },
    { month: 'اردیبهشت', new: 15, lost: 3 },
    { month: 'خرداد', new: 10, lost: 1 },
    { month: 'تیر', new: 18, lost: 4 },
    { month: 'مرداد', new: 14, lost: 2 },
    { month: 'شهریور', new: 20, lost: 3 },
    { month: 'مهر', new: 22, lost: 5 },
    { month: 'آبان', new: 16, lost: 2 },
    { month: 'آذر', new: 25, lost: 4 },
    { month: 'دی', new: 19, lost: 3 },
    { month: 'بهمن', new: 28, lost: 6 },
    { month: 'اسفند', new: 32, lost: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">گزارشات و تحلیل</h1>
        <p className="text-slate-500 mt-1">تحلیل عملکرد و آمار سیستم</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-emerald-500" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUpRight size={16} />
              <span>23%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{(totalRevenue / 1000000).toLocaleString('fa-IR')}M</h3>
          <p className="text-sm text-slate-500 mt-1">درآمد کل (تومان)</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-blue-500" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUpRight size={16} />
              <span>5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{conversionRate}%</h3>
          <p className="text-sm text-slate-500 mt-1">نرخ تبدیل</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Briefcase size={24} className="text-purple-500" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUpRight size={16} />
              <span>12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{mockDeals.length}</h3>
          <p className="text-sm text-slate-500 mt-1">کل معاملات</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-amber-500" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <ArrowUpRight size={16} />
              <span>8%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{mockCustomers.length}</h3>
          <p className="text-sm text-slate-500 mt-1">کل مشتریان</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">روند درآمد</h3>
          <p className="text-sm text-slate-500 mb-6">درآمد ماهانه در سال جاری</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, 'درآمد']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">رشد مشتریان</h3>
          <p className="text-sm text-slate-500 mb-6">مشتریان جدید و از دست رفته</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyCustomers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }}
              />
              <Legend />
              <Bar dataKey="new" name="مشتریان جدید" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lost" name="از دست رفته" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Deal Stages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">توزیع معاملات</h3>
          <p className="text-sm text-slate-500 mb-4">بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={dealStageData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-slate-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Sources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">منابع جذب مشتری</h3>
          <p className="text-sm text-slate-500 mb-4">درصد مشتریان بر اساس منبع</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={customerSourceData}
                cx="50%"
                cy="50%"
                outerRadius={85}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {customerSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg mb-1">عملکرد تیم فروش</h3>
          <p className="text-sm text-slate-500 mb-4">تعداد معاملات هر عضو تیم</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }} />
              <Bar dataKey="deals" name="معاملات" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 text-lg mb-4">عملکرد تفصیلی تیم</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">عضو تیم</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">معاملات</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">درآمد (M)</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">وظایف</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">عملکرد</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((member, index) => (
                <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{member.deals}</td>
                  <td className="py-3 px-4 text-sm font-medium text-emerald-600">{member.revenue}M</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{member.tasks}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-l from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(member.deals / 15) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">{Math.round((member.deals / 15) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
