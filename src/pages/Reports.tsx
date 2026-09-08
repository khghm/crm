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
          <h1 className="text-3xl font-bold text-white mb-1">گزارشات</h1>
          <p className="text-sm text-white/40">تحلیل جامع عملکرد و آمار سیستم</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="input-premium w-auto">
            <option value="week">هفته اخیر</option>
            <option value="month">ماه اخیر</option>
            <option value="quarter">سه‌ماه اخیر</option>
            <option value="year">امسال</option>
          </select>
          <button className="btn-premium btn-primary-premium">
            <Download size={16} /><span className="hidden sm:inline">خروجی</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(16,185,129,0.1)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-forest)', boxShadow: '0 8px 20px -8px var(--neon-green)' }}>
              <DollarSign size={20} className="text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <ArrowUpRight size={12} style={{ color: 'var(--neon-green)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>23%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white num">{(totalRevenue / 1000000).toLocaleString('fa-IR')}</h3>
          <p className="text-xs text-white/40 mt-0.5">درآمد کل (میلیون)</p>
        </div>
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(0,217,255,0.1)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-ocean)', boxShadow: '0 8px 20px -8px var(--neon-cyan)' }}>
              <Target size={20} className="text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <ArrowUpRight size={12} style={{ color: 'var(--neon-green)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white num">{conversionRate}%</h3>
          <p className="text-xs text-white/40 mt-0.5">نرخ تبدیل</p>
        </div>
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(168,85,247,0.1)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-secondary)', boxShadow: '0 8px 20px -8px var(--neon-purple)' }}>
              <Briefcase size={20} className="text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <ArrowUpRight size={12} style={{ color: 'var(--neon-green)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white num">{avgDealSize}M</h3>
          <p className="text-xs text-white/40 mt-0.5">میانگین معامله</p>
        </div>
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(245,158,11,0.1)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-sunset)', boxShadow: '0 8px 20px -8px var(--neon-amber)' }}>
              <Users size={20} className="text-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <ArrowUpRight size={12} style={{ color: 'var(--neon-green)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>8%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white num">{mockCustomers.length}</h3>
          <p className="text-xs text-white/40 mt-0.5">کل مشتریان</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">روند درآمد</h3>
              <p className="text-xs text-white/40">مقایسه با هدف</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--neon-cyan)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--neon-cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(19,24,37,0.95)', backdropFilter: 'blur(20px)', direction: 'rtl' }} formatter={(value: number) => [`${(value / 1000000).toFixed(0)} میلیون`, '']} />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="درآمد" stroke="var(--neon-cyan)" strokeWidth={2} fill="url(#colorRev)" />
              <Line type="monotone" dataKey="target" name="هدف" stroke="var(--neon-purple)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">رشد مشتریان</h3>
              <p className="text-xs text-white/40">مشتریان جدید و از دست رفته</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyCustomers}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(19,24,37,0.95)', direction: 'rtl' }} />
              <Legend />
              <Bar dataKey="new" name="مشتریان جدید" fill="var(--neon-cyan)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lost" name="از دست رفته" fill="var(--neon-red)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-1">توزیع معاملات</h3>
          <p className="text-xs text-white/40 mb-4">بر اساس مرحله</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dealStageData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                {dealStageData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(19,24,37,0.95)', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}></div>
                <span className="text-xs text-white/60">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-1">منابع جذب</h3>
          <p className="text-xs text-white/40 mb-4">درصد مشتریان بر اساس منبع</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={customerSourceData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false}>
                {customerSourceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(19,24,37,0.95)', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-1">عملکرد تیم</h3>
          <p className="text-xs text-white/40 mb-4">تعداد معاملات هر عضو</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={teamPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(19,24,37,0.95)', direction: 'rtl' }} />
              <Bar dataKey="deals" name="معاملات" fill="var(--neon-cyan)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">عملکرد تفصیلی تیم</h3>
          <p className="text-xs text-white/40 mt-0.5">جزئیات عملکرد هر عضو تیم</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right py-3 px-6 text-[10px] font-bold text-white/30 uppercase tracking-wider">عضو تیم</th>
                <th className="text-right py-3 px-6 text-[10px] font-bold text-white/30 uppercase tracking-wider">معاملات</th>
                <th className="text-right py-3 px-6 text-[10px] font-bold text-white/30 uppercase tracking-wider">درآمد</th>
                <th className="text-right py-3 px-6 text-[10px] font-bold text-white/30 uppercase tracking-wider">وظایف</th>
                <th className="text-right py-3 px-6 text-[10px] font-bold text-white/30 uppercase tracking-wider">عملکرد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {teamPerformance.map((member, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold`} style={{ background: `linear-gradient(135deg, ${member.color.includes('blue') ? '#00D9FF' : member.color.includes('pink') ? '#EC4899' : member.color.includes('emerald') ? '#10B981' : '#F59E0B'}, ${member.color.includes('purple') ? '#A855F7' : member.color.includes('rose') ? '#F43F5E' : member.color.includes('teal') ? '#00D9FF' : '#EC4899'})` }}>
                        {member.avatar}
                      </div>
                      <span className="text-sm font-medium text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-white/70 num">{member.deals}</td>
                  <td className="py-4 px-6 text-sm font-bold num" style={{ color: 'var(--neon-green)' }}>{member.revenue}M</td>
                  <td className="py-4 px-6 text-sm text-white/70 num">{member.tasks}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full" style={{ width: `${(member.deals / 15) * 100}%`, background: 'var(--gradient-primary)' }}></div>
                      </div>
                      <span className="text-xs text-white/50 num">{Math.round((member.deals / 15) * 100)}%</span>
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
