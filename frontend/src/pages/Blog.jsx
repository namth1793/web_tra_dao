import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const fmt = n => n?.toLocaleString('vi-VN') + 'đ';

function fmtDate(dt) {
  const d = new Date(dt);
  return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
}

const CATS = ['Tất cả', 'Kiến thức trà đạo', 'Dáng ấm trà', 'Tư vấn mua hàng'];

export default function Blog() {
  const [posts, setPosts]   = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('Tất cả');

  useEffect(() => {
    Promise.all([
      axios.get('/api/blog'),
      axios.get('/api/products/latest?limit=8'),
    ]).then(([bRes, pRes]) => {
      setPosts(bRes.data);
      setLatest(pRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = activeCat === 'Tất cả' ? posts : posts.filter(p => p.category === activeCat);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page hero */}
      <div className="bg-[#5C3317] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
            <Link to="/" className="hover:text-white transition-colors">TRANG CHỦ</Link>
            <span>/</span>
            <span className="text-white">BÀI VIẾT</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">Bài Viết & Kiến Thức Trà Đạo</h1>
          <p className="text-white/60 text-sm mt-1">Chia sẻ kiến thức, kinh nghiệm về ấm Tử Sa và văn hóa trà đạo</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-6">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Category filter */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              {CATS.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    activeCat === c
                      ? 'bg-[#C0392B] text-white border-[#C0392B]'
                      : 'bg-white text-text-body border-border-warm hover:border-[#C0392B] hover:text-[#C0392B]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden border border-border-warm animate-pulse">
                    <div className="h-44 bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-text-muted py-12">Không có bài viết nào.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/bai-viet/${post.slug}`}
                    className={`bg-white rounded-xl overflow-hidden border border-border-warm shadow-card hover:shadow-card-h hover:-translate-y-0.5 transition-all group ${i === 0 && filtered.length > 2 ? 'md:col-span-2' : ''}`}
                  >
                    <div className={`relative overflow-hidden ${i === 0 && filtered.length > 2 ? 'h-56' : 'h-44'}`}>
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = `https://picsum.photos/seed/blog${post.id}/800/400`; }}
                      />
                      <span className="absolute top-3 left-3 bg-[#C0392B] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] text-text-muted mb-1.5 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"/>
                        </svg>
                        {fmtDate(post.created_at)}
                      </p>
                      <h2 className="font-bold text-text-dark group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug mb-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-xs text-[#C0392B] font-medium group-hover:gap-2 transition-all">
                        Đọc thêm
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="w-[240px] flex-shrink-0 space-y-4">
            {/* Latest products */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="bg-[#C0392B] px-4 py-2.5">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Sản Phẩm Mới</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {latest.map(p => (
                  <Link
                    key={p.id}
                    to={`/san-pham/${p.id}`}
                    className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 transition-colors group"
                  >
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0 border border-border-warm"
                      onError={e => { e.target.src = `https://picsum.photos/seed/sb${p.id}/60/60`; }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-body group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug mb-0.5">{p.name}</p>
                      <p className="text-xs font-bold text-[#C0392B]">{fmt(p.price)}</p>
                      {p.original_price > p.price && (
                        <p className="text-[10px] text-text-muted line-through">{fmt(p.original_price)}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent posts */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="bg-[#5C3317] px-4 py-2.5">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Bài Viết Mới Nhất</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {posts.slice(0, 4).map(p => (
                  <Link
                    key={p.id}
                    to={`/bai-viet/${p.slug}`}
                    className="flex items-start gap-2.5 p-2.5 hover:bg-gray-50 transition-colors group"
                  >
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-12 h-10 object-cover rounded-lg flex-shrink-0 border border-border-warm"
                      onError={e => { e.target.src = `https://picsum.photos/seed/rp${p.id}/60/50`; }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-body group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug">{p.title}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{fmtDate(p.created_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="bg-[#5C3317] px-4 py-2.5">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Danh Mục</h3>
              </div>
              <div className="p-3 space-y-1">
                {CATS.filter(c => c !== 'Tất cả').map(c => {
                  const cnt = posts.filter(p => p.category === c).length;
                  return (
                    <button
                      key={c}
                      onClick={() => setActiveCat(c)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCat === c ? 'bg-[#C0392B]/10 text-[#C0392B] font-medium' : 'text-text-body hover:bg-gray-50'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="bg-gray-100 text-text-muted text-xs px-2 py-0.5 rounded-full">{cnt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
