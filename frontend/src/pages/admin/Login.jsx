import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/admin/login', form);
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_username', data.username);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1A0F05] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-red-700 flex items-center justify-center bg-red-900/20 mx-auto mb-4">
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
              <circle cx="24" cy="24" r="22" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeDasharray="2 2"/>
              <path d="M14 30h16l-1.2 1.5a2 2 0 01-1.5.5H16.7a2 2 0 01-1.5-.5L14 30z" fill="#C0392B"/>
              <path d="M15 22h14l-1.2 8H16.2L15 22z" fill="#C0392B" opacity="0.85"/>
              <path d="M29 24s3.5 0 3.5 3-3.5 3-3.5 3" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <h1 className="text-white font-bold text-xl">Quản Trị Viên</h1>
          <p className="text-white/40 text-sm mt-1">thegioitradao.com</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
          <h2 className="text-white font-semibold text-base mb-6">Đăng nhập</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-700/40 text-red-300 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Tên đăng nhập</label>
              <input
                type="text"
                required
                autoFocus
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full bg-[#2C1A0A] border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/40 outline-none focus:border-red-500 focus:bg-[#3A2210] transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Mật khẩu</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-[#2C1A0A] border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/40 outline-none focus:border-red-500 focus:bg-[#3A2210] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          <a href="/" className="hover:text-white/40 transition-colors">← Quay về trang chủ</a>
        </p>
      </div>
    </div>
  );
}
