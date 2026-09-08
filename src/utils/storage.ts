// Data Storage Utility - LocalStorage based persistence

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  }
};

// Authentication
export const auth = {
  login: (email: string, password: string): boolean => {
    const users = storage.get('users', []);
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      storage.set('currentUser', user);
      storage.set('isAuthenticated', true);
      return true;
    }
    return false;
  },

  logout: (): void => {
    storage.remove('currentUser');
    storage.remove('isAuthenticated');
  },

  getCurrentUser: () => {
    return storage.get('currentUser', null);
  },

  isAuthenticated: (): boolean => {
    return storage.get('isAuthenticated', false);
  }
};

// Audit Log
export const auditLog = {
  log: (action: string, entity: string, entityId: string, details?: string) => {
    const logs = storage.get<any[]>('auditLogs', []);
    const user = auth.getCurrentUser() as any;
    const newLog = {
      id: Date.now().toString(),
      action,
      entity,
      entityId,
      userId: user?.id || 'system',
      userName: user ? `${user.firstName} ${user.lastName}` : 'سیستم',
      timestamp: new Date().toISOString(),
      details
    };
    storage.set('auditLogs', [newLog, ...logs].slice(0, 1000));
  },

  getLogs: () => {
    return storage.get<any[]>('auditLogs', []);
  }
};

// CSV Export/Import
export const csvUtils = {
  exportToCSV: (data: any[], filename: string) => {
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  importFromCSV: (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(h => h.trim());
          const data = lines.slice(1).map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = values[index]?.trim() || '';
            });
            return obj;
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file, 'UTF-8');
    });
  }
};

// Notifications
export const notifications = {
  add: (notification: any) => {
    const notifications = storage.get('notifications', []);
    storage.set('notifications', [notification, ...notifications]);
  },

  markAsRead: (id: string) => {
    const notifications = storage.get('notifications', []);
    const updated = notifications.map((n: any) => n.id === id ? { ...n, read: true } : n);
    storage.set('notifications', updated);
  },

  markAllAsRead: () => {
    const notifications = storage.get('notifications', []);
    const updated = notifications.map((n: any) => ({ ...n, read: true }));
    storage.set('notifications', updated);
  },

  getUnread: () => {
    const notifications = storage.get('notifications', []);
    return notifications.filter((n: any) => !n.read);
  }
};
