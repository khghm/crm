import React, { useState } from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, Target, ArrowUpRight, Download } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend, ComposedChart
} from 'recharts';
import { mockCustomers, mockDeals, revenueData, dealStageData, teamPerformance, customerSourceData, monthlyCustomers } from '../data/mockData';

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('year');
  const totalRevenue = mockDeals.filter(d => d.stage === 'closed_won').reduce((sum, d) => sum + d.value, 0);
  const wonDeals = mockDeals.filter(d => d.stage === 'closed_won').length;
  const lostDeals = mockDeals.filter(d => d.stage === 'closed_lost').length;
  const conversionRate = wonDeals + lostDeals > 0 ? ((wonDeals / (wonDeals + lostDeals)) * 100).toFixed(1) : '0';
  const avgDealSize = mockDeals.length > 0 ? (mockDeals.reduce((sum, d) => sum + d.value, 0) / mockDeals.length / 1000000).toFixed(0) : '0';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">گزارشات</h1>
          <p className="text-body-sm mt-1">تحلیل جامع عملکرد و آمار سیستم</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="input">
            <option value="week">هفته اخیر</option>
            <option value="month">ماه اخیر</option>
            <option value="quarter">سه‌ماه اخیر</option>
            <option value="year">امسال</option>
          </select>
          <button className="btn btn-primary px-3 py-2 text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">خروجی</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-emerald-600" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full">
              <ArrowUpRight size={12} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">23%</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 num">{(totalRevenue / 1000000).toLocaleString('fa-IR')}</h3>
          <p className="text-sm text-gray-500 mt-0.5">درآمد کل (میلیون)</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-blue-600" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full">
              <ArrowUpRight size={12} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 num">{conversionRate}%</h3>
          <p className="text-sm text-gray-500 mt-0.5">نرخ تبدیل</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Briefcase size={20} className="text-purple-600" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full">
              <ArrowUpRight size={12} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 num">{avgDealSize}M</h3>
          <p className="text-sm text-gray-500 mt-0.5">میانگین معامله</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-amber-600" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full">
              <ArrowUpRight size={12} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">8%</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 num">{mockCustomers.length}</h3>
          <p className="text-sm text-gray-500 mt-0.5">کل مشتریان</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading-3">روند درآمد</h3>
              <p className="text-caption mt-0.5">مقایسه با هدف</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E90FA" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2E90FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', direction: 'rtl', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, '']} />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="درآمد" stroke="#2E90FA" strokeWidth={2} fill="url(#colorRev)" />
              <Line type="monotone" dataKey="target" name="هدف" stroke="#7A5AF8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading-3">رشد مشتریان</h3>
              <p className="text-caption mt-0.5">مشتریان جدید و از دست رفته</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyCustomers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', direction: 'rtl' }} />
              <Legend />
              <Bar dataKey="new" name="مشتریان جدید" fill="#2E90FA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lost" name="از دست رفته" fill="#F04438" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-heading-3 mb-1">توزیع معاملات</h3>
          <p className="text-caption mb-4">بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dealStageData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                {dealStageData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-heading-3 mb-1">منابع جذب</h3>
          <p className="text-caption mb-4">درصد مشتریان بر اساس منبع</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={customerSourceData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false}>
                {customerSourceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h3 className="text-heading-3 mb-1">عملکرد تیم</h3>
          <p className="text-caption mb-4">تعداد معاملات هر عضو</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={teamPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#EAECF0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', direction: 'rtl' }} />
              <Bar dataKey="deals" name="معاملات" fill="#2E90FA" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-heading-3">عملکرد تفصیلی تیم</h3>
          <p className="text-caption mt-0.5">جزئیات عملکرد هر عضو تیم</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">عضو تیم</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">معاملات</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">درآمد</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">وظایف</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">عملکرد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teamPerformance.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
                        {member.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 num">{member.deals}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-emerald-600 num">{member.revenue}M</td>
                  <td className="py-4 px-6 text-sm text-gray-700 num">{member.tasks}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-100 rounded-full h-1.5">
                        <div className={`bg-gradient-to-l ${member.color} h-1.5 rounded-full`} style={{ width: `${(member.deals / 15) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 num">{Math.round((member.deals / 15) * 100)}%</span>
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
