import { storage } from './storage';
import { mockUsers, mockCustomers, mockDeals, mockTasks, mockActivities, mockNotifications, mockCalendarEvents, mockDocuments, mockAutomationRules } from '../data/mockData';

export const initializeApp = () => {
  // Initialize users if not exists
  const existingUsers = storage.get('users', []);
  if (existingUsers.length === 0) {
    storage.set('users', mockUsers);
  }

  // Initialize customers if not exists
  const existingCustomers = storage.get('customers', []);
  if (existingCustomers.length === 0) {
    storage.set('customers', mockCustomers);
  }

  // Initialize deals if not exists
  const existingDeals = storage.get('deals', []);
  if (existingDeals.length === 0) {
    storage.set('deals', mockDeals);
  }

  // Initialize tasks if not exists
  const existingTasks = storage.get('tasks', []);
  if (existingTasks.length === 0) {
    storage.set('tasks', mockTasks);
  }

  // Initialize activities if not exists
  const existingActivities = storage.get('activities', []);
  if (existingActivities.length === 0) {
    storage.set('activities', mockActivities);
  }

  // Initialize notifications if not exists
  const existingNotifications = storage.get('notifications', []);
  if (existingNotifications.length === 0) {
    storage.set('notifications', mockNotifications);
  }

  // Initialize calendar events if not exists
  const existingCalendarEvents = storage.get('calendarEvents', []);
  if (existingCalendarEvents.length === 0) {
    storage.set('calendarEvents', mockCalendarEvents);
  }

  // Initialize documents if not exists
  const existingDocuments = storage.get('documents', []);
  if (existingDocuments.length === 0) {
    storage.set('documents', mockDocuments);
  }

  // Initialize automation rules if not exists
  const existingAutomationRules = storage.get('automationRules', []);
  if (existingAutomationRules.length === 0) {
    storage.set('automationRules', mockAutomationRules);
  }
};
