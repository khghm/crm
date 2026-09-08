import React, { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Users, Edit2, Trash2, X } from 'lucide-react';
import { CalendarEvent } from '../types';
import { storage } from '../utils/storage';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    date: '',
    time: '',
    type: 'meeting',
    description: '',
    customerName: ''
  });

  useEffect(() => {
    const savedEvents = storage.get<CalendarEvent[]>('calendarEvents', []);
    setEvents(savedEvents);
  }, []);

  const saveEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    storage.set('calendarEvents', newEvents);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], time: '10:00', type: 'meeting', description: '', customerName: '' });
    setShowModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      const updated = events.map(e => e.id === editingEvent.id ? { ...e, ...formData } as CalendarEvent : e);
      saveEvents(updated);
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: formData.title || '',
        date: formData.date || '',
        time: formData.time || '',
        type: (formData.type as CalendarEvent['type']) || 'meeting',
        description: formData.description || '',
        customerName: formData.customerName || ''
      };
      saveEvents([...events, newEvent]);
    }
    setShowModal(false);
    setFormData({ title: '', date: '', time: '', type: 'meeting', description: '', customerName: '' });
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('آیا از حذف این رویداد اطمینان دارید؟')) {
      saveEvents(events.filter(e => e.id !== id));
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-700';
      case 'call': return 'bg-emerald-100 text-emerald-700';
      case 'task': return 'bg-amber-100 text-amber-700';
      case 'deadline': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">تقویم</h1>
          <p className="text-body-sm mt-1">مدیریت رویدادها و جلسات</p>
        </div>
        <button onClick={handleAddEvent} className="btn btn-primary">
          <Plus size={16} />
          <span>رویداد جدید</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <CalendarIcon size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{events.length}</p>
              <p className="text-xs text-slate-500">کل رویدادها</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Users size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{events.filter(e => e.type === 'meeting').length}</p>
              <p className="text-xs text-slate-500">جلسات</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{events.filter(e => e.type === 'call').length}</p>
              <p className="text-xs text-slate-500">تماس‌ها</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <CalendarIcon size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{events.filter(e => e.type === 'deadline').length}</p>
              <p className="text-xs text-slate-500">مهلت‌ها</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-heading-2">
            {currentDate.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="btn btn-secondary px-3 py-2"
            >
              قبلی
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="btn btn-secondary px-3 py-2"
            >
              امروز
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="btn btn-secondary px-3 py-2"
            >
              بعدی
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center text-xs font-bold text-slate-500 py-2">
              {day}
            </div>
          ))}
          {days.map((day, i) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day && day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={i}
                className={`min-h-[100px] p-2 rounded-lg border ${
                  day ? 'border-slate-200 hover:border-blue-300 cursor-pointer' : 'border-transparent'
                } ${isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-[10px] px-1.5 py-0.5 rounded truncate ${getTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-slate-500">
                          +{dayEvents.length - 2} بیشتر
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="card p-6">
        <h3 className="text-heading-2 mb-4">همه رویدادها</h3>
        <div className="space-y-3">
          {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(event.type)}`}>
                <CalendarIcon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{event.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <CalendarIcon size={12} />
                    {new Date(event.date).toLocaleDateString('fa-IR')}
                  </span>
                  {event.time && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} />
                      {event.time}
                    </span>
                  )}
                  {event.customerName && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Users size={12} />
                      {event.customerName}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEditEvent(event)} className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-all">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDeleteEvent(event.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in bg-white shadow-xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-heading-2">{editingEvent ? 'ویرایش رویداد' : 'افزودن رویداد جدید'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-label block mb-1.5">عنوان رویداد</label>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input" placeholder="عنوان رویداد" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">تاریخ</label>
                  <input type="date" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="text-label block mb-1.5">ساعت</label>
                  <input type="time" value={formData.time || ''} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="input" />
                </div>
              </div>
              <div>
                <label className="text-label block mb-1.5">نوع رویداد</label>
                <select value={formData.type || 'meeting'} onChange={(e) => setFormData({ ...formData, type: e.target.value as CalendarEvent['type'] })} className="input">
                  <option value="meeting">جلسه</option>
                  <option value="call">تماس</option>
                  <option value="task">وظیفه</option>
                  <option value="deadline">مهلت</option>
                </select>
              </div>
              <div>
                <label className="text-label block mb-1.5">مشتری (اختیاری)</label>
                <input type="text" value={formData.customerName || ''} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="input" placeholder="نام مشتری" />
              </div>
              <div>
                <label className="text-label block mb-1.5">توضیحات</label>
                <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="input resize-none" placeholder="توضیحات..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-slate-200 bg-white">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary px-4 py-2 text-sm">انصراف</button>
              <button onClick={handleSaveEvent} className="btn btn-primary px-4 py-2 text-sm">{editingEvent ? 'بروزرسانی' : 'ذخیره'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
