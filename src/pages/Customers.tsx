import React, { useState, useRef } from 'react';
import { Search, Plus, Mail, Phone, Building2, Edit2, Trash2, Eye, X, MapPin, Grid, List, Download, Upload, Star } from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({ name: '', email: '', phone: '', company: '', position: '', status: 'prospect', address: '', city: '', notes: '', tags: [], source: 'website' });
  const [importData, setImportData] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.email.includes(searchTerm) || c.company.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="badge badge-success">فعال</span>;
      case 'vip': return <span className="badge badge-warning flex items-center gap-1"><Star size={10} />VIP</span>;
      case 'inactive': return <span className="badge badge-gray">غیرفعال</span>;
      case 'prospect': return <span className="badge badge-brand">مشتری بالقوه</span>;
      default: return null;
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({ name: '', email: '', phone: '', company: '', position: '', status: 'prospect', address: '', city: '', notes: '', tags: [], source: 'website' });
    setShowModal(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setShowModal(true);
  };

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...formData } as Customer : c));
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        company: formData.company || '',
        position: formData.position || '',
        status: formData.status as Customer['status'],
        address: formData.address || '',
        city: formData.city || '',
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
        notes: formData.notes || '',
        tags: formData.tags || [],
        source: formData.source as Customer['source'],
        lifetimeValue: 0,
        satisfaction: 0
      };
      setCustomers([newCustomer, ...customers]);
    }
    setShowModal(false);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm('آیا از حذف این مشتری اطمینان دارید؟')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleExport = () => {
    const headers = ['نام', 'ایمیل', 'تلفن', 'شرکت', 'سمت', 'وضعیت', 'آدرس', 'شهر', 'یادداشت'];
    const csvContent = [
      headers.join(','),
      ...customers.map(c => [
        c.name,
        c.email,
        c.phone,
        c.company,
        c.position || '',
        c.status,
        c.address,
        c.city || '',
        c.notes
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `customers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    setShowImportModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setImportData(text);
      };
      reader.readAsText(file);
    }
  };

  const handleImportData = () => {
    if (!importData) {
      alert('لطفاً یک فایل CSV انتخاب کنید');
      return;
    }

    const lines = importData.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      alert('فایل CSV معتبر نیست');
      return;
    }

    const newCustomers: Customer[] = lines.slice(1).map((line, index) => {
      const values = line.split(',');
      return {
        id: Date.now().toString() + index,
        name: values[0] || '',
        email: values[1] || '',
        phone: values[2] || '',
        company: values[3] || '',
        position: values[4] || '',
        status: (values[5] as Customer['status']) || 'prospect',
        address: values[6] || '',
        city: values[7] || '',
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
        notes: values[8] || '',
        tags: [],
        source: 'other',
        lifetimeValue: 0,
        satisfaction: 0
      };
    });

    setCustomers([...newCustomers, ...customers]);
    setShowImportModal(false);
    setImportData('');
    alert(`${newCustomers.length} مشتری با موفقیت وارد شد`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">مشتریان</h1>
          <p className="text-body-sm mt-1">{customers.length} مشتری ثبت شده</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleImportClick} className="btn btn-secondary">
            <Upload size={16} />
            <span className="hidden sm:inline">وارد کردن</span>
          </button>
          <button onClick={handleExport} className="btn btn-secondary">
            <Download size={16} />
            <span className="hidden sm:inline">خروجی</span>
          </button>
          <button onClick={handleAddCustomer} className="btn btn-primary">
            <Plus size={16} />
            <span>مشتری جدید</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="جستجوی نام، ایمیل یا شرکت..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input pr-10" />
          </div>
          <div className="flex items-center gap-2">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input w-auto">
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="vip">VIP</option>
              <option value="inactive">غیرفعال</option>
              <option value="prospect">مشتری بالقوه</option>
            </select>
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
                <List size={16} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {viewMode === 'list' ? (
        <div className="card overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-3">مشتری</div>
            <div className="col-span-2">شرکت</div>
            <div className="col-span-2">تماس</div>
            <div className="col-span-2">وضعیت</div>
            <div className="col-span-2">ارزش عمری</div>
            <div className="col-span-1">عملیات</div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center group">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <Building2 size={14} className="text-slate-400" />
                  <div>
                    <span className="text-sm text-slate-700 truncate block">{customer.company}</span>
                    {customer.position && <span className="text-[10px] text-slate-400">{customer.position}</span>}
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <a href={`tel:${customer.phone}`} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-all">
                    <Phone size={14} />
                  </a>
                  <a href={`mailto:${customer.email}`} className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-500 transition-all">
                    <Mail size={14} />
                  </a>
                </div>
                <div className="lg:col-span-2">{getStatusBadge(customer.status)}</div>
                <div className="lg:col-span-2">
                  {customer.lifetimeValue ? (
                    <span className="text-sm font-bold text-emerald-600 num">
                      {(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  ) : <span className="text-sm text-slate-300">-</span>}
                </div>
                <div className="lg:col-span-1 flex items-center gap-1">
                  <button onClick={() => handleViewCustomer(customer)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-all"><Eye size={16} /></button>
                  <button onClick={() => handleEditCustomer(customer)} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeleteCustomer(customer.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="card card-hover p-5 cursor-pointer group" onClick={() => handleViewCustomer(customer)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    <p className="text-xs text-slate-500">{customer.position || customer.company}</p>
                  </div>
                </div>
                {getStatusBadge(customer.status)}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Building2 size={12} className="text-slate-400" />
                  <span>{customer.company}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="truncate">{customer.city || customer.address}</span>
                </div>
              </div>
              {customer.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {customer.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded-md font-medium">{tag}</span>
                  ))}
                </div>
              )}
              {customer.lifetimeValue ? (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">ارزش عمری</span>
                  <span className="text-sm font-bold text-emerald-600 num">{(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in bg-white shadow-xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-heading-2">{editingCustomer ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-label block mb-1.5">نام و نام خانوادگی</label>
                <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input" placeholder="نام مشتری" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">ایمیل</label>
                  <input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="text-label block mb-1.5">تلفن</label>
                  <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input" placeholder="09xxxxxxxxx" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">شرکت</label>
                  <input type="text" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="input" placeholder="نام شرکت" />
                </div>
                <div>
                  <label className="text-label block mb-1.5">سمت</label>
                  <input type="text" value={formData.position || ''} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="input" placeholder="سمت شغلی" />
                </div>
              </div>
              <div>
                <label className="text-label block mb-1.5">آدرس</label>
                <input type="text" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="input" placeholder="آدرس" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">وضعیت</label>
                  <select value={formData.status || 'prospect'} onChange={(e) => setFormData({ ...formData, status: e.target.value as Customer['status'] })} className="input">
                    <option value="prospect">مشتری بالقوه</option>
                    <option value="active">فعال</option>
                    <option value="vip">VIP</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
                <div>
                  <label className="text-label block mb-1.5">منبع جذب</label>
                  <select value={formData.source || 'website'} onChange={(e) => setFormData({ ...formData, source: e.target.value as Customer['source'] })} className="input">
                    <option value="website">وب‌سایت</option>
                    <option value="referral">ارجاع</option>
                    <option value="social">شبکه اجتماعی</option>
                    <option value="ads">تبلیغات</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-label block mb-1.5">یادداشت</label>
                <textarea value={formData.notes || ''} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} className="input resize-none" placeholder="توضیحات..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-slate-200 bg-white">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary px-4 py-2 text-sm">انصراف</button>
              <button onClick={handleSaveCustomer} className="btn btn-primary px-4 py-2 text-sm">{editingCustomer ? 'بروزرسانی' : 'ذخیره'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowImportModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in bg-white shadow-xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-heading-2">وارد کردن مشتریان</h2>
              <button onClick={() => setShowImportModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload size={40} className="mx-auto text-slate-400 mb-3" />
                <p className="text-sm text-slate-600 mb-2">فایل CSV خود را انتخاب کنید</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary mt-2"
                >
                  انتخاب فایل
                </button>
              </div>
              {importData && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">پیش‌نمایش داده‌ها:</p>
                  <pre className="text-xs text-slate-600 overflow-auto max-h-40">{importData.substring(0, 500)}...</pre>
                </div>
              )}
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-700">
                  <strong>فرمت CSV:</strong> نام,ایمیل,تلفن,شرکت,سمت,وضعیت,آدرس,شهر,یادداشت
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-slate-200 bg-white">
              <button onClick={() => setShowImportModal(false)} className="btn btn-secondary px-4 py-2 text-sm">انصراف</button>
              <button onClick={handleImportData} className="btn btn-primary px-4 py-2 text-sm">وارد کردن</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden animate-scale-in bg-white shadow-xl">
            <div className="p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
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
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-800 num">{selectedCustomer.satisfaction || 0}%</p>
                  <p className="text-[10px] text-slate-500">رضایت</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-emerald-600 num">{selectedCustomer.lifetimeValue ? (selectedCustomer.lifetimeValue / 1000000).toLocaleString('fa-IR') : 0}M</p>
                  <p className="text-[10px] text-slate-500">ارزش عمری</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-sm font-bold text-slate-800">{selectedCustomer.source === 'website' ? 'وب‌سایت' : 'سایر'}</p>
                  <p className="text-[10px] text-slate-500">منبع</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Mail size={14} className="text-blue-500" />
                  <span className="text-sm text-slate-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <Phone size={14} className="text-emerald-500" />
                  <span className="text-sm text-slate-700">{selectedCustomer.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <button onClick={() => alert(`تماس با ${selectedCustomer.phone}`)} className="btn btn-secondary flex-1 py-2.5 text-sm"><Phone size={14} />تماس</button>
                <button onClick={() => window.location.href = `mailto:${selectedCustomer.email}`} className="btn btn-secondary flex-1 py-2.5 text-sm"><Mail size={14} />ایمیل</button>
                <button onClick={() => { setShowDetailModal(false); handleEditCustomer(selectedCustomer); }} className="btn btn-primary flex-1 py-2.5 text-sm"><Edit2 size={14} />ویرایش</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
