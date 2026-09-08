import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Trash2 } from 'lucide-react';
import { storage } from '../utils/storage';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
}

const AuditLog: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEntity, setFilterEntity] = useState('all');
  const [filterAction, setFilterAction] = useState('all');

  useEffect(() => {
    const savedLogs = storage.get<AuditLogEntry[]>('auditLogs', []);
    setLogs(savedLogs);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.includes(searchTerm) || log.details.includes(searchTerm) || log.entity.includes(searchTerm);
    const matchesEntity = filterEntity === 'all' || log.entity === filterEntity;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesEntity && matchesAction;
  });

  const handleClearLogs = () => {
    if (confirm('آیا از حذف تمام گزارش‌ها اطمینان دارید؟')) {
      setLogs([]);
      storage.set('auditLogs', []);
    }
  };

  const handleExportLogs = () => {
    const csvContent = [
      'زمان,کاربر,عملیات,موجودیت,شناسه,جزئیات',
      ...filteredLogs.map(log => 
        `${log.timestamp},${log.user},${log.action},${log.entity},${log.entityId},"${log.details}"`
      )
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_log_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create': return <span className="badge badge-success">ایجاد</span>;
      case 'update': return <span className="badge badge-brand">بروزرسانی</span>;
      case 'delete': return <span className="badge badge-error">حذف</span>;
      case 'login': return <span className="badge badge-warning">ورود</span>;
      case 'logout': return <span className="badge badge-gray">خروج</span>;
      default: return <span className="badge badge-gray">{action}</span>;
    }
  };

  const getEntityBadge = (entity: string) => {
    switch (entity) {
      case 'customer': return <span className="badge badge-brand">مشتری</span>;
      case 'deal': return <span className="badge badge-warning">معامله</span>;
      case 'task': return <span className="badge badge-success">وظیفه</span>;
      case 'user': return <span className="badge badge-error">کاربر</span>;
      case 'activity': return <span className="badge badge-gray">فعالیت</span>;
      default: return <span className="badge badge-gray">{entity}</span>;
    }
  };

  const stats = {
    total: logs.length,
    today: logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length,
    thisWeek: logs.filter(l => {
      const logDate = new Date(l.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    }).length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">گزارش فعالیت‌ها</h1>
          <p className="text-body-sm mt-1">تاریخچه تمام تغییرات در سیستم</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportLogs} className="btn btn-secondary">
            <Download size={16} />
            <span>خروجی CSV</span>
          </button>
          <button onClick={handleClearLogs} className="btn btn-secondary">
            <Trash2 size={16} />
            <span>پاک کردن</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-xs text-slate-500">کل فعالیت‌ها</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.today}</p>
              <p className="text-xs text-slate-500">امروز</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.thisWeek}</p>
              <p className="text-xs text-slate-500">این هفته</p>
            </div>
          </div>
        </div>
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
            <option value="activity">فعالیت‌ها</option>
          </select>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="input w-auto"
          >
            <option value="all">همه عملیات</option>
            <option value="create">ایجاد</option>
            <option value="update">بروزرسانی</option>
            <option value="delete">حذف</option>
            <option value="login">ورود</option>
            <option value="logout">خروج</option>
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
                <span className="text-sm text-slate-700">{log.user}</span>
              </div>
              <div className="col-span-2">
                {getActionBadge(log.action)}
              </div>
              <div className="col-span-2">
                {getEntityBadge(log.entity)}
              </div>
              <div className="col-span-4">
                <span className="text-sm text-slate-600">{log.details || '-'}</span>
              </div>
            </div>
          ))}
        </div>
        {filteredLogs.length === 0 && (
          <div className="text-center py-16">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-sm text-slate-500">هیچ فعالیتی ثبت نشده است</p>
            <p className="text-xs text-slate-400 mt-2">با انجام عملیات در سیستم، گزارش‌ها به صورت خودکار ثبت می‌شوند</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLog;
