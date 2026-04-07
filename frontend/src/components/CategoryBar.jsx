// SVG icons for tea categories
const icons = {
  'am-tra': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h12c1.1 0 2-.9 2-2V8H3v8c0 1.1.9 2 2 2zm-2 0h16M17 8s2-1 2-3.5S17 1 17 1"/>
      <path strokeLinecap="round" d="M7 8V6a2 2 0 012-2h2a2 2 0 012 2v2"/>
    </svg>
  ),
  'bo-tra': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 1v3M10 1v3M14 1v3"/>
    </svg>
  ),
  'chen-tra': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16l-1.5 9A2 2 0 0116.5 17h-9A2 2 0 015.5 15L4 6z"/>
      <path strokeLinecap="round" d="M2 21h20M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2"/>
    </svg>
  ),
  'khay-tra': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="13" rx="2"/>
      <path strokeLinecap="round" d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/>
      <path strokeLinecap="round" d="M8 21v1M16 21v1"/>
    </svg>
  ),
  'dung-cu': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  'hu-tra': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8l1 4H7L8 3zM7 7v12a1 1 0 001 1h8a1 1 0 001-1V7"/>
      <path strokeLinecap="round" d="M10 3V2M14 3V2"/>
    </svg>
  ),
  'phu-kien': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z"/>
    </svg>
  ),
  'trang-tri': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
  ),
};

const categoryItems = [
  { name: 'Ấm Trà', slug: 'am-tra' },
  { name: 'Bộ Trà', slug: 'bo-tra' },
  { name: 'Chén Trà', slug: 'chen-tra' },
  { name: 'Khay Trà', slug: 'khay-tra' },
  { name: 'Dụng Cụ', slug: 'dung-cu' },
  { name: 'Hủ Trà', slug: 'hu-tra' },
  { name: 'Phụ Kiện', slug: 'phu-kien' },
  { name: 'Trang Trí', slug: 'trang-tri' },
];

export default function CategoryBar() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar py-3 gap-2 justify-between">
          {categoryItems.map(cat => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors group flex-shrink-0 min-w-[72px]"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-100 group-hover:border-primary group-hover:bg-red-100 flex items-center justify-center text-red-700 group-hover:text-primary transition-all">
                {icons[cat.slug]}
              </div>
              <span className="text-xs font-medium text-gray-600 group-hover:text-primary whitespace-nowrap transition-colors text-center">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
