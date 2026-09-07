import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Target,
  ArrowUpRight,
  Download,
  Calendar,
  Award,
  PieChart as PieChartIcon,
  BarChart3,
  Activity
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
  Legend,
  ComposedChart
} from 'recharts';
import { mockCustomers, mockDeals, revenueData, dealStageData, teamPerformance, customerSourceData, monthlyCustomers } from '../data/mockData';

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('year');

  const totalRevenue = mockDeals
    .filter(d => d.stage === 'closed_won')
    .reduce((sum, d) => sum + d.value, 0);

  const wonDeals = mockDeals.filter(d => d.stage === 'closed_won').length;
  const lostDeals = mockDeals.filter(d => d.stage === 'closed_lost').length;
  const conversionRate = wonDeals + lostDeals > 0 ? ((wonDeals / (wonDeals + lostDeals)) * 100).toFixed(1) : '0';

  const avgDealSize = mockDeals.length > 0 
    ? (mockDeals.reduce((sum, d) => sum + d.value, 0) / mockDeals.length / 1000000).toFixed(0) 
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">گزارشات و تحلیل</h1>
          <p className="text-slate-500 mt-1">تحلیل جامع عملکرد و آمار سیستم</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
          >
            <option value="week">هفته اخیر</option>
            <option value="month">ماه اخیر</option>
            <option value="quarter">سه‌ماه اخیر</option>
            <option value="year">امسال</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple">
            <Download size={16} />
            <span>خروجی PDF</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 card-hover relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-teal-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <DollarSign size={24} className="text-emerald-500" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-full">
              <ArrowUpRight size={14} className="text-emerald-600" />
              <span className="text-emerald-600 text-xs font-bold">23%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{(totalRevenue / 1000000).toLocaleString('fa-IR')}</h3>
          <p className="text-sm text-slate-500 mt-1">درآمد کل (میلیون تومان)</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 card-hover relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-blue-500 to-indigo-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Target size={24} className="text-blue-500" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-full">
              <ArrowUpRight size={14} className="text-emerald-600" />
              <span className="text-emerald-600 text-xs font-bold">5%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{conversionRate}%</h3>
          <p className="text-sm text-slate-500 mt-1">نرخ تبدیل</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 card-hover relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-purple-500 to-pink-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/10">
              <Briefcase size={24} className="text-purple-500" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-full">
              <ArrowUpRight size={14} className="text-emerald-600" />
              <span className="text-emerald-600 text-xs font-bold">12%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{avgDealSize}M</h3>
          <p className="text-sm text-slate-500 mt-1">میانگین معامله (میلیون)</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 card-hover relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-amber-500 to-orange-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Users size={24} className="text-amber-500" />
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 rounded-full">
              <ArrowUpRight size={14} className="text-emerald-600" />
              <span className="text-emerald-600 text-xs font-bold">8%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{mockCustomers.length}</h3>
          <p className="text-sm text-slate-500 mt-1">کل مشتریان</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <TrendingUp size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">روند درآمد</h3>
                <p className="text-sm text-slate-500">مقایسه با هدف</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueData}>
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
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', direction: 'rtl', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, '']}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="درآمد" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRev)" />
              <Line type="monotone" dataKey="target" name="هدف" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">رشد مشتریان</h3>
                <p className="text-sm text-slate-500">مشتریان جدید و از دست رفته</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyCustomers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', direction: 'rtl', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="new" name="مشتریان جدید" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="lost" name="از دست رفته" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Deal Stages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <PieChartIcon size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">توزیع معاملات</h3>
              <p className="text-xs text-slate-500">بر اساس مرحله</p>
            </div>
          </div>
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">منابع جذب</h3>
              <p className="text-xs text-slate-500">درصد مشتریان بر اساس منبع</p>
            </div>
          </div>
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Award size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">عملکرد تیم</h3>
              <p className="text-xs text-slate-500">تعداد معاملات هر عضو</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={teamPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', direction: 'rtl' }} />
              <Bar dataKey="deals" name="معاملات" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <BarChart3 size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">عملکرد تفصیلی تیم</h3>
              <p className="text-sm text-slate-500">جزئیات عملکرد هر عضو تیم</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-right py-4 px-4 text-sm font-bold text-slate-600">عضو تیم</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-slate-600">معاملات</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-slate-600">درآمد (M)</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-slate-600">وظایف</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-slate-600">عملکرد</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member, index) => (
                <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                        {member.avatar}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-slate-700">{member.deals}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-emerald-600">{member.revenue}M</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-600">{member.tasks}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5 max-w-[120px]">
                        <div
                          className={`bg-gradient-to-l ${member.color} h-2.5 rounded-full transition-all duration-1000`}
                          style={{ width: `${(member.deals / 15) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600">{Math.round((member.deals / 15) * 100)}%</span>
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
