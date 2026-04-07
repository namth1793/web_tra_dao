import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PRODUCT_CATS = [
  'Ấm tử sa Nghi Hưng',
  'Khay trà, thuyền trà',
  'Chén uống trà',
  'Bộ ấm trà',
  'Dụng cụ pha trà',
  'Hũ đựng trà',
  'Trang trí bàn trà',
];

const QUICK_LINKS = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Cửa hàng', to: '/#products' },
  { label: 'Bài viết & Kiến thức', to: '/bai-viet' },
  { label: 'Về chúng tôi', to: '/gioi-thieu' },
  { label: 'Liên hệ', to: '/lien-he' },
];

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);
  function submit(e) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
  }
  return done ? (
    <p className="text-green-400 text-sm py-1">Cảm ơn bạn đã đăng ký!</p>
  ) : (
    <form onSubmit={submit} className="flex gap-2 mt-3">
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Nhập email của bạn" required
        className="flex-1 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-amber-400/50"
      />
      <button type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-3 py-2 rounded-lg whitespace-nowrap">
        Đăng ký
      </button>
    </form>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [sent, setSent] = useState(false);
  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post('/api/contacts', form);
      setSent(true);
      setForm({ name: '', phone: '' });
    } catch {}
  }
  if (sent) return <p className="text-green-400 text-sm mt-3">Cảm ơn! Chúng tôi sẽ liên hệ sớm.</p>;
  return (
    <form onSubmit={submit} className="space-y-2 mt-3">
      <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Họ tên" required
        className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-amber-400/50"/>
      <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        placeholder="Số điện thoại" required
        className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-amber-400/50"/>
      <button type="submit"
        className="w-full bg-[#7B4723] hover:bg-[#6A3C1C] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors">
        Gửi yêu cầu tư vấn
      </button>
    </form>
  );
}

function FooterLink({ href = '#', to, children }) {
  const cls = "flex items-start gap-2 text-xs text-white/60 hover:text-amber-400 transition-colors py-0.5";
  const icon = (
    <svg className="w-3 h-3 text-amber-700/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
    </svg>
  );
  return (
    <li>
      {to ? (
        <Link to={to} className={cls}>{icon}{children}</Link>
      ) : (
        <a href={href} className={cls}>{icon}{children}</a>
      )}
    </li>
  );
}

function ColTitle({ children }) {
  return (
    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2.5 border-b border-white/10">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1A0F05] text-white/70 mt-0">

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-[#7B4723] via-amber-600 to-[#7B4723]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Company info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-red-700 flex items-center justify-center bg-red-900/30">
                <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                  <path d="M8 24h12l-1 1.5a1.5 1.5 0 01-1.2.5H10.2a1.5 1.5 0 01-1.2-.5L8 24z" fill="#e87c3e"/>
                  <path d="M9 17h12l-1 7H10l-1-7z" fill="#e87c3e" opacity=".8"/>
                  <path d="M21 19s3 0 3 2.5S21 24 21 24" stroke="#e87c3e" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-base leading-tight">THEGIOITRADAO</div>
                <div className="text-xs text-white/40 tracking-wider">.COM</div>
              </div>
            </div>

            <p className="text-xs text-white/55 leading-relaxed mb-4">
              Công ty TNHH Thế Giới Trà Đạo chuyên phân phối ấm Tử Sa Nghi Hưng nguyên khoáng và trà cụ cao cấp.
              Cam kết giao hàng tận nơi, đồng kiểm trước khi thanh toán và hỗ trợ đổi trả miễn phí.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { label: 'Facebook', bg: '#1877f2', svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { label: 'YouTube',  bg: '#ff0000', svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                { label: 'TikTok',  bg: '#000',    svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
                { label: 'Zalo',    bg: '#0068ff', svg: <span className="text-white text-xs font-extrabold">Z</span> },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
                  style={{ background: s.bg }}>
                  {s.svg}
                </a>
              ))}
            </div>

            <Newsletter />
          </div>

          {/* Col 2: Product categories */}
          <div>
            <ColTitle>Danh Mục Sản Phẩm</ColTitle>
            <ul className="space-y-1">
              {PRODUCT_CATS.map(c => <FooterLink key={c}>{c}</FooterLink>)}
            </ul>
          </div>

          {/* Col 3: Quick links */}
          <div>
            <ColTitle>Trang Nhanh</ColTitle>
            <ul className="space-y-1">
              {QUICK_LINKS.map(l => <FooterLink key={l.label} to={l.to}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <ColTitle>Thông Tin Liên Hệ</ColTitle>

            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-white font-semibold text-sm">CÔNG TY TNHH THẾ GIỚI TRÀ ĐẠO</p>
                <p className="text-white/50 mt-0.5">Mã số thuế: 0801488117</p>
              </div>

              <div className="flex items-start gap-2 text-white/60">
                <svg className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Số 5 ngõ 50 Lê Hiến Phủ, Phường Tứ Minh, TP Hải Phòng</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
                <a href="mailto:lienhe@thegioitradao.com" className="text-white/60 hover:text-amber-400 transition-colors">
                  lienhe@thegioitradao.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <a href="tel:0988043899" className="text-white/70 hover:text-amber-400 transition-colors font-medium">0988.043.899</a>
                  <span className="text-white/30 mx-1">–</span>
                  <a href="tel:0889018999" className="text-white/70 hover:text-amber-400 transition-colors font-medium">0889.018.999</a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-white/60">08:00 – 21:00, Thứ Hai – Chủ Nhật</span>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            © 2024 Công ty TNHH Thế Giới Trà Đạo – thegioitradao.com
          </p>
          <div className="flex gap-4 text-xs text-white/30 items-center">
            <Link to="/gioi-thieu" className="hover:text-white/60 transition-colors">Về chúng tôi</Link>
            <Link to="/lien-he" className="hover:text-white/60 transition-colors">Liên hệ</Link>
            <Link to="/admin/login" className="text-[#1A0F05] hover:text-white/20 transition-colors" aria-label="Admin">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C8.676 1 6 3.676 6 7v1H4a1 1 0 00-1 1v13a1 1 0 001 1h16a1 1 0 001-1V9a1 1 0 00-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 9a2 2 0 110 4 2 2 0 010-4z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
