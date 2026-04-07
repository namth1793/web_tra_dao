import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const fmt = n => n?.toLocaleString('vi-VN') + 'đ';

function fmtDate(dt) {
  const d = new Date(dt);
  return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
}

// Render markdown-lite: **bold**, ## heading, \n\n paragraphs
function RichText({ content }) {
  if (!content) return null;
  const blocks = content.split('\n\n');
  return (
    <div className="space-y-4 text-[15px] text-text-body leading-relaxed">
      {blocks.map((block, i) => {
        if (block.startsWith('**') && block.endsWith('**')) {
          return <h3 key={i} className="font-bold text-text-dark text-base mt-6 mb-2">{block.replace(/\*\*/g, '')}</h3>;
        }
        // Inline bold
        const parts = block.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="font-semibold text-text-dark">{part.replace(/\*\*/g, '')}</strong>
                : part
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost]     = useState(null);
  const [latest, setLatest] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`/api/blog/${slug}`),
      axios.get('/api/products/latest?limit=8'),
      axios.get('/api/blog'),
    ]).then(([pRes, lRes, aRes]) => {
      setPost(pRes.data);
      setLatest(lRes.data);
      setAllPosts(aRes.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="w-8 h-8 border-2 border-[#C0392B] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!post) return null;

  const related = allPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero */}
      <div className="bg-[#5C3317] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-2">
            <Link to="/" className="hover:text-white">TRANG CHỦ</Link>
            <span>/</span>
            <Link to="/bai-viet" className="hover:text-white">BÀI VIẾT</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>
          <span className="inline-block bg-[#C0392B] text-white text-xs px-2.5 py-0.5 rounded-full mb-2">{post.category}</span>
          <h1 className="text-xl md:text-2xl font-bold text-white leading-snug max-w-3xl">{post.title}</h1>
          <p className="text-white/50 text-xs mt-2">{fmtDate(post.created_at)} • Thế Giới Trà Đạo</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-6">

          {/* ── Article body ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden mb-5">
              {/* Cover image */}
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 object-cover"
                onError={e => { e.target.src = `https://picsum.photos/seed/bd${post.id}/800/400`; }}
              />
              <div className="p-6 md:p-8">
                {/* Excerpt */}
                <p className="text-base text-text-muted italic border-l-4 border-[#C0392B] pl-4 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                {/* Content */}
                <RichText content={post.content} />
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden mb-5">
                <div className="bg-[#5C3317] px-5 py-3">
                  <h2 className="text-white font-bold text-sm uppercase">Bài Viết Liên Quan</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                  {related.map(p => (
                    <Link key={p.id} to={`/bai-viet/${p.slug}`} className="group">
                      <div className="h-36 rounded-xl overflow-hidden mb-2">
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                          onError={e => { e.target.src = `https://picsum.photos/seed/rr${p.id}/400/200`; }} />
                      </div>
                      <p className="text-sm font-medium text-text-dark group-hover:text-[#C0392B] transition-colors line-clamp-2">{p.title}</p>
                      <p className="text-xs text-text-muted mt-1">{fmtDate(p.created_at)}</p>
                    </Link>
                  ))}
                </div>
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
                      onError={e => { e.target.src = `https://picsum.photos/seed/sb2${p.id}/60/60`; }}
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

            {/* All posts */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="bg-[#5C3317] px-4 py-2.5">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Tất Cả Bài Viết</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {allPosts.map(p => (
                  <Link
                    key={p.id}
                    to={`/bai-viet/${p.slug}`}
                    className={`flex items-start gap-2.5 p-2.5 transition-colors group ${p.slug === slug ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-12 h-10 object-cover rounded-lg flex-shrink-0 border border-border-warm"
                      onError={e => { e.target.src = `https://picsum.photos/seed/ap${p.id}/60/50`; }}
                    />
                    <div className="min-w-0">
                      <p className={`text-[11px] line-clamp-2 leading-snug ${p.slug === slug ? 'text-[#C0392B] font-semibold' : 'text-text-body group-hover:text-[#C0392B] transition-colors'}`}>
                        {p.title}
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5">{fmtDate(p.created_at)}</p>
                    </div>
                  </Link>
                ))}
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
