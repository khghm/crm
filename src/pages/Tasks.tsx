import React, { useState } from 'react';
import { Plus, Search, CheckCircle2, Circle, Clock, AlertCircle, X, Calendar, User, Zap } from 'lucide-react';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Task>>({ title: '', description: '', dueDate: '', priority: 'medium', status: 'pending', assignedTo: '' });

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.includes(searchTerm) || t.description.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) { case 'urgent': return 'badge-error'; case 'high': return 'badge-warning'; case 'medium': return 'badge-brand'; case 'low': return 'badge-gray'; default: return 'badge-gray'; }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) { case 'urgent': return 'فوری'; case 'high': return 'بالا'; case 'medium': return 'متوسط'; case 'low': return 'کم'; default: return priority; }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'in_progress': return <Clock size={18} className="text-blue-500" />;
      case 'cancelled': return <AlertCircle size={18} className="text-red-500" />;
      default: return <Circle size={18} className="text-slate-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) { case 'pending': return 'badge-gray'; case 'in_progress': return 'badge-brand'; case 'completed': return 'badge-success'; case 'cancelled': return 'badge-error'; default: return 'badge-gray'; }
  };

  const getStatusLabel = (status: string) => {
    switch (status) { case 'pending': return 'در انتظار'; case 'in_progress': return 'در حال انجام'; case 'completed': return 'تکمیل شده'; case 'cancelled': return 'لغو شده'; default: return status; }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const newStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: newStatus as Task['status'] };
      }
      return t;
    }));
  };

  const handleAddTask = () => {
    const newTask: Task = { id: Date.now().toString(), title: formData.title || '', description: formData.description || '', dueDate: formData.dueDate || '', priority: (formData.priority as Task['priority']) || 'medium', status: (formData.status as Task['status']) || 'pending', assignedTo: formData.assignedTo || '', createdAt: new Date().toISOString().split('T')[0] };
    setTasks([newTask, ...tasks]);
    setShowModal(false);
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">وظایف</h1>
          <p className="text-body-sm mt-1">{stats.total} وظیفه ثبت شده</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /><span>وظیفه جدید</span>
        </button>
      </div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">پیشرفت کلی</span>
          <span className="text-sm font-bold text-emerald-600 num">{Math.round((stats.completed / stats.total) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div className="h-full flex">
            <div className="h-full transition-all duration-500 bg-emerald-500" style={{ width: `${(stats.completed / stats.total) * 100}%` }}></div>
            <div className="h-full transition-all duration-500 bg-blue-500" style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}></div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] text-slate-500">تکمیل شده ({stats.completed})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-[10px] text-slate-500">در حال انجام ({stats.inProgress})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
            <span className="text-[10px] text-slate-500">در انتظار ({stats.pending})</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="جستجوی وظایف..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pr-10" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input w-auto">
            <option value="all">همه وضعیت‌ها</option>
            <option value="pending">در انتظار</option>
            <option value="in_progress">در حال انجام</option>
            <option value="completed">تکمیل شده</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="input w-auto">
            <option value="all">همه اولویت‌ها</option>
            <option value="urgent">فوری</option>
            <option value="high">بالا</option>
            <option value="medium">متوسط</option>
            <option value="low">کم</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2 stagger">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`card card-hover p-4 ${task.status === 'completed' ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-3">
              <button onClick={() => toggleTaskStatus(task.id)} className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform">
                {getStatusIcon(task.status)}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`text-sm font-medium text-slate-800 ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>{task.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                  </div>
                  <span className={`badge ${getPriorityBadge(task.priority)}`}>{getPriorityLabel(task.priority)}</span>
                </div>
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Calendar size={11} />
                    <span>{new Date(task.dueDate).toLocaleDateString('fa-IR')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <User size={11} />
                    <span>{task.assignedTo}</span>
                  </div>
                  <span className={`badge ${getStatusBadge(task.status)}`}>{getStatusLabel(task.status)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16 card">
            <Zap size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">وظیفه‌ای یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
