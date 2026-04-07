import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Red circular logo mark matching thegioitradao style
function LogoMark() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {/* Circle badge */}
      <div className="w-12 h-12 rounded-full border-2 border-red-700 flex items-center justify-center bg-white flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
          {/* Outer decorative ring */}
          <circle cx="24" cy="24" r="22" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeDasharray="2 2"/>
          {/* Cup silhouette */}
          <path d="M14 30h16l-1.2 1.5a2 2 0 01-1.5.5H16.7a2 2 0 01-1.5-.5L14 30z" fill="#C0392B"/>
          <path d="M15 22h14l-1.2 8H16.2L15 22z" fill="#C0392B" opacity="0.85"/>
          {/* Handle */}
          <path d="M29 24s3.5 0 3.5 3-3.5 3-3.5 3" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          {/* Steam */}
          <path d="M20 19c0-.8.8-1.2.8-2s-.8-1.2-.8-2" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M24 19c0-.8.8-1.2.8-2s-.8-1.2-.8-2" stroke="#C0392B" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Brand text */}
      <div className="leading-none">
        <div className="text-red-700 font-bold text-xl tracking-tight leading-none">thegioitradao</div>
        <div className="text-red-400 text-xs font-medium tracking-widest">.com</div>
      </div>
    </div>
  );
}

const NAV = [
  { label: 'TRANG CHỦ',    to: '/' },
  { label: 'CỬA HÀNG',     to: '/#products',  dropdown: true },
  { label: 'BÀI VIẾT',     to: '/bai-viet' },
  { label: 'VỀ CHÚNG TÔI', to: '/gioi-thieu' },
  { label: 'LIÊN HỆ',      to: '/lien-he' },
];

export default function Header({ cartCount = 0, cartTotal = 0 }) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [shopOpen, setShopOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]         = useState('');
  const location = useLocation();

  const cartLabel = cartTotal > 0
    ? `Giỏ hàng / ${cartTotal.toLocaleString('vi-VN')}đ`
    : 'Giỏ hàng';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[68px] gap-4">

          {/* Logo */}
          <Link to="/"><LogoMark /></Link>

          {/* Search icon (desktop) */}
          <button
            onClick={() => setSearchOpen(s => !s)}
            className="hidden lg:flex text-gray-500 hover:text-red-700 transition-colors p-1"
            aria-label="Tìm kiếm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(link => {
              const isActive = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to.replace('/#products', ''));
              return (
              <div key={link.label} className="relative">
                {link.dropdown ? (
                  <button
                    onClick={() => setShopOpen(o => !o)}
                    className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 tracking-wide transition-colors ${isActive ? 'text-red-700' : 'text-gray-800 hover:text-red-700'}`}
                  >
                    {link.label}
                    <svg className={`w-3.5 h-3.5 transition-transform ${shopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={link.to}
                    className={`block text-sm font-semibold px-3 py-2 tracking-wide transition-colors ${isActive ? 'text-red-700' : 'text-gray-800 hover:text-red-700'}`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Mega dropdown */}
                {link.dropdown && shopOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 w-[620px]">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          title: 'Ấm Tử Sa Cao Cấp',
                          color: 'text-red-700',
                          items: ['Thạch Biều','Tây Thi','Thủy Bình','Tiếu Anh','Báo Xuân','Phỏng Cổ','Tứ Phương'],
                        },
                        {
                          title: 'Bộ Ấm Trà & Phụ Kiện',
                          color: 'text-amber-800',
                          items: ['Bộ ấm trà quà tặng','Bộ ấm trà du lịch','Chén uống trà','Khay trà','Bộ chén khải','Chén thiên mục','Phụ kiện trà đạo','Trang trí bàn trà'],
                        },
                        {
                          title: 'Dụng Cụ Chuyên Nghiệp',
                          color: 'text-green-800',
                          items: ['Dụng cụ pha trà','Hũ đựng trà','Tống trà','Bếp đun nước pha trà','Cung Nhãn Trà','Miếng lót chén trà','Cốc uống trà','Thuyền trà'],
                        },
                      ].map(col => (
                        <div key={col.title}>
                          <p className={`font-bold text-xs uppercase tracking-wide mb-2 pb-1 border-b border-gray-100 ${col.color}`}>{col.title}</p>
                          {col.items.map(item => (
                            <a key={item} href="#products" onClick={() => setShopOpen(false)}
                              className="block py-1 text-sm text-gray-600 hover:text-red-700 hover:pl-1 transition-all">
                              {item}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
            })}
          </nav>

          {/* Cart button */}
          <div className="flex items-center gap-2">
            <a
              href="#cart"
              className="hidden md:flex items-center gap-2 bg-[#7B3F1A] hover:bg-[#6A3516] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors relative"
            >
              <span className="whitespace-nowrap">{cartLabel}</span>
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </div>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 py-2.5">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm ấm tử sa, bộ trà, chén trà..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 pb-4 pt-2">
            {NAV.map(link => (
              <Link key={link.label} to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 px-1 text-sm font-semibold border-b border-gray-50 last:border-0 ${location.pathname === link.to ? 'text-red-700' : 'text-gray-800'}`}>
                {link.label}
              </Link>
            ))}
            <a href="#cart"
              className="mt-3 flex items-center justify-center gap-2 bg-[#7B3F1A] text-white text-sm font-semibold py-2.5 rounded-lg">
              {cartLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272"/>
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Click outside to close shop dropdown */}
      {shopOpen && <div className="fixed inset-0 z-40" onClick={() => setShopOpen(false)}/>}
    </header>
  );
}
