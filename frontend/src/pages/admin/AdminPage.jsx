import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ── Auth helper ────────────────────────────────────────────────
function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
}

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }

// ── Product Modal ──────────────────────────────────────────────
function ProductModal({ product, sections, onSave, onClose }) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState({
    name: product?.name || '',
    section_id: product?.section_id || sections[0]?.id || '',
    price: product?.price || '',
    original_price: product?.original_price || '',
    image_url: product?.image_url || '',
    description: product?.description || '',
    is_featured: product?.is_featured ? true : false,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      const payload = { ...form, price: Number(form.price), original_price: Number(form.original_price) || null };
      if (isEdit) {
        await axios.put(`/api/admin/products/${product.id}`, payload, { headers: authHeaders() });
      } else {
        await axios.post('/api/admin/products', payload, { headers: authHeaders() });
      }
      onSave();
    } catch (e) {
      setErr(e.response?.data?.error || 'Lỗi lưu sản phẩm');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-base">{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {err && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{err}</p>}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tên sản phẩm *</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 transition-colors"
              placeholder="Ấm Tử Sa Thạch Biều..." />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Danh mục *</label>
            <select required value={form.section_id} onChange={e => setForm(f => ({ ...f, section_id: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 bg-white">
              {sections.map(s => (
                <option key={s.id} value={s.id}>{s.group_name} › {s.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Giá bán (đ) *</label>
              <input required type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
                placeholder="850000" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Giá gốc (đ)</label>
              <input type="number" value={form.original_price} onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
                placeholder="1200000" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL hình ảnh</label>
            <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
              placeholder="https://images.unsplash.com/..." />
            {form.image_url && (
              <img src={form.image_url} alt="" className="mt-2 h-20 w-20 object-cover rounded-lg border border-gray-200"
                onError={e => e.target.style.display = 'none'} />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 resize-none"
              placeholder="Mô tả ngắn về sản phẩm..." />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
              className="w-4 h-4 accent-red-600" />
            <span className="text-sm text-gray-700">Sản phẩm nổi bật</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Hủy
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              {saving && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isEdit ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Section Modal ──────────────────────────────────────────────
function SectionModal({ section, groups, onSave, onClose }) {
  const isEdit = !!section?.id;
  const [form, setForm] = useState({
    name: section?.name || '',
    slug: section?.slug || '',
    group_id: section?.group_id || groups[0]?.id || '',
    sort_order: section?.sort_order || 0,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      if (isEdit) {
        await axios.put(`/api/admin/sections/${section.id}`, form, { headers: authHeaders() });
      } else {
        await axios.post('/api/admin/sections', form, { headers: authHeaders() });
      }
      onSave();
    } catch (e) {
      setErr(e.response?.data?.error || 'Lỗi lưu danh mục');
    } finally {
      setSaving(false);
    }
  }

  function autoSlug(name) {
    return name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '')
      .trim().replace(/\s+/g, '-');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-base">{isEdit ? 'Sửa nhóm sản phẩm' : 'Thêm nhóm mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {err && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{err}</p>}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Thuộc nhóm lớn *</label>
            <select required value={form.group_id} onChange={e => setForm(f => ({ ...f, group_id: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 bg-white">
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tên danh mục *</label>
            <input required value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: isEdit ? f.slug : autoSlug(e.target.value) }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
              placeholder="Ấm Tử Sa Thạch Biều" />
          </div>

          {!isEdit && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Slug (URL)</label>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 font-mono"
                placeholder="am-tu-sa-thach-bieu" />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Thứ tự hiển thị</label>
            <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50">
              Hủy
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              {saving && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isEdit ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────
const NAV = [
  { key: 'products', label: 'Sản phẩm', icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg> },
  { key: 'sections', label: 'Danh mục', icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
  { key: 'contacts', label: 'Liên hệ', icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg> },
];

// ── Main AdminPage ─────────────────────────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [groups, setGroups] = useState([]);
  const [sections, setSections] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: 'product'|'section', data: ... }
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [openGroups, setOpenGroups] = useState({});
  const [sectionFilter, setSectionFilter] = useState('all');
  const username = localStorage.getItem('admin_username') || 'admin';

  // Auth check
  useEffect(() => {
    if (!localStorage.getItem('admin_token')) navigate('/admin/login');
  }, [navigate]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const headers = authHeaders();
      const [gRes, sRes, cRes, stRes] = await Promise.all([
        axios.get('/api/admin/products', { headers }),
        axios.get('/api/admin/sections', { headers }),
        axios.get('/api/admin/contacts', { headers }),
        axios.get('/api/admin/stats', { headers }),
      ]);
      setGroups(gRes.data);
      setSections(sRes.data);
      setContacts(cRes.data);
      setStats(stRes.data);
      // Open first group by default
      if (gRes.data.length > 0 && Object.keys(openGroups).length === 0) {
        setOpenGroups({ [gRes.data[0].id]: true });
      }
    } catch {
      localStorage.removeItem('admin_token');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line

  useEffect(() => { loadAll(); }, [loadAll]);

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  }

  async function deleteProduct(id) {
    await axios.delete(`/api/admin/products/${id}`, { headers: authHeaders() });
    loadAll();
  }

  async function deleteSection(id) {
    try {
      await axios.delete(`/api/admin/sections/${id}`, { headers: authHeaders() });
      loadAll();
    } catch (e) {
      alert(e.response?.data?.error || 'Không thể xóa');
    }
  }

  async function deleteContact(id) {
    await axios.delete(`/api/admin/contacts/${id}`, { headers: authHeaders() });
    setContacts(c => c.filter(x => x.id !== id));
  }

  function toggleGroup(id) {
    setOpenGroups(o => ({ ...o, [id]: !o[id] }));
  }

  const groupColors = {
    'am-tu-sa': 'bg-red-700',
    'bo-am-tra': 'bg-amber-800',
    'dung-cu': 'bg-green-800',
  };

  const allProducts = groups.flatMap(g => g.sections.flatMap(s => s.products.map(p => ({ ...p, section_name: s.name, group_name: g.name }))));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-red-200 border-t-red-700 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1A0F05] flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-red-700 flex items-center justify-center bg-red-900/20">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <path d="M8 24h12l-1 1.5a1.5 1.5 0 01-1.2.5H10.2a1.5 1.5 0 01-1.2-.5L8 24z" fill="#e87c3e"/>
                <path d="M9 17h12l-1 7H10l-1-7z" fill="#e87c3e" opacity=".8"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-xs leading-tight">THEGIOITRADAO</div>
              <div className="text-white/30 text-[10px]">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(n => (
            <button key={n.key} onClick={() => setTab(n.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                tab === n.key ? 'bg-red-700 text-white' : 'text-white/50 hover:text-white hover:bg-white/8'
              }`}>
              {n.icon}
              {n.label}
              {n.key === 'contacts' && contacts.length > 0 && (
                <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {contacts.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Stats */}
        {stats && (
          <div className="px-4 py-4 border-t border-white/8">
            <div className="grid grid-cols-2 gap-2 text-center">
              {[
                { label: 'Sản phẩm', val: stats.products },
                { label: 'Danh mục', val: stats.sections },
                { label: 'Liên hệ', val: stats.contacts },
                { label: 'Bài viết', val: stats.blog },
              ].map(s => (
                <div key={s.label} className="bg-white/5 rounded-lg py-2">
                  <div className="text-white font-bold text-base leading-none">{s.val}</div>
                  <div className="text-white/30 text-[10px] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-white/8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase">
                {username[0]}
              </div>
              <span className="text-white/60 text-xs font-medium">{username}</span>
            </div>
            <button onClick={logout} title="Đăng xuất"
              className="text-white/30 hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <h1 className="font-bold text-gray-800 text-base">
            {tab === 'products' && 'Quản lý sản phẩm'}
            {tab === 'sections' && 'Quản lý danh mục'}
            {tab === 'contacts' && 'Hộp thư liên hệ'}
          </h1>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-700 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
              </svg>
              Xem website
            </a>
            {tab === 'products' && (
              <button onClick={() => setModal({ type: 'product', data: null })}
                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Thêm sản phẩm
              </button>
            )}
            {tab === 'sections' && (
              <button onClick={() => setModal({ type: 'section', data: null })}
                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Thêm danh mục
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── PRODUCTS TAB ── */}
          {tab === 'products' && (
            <div className="space-y-4">
              {/* Filter by section */}
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={() => setSectionFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${sectionFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  Tất cả ({allProducts.length})
                </button>
                {groups.map(g => (
                  <button key={g.id} onClick={() => setSectionFilter(g.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${sectionFilter === g.slug ? 'bg-red-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {g.name}
                  </button>
                ))}
              </div>

              {groups
                .filter(g => sectionFilter === 'all' || sectionFilter === g.slug)
                .map(group => (
                <div key={group.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Group header */}
                  <button onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 ${groupColors[group.slug] || 'bg-gray-700'} text-white`}>
                    <div className="flex items-center gap-3">
                      <svg className={`w-4 h-4 transition-transform ${openGroups[group.id] ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                      </svg>
                      <span className="font-bold text-sm uppercase tracking-wide">{group.name}</span>
                    </div>
                    <span className="text-white/60 text-xs">
                      {group.sections.reduce((s, sec) => s + sec.products.length, 0)} sản phẩm
                    </span>
                  </button>

                  {openGroups[group.id] && (
                    <div className="divide-y divide-gray-100">
                      {group.sections.map(section => (
                        <div key={section.id}>
                          {/* Section header */}
                          <div className="flex items-center justify-between px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-4 bg-red-600 rounded-full block" />
                              <span className="font-semibold text-gray-700 text-sm">{section.name}</span>
                              <span className="text-gray-400 text-xs">({section.products.length})</span>
                            </div>
                            <button
                              onClick={() => setModal({ type: 'product', data: { section_id: section.id } })}
                              className="flex items-center gap-1 text-xs text-red-700 hover:text-red-800 font-semibold">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15"/>
                              </svg>
                              Thêm
                            </button>
                          </div>

                          {/* Products table */}
                          {section.products.length === 0 ? (
                            <div className="px-5 py-4 text-gray-400 text-sm text-center italic">Chưa có sản phẩm</div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-left">
                                    <th className="px-5 py-2 text-xs text-gray-400 font-semibold w-12">Ảnh</th>
                                    <th className="px-3 py-2 text-xs text-gray-400 font-semibold">Tên sản phẩm</th>
                                    <th className="px-3 py-2 text-xs text-gray-400 font-semibold text-right w-32">Giá bán</th>
                                    <th className="px-3 py-2 text-xs text-gray-400 font-semibold text-right w-32">Giá gốc</th>
                                    <th className="px-3 py-2 text-xs text-gray-400 font-semibold text-center w-20">Nổi bật</th>
                                    <th className="px-5 py-2 text-xs text-gray-400 font-semibold text-right w-24">Thao tác</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                  {section.products.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                                      <td className="px-5 py-2.5">
                                        <img src={p.image_url} alt={p.name}
                                          className="w-10 h-10 object-cover rounded-lg border border-gray-200 bg-gray-100"
                                          onError={e => { e.target.src = `https://picsum.photos/seed/p${p.id}/80/80`; }} />
                                      </td>
                                      <td className="px-3 py-2.5">
                                        <span className="font-medium text-gray-800 line-clamp-2 text-xs leading-snug">{p.name}</span>
                                        {p.description && <span className="text-gray-400 text-[11px] block mt-0.5 line-clamp-1">{p.description}</span>}
                                      </td>
                                      <td className="px-3 py-2.5 text-right">
                                        <span className="text-red-700 font-semibold text-xs">{fmt(p.price)}</span>
                                      </td>
                                      <td className="px-3 py-2.5 text-right">
                                        {p.original_price ? (
                                          <span className="text-gray-400 line-through text-xs">{fmt(p.original_price)}</span>
                                        ) : <span className="text-gray-200">—</span>}
                                      </td>
                                      <td className="px-3 py-2.5 text-center">
                                        {p.is_featured ? (
                                          <span className="inline-block w-2 h-2 bg-amber-400 rounded-full" title="Nổi bật" />
                                        ) : (
                                          <span className="inline-block w-2 h-2 bg-gray-200 rounded-full" />
                                        )}
                                      </td>
                                      <td className="px-5 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          <button onClick={() => setModal({ type: 'product', data: p })}
                                            className="text-gray-400 hover:text-blue-600 transition-colors" title="Sửa">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                            </svg>
                                          </button>
                                          <button onClick={() => setDeleteConfirm({ type: 'product', id: p.id, name: p.name })}
                                            className="text-gray-400 hover:text-red-600 transition-colors" title="Xóa">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── SECTIONS TAB ── */}
          {tab === 'sections' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs text-gray-500 font-semibold">Nhóm lớn</th>
                    <th className="px-5 py-3 text-left text-xs text-gray-500 font-semibold">Tên danh mục</th>
                    <th className="px-5 py-3 text-left text-xs text-gray-500 font-semibold">Slug</th>
                    <th className="px-5 py-3 text-center text-xs text-gray-500 font-semibold">Thứ tự</th>
                    <th className="px-5 py-3 text-center text-xs text-gray-500 font-semibold">SP</th>
                    <th className="px-5 py-3 text-right text-xs text-gray-500 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sections.map(s => {
                    const count = groups.find(g => g.id === s.group_id)?.sections.find(sec => sec.id === s.id)?.products.length ?? 0;
                    return (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-white text-[10px] font-semibold ${groupColors[s.group_slug] || 'bg-gray-600'}`}>
                            {s.group_name}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                        <td className="px-5 py-3 font-mono text-xs text-gray-400">{s.slug}</td>
                        <td className="px-5 py-3 text-center text-gray-500">{s.sort_order}</td>
                        <td className="px-5 py-3 text-center">
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">{count}</span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setModal({ type: 'section', data: s })}
                              className="text-gray-400 hover:text-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                              </svg>
                            </button>
                            <button onClick={() => setDeleteConfirm({ type: 'section', id: s.id, name: s.name })}
                              className="text-gray-400 hover:text-red-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── CONTACTS TAB ── */}
          {tab === 'contacts' && (
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
                  <svg className="w-10 h-10 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                  <p className="text-sm">Chưa có liên hệ nào</p>
                </div>
              ) : contacts.map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-start gap-4 shadow-sm">
                  <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-sm flex-shrink-0 uppercase">
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-gray-800 text-sm">{c.name}</span>
                      <a href={`tel:${c.phone}`} className="text-red-700 text-sm font-medium hover:underline">{c.phone}</a>
                      {c.email && <a href={`mailto:${c.email}`} className="text-gray-400 text-xs hover:text-gray-600">{c.email}</a>}
                      <span className="text-gray-300 text-xs ml-auto">
                        {new Date(c.created_at).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    {c.message && <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{c.message}</p>}
                  </div>
                  <button onClick={() => setDeleteConfirm({ type: 'contact', id: c.id, name: c.name })}
                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Modals ── */}
      {modal?.type === 'product' && (
        <ProductModal
          product={modal.data}
          sections={sections}
          onSave={() => { setModal(null); loadAll(); }}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.type === 'section' && (
        <SectionModal
          section={modal.data}
          groups={groups}
          onSave={() => { setModal(null); loadAll(); }}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Delete confirm ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
            <p className="text-gray-500 text-sm mb-6">
              Xóa <span className="font-semibold text-gray-700">"{deleteConfirm.name}"</span>?
              <br />Thao tác này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50">
                Hủy
              </button>
              <button onClick={async () => {
                if (deleteConfirm.type === 'product') await deleteProduct(deleteConfirm.id);
                if (deleteConfirm.type === 'section') await deleteSection(deleteConfirm.id);
                if (deleteConfirm.type === 'contact') await deleteContact(deleteConfirm.id);
                setDeleteConfirm(null);
              }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
