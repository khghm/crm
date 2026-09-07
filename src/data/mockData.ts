import { Customer, Deal, Task, Activity } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'علی محمدی',
    email: 'ali@company.com',
    phone: '09121234567',
    company: 'شرکت فناوری نوین',
    status: 'active',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    createdAt: '2024-01-15',
    lastContact: '2024-03-10',
    notes: 'مشتری فعال با پتانسیل بالا',
    tags: ['VIP', 'تکنولوژی']
  },
  {
    id: '2',
    name: 'سارا احمدی',
    email: 'sara@startup.io',
    phone: '09351234567',
    company: 'استارتاپ هوشمند',
    status: 'active',
    address: 'اصفهان، خیابان چهارباغ',
    createdAt: '2024-02-01',
    lastContact: '2024-03-08',
    notes: 'علاقه‌مند به سرویس‌های ابری',
    tags: ['استارتاپ', 'ابری']
  },
  {
    id: '3',
    name: 'رضا کریمی',
    email: 'reza@enterprise.ir',
    phone: '09131234567',
    company: 'گروه صنعتی پارس',
    status: 'prospect',
    address: 'شیراز، بلوار زند',
    createdAt: '2024-02-20',
    lastContact: '2024-03-05',
    notes: 'در حال بررسی پیشنهاد',
    tags: ['صنعتی', 'B2B']
  },
  {
    id: '4',
    name: 'مریم حسینی',
    email: 'maryam@digital.com',
    phone: '09141234567',
    company: 'دیجیتال مارکتینگ پلاس',
    status: 'active',
    address: 'مشهد، بلوار وکیل‌آباد',
    createdAt: '2024-01-10',
    lastContact: '2024-03-12',
    notes: 'قرارداد سالانه فعال',
    tags: ['مارکتینگ', 'VIP']
  },
  {
    id: '5',
    name: 'حسن رضایی',
    email: 'hasan@trade.co',
    phone: '09151234567',
    company: 'بازرگانی بین‌المللی حسن',
    status: 'inactive',
    address: 'تبریز، خیابان آزادی',
    createdAt: '2023-11-05',
    lastContact: '2024-01-20',
    notes: 'نیاز به پیگیری مجدد',
    tags: ['بازرگانی']
  },
  {
    id: '6',
    name: 'فاطمه نوری',
    email: 'fatemeh@health.ir',
    phone: '09161234567',
    company: 'سلامت‌گستر پارس',
    status: 'active',
    address: 'تهران، خیابان شریعتی',
    createdAt: '2024-03-01',
    lastContact: '2024-03-14',
    notes: 'پروژه بزرگ در دست اجرا',
    tags: ['سلامت', 'B2B']
  },
  {
    id: '7',
    name: 'امیر جعفری',
    email: 'amir@edu.ac.ir',
    phone: '09171234567',
    company: 'آموزشگاه آنلاین دانش',
    status: 'prospect',
    address: 'قم، بلوار امین',
    createdAt: '2024-03-05',
    lastContact: '2024-03-11',
    notes: 'جلسه اولیه برگزار شد',
    tags: ['آموزش']
  },
  {
    id: '8',
    name: 'زهرا موسوی',
    email: 'zahra@design.co',
    phone: '09181234567',
    company: 'استودیو طراحی خلاق',
    status: 'active',
    address: 'کرج، مهرشهر',
    createdAt: '2024-02-15',
    lastContact: '2024-03-13',
    notes: 'رضایت بالا از خدمات',
    tags: ['طراحی', 'VIP']
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
    description: 'طراحی و توسعه وب‌سایت شرکتی'
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
    description: 'ارائه سرویس ابری برای زیرساخت استارتاپ'
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
    description: 'پیاده‌سازی سیستم مدیریت انبار هوشمند'
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
    description: 'اجرای کمپین تبلیغاتی سه‌ماهه'
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
    description: 'توسعه اپلیکیشن موبایل برای فروشگاه آنلاین'
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
    description: 'طراحی و ساخت پلتفرم آموزش آنلاین'
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
    description: 'طراحی هویت بصری کامل برند'
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
    description: 'مشاوره تحول دیجیتال سازمانی'
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
    createdAt: '2024-03-08'
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
    createdBy: 'محمد رضوی'
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
    createdBy: 'علی احمدی'
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
    createdBy: 'سارا محمدی'
  }
];

export const revenueData = [
  { month: 'فروردین', revenue: 120000000, deals: 3 },
  { month: 'اردیبهشت', revenue: 185000000, deals: 5 },
  { month: 'خرداد', revenue: 150000000, deals: 4 },
  { month: 'تیر', revenue: 220000000, deals: 6 },
  { month: 'مرداد', revenue: 195000000, deals: 5 },
  { month: 'شهریور', revenue: 280000000, deals: 7 },
  { month: 'مهر', revenue: 310000000, deals: 8 },
  { month: 'آبان', revenue: 265000000, deals: 6 },
  { month: 'آذر', revenue: 340000000, deals: 9 },
  { month: 'دی', revenue: 290000000, deals: 7 },
  { month: 'بهمن', revenue: 380000000, deals: 10 },
  { month: 'اسفند', revenue: 420000000, deals: 11 },
];

export const dealStageData = [
  { name: 'سرنخ', value: 15, color: '#94a3b8' },
  { name: 'واجد شرایط', value: 22, color: '#60a5fa' },
  { name: 'پیشنهاد', value: 18, color: '#a78bfa' },
  { name: 'مذاکره', value: 12, color: '#f59e0b' },
  { name: 'برنده شده', value: 28, color: '#22c55e' },
  { name: 'بازنده شده', value: 5, color: '#ef4444' },
];
