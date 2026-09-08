import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2, Edit2, Trash2, Eye, X, MapPin, Grid, List, Download, Upload, Star, Crown } from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({ name: '', email: '', phone: '', company: '', position: '', status: 'prospect', address: '', city: '', notes: '', tags: [], source: 'website' });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.email.includes(searchTerm) || c.company.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="badge-premium badge-green">فعال</span>;
      case 'vip': return <span className="badge-premium badge-amber flex items-center gap-1"><Star size={10} />VIP</span>;
      case 'inactive': return <span className="badge-premium badge-neutral">غیرفعال</span>;
      case 'prospect': return <span className="badge-premium badge-cyan">مشتری بالقوه</span>;
      default: return null;
    }
  };

  const handleAddCustomer = () => { setEditingCustomer(null); setFormData({ name: '', email: '', phone: '', company: '', position: '', status: 'prospect', address: '', city: '', notes: '', tags: [], source: 'website' }); setShowModal(true); };
  const handleEditCustomer = (customer: Customer) => { setEditingCustomer(customer); setFormData(customer); setShowModal(true); };
  const handleSaveCustomer = () => {
    if (editingCustomer) { setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...formData } as Customer : c)); }
    else {
      const newCustomer: Customer = { id: Date.now().toString(), name: formData.name || '', email: formData.email || '', phone: formData.phone || '', company: formData.company || '', position: formData.position || '', status: formData.status as Customer['status'], address: formData.address || '', city: formData.city || '', createdAt: new Date().toISOString().split('T')[0], lastContact: new Date().toISOString().split('T')[0], notes: formData.notes || '', tags: formData.tags || [], source: formData.source as Customer['source'], lifetimeValue: 0, satisfaction: 0 };
      setCustomers([newCustomer, ...customers]);
    }
    setShowModal(false);
  };
  const handleDeleteCustomer = (id: string) => { if (confirm('آیا از حذف این مشتری اطمینان دارید؟')) setCustomers(customers.filter(c => c.id !== id)); };
  const handleViewCustomer = (customer: Customer) => { setSelectedCustomer(customer); setShowDetailModal(true); };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">مشتریان</h1>
          <p className="text-sm text-white/40">{customers.length} مشتری ثبت شده</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-premium btn-secondary-premium">
            <Upload size={16} />
            <span className="hidden sm:inline">وارد کردن</span>
          </button>
          <button className="btn-premium btn-secondary-premium">
            <Download size={16} />
            <span className="hidden sm:inline">خروجی</span>
          </button>
          <button onClick={handleAddCustomer} className="btn-premium btn-primary-premium">
            <Plus size={16} />
            <span>مشتری جدید</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input type="text" placeholder="جستجوی نام، ایمیل یا شرکت..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-premium pr-11" />
          </div>
          <div className="flex items-center gap-2">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-premium w-auto">
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="vip">VIP</option>
              <option value="inactive">غیرفعال</option>
              <option value="prospect">مشتری بالقوه</option>
            </select>
            <div className="flex rounded-xl p-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
                <List size={16} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {viewMode === 'list' ? (
        <div className="glass-card overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-wider">
            <div className="col-span-3">مشتری</div>
            <div className="col-span-2">شرکت</div>
            <div className="col-span-2">تماس</div>
            <div className="col-span-2">وضعیت</div>
            <div className="col-span-2">ارزش عمری</div>
            <div className="col-span-1">عملیات</div>
          </div>
          <div className="divide-y divide-white/5">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-all items-center group">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 12px rgba(0,217,255,0.3)' }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">{customer.name}</p>
                    <p className="text-xs text-white/40 truncate">{customer.email}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <Building2 size={14} className="text-white/30" />
                  <div>
                    <span className="text-sm text-white/70 truncate block">{customer.company}</span>
                    {customer.position && <span className="text-[10px] text-white/30">{customer.position}</span>}
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <a href={`tel:${customer.phone}`} className="p-1.5 rounded-lg hover:bg-cyan-500/10 text-white/30 hover:text-cyan-400 transition-all">
                    <Phone size={14} />
                  </a>
                  <a href={`mailto:${customer.email}`} className="p-1.5 rounded-lg hover:bg-purple-500/10 text-white/30 hover:text-purple-400 transition-all">
                    <Mail size={14} />
                  </a>
                </div>
                <div className="lg:col-span-2">{getStatusBadge(customer.status)}</div>
                <div className="lg:col-span-2">
                  {customer.lifetimeValue ? (
                    <span className="text-sm font-bold num" style={{ color: 'var(--neon-green)' }}>
                      {(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  ) : <span className="text-sm text-white/20">-</span>}
                </div>
                <div className="lg:col-span-1 flex items-center gap-1">
                  <button onClick={() => handleViewCustomer(customer)} className="p-1.5 rounded-lg hover:bg-cyan-500/10 text-white/30 hover:text-cyan-400 transition-all"><Eye size={16} /></button>
                  <button onClick={() => handleEditCustomer(customer)} className="p-1.5 rounded-lg hover:bg-amber-500/10 text-white/30 hover:text-amber-400 transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteCustomer(customer.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="glass-card p-5 cursor-pointer group" onClick={() => handleViewCustomer(customer)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform" style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 16px rgba(0,217,255,0.3)' }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{customer.name}</p>
                    <p className="text-xs text-white/40">{customer.position || customer.company}</p>
                  </div>
                </div>
                {getStatusBadge(customer.status)}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Building2 size={12} className="text-white/30" />
                  <span>{customer.company}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <MapPin size={12} className="text-white/30" />
                  <span className="truncate">{customer.city || customer.address}</span>
                </div>
              </div>
              {customer.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {customer.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] rounded-md font-medium" style={{ background: 'rgba(0,217,255,0.1)', color: 'var(--neon-cyan)', border: '1px solid rgba(0,217,255,0.2)' }}>{tag}</span>
                  ))}
                </div>
              )}
              {customer.lifetimeValue ? (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-white/30">ارزش عمری</span>
                  <span className="text-sm font-bold num" style={{ color: 'var(--neon-green)' }}>{(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowDetailModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden animate-scale-in border border-white/10" style={{ background: 'var(--bg-secondary)' }}>
            <div className="p-6 text-white relative overflow-hidden" style={{ background: 'var(--gradient-primary)' }}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedCustomer.name}</h3>
                    <p className="text-sm opacity-90">{selectedCustomer.position} • {selectedCustomer.company}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"><X size={18} /></button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-lg font-bold text-white num">{selectedCustomer.satisfaction || 0}%</p>
                  <p className="text-[10px] text-white/40">رضایت</p>
                </div>
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-lg font-bold num" style={{ color: 'var(--neon-green)' }}>{selectedCustomer.lifetimeValue ? (selectedCustomer.lifetimeValue / 1000000).toLocaleString('fa-IR') : 0}M</p>
                  <p className="text-[10px] text-white/40">ارزش عمری</p>
                </div>
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-sm font-bold text-white">{selectedCustomer.source === 'website' ? 'وب‌سایت' : 'سایر'}</p>
                  <p className="text-[10px] text-white/40">منبع</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(0,217,255,0.05)', border: '1px solid rgba(0,217,255,0.1)' }}>
                  <Mail size={14} style={{ color: 'var(--neon-cyan)' }} />
                  <span className="text-sm text-white/70">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <Phone size={14} style={{ color: 'var(--neon-green)' }} />
                  <span className="text-sm text-white/70">{selectedCustomer.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <button className="btn-premium btn-secondary-premium flex-1 py-2.5 text-sm"><Phone size={14} />تماس</button>
                <button className="btn-premium btn-secondary-premium flex-1 py-2.5 text-sm"><Mail size={14} />ایمیل</button>
                <button onClick={() => { setShowDetailModal(false); handleEditCustomer(selectedCustomer); }} className="btn-premium btn-primary-premium flex-1 py-2.5 text-sm"><Edit2 size={14} />ویرایش</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
