import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter } from 'lucide-react';
import { auditLog } from '../utils/storage';

const AuditLog: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEntity, setFilterEntity] = useState('all');

  useEffect(() => {
    setLogs(auditLog.getLogs());
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.includes(searchTerm) || log.details?.includes(searchTerm);
    const matchesEntity = filterEntity === 'all' || log.entity === filterEntity;
    return matchesSearch && matchesEntity;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create': return <span className="badge badge-success">ایجاد</span>;
      case 'update': return <span className="badge badge-brand">بروزرسانی</span>;
      case 'delete': return <span className="badge badge-error">حذف</span>;
      default: return <span className="badge badge-gray">{action}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-heading-1">گزارش فعالیت‌ها</h1>
        <p className="text-body-sm mt-1">تاریخچه تمام تغییرات در سیستم</p>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="جستجو در فعالیت‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pr-10"
            />
          </div>
          <select
            value={filterEntity}
            onChange={(e) => setFilterEntity(e.target.value)}
            className="input w-auto"
          >
            <option value="all">همه موجودیت‌ها</option>
            <option value="customer">مشتریان</option>
            <option value="deal">معاملات</option>
            <option value="task">وظایف</option>
            <option value="user">کاربران</option>
          </select>
        </div>
      </div>

      {/* Logs List */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2">زمان</div>
          <div className="col-span-2">کاربر</div>
          <div className="col-span-2">عملیات</div>
          <div className="col-span-2">موجودیت</div>
          <div className="col-span-4">جزئیات</div>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-2">
                <span className="text-sm text-slate-600">
                  {new Date(log.timestamp).toLocaleDateString('fa-IR')}
                </span>
                <p className="text-xs text-slate-400">
                  {new Date(log.timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-slate-700">{log.userName}</span>
              </div>
              <div className="col-span-2">
                {getActionBadge(log.action)}
              </div>
              <div className="col-span-2">
                <span className="text-sm text-slate-600">{log.entity}</span>
              </div>
              <div className="col-span-4">
                <span className="text-sm text-slate-600">{log.details || '-'}</span>
              </div>
            </div>
          ))}
        </div>
        {filteredLogs.length === 0 && (
          <div className="text-center py-16">
            <FileText size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">هیچ فعالیتی ثبت نشده است</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLog;
