import React, { useState } from 'react';
import {
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  X,
  Calendar,
  User,
  Flag,
  ListChecks,
  Timer,
  Zap,
  Filter
} from 'lucide-react';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
    assignedTo: ''
  });

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.includes(searchTerm) || t.description.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'فوری';
      case 'high': return 'بالا';
      case 'medium': return 'متوسط';
      case 'low': return 'کم';
      default: return priority;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={20} className="text-emerald-500" />;
      case 'in_progress': return <Clock size={20} className="text-blue-500" />;
      case 'cancelled': return <AlertCircle size={20} className="text-red-500" />;
      default: return <Circle size={20} className="text-slate-300" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'در انتظار';
      case 'in_progress': return 'در حال انجام';
      case 'completed': return 'تکمیل شده';
      case 'cancelled': return 'لغو شده';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-slate-100 text-slate-600';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const newStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: newStatus as Task['status'], completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined };
      }
      return t;
    }));
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title || '',
      description: formData.description || '',
      dueDate: formData.dueDate || '',
      priority: (formData.priority as Task['priority']) || 'medium',
      status: (formData.status as Task['status']) || 'pending',
      assignedTo: formData.assignedTo || '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([newTask, ...tasks]);
    setShowModal(false);
    setFormData({ title: '', description: '', dueDate: '', priority: 'medium', status: 'pending', assignedTo: '' });
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">مدیریت وظایف</h1>
          <p className="text-slate-500 mt-1">پیگیری و مدیریت وظایف تیم</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple"
        >
          <Plus size={18} />
          <span>وظیفه جدید</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <ListChecks size={18} className="text-slate-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-xs text-slate-500">کل</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Circle size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.pending}</p>
              <p className="text-xs text-slate-500">در انتظار</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Clock size={18} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.inProgress}</p>
              <p className="text-xs text-slate-500">در حال انجام</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.completed}</p>
              <p className="text-xs text-slate-500">تکمیل شده</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Timer size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-xs text-slate-500">عقب‌افتاده</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">پیشرفت کلی</span>
          <span className="text-sm font-bold text-emerald-600">{Math.round((stats.completed / stats.total) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div className="h-full flex">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(stats.completed / stats.total) * 100}%` }}></div>
            <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}></div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-slate-500">تکمیل شده</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-slate-500">در حال انجام</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
            <span className="text-xs text-slate-500">در انتظار</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="جستجوی وظایف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-11 pl-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="pending">در انتظار</option>
              <option value="in_progress">در حال انجام</option>
              <option value="completed">تکمیل شده</option>
              <option value="cancelled">لغو شده</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه اولویت‌ها</option>
              <option value="urgent">فوری</option>
              <option value="high">بالا</option>
              <option value="medium">متوسط</option>
              <option value="low">کم</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`bg-white rounded-xl p-5 shadow-sm border border-slate-100/50 hover:shadow-md transition-all ${task.status === 'completed' ? 'opacity-60' : ''} group`}>
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform"
              >
                {getStatusIcon(task.status)}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-bold text-slate-800 group-hover:text-blue-600 transition-colors ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                  </div>
                  <span className={`flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full border ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                    <Calendar size={14} />
                    <span>{new Date(task.dueDate).toLocaleDateString('fa-IR')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                    <User size={14} />
                    <span>{task.assignedTo}</span>
                  </div>
                  <span className={`px-3 py-1.5 text-xs font-bold rounded-lg ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100/50">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">وظیفه‌ای یافت نشد</p>
            <p className="text-sm text-slate-400 mt-1">فیلترها را تغییر دهید یا وظیفه جدید ایجاد کنید</p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-100 rounded-t-3xl">
              <h2 className="text-xl font-bold text-slate-800">افزودن وظیفه جدید</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">عنوان وظیفه</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="عنوان وظیفه"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">توضیحات</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  placeholder="توضیحات..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">تاریخ سررسید</label>
                  <input
                    type="date"
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">اولویت</label>
                  <select
                    value={formData.priority || 'medium'}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="low">کم</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                    <option value="urgent">فوری</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">محول به</label>
                <input
                  type="text"
                  value={formData.assignedTo || ''}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="نام مسئول"
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
                onClick={handleAddTask}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-l from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
              >
                ایجاد وظیفه
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
