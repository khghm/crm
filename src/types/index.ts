export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  avatar?: string;
  address: string;
  createdAt: string;
  lastContact: string;
  notes: string;
  tags: string[];
}

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  createdAt: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string;
  relatedTo?: string;
  relatedType?: 'customer' | 'deal';
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description: string;
  customerId?: string;
  customerName?: string;
  date: string;
  createdBy: string;
}

export interface DashboardStats {
  totalCustomers: number;
  activeDeals: number;
  totalRevenue: number;
  conversionRate: number;
  monthlyGrowth: number;
  pendingTasks: number;
}
