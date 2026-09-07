import { Customer, Deal, Task, Activity, Notification, CalendarEvent } from '../types';

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
    notes: 'مشتری VIP با پتانسیل بالا - قرارداد سالانه',
    tags: ['VIP', 'تکنولوژی', 'B2B'],
    lifetimeValue: 450000000,
    source: 'referral',
    satisfaction: 95
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
    satisfaction: 88
  },
  {
    id: '3',
    name: 'رضا کریمی',
    email: 'reza@enterprise.ir',
    phone: '09131234567',
    company: 'گروه صنعتی پارس',
    position: 'مدیر خرید',
    status: 'prospect',
    address: 'شیراز، بلوار زند',
    city: 'شیراز',
    createdAt: '2024-02-20',
    lastContact: '2024-03-05',
    notes: 'در حال بررسی پیشنهاد',
    tags: ['صنعتی', 'B2B'],
    lifetimeValue: 0,
    source: 'ads',
    satisfaction: 0
  },
  {
    id: '4',
    name: 'مریم حسینی',
    email: 'maryam@digital.com',
    phone: '09141234567',
    company: 'دیجیتال مارکتینگ پلاس',
    position: 'مدیر بازاریابی',
    status: 'active',
    address: 'مشهد، بلوار وکیل‌آباد',
    city: 'مشهد',
    createdAt: '2024-01-10',
    lastContact: '2024-03-12',
    notes: 'قرارداد سالانه فعال',
    tags: ['مارکتینگ', 'VIP'],
    lifetimeValue: 320000000,
    source: 'referral',
    satisfaction: 92
  },
  {
    id: '5',
    name: 'حسن رضایی',
    email: 'hasan@trade.co',
    phone: '09151234567',
    company: 'بازرگانی بین‌المللی حسن',
    position: 'مدیرعامل',
    status: 'inactive',
    address: 'تبریز، خیابان آزادی',
    city: 'تبریز',
    createdAt: '2023-11-05',
    lastContact: '2024-01-20',
    notes: 'نیاز به پیگیری مجدد',
    tags: ['بازرگانی'],
    lifetimeValue: 95000000,
    source: 'social',
    satisfaction: 65
  },
  {
    id: '6',
    name: 'فاطمه نوری',
    email: 'fatemeh@health.ir',
    phone: '09161234567',
    company: 'سلامت‌گستر پارس',
    position: 'مدیر پروژه',
    status: 'active',
    address: 'تهران، خیابان شریعتی',
    city: 'تهران',
    createdAt: '2024-03-01',
    lastContact: '2024-03-14',
    notes: 'پروژه بزرگ در دست اجرا',
    tags: ['سلامت', 'B2B'],
    lifetimeValue: 250000000,
    source: 'website',
    satisfaction: 90
  },
  {
    id: '7',
    name: 'امیر جعفری',
    email: 'amir@edu.ac.ir',
    phone: '09171234567',
    company: 'آموزشگاه آنلاین دانش',
    position: 'بنیان‌گذار',
    status: 'prospect',
    address: 'قم، بلوار امین',
    city: 'قم',
    createdAt: '2024-03-05',
    lastContact: '2024-03-11',
    notes: 'جلسه اولیه برگزار شد',
    tags: ['آموزش'],
    lifetimeValue: 0,
    source: 'social',
    satisfaction: 0
  },
  {
    id: '8',
    name: 'زهرا موسوی',
    email: 'zahra@design.co',
    phone: '09181234567',
    company: 'استودیو طراحی خلاق',
    position: 'مدیر هنری',
    status: 'active',
    address: 'کرج، مهرشهر',
    city: 'کرج',
    createdAt: '2024-02-15',
    lastContact: '2024-03-13',
    notes: 'رضایت بالا از خدمات',
    tags: ['طراحی', 'VIP'],
    lifetimeValue: 210000000,
    source: 'referral',
    satisfaction: 97
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
    assignedTo: 'محمد رضوی',
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
    assignedTo: 'سارا محمدی',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'سیستم مدیریت انبار',
    customerId: '3',
    customerName: 'رضا کریمی',
    value: 320000000,
    stage: 'qualified',
    probability: 40,
    expectedCloseDate: '2024-05-20',
    createdAt: '2024-03-01',
    description: 'پیاده‌سازی سیستم مدیریت انبار هوشمند',
    assignedTo: 'علی احمدی',
    priority: 'high'
  },
  {
    id: '4',
    title: 'کمپین تبلیغاتی دیجیتال',
    customerId: '4',
    customerName: 'مریم حسینی',
    value: 45000000,
    stage: 'closed_won',
    probability: 100,
    expectedCloseDate: '2024-03-10',
    createdAt: '2024-02-20',
    description: 'اجرای کمپین تبلیغاتی سه‌ماهه',
    assignedTo: 'زهرا کریمی',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'اپلیکیشن موبایل فروشگاهی',
    customerId: '6',
    customerName: 'فاطمه نوری',
    value: 250000000,
    stage: 'lead',
    probability: 20,
    expectedCloseDate: '2024-06-01',
    createdAt: '2024-03-10',
    description: 'توسعه اپلیکیشن موبایل برای فروشگاه آنلاین',
    assignedTo: 'محمد رضوی',
    priority: 'high'
  },
  {
    id: '6',
    title: 'پلتفرم آموزش آنلاین',
    customerId: '7',
    customerName: 'امیر جعفری',
    value: 180000000,
    stage: 'proposal',
    probability: 50,
    expectedCloseDate: '2024-05-01',
    createdAt: '2024-03-05',
    description: 'طراحی و ساخت پلتفرم آموزش آنلاین',
    assignedTo: 'سارا محمدی',
    priority: 'medium'
  },
  {
    id: '7',
    title: 'برندینگ و هویت بصری',
    customerId: '8',
    customerName: 'زهرا موسوی',
    value: 65000000,
    stage: 'closed_won',
    probability: 100,
    expectedCloseDate: '2024-03-05',
    createdAt: '2024-02-10',
    description: 'طراحی هویت بصری کامل برند',
    assignedTo: 'زهرا کریمی',
    priority: 'low'
  },
  {
    id: '8',
    title: 'مشاوره تحول دیجیتال',
    customerId: '5',
    customerName: 'حسن رضایی',
    value: 95000000,
    stage: 'closed_lost',
    probability: 0,
    expectedCloseDate: '2024-03-15',
    createdAt: '2024-01-20',
    description: 'مشاوره تحول دیجیتال سازمانی',
    assignedTo: 'علی احمدی',
    priority: 'high'
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
  },
  {
    id: '3',
    title: 'جلسه با تیم فنی',
    description: 'هماهنگی با تیم فنی برای پروژه اپلیکیشن',
    dueDate: '2024-03-20',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'علی احمدی',
    createdAt: '2024-03-11'
  },
  {
    id: '4',
    title: 'بروزرسانی CRM',
    description: 'بروزرسانی اطلاعات مشتریان در سیستم',
    dueDate: '2024-03-16',
    priority: 'low',
    status: 'completed',
    assignedTo: 'زهرا کریمی',
    createdAt: '2024-03-08',
    completedAt: '2024-03-14'
  },
  {
    id: '5',
    title: 'تهیه گزارش ماهانه',
    description: 'تهیه گزارش عملکرد فروش ماهانه',
    dueDate: '2024-03-25',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'محمد رضوی',
    createdAt: '2024-03-14'
  },
  {
    id: '6',
    title: 'پیگیری فاکتور',
    description: 'پیگیری پرداخت فاکتور پروژه برندینگ',
    dueDate: '2024-03-17',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'سارا محمدی',
    relatedTo: '8',
    relatedType: 'deal',
    createdAt: '2024-03-13'
  },
  {
    id: '7',
    title: 'دموی محصول',
    description: 'ارائه دمو برای مشتری جدید',
    dueDate: '2024-03-22',
    priority: 'high',
    status: 'pending',
    assignedTo: 'زهرا کریمی',
    createdAt: '2024-03-15'
  },
  {
    id: '8',
    title: 'تحلیل رقبا',
    description: 'تحلیل رقبا و تهیه گزارش',
    dueDate: '2024-03-28',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'علی احمدی',
    createdAt: '2024-03-14'
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
    customerId: '3',
    customerName: 'رضا کریمی',
    date: '2024-03-13T14:00:00',
    createdBy: 'سارا محمدی'
  },
  {
    id: '3',
    type: 'meeting',
    title: 'جلسه حضوری',
    description: 'جلسه بررسی نیازمندی‌ها',
    customerId: '6',
    customerName: 'فاطمه نوری',
    date: '2024-03-12T09:00:00',
    createdBy: 'علی احمدی',
    duration: 60
  },
  {
    id: '4',
    type: 'note',
    title: 'یادداشت',
    description: 'ثبت نکات مهم جلسه با مشتری',
    customerId: '4',
    customerName: 'مریم حسینی',
    date: '2024-03-11T16:00:00',
    createdBy: 'زهرا کریمی'
  },
  {
    id: '5',
    type: 'task',
    title: 'وظیفه تکمیل شده',
    description: 'تکمیل بروزرسانی اطلاعات مشتریان',
    date: '2024-03-10T11:00:00',
    createdBy: 'زهرا کریمی'
  },
  {
    id: '6',
    type: 'call',
    title: 'تماس پیگیری',
    description: 'پیگیری وضعیت پرداخت',
    customerId: '8',
    customerName: 'زهرا موسوی',
    date: '2024-03-09T15:30:00',
    createdBy: 'سارا محمدی',
    duration: 8
  },
  {
    id: '7',
    type: 'document',
    title: 'ارسال قرارداد',
    description: 'ارسال قرارداد نهایی برای امضا',
    customerId: '1',
    customerName: 'علی محمدی',
    date: '2024-03-08T10:00:00',
    createdBy: 'محمد رضوی'
  },
  {
    id: '8',
    type: 'sms',
    title: 'پیامک یادآوری',
    description: 'ارسال یادآوری جلسه فردا',
    customerId: '2',
    customerName: 'سارا احمدی',
    date: '2024-03-07T17:00:00',
    createdBy: 'علی احمدی'
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
  },
  {
    id: '3',
    title: 'مشتری جدید',
    message: 'مشتری جدید "شرکت نوآوران" ثبت شد',
    type: 'info',
    read: false,
    date: '2024-03-13T16:00:00'
  },
  {
    id: '4',
    title: 'هشدار پرداخت',
    message: 'فاکتور شماره ۱۲۳۴ سررسید آن فرا رسیده',
    type: 'error',
    read: true,
    date: '2024-03-13T11:00:00'
  },
  {
    id: '5',
    title: 'جلسه امروز',
    message: 'جلسه با فاطمه نوری ساعت ۱۴:۰۰',
    type: 'info',
    read: true,
    date: '2024-03-12T08:00:00'
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
  },
  {
    id: '2',
    title: 'تماس با سارا احمدی',
    date: '2024-03-15',
    time: '14:30',
    type: 'call',
    customerId: '2',
    customerName: 'سارا احمدی'
  },
  {
    id: '3',
    title: 'مهلت ارسال پیشنهاد',
    date: '2024-03-18',
    type: 'deadline',
    customerId: '3',
    customerName: 'رضا کریمی'
  },
  {
    id: '4',
    title: 'جلسه تیم فروش',
    date: '2024-03-20',
    time: '09:00',
    type: 'meeting',
    description: 'بررسی عملکرد هفتگی'
  },
  {
    id: '5',
    title: 'دمو برای فاطمه نوری',
    date: '2024-03-22',
    time: '11:00',
    type: 'meeting',
    customerId: '6',
    customerName: 'فاطمه نوری'
  }
];

export const revenueData = [
  { month: 'فروردین', revenue: 120000000, deals: 3, target: 150000000 },
  { month: 'اردیبهشت', revenue: 185000000, deals: 5, target: 170000000 },
  { month: 'خرداد', revenue: 150000000, deals: 4, target: 180000000 },
  { month: 'تیر', revenue: 220000000, deals: 6, target: 200000000 },
  { month: 'مرداد', revenue: 195000000, deals: 5, target: 220000000 },
  { month: 'شهریور', revenue: 280000000, deals: 7, target: 250000000 },
  { month: 'مهر', revenue: 310000000, deals: 8, target: 280000000 },
  { month: 'آبان', revenue: 265000000, deals: 6, target: 300000000 },
  { month: 'آذر', revenue: 340000000, deals: 9, target: 320000000 },
  { month: 'دی', revenue: 290000000, deals: 7, target: 340000000 },
  { month: 'بهمن', revenue: 380000000, deals: 10, target: 360000000 },
  { month: 'اسفند', revenue: 420000000, deals: 11, target: 400000000 },
];

export const dealStageData = [
  { name: 'سرنخ', value: 15, color: '#94a3b8' },
  { name: 'واجد شرایط', value: 22, color: '#60a5fa' },
  { name: 'پیشنهاد', value: 18, color: '#a78bfa' },
  { name: 'مذاکره', value: 12, color: '#f59e0b' },
  { name: 'برنده شده', value: 28, color: '#22c55e' },
  { name: 'بازنده شده', value: 5, color: '#ef4444' },
];

export const teamPerformance = [
  { name: 'محمد رضوی', deals: 12, revenue: 450, tasks: 28, avatar: 'م', color: 'from-blue-500 to-purple-500' },
  { name: 'سارا محمدی', deals: 9, revenue: 320, tasks: 22, avatar: 'س', color: 'from-pink-500 to-rose-500' },
  { name: 'علی احمدی', deals: 7, revenue: 280, tasks: 18, avatar: 'ع', color: 'from-emerald-500 to-teal-500' },
  { name: 'زهرا کریمی', deals: 11, revenue: 390, tasks: 25, avatar: 'ز', color: 'from-amber-500 to-orange-500' },
];

export const customerSourceData = [
  { name: 'وب‌سایت', value: 35, color: '#3b82f6' },
  { name: 'ارجاع', value: 25, color: '#8b5cf6' },
  { name: 'شبکه اجتماعی', value: 20, color: '#f59e0b' },
  { name: 'تبلیغات', value: 12, color: '#22c55e' },
  { name: 'سایر', value: 8, color: '#94a3b8' },
];

export const monthlyCustomers = [
  { month: 'فروردین', new: 12, lost: 2 },
  { month: 'اردیبهشت', new: 15, lost: 3 },
  { month: 'خرداد', new: 10, lost: 1 },
  { month: 'تیر', new: 18, lost: 4 },
  { month: 'مرداد', new: 14, lost: 2 },
  { month: 'شهریور', new: 20, lost: 3 },
  { month: 'مهر', new: 22, lost: 5 },
  { month: 'آبان', new: 16, lost: 2 },
  { month: 'آذر', new: 25, lost: 4 },
  { month: 'دی', new: 19, lost: 3 },
  { month: 'بهمن', new: 28, lost: 6 },
  { month: 'اسفند', new: 32, lost: 4 },
];
