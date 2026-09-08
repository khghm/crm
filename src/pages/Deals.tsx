import React, { useState } from 'react';
import { Plus, Search, Calendar, X, MoreHorizontal, DollarSign, TrendingUp, LayoutGrid, List, Target, Zap } from 'lucide-react';
import { mockDeals, mockCustomers } from '../data/mockData';
import { Deal } from '../types';

const stages = [
  { id: 'lead', title: 'سرنخ', color: '#98A2B3' },
  { id: 'qualified', title: 'واجد شرایط', color: '#00D9FF' },
  { id: 'proposal', title: 'پیشنهاد', color: '#A855F7' },
  { id: 'negotiation', title: 'مذاکره', color: '#F59E0B' },
  { id: 'closed_won', title: 'موفق', color: '#10B981' },
  { id: 'closed_lost', title: 'ناموفق', color: '#EF4444' },
];

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [formData, setFormData] = useState<Partial<Deal>>({ title: '', customerId: '', customerName: '', value: 0, stage: 'lead', probability: 20, expectedCloseDate: '', description: '', priority: 'medium' });

  const filteredDeals = deals.filter(d => d.title.includes(searchTerm) || d.customerName.includes(searchTerm));
  const getDealsByStage = (stageId: string) => filteredDeals.filter(d => d.stage === stageId);
  const getTotalValue = (stageDeals: Deal[]) => stageDeals.reduce((sum, d) => sum + d.value, 0);
  const totalPipelineValue = deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0);

  const handleAddDeal = () => {
    const newDeal: Deal = { id: Date.now().toString(), title: formData.title || '', customerId: formData.customerId || '', customerName: formData.customerName || '', value: formData.value || 0, stage: (formData.stage as Deal['stage']) || 'lead', probability: formData.probability || 20, expectedCloseDate: formData.expectedCloseDate || '', createdAt: new Date().toISOString().split('T')[0], description: formData.description || '', priority: formData.priority as Deal['priority'] };
    setDeals([newDeal, ...deals]);
    setShowModal(false);
  };

  const getStageObj = (stage: string) => stages.find(s => s.id === stage) || stages[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">معاملات</h1>
          <p className="text-sm text-white/40">پایپلاین فروش و مدیریت فرصت‌ها</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl p-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setViewMode('pipeline')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'pipeline' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
              <LayoutGrid size={14} />پایپلاین
            </button>
            <button onClick={() => setViewMode('list')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
              <List size={14} />لیست
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-premium btn-primary-premium">
            <Plus size={16} /><span>معامله جدید</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(0,217,255,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-ocean)', boxShadow: '0 8px 20px -8px var(--neon-cyan)' }}>
              <DollarSign size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">ارزش پایپلاین</p>
              <p className="text-xl font-bold text-white num">{(totalPipelineValue / 1000000).toLocaleString('fa-IR')}M</p>
            </div>
          </div>
        </div>
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(16,185,129,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-forest)', boxShadow: '0 8px 20px -8px var(--neon-green)' }}>
              <Target size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">معاملات موفق</p>
              <p className="text-xl font-bold text-white num">{deals.filter(d => d.stage === 'closed_won').length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card" style={{ ['--accent-color' as any]: 'rgba(168,85,247,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-secondary)', boxShadow: '0 8px 20px -8px var(--neon-purple)' }}>
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">معاملات فعال</p>
              <p className="text-xl font-bold text-white num">{deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        <input type="text" placeholder="جستجوی معاملات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-premium pr-11" />
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const totalValue = getTotalValue(stageDeals);
            return (
              <div key={stage.id} className="flex-shrink-0 w-[300px]">
                <div className="glass-card p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color, boxShadow: `0 0 8px ${stage.color}` }}></div>
                      <h3 className="text-sm font-bold text-white">{stage.title}</h3>
                    </div>
                    <span className="badge-premium" style={{ background: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}30` }}>
                      {stageDeals.length}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 num">
                    {(totalValue / 1000000).toLocaleString('fa-IR')} میلیون تومان
                  </p>
                </div>

                <div className="space-y-2 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="glass-card p-4 cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-white leading-tight flex-1 group-hover:text-cyan-400 transition-colors">{deal.title}</h4>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/5 transition-all">
                          <MoreHorizontal size={14} className="text-white/40" />
                        </button>
                      </div>
                      <p className="text-xs text-white/40 mb-3">{deal.customerName}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold num" style={{ color: 'var(--neon-green)' }}>
                          {(deal.value / 1000000).toLocaleString('fa-IR')}M
                        </span>
                        <span className="text-[10px] text-white/30 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                      <div className="w-full rounded-full h-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${deal.probability}%`, background: stage.color, boxShadow: `0 0 8px ${stage.color}` }}></div>
                      </div>
                      <p className="text-[10px] text-white/30 mt-1.5 num">{deal.probability}% احتمال</p>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-8 text-white/20 text-xs">
                      <Zap size={20} className="mx-auto mb-2 opacity-30" />
                      معامله‌ای وجود ندارد
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-wider">
            <div className="col-span-3">عنوان</div>
            <div className="col-span-2">مشتری</div>
            <div className="col-span-2">مبلغ</div>
            <div className="col-span-2">مرحله</div>
            <div className="col-span-2">احتمال</div>
            <div className="col-span-1">تاریخ</div>
          </div>
          <div className="divide-y divide-white/5">
            {filteredDeals.map((deal) => {
              const stageObj = getStageObj(deal.stage);
              return (
                <div key={deal.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-all items-center group cursor-pointer">
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{deal.title}</p>
                    <p className="text-xs text-white/40 truncate mt-0.5">{deal.description}</p>
                  </div>
                  <div className="col-span-2"><span className="text-sm text-white/70">{deal.customerName}</span></div>
                  <div className="col-span-2"><span className="text-sm font-bold num" style={{ color: 'var(--neon-green)' }}>{(deal.value / 1000000).toLocaleString('fa-IR')}M</span></div>
                  <div className="col-span-2">
                    <span className="badge-premium" style={{ background: `${stageObj.color}15`, color: stageObj.color, border: `1px solid ${stageObj.color}30` }}>{stageObj.title}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-full h-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, background: stageObj.color }}></div>
                      </div>
                      <span className="text-xs text-white/50 num">{deal.probability}%</span>
                    </div>
                  </div>
                  <div className="col-span-1"><span className="text-xs text-white/40">{new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
