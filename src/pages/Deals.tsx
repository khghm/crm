import React, { useState } from 'react';
import { Plus, Search, Calendar, X, MoreHorizontal, DollarSign, TrendingUp, LayoutGrid, List, Target, Zap } from 'lucide-react';
import { mockDeals, mockCustomers } from '../data/mockData';
import { Deal } from '../types';

const stages = [
  { id: 'lead', title: 'سرنخ', color: '#94a3b8', bg: '#f1f5f9' },
  { id: 'qualified', title: 'واجد شرایط', color: '#3b82f6', bg: '#dbeafe' },
  { id: 'proposal', title: 'پیشنهاد', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 'negotiation', title: 'مذاکره', color: '#f59e0b', bg: '#fef3c7' },
  { id: 'closed_won', title: 'موفق', color: '#10b981', bg: '#dcfce7' },
  { id: 'closed_lost', title: 'ناموفق', color: '#ef4444', bg: '#fee2e2' },
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
          <h1 className="text-heading-1">معاملات</h1>
          <p className="text-body-sm mt-1">پایپلاین فروش و مدیریت فرصت‌ها</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button onClick={() => setViewMode('pipeline')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'pipeline' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              <LayoutGrid size={14} />پایپلاین
            </button>
            <button onClick={() => setViewMode('list')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              <List size={14} />لیست
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={16} /><span>معامله جدید</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
        <div className="card card-hover p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-50">
              <DollarSign size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-caption">ارزش پایپلاین</p>
              <p className="text-xl font-bold text-slate-800 num">{(totalPipelineValue / 1000000).toLocaleString('fa-IR')}M</p>
            </div>
          </div>
        </div>
        <div className="card card-hover p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-50">
              <Target size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-caption">معاملات موفق</p>
              <p className="text-xl font-bold text-slate-800 num">{deals.filter(d => d.stage === 'closed_won').length}</p>
            </div>
          </div>
        </div>
        <div className="card card-hover p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-purple-50">
              <TrendingUp size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-caption">معاملات فعال</p>
              <p className="text-xl font-bold text-slate-800 num">{deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="جستجوی معاملات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pr-10" />
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const totalValue = getTotalValue(stageDeals);
            return (
              <div key={stage.id} className="flex-shrink-0 w-[300px]">
                <div className="card p-4 mb-3" style={{ borderTop: `3px solid ${stage.color}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }}></div>
                      <h3 className="text-sm font-bold text-slate-800">{stage.title}</h3>
                    </div>
                    <span className="badge" style={{ backgroundColor: stage.bg, color: stage.color }}>
                      {stageDeals.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 num">
                    {(totalValue / 1000000).toLocaleString('fa-IR')} میلیون تومان
                  </p>
                </div>

                <div className="space-y-2 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="card card-hover p-4 cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-800 leading-tight flex-1 group-hover:text-blue-600 transition-colors">{deal.title}</h4>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-100 transition-all">
                          <MoreHorizontal size={14} className="text-slate-400" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{deal.customerName}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-emerald-600 num">
                          {(deal.value / 1000000).toLocaleString('fa-IR')}M
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${deal.probability}%`, backgroundColor: stage.color }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1.5 num">{deal.probability}% احتمال</p>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-8 text-slate-300 text-xs">
                      <Zap size={20} className="mx-auto mb-2" />
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
        <div className="card overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-3">عنوان</div>
            <div className="col-span-2">مشتری</div>
            <div className="col-span-2">مبلغ</div>
            <div className="col-span-2">مرحله</div>
            <div className="col-span-2">احتمال</div>
            <div className="col-span-1">تاریخ</div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredDeals.map((deal) => {
              const stageObj = getStageObj(deal.stage);
              return (
                <div key={deal.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center group cursor-pointer">
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{deal.title}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{deal.description}</p>
                  </div>
                  <div className="col-span-2"><span className="text-sm text-slate-700">{deal.customerName}</span></div>
                  <div className="col-span-2"><span className="text-sm font-bold text-emerald-600 num">{(deal.value / 1000000).toLocaleString('fa-IR')}M</span></div>
                  <div className="col-span-2">
                    <span className="badge" style={{ backgroundColor: stageObj.bg, color: stageObj.color }}>{stageObj.title}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, backgroundColor: stageObj.color }}></div>
                      </div>
                      <span className="text-xs text-slate-500 num">{deal.probability}%</span>
                    </div>
                  </div>
                  <div className="col-span-1"><span className="text-xs text-slate-500">{new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}</span></div>
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
