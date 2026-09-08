import React, { useState } from 'react';
import { Plus, Edit2, Trash2, UserCheck, UserX } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'sales',
    position: '',
    department: 'فروش',
    isActive: true
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', role: 'sales', position: '', department: 'فروش', isActive: true });
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as User : u));
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        password: formData.password || '',
        role: (formData.role as User['role']) || 'sales',
        position: formData.position || '',
        department: formData.department || '',
        isActive: formData.isActive ?? true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([newUser, ...users]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <span className="badge badge-error">مدیر</span>;
      case 'manager': return <span className="badge badge-warning">مدیر ارشد</span>;
      case 'sales': return <span className="badge badge-brand">فروش</span>;
      case 'support': return <span className="badge badge-success">پشتیبانی</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">کاربران</h1>
          <p className="text-body-sm mt-1">مدیریت کاربران و نقش‌ها</p>
        </div>
        <button onClick={handleAddUser} className="btn btn-primary">
          <Plus size={16} />
          <span>کاربر جدید</span>
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-3">کاربر</div>
          <div className="col-span-2">ایمیل</div>
          <div className="col-span-2">نقش</div>
          <div className="col-span-2">دپارتمان</div>
          <div className="col-span-2">وضعیت</div>
          <div className="col-span-1">عملیات</div>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                  {user.firstName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-500">{user.position}</p>
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-slate-600">{user.email}</span>
              </div>
              <div className="col-span-2">
                {getRoleBadge(user.role)}
              </div>
              <div className="col-span-2">
                <span className="text-sm text-slate-600">{user.department}</span>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => handleToggleActive(user.id)}
                  className={`flex items-center gap-1 ${user.isActive ? 'text-emerald-600' : 'text-red-600'}`}
                >
                  {user.isActive ? <UserCheck size={16} /> : <UserX size={16} />}
                  <span className="text-xs">{user.isActive ? 'فعال' : 'غیرفعال'}</span>
                </button>
              </div>
              <div className="col-span-1 flex items-center gap-1">
                <button onClick={() => handleEditUser(user)} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-all">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
