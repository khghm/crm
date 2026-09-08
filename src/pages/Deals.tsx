import React, { useState } from 'react';
import {
  Plus,
  Search,
  Calendar,
  X,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  LayoutGrid,
  List,
  Target
} from 'lucide-react';
import { mockDeals, mockCustomers } from '../data/mockData';
import { Deal } from '../types';

const stages = [
  { id: 'lead', title: 'سرنخ', color: '#98A2B3', bg: '#F2F4F7', text: '#344054' },
  { id: 'qualified', title: 'واجد شرایط', color: '#2E90FA', bg: '#EFF8FF', text: '#175CD3' },
  { id: 'proposal', title: 'پیشنهاد', color: '#7A5AF8', bg: '#F4F3FF', text: '#5925DC' },
  { id: 'negotiation', title: 'مذاکره', color: '#F79009', bg: '#FFFAEB', text: '#B54708' },
  { id: 'closed_won', title: 'موفق', color: '#12B76A', bg: '#ECFDF3', text: '#027A48' },
  { id: 'closed_lost', title: 'ناموفق', color: '#F04438', bg: '#FEF3F2', text: '#B42318' },
];

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [formData, setFormData] = useState<Partial<Deal>>({
    title: '', customerId: '', customerName: '', value: 0,
    stage: 'lead', probability: 20, expectedCloseDate: '', description: '', priority: 'medium'
  });

  const filteredDeals = deals.filter(d =>
    d.title.includes(searchTerm) || d.customerName.includes(searchTerm)
  );

  const getDealsByStage = (stageId: string) => filteredDeals.filter(d => d.stage === stageId);
  const getTotalValue = (stageDeals: Deal[]) => stageDeals.reduce((sum, d) => sum + d.value, 0);

  const totalPipelineValue = deals
    .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0);

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

  const getStageObj = (stage: string) => stages.find(s => s.id === stage) || stages[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">معاملات</h1>
          <p className="text-body-sm mt-1">پایپلاین فروش و مدیریت فرصت‌ها</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'pipeline' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid size={14} />
              پایپلاین
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List size={14} />
              لیست
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary px-3 py-2 text-sm"
          >
            <Plus size={16} />
            <span>معامله جدید</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-caption">ارزش کل پایپلاین</p>
              <p className="text-xl font-semibold text-gray-900 num">{(totalPipelineValue / 1000000).toLocaleString('fa-IR')}M</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-caption">معاملات موفق</p>
              <p className="text-xl font-semibold text-gray-900 num">{deals.filter(d => d.stage === 'closed_won').length}</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-caption">معاملات فعال</p>
              <p className="text-xl font-semibold text-gray-900 num">{deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="جستجوی معاملات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pr-10"
        />
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const totalValue = getTotalValue(stageDeals);
            return (
              <div key={stage.id} className="flex-shrink-0 w-[300px]">
                <div className="card p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }}></div>
                      <h3 className="text-sm font-semibold text-gray-900">{stage.title}</h3>
                    </div>
                    <span className="badge" style={{ backgroundColor: stage.bg, color: stage.text }}>
                      {stageDeals.length}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 num">
                    {(totalValue / 1000000).toLocaleString('fa-IR')} میلیون تومان
                  </p>
                </div>

                <div className="space-y-2 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="card card-hover p-4 cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 leading-tight flex-1 group-hover:text-blue-600 transition-colors">{deal.title}</h4>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-all">
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{deal.customerName}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900 num">
                          {(deal.value / 1000000).toLocaleString('fa-IR')}M
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{ width: `${deal.probability}%`, backgroundColor: stage.color }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 num">{deal.probability}% احتمال</p>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-xs">
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
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">عنوان</div>
            <div className="col-span-2">مشتری</div>
            <div className="col-span-2">مبلغ</div>
            <div className="col-span-2">مرحله</div>
            <div className="col-span-2">احتمال</div>
            <div className="col-span-1">تاریخ</div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredDeals.map((deal) => {
              const stageObj = getStageObj(deal.stage);
              return (
                <div key={deal.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center group cursor-pointer">
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{deal.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{deal.description}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-700">{deal.customerName}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-semibold text-gray-900 num">
                      {(deal.value / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="badge" style={{ backgroundColor: stageObj.bg, color: stageObj.text }}>
                      {stageObj.title}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${deal.probability}%`, backgroundColor: stageObj.color }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 num">{deal.probability}%</span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <span className="text-xs text-gray-500">
                      {new Date(deal.expectedCloseDate).toLocaleDateString('fa-IR')}
                    </span>
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-200 rounded-t-xl">
              <h2 className="text-heading-3">افزودن معامله جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-label block mb-1.5">عنوان معامله</label>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input" placeholder="عنوان معامله" />
              </div>
              <div>
                <label className="text-label block mb-1.5">مشتری</label>
                <select value={formData.customerId || ''} onChange={(e) => {
                  const customer = mockCustomers.find(c => c.id === e.target.value);
                  setFormData({ ...formData, customerId: e.target.value, customerName: customer?.name || '' });
                }} className="input">
                  <option value="">انتخاب مشتری</option>
                  {mockCustomers.map(c => (<option key={c.id} value={c.id}>{c.name} - {c.company}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">مبلغ (تومان)</label>
                  <input type="number" value={formData.value || ''} onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })} className="input" placeholder="0" />
                </div>
                <div>
                  <label className="text-label block mb-1.5">احتمال (%)</label>
                  <input type="number" value={formData.probability || ''} onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })} className="input" placeholder="20" min="0" max="100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">مرحله</label>
                  <select value={formData.stage || 'lead'} onChange={(e) => setFormData({ ...formData, stage: e.target.value as Deal['stage'] })} className="input">
                    {stages.map(s => (<option key={s.id} value={s.id}>{s.title}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-label block mb-1.5">اولویت</label>
                  <select value={formData.priority || 'medium'} onChange={(e) => setFormData({ ...formData, priority: e.target.value as Deal['priority'] })} className="input">
                    <option value="low">کم</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-label block mb-1.5">تاریخ بسته شدن</label>
                <input type="date" value={formData.expectedCloseDate || ''} onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })} className="input" />
              </div>
              <div>
                <label className="text-label block mb-1.5">توضیحات</label>
                <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="input resize-none" placeholder="توضیحات معامله..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary px-4 py-2 text-sm">انصراف</button>
              <button onClick={handleAddDeal} className="btn btn-primary px-4 py-2 text-sm">ایجاد معامله</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
