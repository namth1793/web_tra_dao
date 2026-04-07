import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const FAQ_ITEMS = [
  'Phương thức thanh toán và nhận hàng?',
  'Quy trình khi đặt hàng xong tại website?',
  'Thời gian giao hàng mất bao lâu?',
  'Phí giao gửi hàng khi đặt hàng tại website thegioitradao.com',
  'Khi để lại thông tin mua hàng, liệu thông tin cá nhân của tôi có được bảo vệ không?',
  'Ở nước ngoài có đặt mua sản phẩm được không?',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    try {
      await axios.post('/api/contacts', form);
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {}
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero */}
      <div className="bg-[#5C3317] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
            <Link to="/" className="hover:text-white">TRANG CHỦ</Link>
            <span>/</span>
            <span className="text-white">LIÊN HỆ</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-white/60 text-sm mt-1">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">

          {/* ── Left: Contact info ── */}
          <div className="space-y-5">
            {/* Company info */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full border-2 border-red-700 flex items-center justify-center bg-red-900/10 flex-shrink-0">
                  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                    <path d="M8 24h12l-1 1.5a1.5 1.5 0 01-1.2.5H10.2a1.5 1.5 0 01-1.2-.5L8 24z" fill="#C0392B"/>
                    <path d="M9 17h12l-1 7H10l-1-7z" fill="#C0392B" opacity=".8"/>
                    <path d="M21 19s3 0 3 2.5S21 24 21 24" stroke="#C0392B" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-text-dark text-base">THÔNG TIN</h2>
                  <p className="text-sm font-semibold text-[#C0392B]">CÔNG TY TNHH THẾ GIỚI TRÀ ĐẠO</p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-warm">
                    <svg className="w-4 h-4 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Mã số thuế</p>
                    <p className="font-medium text-text-dark">0801488117</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-warm">
                    <svg className="w-4 h-4 text-[#C0392B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Địa chỉ</p>
                    <p className="font-medium text-text-dark">Số 5 ngõ 50 Lê Hiến Phủ, Phường Tứ Minh, Thành Phố Hải Phòng</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-warm">
                    <svg className="w-4 h-4 text-[#C0392B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Điện thoại / Zalo</p>
                    <div className="flex gap-3">
                      <a href="tel:0889018999" className="font-semibold text-[#C0392B] hover:underline">0889.018.999</a>
                      <span className="text-text-muted">–</span>
                      <a href="tel:0988043899" className="font-semibold text-[#C0392B] hover:underline">0988.043.899</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-warm">
                    <svg className="w-4 h-4 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <a href="mailto:lienhe@thegioitradao.com" className="font-medium text-[#C0392B] hover:underline">lienhe@thegioitradao.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-warm">
                    <svg className="w-4 h-4 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Website</p>
                    <span className="font-medium text-text-dark">thegioitradao.com</span>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3 pt-2">
                  <a href="https://www.facebook.com/thegioitradaocom" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-[#1877f2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/thegioitradao" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://zalo.me/0988043899" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm hover:opacity-80 transition-opacity"
                    style={{ background: '#0068ff' }}>Z</a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card p-6">
              <h2 className="font-bold text-text-dark mb-1">Một số câu hỏi thường gặp</h2>
              <p className="text-xs text-text-muted mb-4">Vui lòng đọc danh sách câu hỏi thường gặp trước khi gửi tin nhắn cho chúng tôi.</p>
              <div className="space-y-2">
                {FAQ_ITEMS.map((q, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg hover:bg-red-50/40 transition-colors cursor-pointer group">
                    <div className="w-5 h-5 bg-[#C0392B]/10 text-[#C0392B] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-[#C0392B] group-hover:text-white transition-colors">
                      ?
                    </div>
                    <p className="text-sm text-text-body group-hover:text-[#C0392B] transition-colors">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-border-warm shadow-card p-6">
              <h2 className="font-bold text-text-dark text-lg mb-1">Gửi Tin Nhắn</h2>
              <p className="text-sm text-text-muted mb-5">Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 30 phút.</p>

              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                  </div>
                  <p className="font-bold text-text-dark text-lg mb-2">Gửi thành công!</p>
                  <p className="text-text-muted text-sm">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Cảm ơn bạn đã tin tưởng Thế Giới Trà Đạo!</p>
                  <button onClick={() => setSent(false)} className="mt-5 text-sm text-[#C0392B] hover:underline font-medium">
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-text-muted font-medium mb-1">Họ và tên *</label>
                      <input
                        required
                        placeholder="Nguyễn Văn A"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full border border-border-warm rounded-lg px-3 py-2.5 text-sm text-text-dark placeholder-gray-400 outline-none focus:border-[#C0392B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted font-medium mb-1">Số điện thoại *</label>
                      <input
                        required
                        type="tel"
                        placeholder="0988 xxx xxx"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-border-warm rounded-lg px-3 py-2.5 text-sm text-text-dark placeholder-gray-400 outline-none focus:border-[#C0392B] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted font-medium mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border border-border-warm rounded-lg px-3 py-2.5 text-sm text-text-dark placeholder-gray-400 outline-none focus:border-[#C0392B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted font-medium mb-1">Nội dung tin nhắn *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Bạn cần tư vấn về sản phẩm nào? Hoặc có câu hỏi gì cho chúng tôi..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full border border-border-warm rounded-lg px-3 py-2.5 text-sm text-text-dark placeholder-gray-400 outline-none focus:border-[#C0392B] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C0392B] hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Đang gửi...</>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                        </svg>
                        Gửi Tin Nhắn
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map embed (Hải Phòng approximate) */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="bg-[#5C3317] px-4 py-2.5">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Bản Đồ</h3>
              </div>
              <iframe
                title="Thế Giới Trà Đạo – Hải Phòng"
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.65,20.82,106.75,20.88&layer=mapnik"
                className="w-full h-56 border-0"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
