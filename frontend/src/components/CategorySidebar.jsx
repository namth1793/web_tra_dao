const CATEGORIES = [
  { label: 'Ấm tử sa Nghi Hưng',  href: '#am-phu-tra',       icon: '🫖' },
  { label: 'Khay trà, thuyền trà', href: '#bo-bo-tra',         icon: '🪵' },
  { label: 'Chén uống trà',        href: '#chen-tra-tang-tra', icon: '🥤' },
  { label: 'Bộ ấm trà',            href: '#am-tra',            icon: '☕' },
  { label: 'Dụng cụ pha trà',      href: '#dung-cu-pha-tra',   icon: '🔧' },
  { label: 'Hũ đựng trà',          href: '#hu-dung-tra',       icon: '🏺' },
  { label: 'Trang trí bàn trà',    href: '#tranh-tho-tra',     icon: '🎨' },
];

export default function CategorySidebar() {
  return (
    <aside className="w-52 xl:w-56 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
        {/* Header */}
        <div className="bg-[#7B4723] px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <span className="text-white text-sm font-bold tracking-wide">DANH MỤC</span>
        </div>

        {/* Links */}
        <ul>
          {CATEGORIES.map((cat, i) => (
            <li key={i} className={i < CATEGORIES.length - 1 ? 'border-b border-gray-100' : ''}>
              <a
                href={cat.href}
                className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:text-red-700 hover:bg-red-50 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                </svg>
                <span className="leading-snug">{cat.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Contact box */}
        <div className="bg-amber-50 border-t border-amber-100 px-4 py-3.5">
          <p className="text-xs font-semibold text-amber-800 mb-1">Cần tư vấn?</p>
          <a href="tel:0988043899" className="flex items-center gap-1.5 text-sm font-bold text-red-700 hover:text-red-800 mb-0.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            0988.043.899
          </a>
          <a href="tel:0889018999" className="flex items-center gap-1.5 text-sm font-bold text-red-700 hover:text-red-800">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            0889.018.999
          </a>
        </div>
      </div>
    </aside>
  );
}
