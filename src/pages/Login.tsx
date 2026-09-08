import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap } from 'lucide-react';
import { auth } from '../utils/storage';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('m.rezavi@company.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = auth.login(email, password);
    
    if (success) {
      navigate('/');
    } else {
      setError('ایمیل یا رمز عبور اشتباه است');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #fef2f2 50%, #f0fdf4 100%)' }}>
      <div className="w-full max-w-md">
        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
              <Zap size={32} className="text-white" />
            </div>
            <h1 className="text-heading-1 mb-2">CRM Pro</h1>
            <p className="text-body-sm">سیستم مدیریت ارتباط با مشتری</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-label block mb-1.5">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pr-10"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-label block mb-1.5">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 justify-center disabled:opacity-50"
            >
              {loading ? 'در حال ورود...' : 'ورود به سیستم'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-700 font-medium mb-2">اطلاعات ورود آزمایشی:</p>
            <p className="text-xs text-blue-600">ایمیل: m.rezavi@company.com</p>
            <p className="text-xs text-blue-600">رمز عبور: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
