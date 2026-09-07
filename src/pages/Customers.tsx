import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Edit2,
  Trash2,
  Eye,
  X,
  Tag,
  Users
} from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'prospect',
    address: '',
    notes: '',
    tags: []
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.email.includes(searchTerm) || c.company.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">فعال</span>;
      case 'inactive':
        return <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">غیرفعال</span>;
      case 'prospect':
        return <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">مشتری بالقوه</span>;
      default:
        return null;
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'prospect',
      address: '',
      notes: '',
      tags: []
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
        status: formData.status as Customer['status'],
        address: formData.address || '',
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
        notes: formData.notes || '',
        tags: formData.tags || []
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">مدیریت مشتریان</h1>
          <p className="text-slate-500 mt-1">{customers.length} مشتری ثبت شده</p>
        </div>
        <button
          onClick={handleAddCustomer}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25"
        >
          <Plus size={18} />
          <span className="font-medium">مشتری جدید</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="جستجوی نام، ایمیل یا شرکت..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">همه</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
              <option value="prospect">مشتری بالقوه</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-600">
          <div className="col-span-3">مشتری</div>
          <div className="col-span-2">شرکت</div>
          <div className="col-span-2">تماس</div>
          <div className="col-span-2">وضعیت</div>
          <div className="col-span-2">آخرین ارتباط</div>
          <div className="col-span-1">عملیات</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors items-center">
              {/* Customer Info */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {customer.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">{customer.name}</p>
                  <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                </div>
              </div>

              {/* Company */}
              <div className="lg:col-span-2 hidden lg:flex items-center gap-2">
                <Building2 size={14} className="text-slate-400" />
                <span className="text-sm text-slate-600 truncate">{customer.company}</span>
              </div>

              {/* Contact */}
              <div className="lg:col-span-2 hidden lg:flex items-center gap-3">
                <a href={`tel:${customer.phone}`} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
                  <Phone size={14} />
                </a>
                <a href={`mailto:${customer.email}`} className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-500 transition-colors">
                  <Mail size={14} />
                </a>
                <span className="text-xs text-slate-500">{customer.phone}</span>
              </div>

              {/* Status */}
              <div className="lg:col-span-2">
                {getStatusBadge(customer.status)}
              </div>

              {/* Last Contact */}
              <div className="lg:col-span-2 hidden lg:block">
                <span className="text-sm text-slate-500">
                  {new Date(customer.lastContact).toLocaleDateString('fa-IR')}
                </span>
              </div>

              {/* Actions */}
              <div className="lg:col-span-1 flex items-center gap-1">
                <button onClick={() => handleViewCustomer(customer)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
                  <Eye size={16} />
                </button>
                <button onClick={() => handleEditCustomer(customer)} className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">مشتری‌ای یافت نشد</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {editingCustomer ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="نام مشتری"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">تلفن</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="09xxxxxxxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">شرکت</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="نام شرکت"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">آدرس</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="آدرس"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">وضعیت</label>
                <select
                  value={formData.status || 'prospect'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Customer['status'] })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="prospect">مشتری بالقوه</option>
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">یادداشت</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  placeholder="توضیحات..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveCustomer}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">جزئیات مشتری</h2>
                <button onClick={() => setShowDetailModal(false)} className="p-2 rounded-lg hover:bg-slate-100">
                  <X size={20} />
                </button>
              </div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{selectedCustomer.name}</h3>
                <p className="text-slate-500">{selectedCustomer.company}</p>
                <div className="mt-2">{getStatusBadge(selectedCustomer.status)}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Building2 size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{selectedCustomer.address}</span>
                </div>
                {selectedCustomer.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap p-3 bg-slate-50 rounded-xl">
                    <Tag size={16} className="text-slate-400" />
                    {selectedCustomer.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
                {selectedCustomer.notes && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600">{selectedCustomer.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
