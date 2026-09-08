export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'manager' | 'sales' | 'support';
  avatar?: string;
  position: string;
  department: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position?: string;
  status: 'active' | 'inactive' | 'prospect' | 'vip';
  avatar?: string;
  address: string;
  city?: string;
  createdAt: string;
  lastContact: string;
  notes: string;
  tags: string[];
  lifetimeValue?: number;
  source?: 'website' | 'referral' | 'social' | 'ads' | 'other';
  satisfaction?: number;
  assignedTo?: string;
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
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
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
  completedAt?: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'sms' | 'document';
  title: string;
  description: string;
  customerId?: string;
  customerName?: string;
  date: string;
  createdBy: string;
  duration?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
  userId?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'meeting' | 'call' | 'task' | 'deadline';
  customerId?: string;
  customerName?: string;
  description?: string;
  attendees?: string[];
}

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'proposal' | 'invoice' | 'report' | 'other';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  relatedTo?: string;
  relatedType?: 'customer' | 'deal';
  url?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  conditions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  userName: string;
  timestamp: string;
  details?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  createdAt: string;
}
