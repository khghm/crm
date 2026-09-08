import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Activities from './pages/Activities';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import Documents from './pages/Documents';
import Users from './pages/Users';
import Automation from './pages/Automation';
import AuditLog from './pages/AuditLog';
import { auth } from './utils/storage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = auth.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="deals" element={<Deals />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="activities" element={<Activities />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="documents" element={<Documents />} />
          <Route path="users" element={<Users />} />
          <Route path="automation" element={<Automation />} />
          <Route path="audit-log" element={<AuditLog />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
