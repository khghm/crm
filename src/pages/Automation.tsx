import React, { useState } from 'react';
import { Plus, Zap, Edit2, Trash2 } from 'lucide-react';
import { mockAutomationRules } from '../data/mockData';
import { AutomationRule } from '../types';

const Automation: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [showModal, setShowModal] = useState(false);

  const handleToggleActive = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const handleDeleteRule = (id: string) => {
    if (confirm('آیا از حذف این قانون اطمینان دارید؟')) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">اتوماسیون</h1>
          <p className="text-body-sm mt-1">قوانین و فرآیندهای خودکار</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} />
          <span>قانون جدید</span>
        </button>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Zap size={24} className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-heading-2">قوانین فعال</h3>
            <p className="text-body-sm">{rules.filter(r => r.isActive).length} از {rules.length} قانون فعال است</p>
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-medium text-slate-800">{rule.name}</h4>
                    <span className={`badge ${rule.isActive ? 'badge-success' : 'badge-gray'}`}>
                      {rule.isActive ? 'فعال' : 'غیرفعال'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p><strong>Trigger:</strong> {rule.trigger}</p>
                    <p><strong>Action:</strong> {rule.action}</p>
                    {rule.conditions.length > 0 && (
                      <p><strong>Conditions:</strong> {rule.conditions.join(', ')}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(rule.id)}
                    className="btn btn-secondary px-3 py-1.5 text-xs"
                  >
                    {rule.isActive ? 'غیرفعال' : 'فعال'}
                  </button>
                  <button onClick={() => handleDeleteRule(rule.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Automation;
