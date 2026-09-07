import React, { useState } from 'react';
import {
  Plus,
  Search,
  Calendar,
  X,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  Zap,
  Target
} from 'lucide-react';
import { mockDeals, mockCustomers } from '../data/mockData';
import { Deal } from '../types';

const stages = [
  { id: 'lead', title: 'سرنخ', color: 'bg-slate-400', borderColor: 'border-slate-400', bgColor: 'bg-slate-50', textColor: 'text-slate-600' },
  { id: 'qualified', title: 'واجد شرایط', color: 'bg-blue-400', borderColor: 'border-blue-400', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { id: 'proposal', title: 'پیشنهاد', color: 'bg-purple-400', borderColor: 'border-purple-400', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
  { id: 'negotiation', title: 'مذاکره', color: 'bg-amber-400', borderColor: 'border-amber-400', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
  { id: 'closed_won', title: 'موفق', color: 'bg-emerald-400', borderColor: 'border-emerald-400', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { id: 'closed_lost', title: 'ناموفق', color: 'bg-red-400', borderColor: 'border-red-400', bgColor: 'bg-red-50', textColor: 'text-red-600' },
];

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [formData, setFormData] = useState<Partial<Deal>>({
    title: '',
    customerId: '',
    customerName: '',
    value: 0,
    stage: 'lead',
    probability: 20,
    expectedCloseDate: '',
    description: '',
    priority: 'medium'
  });

  const filteredDeals = deals.filter(d =>
    d.title.includes(searchTerm) || d.customerName.includes(searchTerm)
  );

  const getDealsByStage = (stageId: string) => {
    return filteredDeals.filter(d => d.stage === stageId);
  };

  const getTotalValue = (stageDeals: Deal[]) => {
    return stageDeals.reduce((sum, d) => sum + d.value, 0);
  };

  const totalPipelineValue = deals
    .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0);

  const weightedPipeline = deals
    .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
    .reduce((sum, d) => sum + (d.value * d.probability / 100), 0);

  const handleAddDeal = () => {
    const newDeal: Deal = {
      id: Date.now().toString(),
      title: formData.title || '',
      customerId: formData.customerId || '',
      customerName: formData.customerName || '',
      value: formData.value || 0,
      stage: (formData.stage as Deal['stage']) || 'lead',
      probability: formData.probability || 20,
      expectedCloseDate: formData.expectedCloseDate || '',
      createdAt: new Date().toISOString().split('T')[0],
      description: formData.description || '',
      priority: formData.priority as Deal['priority']
    };
    setDeals([newDeal, ...deals]);
    setShowModal(false);
    setFormData({ title: '', customerId: '', customerName: '', value: 0, stage: 'lead', probability: 20, expectedCloseDate: '', description: '', priority: 'medium' });
  };

  const getStageLabel = (stage: string) => {
    return stages.find(s => s.id === stage)?.title || stage;
  };

  const getStageObj = (stage: string) => {
    return stages.find(s => s.id === stage) || stages[0];
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 rounded-full">بالا</span>;
      case 'medium': return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-600 rounded-full">متوسط</span>;
      case 'low': return <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-50 text-slate-600 rounded-full">کم</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">مدیریت معاملات</h1>
          <p className="text-slate-500 mt-1">پایپلاین فروش و مدیریت فرصت‌ها</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-slate-200/50 overflow-hidden shadow-sm">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'pipeline' ? 'bg-gradient-to-l from-blue-600 to-purple-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutGrid size={16} />
              پایپلاین
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-gradient-to-l from-blue-600 to-purple-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <List size={16} />
              لیست
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple"
          >
            <Plus size={18} />
            <span>معامله جدید</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <DollarSign size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500">ارزش کل پایپلاین</p>
              <p className="text-xl font-bold text-slate-800">{(totalPipelineValue / 1000000).toLocaleString('fa-IR')}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Target size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500">ارزش وزنی</p>
              <p className="text-xl font-bold text-slate-800">{(weightedPipeline / 1000000).toLocaleString('fa-IR')}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <TrendingUp size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500">معاملات فعال</p>
              <p className="text-xl font-bold text-slate-800">{deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="جستجوی معاملات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-11 pl-4 py-3 bg-white border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 shadow-sm"
        />
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const totalValue = getTotalValue(stageDeals);
            return (
              <div key={stage.id} className="flex-shrink-0 w-80">
                {/* Stage Header */}
                <div className={`bg-white rounded-t-2xl p-4 border-t-4 ${stage.borderColor} shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <h3 className="font-bold text-slate-800 text-sm">{stage.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stage.bgColor} ${stage.textColor}`}>
                      {stageDeals.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {(totalValue / 1000000).toLocaleString('fa-IR')} میلیون تومان
                  </p>
                </div>

                {/* Stage Deals */}
                <div className="bg-slate-50/50 rounded-b-2xl p-3 space-y-3 min-h-[300px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-blue-600 transition-colors">{deal.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{deal.customerName}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-slate-100 transition-all">
                          <MoreHorizontal size={14} className="text-slate-400" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-emerald-600">
                          {(deal.value / 1000000).toLocaleString('fa-IR')}M
                        </span>
                        {getPriorityBadge(deal.priority)}
                      </div>

                      {/* Probability Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${stage.color}`}
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{deal.probability}% احتمال</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap size={20} className="text-slate-300" />
                      </div>
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/50 border-b border-slate-100 text-sm font-medium text-slate-600">
            <div className="col-span-3">عنوان</div>
            <div className="col-span-2">مشتری</div>
            <div className="col-span-2">مبلغ</div>
            <div className="col-span-2">مرحله</div>
            <div className="col-span-2">احتمال</div>
            <div className="col-span-1">اولویت</div>
          </div>
          <div className="divide-y divide-slate-100/50">
            {filteredDeals.map((deal) => {
              const stageObj = getStageObj(deal.stage);
              return (
                <div key={deal.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gradient-to-l hover:from-blue-50/30 hover:to-transparent transition-all items-center group cursor-pointer">
                  <div className="col-span-3">
                    <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{deal.title}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{deal.description}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-slate-600">{deal.customerName}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-bold text-emerald-600">
                      {(deal.value / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${stageObj.bgColor} ${stageObj.textColor}`}>
                      {getStageLabel(deal.stage)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${stageObj.color}`}
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600">{deal.probability}%</span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    {getPriorityBadge(deal.priority)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-100 rounded-t-3xl">
              <h2 className="text-xl font-bold text-slate-800">افزودن معامله جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">عنوان معامله</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="عنوان معامله"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">مشتری</label>
                <select
                  value={formData.customerId || ''}
                  onChange={(e) => {
                    const customer = mockCustomers.find(c => c.id === e.target.value);
                    setFormData({ ...formData, customerId: e.target.value, customerName: customer?.name || '' });
                  }}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">انتخاب مشتری</option>
                  {mockCustomers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.company}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">مبلغ (تومان)</label>
                  <input
                    type="number"
                    value={formData.value || ''}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">احتمال (%)</label>
                  <input
                    type="number"
                    value={formData.probability || ''}
                    onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="20"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">مرحله</label>
                  <select
                    value={formData.stage || 'lead'}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as Deal['stage'] })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {stages.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">اولویت</label>
                  <select
                    value={formData.priority || 'medium'}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Deal['priority'] })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="low">کم</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">تاریخ بسته شدن</label>
                <input
                  type="date"
                  value={formData.expectedCloseDate || ''}
                  onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">توضیحات</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  placeholder="توضیحات معامله..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleAddDeal}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-l from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
              >
                ایجاد معامله
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
