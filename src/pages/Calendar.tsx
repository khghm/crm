import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { mockCalendarEvents } from '../data/mockData';
import { CalendarEvent } from '../types';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    date: '',
    time: '',
    type: 'meeting',
    description: ''
  });

  const handleAddEvent = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: formData.title || '',
      date: formData.date || '',
      time: formData.time || '',
      type: (formData.type as CalendarEvent['type']) || 'meeting',
      description: formData.description || ''
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
    setFormData({ title: '', date: '', time: '', type: 'meeting', description: '' });
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">تقویم</h1>
          <p className="text-body-sm mt-1">مدیریت رویدادها و جلسات</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} />
          <span>رویداد جدید</span>
        </button>
      </div>

      {/* Calendar Header */}
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

        {/* Calendar Grid */}
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
                          className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded truncate"
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

      {/* Upcoming Events */}
      <div className="card p-6">
        <h3 className="text-heading-2 mb-4">رویدادهای آینده</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <CalendarIcon size={20} className="text-blue-500" />
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
