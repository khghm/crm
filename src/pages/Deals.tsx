import React, { useState } from 'react';
import {
  Plus,
  Search,
  DollarSign,
  Calendar,
  TrendingUp,
  X,
  GripVertical,
  MoreHorizontal
} from 'lucide-react';
import { mockDeals } from '../data/mockData';
import { Deal } from '../types';

const stages = [
  { id: 'lead', title: 'سرنخ', color: 'bg-slate-400', borderColor: 'border-slate-300' },
  { id: 'qualified', title: 'واجد شرایط', color: 'bg-blue-400', borderColor: 'border-blue-300' },
  { id: 'proposal', title: 'پیشنهاد', color: 'bg-purple-400', borderColor: 'border-purple-300' },
  { id: 'negotiation', title: 'مذاکره', color: 'bg-amber-400', borderColor: 'border-amber-300' },
  { id: 'closed_won', title: 'برنده شده', color: 'bg-emerald-400', borderColor: 'border-emerald-300' },
  { id: 'closed_lost', title: 'بازنده شده', color: 'bg-red-400', borderColor: 'border-red-300' },
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
    description: ''
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
      description: formData.description || ''
    };
    setDeals([newDeal, ...deals]);
    setShowModal(false);
    setFormData({ title: '', customerId: '', customerName: '', value: 0, stage: 'lead', probability: 20, expectedCloseDate: '', description: '' });
  };

  const getStageLabel = (stage: string) => {
    return stages.find(s => s.id === stage)?.title || stage;
  };

  const getStageColor = (stage: string) => {
    const stageObj = stages.find(s => s.id === stage);
    return stageObj?.color || 'bg-slate-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">مدیریت معاملات</h1>
          <p className="text-slate-500 mt-1">
            مجموع ارزش معاملات: {(deals.reduce((s, d) => s + d.value, 0) / 1000000).toLocaleString('fa-IR')} میلیون تومان
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'pipeline' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              پایپلاین
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              لیست
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25"
          >
            <Plus size={18} />
            <span className="font-medium">معامله جدید</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="جستجوی معاملات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const totalValue = getTotalValue(stageDeals);
            return (
              <div key={stage.id} className="flex-shrink-0 w-72">
                {/* Stage Header */}
                <div className={`bg-white rounded-t-2xl p-4 border-t-4 ${stage.borderColor} shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <h3 className="font-bold text-slate-800 text-sm">{stage.title}</h3>
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {stageDeals.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {(totalValue / 1000000).toLocaleString('fa-IR')}M تومان
                  </p>
                </div>

                {/* Stage Deals */}
                <div className="bg-slate-50/50 rounded-b-2xl p-3 space-y-3 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-800 text-sm leading-tight flex-1">{deal.title}</h4>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-100 transition-all">
                          <MoreHorizontal size={14} className="text-slate-400" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{deal.customerName}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-emerald-600">
                          {(deal.value / 1000000).toLocaleString('fa-IR')}M
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                      {/* Probability Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${getStageColor(deal.stage)}`}
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-400">{deal.probability}% احتمال</span>
                      </div>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm">
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-600">
            <div className="col-span-3">عنوان</div>
            <div className="col-span-2">مشتری</div>
            <div className="col-span-2">مبلغ</div>
            <div className="col-span-2">مرحله</div>
            <div className="col-span-2">احتمال</div>
            <div className="col-span-1">تاریخ</div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors items-center">
                <div className="col-span-3">
                  <p className="font-medium text-slate-800 text-sm">{deal.title}</p>
                  <p className="text-xs text-slate-500 truncate">{deal.description}</p>
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
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStageColor(deal.stage)} bg-opacity-20`}>
                    {getStageLabel(deal.stage)}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500">{deal.probability}%</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <span className="text-xs text-slate-500">
                    {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">افزودن معامله جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">عنوان معامله</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="عنوان معامله"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">نام مشتری</label>
                <input
                  type="text"
                  value={formData.customerName || ''}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="نام مشتری"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">مبلغ (تومان)</label>
                  <input
                    type="number"
                    value={formData.value || ''}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">احتمال (%)</label>
                  <input
                    type="number"
                    value={formData.probability || ''}
                    onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="20"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">مرحله</label>
                  <select
                    value={formData.stage || 'lead'}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as Deal['stage'] })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {stages.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">تاریخ بسته شدن</label>
                  <input
                    type="date"
                    value={formData.expectedCloseDate || ''}
                    onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">توضیحات</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  placeholder="توضیحات معامله..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleAddDeal}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
