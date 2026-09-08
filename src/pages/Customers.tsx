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
  Grid,
  List,
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
    name: '', email: '', phone: '', company: '', position: '',
    status: 'prospect', address: '', city: '', notes: '', tags: [], source: 'website'
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.email.includes(searchTerm) || c.company.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="badge badge-success">فعال</span>;
      case 'vip': return <span className="badge badge-warning">VIP</span>;
      case 'inactive': return <span className="badge badge-gray">غیرفعال</span>;
      case 'prospect': return <span className="badge badge-brand">مشتری بالقوه</span>;
      default: return null;
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">مشتریان</h1>
          <p className="text-body-sm mt-1">{customers.length} مشتری ثبت شده</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary px-3 py-2 text-sm">
            <Upload size={16} />
            <span className="hidden sm:inline">وارد کردن</span>
          </button>
          <button className="btn btn-secondary px-3 py-2 text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">خروجی</span>
          </button>
          <button
            onClick={handleAddCustomer}
            className="btn btn-primary px-3 py-2 text-sm"
          >
            <Plus size={16} />
            <span>مشتری جدید</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="جستجوی نام، ایمیل یا شرکت..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pr-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="vip">VIP</option>
              <option value="inactive">غیرفعال</option>
              <option value="prospect">مشتری بالقوه</option>
            </select>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {viewMode === 'list' ? (
        <div className="card overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">مشتری</div>
            <div className="col-span-2">شرکت</div>
            <div className="col-span-2">تماس</div>
            <div className="col-span-2">وضعیت</div>
            <div className="col-span-2">ارزش عمری</div>
            <div className="col-span-1">عملیات</div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center group">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-700 truncate block">{customer.company}</span>
                    {customer.position && <span className="text-xs text-gray-500">{customer.position}</span>}
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                  <a href={`tel:${customer.phone}`} className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                    <Phone size={14} />
                  </a>
                  <a href={`mailto:${customer.email}`} className="p-1.5 rounded-md hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-colors">
                    <Mail size={14} />
                  </a>
                </div>
                <div className="lg:col-span-2">
                  {getStatusBadge(customer.status)}
                </div>
                <div className="lg:col-span-2">
                  {customer.lifetimeValue ? (
                    <span className="text-sm font-semibold text-gray-900 num">
                      {(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </div>
                <div className="lg:col-span-1 flex items-center gap-1">
                  <button onClick={() => handleViewCustomer(customer)} className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => handleEditCustomer(customer)} className="p-1.5 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteCustomer(customer.id)} className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredCustomers.length === 0 && (
            <div className="text-center py-16">
              <Users size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">مشتری‌ای یافت نشد</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="card card-hover p-5 cursor-pointer group" onClick={() => handleViewCustomer(customer)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-105 transition-transform">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.position || customer.company}</p>
                  </div>
                </div>
                {getStatusBadge(customer.status)}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 size={14} className="text-gray-400" />
                  <span>{customer.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="truncate">{customer.city || customer.address}</span>
                </div>
              </div>
              {customer.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {customer.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">{tag}</span>
                  ))}
                </div>
              )}
              {customer.lifetimeValue ? (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">ارزش عمری</span>
                  <span className="text-sm font-semibold text-gray-900 num">{(customer.lifetimeValue / 1000000).toLocaleString('fa-IR')}M</span>
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
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-200 rounded-t-xl">
              <h2 className="text-heading-3">
                {editingCustomer ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-label block mb-1.5">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="نام مشتری"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-label block mb-1.5">تلفن</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                    placeholder="09xxxxxxxxx"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">شرکت</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="input"
                    placeholder="نام شرکت"
                  />
                </div>
                <div>
                  <label className="text-label block mb-1.5">سمت</label>
                  <input
                    type="text"
                    value={formData.position || ''}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="input"
                    placeholder="سمت شغلی"
                  />
                </div>
              </div>
              <div>
                <label className="text-label block mb-1.5">آدرس</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input"
                  placeholder="آدرس"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label block mb-1.5">وضعیت</label>
                  <select
                    value={formData.status || 'prospect'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Customer['status'] })}
                    className="input"
                  >
                    <option value="prospect">مشتری بالقوه</option>
                    <option value="active">فعال</option>
                    <option value="vip">VIP</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
                <div>
                  <label className="text-label block mb-1.5">منبع جذب</label>
                  <select
                    value={formData.source || 'website'}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as Customer['source'] })}
                    className="input"
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
                <label className="text-label block mb-1.5">یادداشت</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="input resize-none"
                  placeholder="توضیحات..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-xl">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary px-4 py-2 text-sm"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveCustomer}
                className="btn btn-primary px-4 py-2 text-sm"
              >
                {editingCustomer ? 'بروزرسانی' : 'ذخیره'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-semibold border border-white/30">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <p className="text-sm opacity-90">{selectedCustomer.position} • {selectedCustomer.company}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-md hover:bg-white/20 transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-semibold text-gray-900 num">{selectedCustomer.satisfaction || 0}%</p>
                  <p className="text-xs text-gray-500">رضایت</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-semibold text-emerald-600 num">{selectedCustomer.lifetimeValue ? (selectedCustomer.lifetimeValue / 1000000).toLocaleString('fa-IR') : 0}M</p>
                  <p className="text-xs text-gray-500">ارزش عمری</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{selectedCustomer.source === 'website' ? 'وب‌سایت' : selectedCustomer.source === 'referral' ? 'ارجاع' : 'سایر'}</p>
                  <p className="text-xs text-gray-500">منبع</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={16} className="text-blue-600" />
                  <span className="text-sm text-gray-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={16} className="text-emerald-600" />
                  <span className="text-sm text-gray-700">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={16} className="text-purple-600" />
                  <span className="text-sm text-gray-700">{selectedCustomer.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <button className="btn btn-secondary flex-1 py-2.5 text-sm">
                  <Phone size={16} />
                  تماس
                </button>
                <button className="btn btn-secondary flex-1 py-2.5 text-sm">
                  <Mail size={16} />
                  ایمیل
                </button>
                <button 
                  onClick={() => { setShowDetailModal(false); handleEditCustomer(selectedCustomer); }}
                  className="btn btn-primary flex-1 py-2.5 text-sm"
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
