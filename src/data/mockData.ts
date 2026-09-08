import { User, Customer, Deal, Task, Activity, Notification, CalendarEvent, Document, AutomationRule, AuditLog, EmailTemplate } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'محمد',
    lastName: 'رضوی',
    email: 'm.rezavi@company.com',
    phone: '09121234567',
    password: 'admin123',
    role: 'admin',
    position: 'مدیر فروش',
    department: 'فروش',
    bio: 'مدیر فروش با بیش از ۵ سال تجربه',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2024-03-15T10:00:00'
  },
  {
    id: '2',
    firstName: 'سارا',
    lastName: 'محمدی',
    email: 's.mohammadi@company.com',
    phone: '09351234567',
    password: 'sales123',
    role: 'sales',
    position: 'کارشناس فروش',
    department: 'فروش',
    isActive: true,
    createdAt: '2024-01-15'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'علی محمدی',
    email: 'ali@company.com',
    phone: '09121234567',
    company: 'شرکت فناوری نوین',
    position: 'مدیرعامل',
    status: 'vip',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    city: 'تهران',
    createdAt: '2024-01-15',
    lastContact: '2024-03-10',
    notes: 'مشتری VIP با پتانسیل بالا',
    tags: ['VIP', 'تکنولوژی', 'B2B'],
    lifetimeValue: 450000000,
    source: 'referral',
    satisfaction: 95,
    assignedTo: '1'
  },
  {
    id: '2',
    name: 'سارا احمدی',
    email: 'sara@startup.io',
    phone: '09351234567',
    company: 'استارتاپ هوشمند',
    position: 'مدیر فنی',
    status: 'active',
    address: 'اصفهان، خیابان چهارباغ',
    city: 'اصفهان',
    createdAt: '2024-02-01',
    lastContact: '2024-03-08',
    notes: 'علاقه‌مند به سرویس‌های ابری',
    tags: ['استارتاپ', 'ابری'],
    lifetimeValue: 185000000,
    source: 'website',
    satisfaction: 88,
    assignedTo: '2'
  }
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'پروژه طراحی وب‌سایت',
    customerId: '1',
    customerName: 'علی محمدی',
    value: 150000000,
    stage: 'negotiation',
    probability: 75,
    expectedCloseDate: '2024-04-15',
    createdAt: '2024-02-01',
    description: 'طراحی و توسعه وب‌سایت شرکتی',
    assignedTo: '1',
    priority: 'high',
    tags: ['طراحی', 'وب']
  },
  {
    id: '2',
    title: 'سرویس ابری یک‌ساله',
    customerId: '2',
    customerName: 'سارا احمدی',
    value: 85000000,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2024-04-01',
    createdAt: '2024-02-15',
    description: 'ارائه سرویس ابری برای زیرساخت استارتاپ',
    assignedTo: '2',
    priority: 'medium'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'تماس پیگیری با علی محمدی',
    description: 'پیگیری وضعیت قرارداد طراحی وب',
    dueDate: '2024-03-15',
    priority: 'high',
    status: 'pending',
    assignedTo: 'محمد رضوی',
    relatedTo: '1',
    relatedType: 'customer',
    createdAt: '2024-03-10'
  },
  {
    id: '2',
    title: 'ارسال پیشنهاد فنی',
    description: 'آماده‌سازی و ارسال پیشنهاد فنی برای پروژه انبار',
    dueDate: '2024-03-18',
    priority: 'urgent',
    status: 'in_progress',
    assignedTo: 'سارا محمدی',
    relatedTo: '3',
    relatedType: 'deal',
    createdAt: '2024-03-12'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'تماس تلفنی',
    description: 'بحث درباره جزئیات قرارداد',
    customerId: '1',
    customerName: 'علی محمدی',
    date: '2024-03-14T10:30:00',
    createdBy: 'محمد رضوی',
    duration: 15
  },
  {
    id: '2',
    type: 'email',
    title: 'ایمیل پیشنهاد',
    description: 'ارسال پیشنهاد فنی برای پروژه',
    customerId: '2',
    customerName: 'سارا احمدی',
    date: '2024-03-13T14:00:00',
    createdBy: 'سارا محمدی'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'معامله جدید',
    message: 'یک معامله جدید به ارزش ۱۵۰ میلیون تومان ایجاد شد',
    type: 'success',
    read: false,
    date: '2024-03-14T10:30:00'
  },
  {
    id: '2',
    title: 'وظیفه در انتظار',
    message: '۳ وظیفه با اولویت بالا در انتظار انجام هستند',
    type: 'warning',
    read: false,
    date: '2024-03-14T09:00:00'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'جلسه با علی محمدی',
    date: '2024-03-15',
    time: '10:00',
    type: 'meeting',
    customerId: '1',
    customerName: 'علی محمدی',
    description: 'بررسی نهایی قرارداد'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'قرارداد طراحی وب.pdf',
    type: 'contract',
    size: 2500000,
    uploadedAt: '2024-03-10',
    uploadedBy: 'محمد رضوی',
    relatedTo: '1',
    relatedType: 'deal'
  }
];

export const mockAutomationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'پیگیری خودکار مشتریان جدید',
    trigger: 'customer_created',
    action: 'send_welcome_email',
    conditions: ['status = prospect'],
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'create',
    entity: 'customer',
    entityId: '1',
    userId: '1',
    userName: 'محمد رضوی',
    timestamp: '2024-03-14T10:30:00',
    details: 'مشتری جدید ایجاد شد'
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'خوش‌آمدگویی',
    subject: 'به CRM Pro خوش آمدید',
    body: 'سلام {name}، به سیستم مدیریت ارتباط با مشتری خوش آمدید.',
    category: 'welcome',
    createdAt: '2024-01-01'
  }
];

export const revenueData = [
  { month: 'فروردین', revenue: 120000000, deals: 3, target: 150000000 },
  { month: 'اردیبهشت', revenue: 185000000, deals: 5, target: 170000000 },
  { month: 'خرداد', revenue: 150000000, deals: 4, target: 180000000 },
  { month: 'تیر', revenue: 220000000, deals: 6, target: 200000000 },
  { month: 'مرداد', revenue: 195000000, deals: 5, target: 220000000 },
  { month: 'شهریور', revenue: 280000000, deals: 7, target: 250000000 },
];

export const dealStageData = [
  { name: 'سرنخ', value: 15, color: '#94a3b8' },
  { name: 'واجد شرایط', value: 22, color: '#3b82f6' },
  { name: 'پیشنهاد', value: 18, color: '#8b5cf6' },
  { name: 'مذاکره', value: 12, color: '#f59e0b' },
  { name: 'موفق', value: 28, color: '#10b981' },
  { name: 'ناموفق', value: 5, color: '#ef4444' },
];

export const teamPerformance = [
  { name: 'محمد رضوی', deals: 12, revenue: 450, tasks: 28, avatar: 'م', color: 'from-blue-500 to-purple-500' },
  { name: 'سارا محمدی', deals: 9, revenue: 320, tasks: 22, avatar: 'س', color: 'from-pink-500 to-rose-500' },
];

export const customerSourceData = [
  { name: 'وب‌سایت', value: 35, color: '#3b82f6' },
  { name: 'ارجاع', value: 25, color: '#8b5cf6' },
  { name: 'شبکه اجتماعی', value: 20, color: '#f59e0b' },
  { name: 'تبلیغات', value: 12, color: '#10b981' },
  { name: 'سایر', value: 8, color: '#94a3b8' },
];

export const monthlyCustomers = [
  { month: 'فروردین', new: 12, lost: 2 },
  { month: 'اردیبهشت', new: 15, lost: 3 },
  { month: 'خرداد', new: 10, lost: 1 },
  { month: 'تیر', new: 18, lost: 4 },
  { month: 'مرداد', new: 14, lost: 2 },
  { month: 'شهریور', new: 20, lost: 3 },
];
