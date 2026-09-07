import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Building2,
  Edit2,
  Trash2,
  Eye,
  X,
  Tag,
  Users,
  MapPin,
  Star,
  TrendingUp,
  Grid,
  List,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
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
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    status: 'prospect',
    address: '',
    city: '',
    notes: '',
    tags: [],
    source: 'website'
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.email.includes(searchTerm) || c.company.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1 w-fit"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>فعال</span>;
      case 'vip':
        return <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-700 rounded-full flex items-center gap-1 w-fit"><Star size={10} />VIP</span>;
      case 'inactive':
        return <span className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-full flex items-center gap-1 w-fit"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>غیرفعال</span>;
      case 'prospect':
        return <span className="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full flex items-center gap-1 w-fit"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>مشتری بالقوه</span>;
      default:
        return null;
    }
  };

  const getSourceLabel = (source?: string) => {
    switch (source) {
      case 'website': return 'وب‌سایت';
      case 'referral': return 'ارجاع';
      case 'social': return 'شبکه اجتماعی';
      case 'ads': return 'تبلیغات';
      default: return 'سایر';
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      name: '', email: '', phone: '', company: '', position: '',
      status: 'prospect', address: '', city: '', notes: '', tags: [], source: 'website'
    });
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

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active' || c.status === 'vip').length,
    vip: customers.filter(c => c.status === 'vip').length,
    prospect: customers.filter(c => c.status === 'prospect').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">مدیریت مشتریان</h1>
          <p className="text-slate-500 mt-1">{stats.total} مشتری ثبت شده • {stats.active} فعال • {stats.vip} VIP</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium shadow-sm">
            <Upload size={16} />
            <span>وارد کردن</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium shadow-sm">
            <Download size={16} />
            <span>خروجی</span>
          </button>
          <button
            onClick={handleAddCustomer}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 text-sm font-medium btn-ripple"
          >
            <Plus size={18} />
            <span>مشتری جدید</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-xs text-slate-500">کل مشتریان</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.active}</p>
              <p className="text-xs text-slate-500">فعال</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Star size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.vip}</p>
              <p className="text-xs text-slate-500">VIP</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Users size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{stats.prospect}</p>
              <p className="text-xs text-slate-500">مشتری بالقوه</p>
            </div>
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
              placeholder="جستجوی نام، ایمیل یا شرکت..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-11 pl-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="active">فعال</option>
                <option value="vip">VIP</option>
                <option value="inactive">غیرفعال</option>
                <option value="prospect">مشتری بالقوه</option>
              </select>
            </div>
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/50 border-b border-slate-100 text-sm font-medium text-slate-600">
            <div className="col-span-3">مشتری</div>
            <div className="col-span-2">شرکت</div>
            <div className="col-span-2">تماس</div>
            <div className="col-span-2">وضعیت</div>
            <div className="col-span-2">ارزش عمری</div>
            <div className="col-span-1">عملیات</div>
          </div>
          <div className="divide-y divide-slate-100/50">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-gradient-to-l hover:from-blue-50/30 hover:to-transparent transition-all items-center group">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <Building2 size={14} className="text-slate-400" />
                  <div>
                    <span className="text-sm text-slate-600 truncate block">{customer.company}</span>
                    {customer.position && <span className="text-xs text-slate-400">{customer.position}</span>}
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <a href={`tel:${customer.phone}`} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-all">
                    <Phone size={14} />
                  </a>
                  <a href={`mailto:${customer.email}`} className="p-2 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-500 transition-all">
                    <Mail size={14} />
                  </a>
                </div>
                <div className="lg:col-span-2">
                  {getStatusBadge(customer.status)}
                </div>
                <div className="lg:col-span-2">
                  {customer.lifetimeValue ? (
                    <span className="text-sm font-bold text-emerald-600">
                      {(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </div>
                <div className="lg:col-span-1 flex items-center gap-1">
                  <button onClick={() => handleViewCustomer(customer)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-all">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => handleEditCustomer(customer)} className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-all">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteCustomer(customer.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredCustomers.length === 0 && (
            <div className="text-center py-16">
              <Users size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">مشتری‌ای یافت نشد</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50 card-hover cursor-pointer group" onClick={() => handleViewCustomer(customer)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    <p className="text-xs text-slate-500">{customer.position || customer.company}</p>
                  </div>
                </div>
                {getStatusBadge(customer.status)}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 size={14} className="text-slate-400" />
                  <span>{customer.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={14} className="text-slate-400" />
                  <span className="truncate">{customer.city || customer.address}</span>
                </div>
              </div>
              {customer.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {customer.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              )}
              {customer.lifetimeValue ? (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">ارزش عمری</span>
                  <span className="text-sm font-bold text-emerald-600">{(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-100 rounded-t-3xl">
              <h2 className="text-xl font-bold text-slate-800">
                {editingCustomer ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="نام مشتری"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">تلفن</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="09xxxxxxxxx"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">شرکت</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="نام شرکت"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">سمت</label>
                  <input
                    type="text"
                    value={formData.position || ''}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="سمت شغلی"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">آدرس</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="آدرس"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">وضعیت</label>
                  <select
                    value={formData.status || 'prospect'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Customer['status'] })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="prospect">مشتری بالقوه</option>
                    <option value="active">فعال</option>
                    <option value="vip">VIP</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">منبع جذب</label>
                  <select
                    value={formData.source || 'website'}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as Customer['source'] })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="website">وب‌سایت</option>
                    <option value="referral">ارجاع</option>
                    <option value="social">شبکه اجتماعی</option>
                    <option value="ads">تبلیغات</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">یادداشت</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  placeholder="توضیحات..."
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
                onClick={handleSaveCustomer}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-l from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
              >
                {editingCustomer ? 'بروزرسانی' : 'ذخیره مشتری'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-l from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-bold border border-white/30">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                    <p className="text-sm opacity-80">{selectedCustomer.position} • {selectedCustomer.company}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-2 rounded-xl hover:bg-white/20 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-800">{selectedCustomer.satisfaction || 0}%</p>
                  <p className="text-xs text-slate-500">رضایت</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-emerald-600">{selectedCustomer.lifetimeValue ? (selectedCustomer.lifetimeValue / 1000000).toLocaleString('fa-IR') : 0}M</p>
                  <p className="text-xs text-slate-500">ارزش عمری</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-blue-600">{getSourceLabel(selectedCustomer.source)}</p>
                  <p className="text-xs text-slate-500">منبع</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Mail size={16} className="text-blue-500" />
                  <span className="text-sm text-slate-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Phone size={16} className="text-emerald-500" />
                  <span className="text-sm text-slate-700">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <MapPin size={16} className="text-purple-500" />
                  <span className="text-sm text-slate-700">{selectedCustomer.address}</span>
                </div>
                {selectedCustomer.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap p-3 bg-slate-50 rounded-xl">
                    <Tag size={16} className="text-amber-500" />
                    {selectedCustomer.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white text-blue-600 text-xs rounded-full font-medium shadow-sm">{tag}</span>
                    ))}
                  </div>
                )}
                {selectedCustomer.notes && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600">{selectedCustomer.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium">
                  <Phone size={16} />
                  تماس
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors text-sm font-medium">
                  <Mail size={16} />
                  ایمیل
                </button>
                <button 
                  onClick={() => { setShowDetailModal(false); handleEditCustomer(selectedCustomer); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors text-sm font-medium"
                >
                  <Edit2 size={16} />
                  ویرایش
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
