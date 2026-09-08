import React, { useState, useEffect } from 'react';
import { Plus, Zap, Edit2, Trash2, X, Play, Pause } from 'lucide-react';
import { AutomationRule } from '../types';
import { storage } from '../utils/storage';

const Automation: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [formData, setFormData] = useState<Partial<AutomationRule>>({
    name: '',
    trigger: '',
    action: '',
    conditions: [],
    isActive: true
  });

  useEffect(() => {
    const savedRules = storage.get<AutomationRule[]>('automationRules', []);
    setRules(savedRules);
  }, []);

  const saveRules = (newRules: AutomationRule[]) => {
    setRules(newRules);
    storage.set('automationRules', newRules);
  };

  const handleAddRule = () => {
    setEditingRule(null);
    setFormData({ name: '', trigger: 'customer_created', action: 'send_email', conditions: [], isActive: true });
    setShowModal(true);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule);
    setFormData(rule);
    setShowModal(true);
  };

  const handleSaveRule = () => {
    if (editingRule) {
      const updated = rules.map(r => r.id === editingRule.id ? { ...r, ...formData } as AutomationRule : r);
      saveRules(updated);
    } else {
      const newRule: AutomationRule = {
        id: Date.now().toString(),
        name: formData.name || '',
        trigger: formData.trigger || '',
        action: formData.action || '',
        conditions: formData.conditions || [],
        isActive: formData.isActive ?? true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveRules([...rules, newRule]);
    }
    setShowModal(false);
    setFormData({ name: '', trigger: '', action: '', conditions: [], isActive: true });
  };

  const handleDeleteRule = (id: string) => {
    if (confirm('آیا از حذف این قانون اطمینان دارید؟')) {
      saveRules(rules.filter(r => r.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = rules.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r);
    saveRules(updated);
  };

  const getTriggerLabel = (trigger: string) => {
    switch (trigger) {
      case 'customer_created': return 'ایجاد مشتری جدید';
      case 'deal_stage_changed': return 'تغییر مرحله معامله';
      case 'task_completed': return 'تکمیل وظیفه';
      case 'email_received': return 'دریافت ایمیل';
      default: return trigger;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'send_email': return 'ارسال ایمیل';
      case 'create_task': return 'ایجاد وظیفه';
      case 'send_notification': return 'ارسال اعلان';
      case 'update_status': return 'بروزرسانی وضعیت';
      default: return action;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">اتوماسیون</h1>
          <p className="text-body-sm mt-1">قوانین و فرآیندهای خودکار</p>
        </div>
        <button onClick={handleAddRule} className="btn btn-primary">
          <Plus size={16} />
          <span>قانون جدید</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Zap size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{rules.length}</p>
              <p className="text-xs text-slate-500">کل قوانین</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Play size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{rules.filter(r => r.isActive).length}</p>
              <p className="text-xs text-slate-500">قوانین فعال</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
              <Pause size={18} className="text-slate-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{rules.filter(r => !r.isActive).length}</p>
              <p className="text-xs text-slate-500">قوانین غیرفعال</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Zap size={24} className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-heading-2">قوانین اتوماسیون</h3>
            <p className="text-body-sm">{rules.filter(r => r.isActive).length} از {rules.length} قانون فعال است</p>
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className={`p-4 rounded-xl border ${rule.isActive ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-sm font-bold text-slate-800">{rule.name}</h4>
                    <span className={`badge ${rule.isActive ? 'badge-success' : 'badge-gray'}`}>
                      {rule.isActive ? 'فعال' : 'غیرفعال'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">Trigger</p>
                      <p className="text-xs text-slate-700">{getTriggerLabel(rule.trigger)}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Action</p>
                      <p className="text-xs text-slate-700">{getActionLabel(rule.action)}</p>
                    </div>
                    {rule.conditions.length > 0 && (
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">Conditions</p>
                        <p className="text-xs text-slate-700">{rule.conditions.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mr-4">
                  <button
                    onClick={() => handleToggleActive(rule.id)}
                    className={`p-2 rounded-lg transition-all ${rule.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {rule.isActive ? <Play size={16} /> : <Pause size={16} />}
                  </button>
                  <button onClick={() => handleEditRule(rule)} className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-all">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteRule(rule.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {rules.length === 0 && (
            <div className="text-center py-16">
              <Zap size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-sm text-slate-500">هنوز قانونی ایجاد نشده است</p>
              <button onClick={handleAddRule} className="btn btn-primary mt-4">
                <Plus size={16} />
                <span>ایجاد اولین قانون</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in bg-white shadow-xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-heading-2">{editingRule ? 'ویرایش قانون' : 'افزودن قانون جدید'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-label block mb-1.5">نام قانون</label>
                <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input" placeholder="نام قانون" />
              </div>
              <div>
                <label className="text-label block mb-1.5">Trigger (محرک)</label>
                <select value={formData.trigger || ''} onChange={(e) => setFormData({ ...formData, trigger: e.target.value })} className="input">
                  <option value="">انتخاب کنید</option>
                  <option value="customer_created">ایجاد مشتری جدید</option>
                  <option value="deal_stage_changed">تغییر مرحله معامله</option>
                  <option value="task_completed">تکمیل وظیفه</option>
                  <option value="email_received">دریافت ایمیل</option>
                </select>
              </div>
              <div>
                <label className="text-label block mb-1.5">Action (عملیات)</label>
                <select value={formData.action || ''} onChange={(e) => setFormData({ ...formData, action: e.target.value })} className="input">
                  <option value="">انتخاب کنید</option>
                  <option value="send_email">ارسال ایمیل</option>
                  <option value="create_task">ایجاد وظیفه</option>
                  <option value="send_notification">ارسال اعلان</option>
                  <option value="update_status">بروزرسانی وضعیت</option>
                </select>
              </div>
              <div>
                <label className="text-label block mb-1.5">وضعیت</label>
                <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="input">
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-slate-200 bg-white">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary px-4 py-2 text-sm">انصراف</button>
              <button onClick={handleSaveRule} className="btn btn-primary px-4 py-2 text-sm">{editingRule ? 'بروزرسانی' : 'ذخیره'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
