import { useRef } from 'react';

const CATS = [
  { name: 'ẤM TRÀ',            sub: null,           img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=240&h=240&fit=crop&auto=format&q=80', href: '#am-tu-sa' },
  { name: 'BỘ ẤM TRÀ\nTỬ SA', sub: null,           img: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=240&h=240&fit=crop&auto=format&q=80', href: '#bo-am-tra' },
  { name: 'CHÉN TRÀ',           sub: null,           img: 'https://images.unsplash.com/photo-1544027949-6b6010f1ddec?w=240&h=240&fit=crop&auto=format&q=80', href: '#chen-uong-tra' },
  { name: 'CỐC UỐNG TRÀ',      sub: null,           img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&h=240&fit=crop&auto=format&q=80', href: '#coc-uong-tra' },
  { name: 'KHAY TRÀ',           sub: null,           img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=240&h=240&fit=crop&auto=format&q=80', href: '#khay-tra' },
  { name: 'HŨ ĐỰNG TRÀ',       sub: null,           img: 'https://images.unsplash.com/photo-1556045011-7efac3bc44ec?w=240&h=240&fit=crop&auto=format&q=80', href: '#hu-dung-tra' },
  { name: 'TRANG TRÍ\nBÀN TRÀ',sub: null,           img: 'https://images.unsplash.com/photo-1548340748-6be3f0a10d5c?w=240&h=240&fit=crop&auto=format&q=80', href: '#trang-tri-ban-tra' },
  { name: 'DỤNG CỤ\nPHA TRÀ',  sub: null,           img: 'https://images.unsplash.com/photo-1504545102780-26b9453aa4b4?w=240&h=240&fit=crop&auto=format&q=80', href: '#dung-cu-pha-tra' },
];

export default function CategorySection() {
  const scrollRef = useRef(null);

  function scroll(dir) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  }

  return (
    <section className="bg-[#f0f0f0] py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#7B2D2D]">
            Thế giới trà đạo – Nâng tầm trải nghiệm thưởng trà
          </h2>
          <p className="text-gray-500 text-sm mt-1.5">
            Hàng trăm sản phẩm ấm trà tử sa, trà cụ... chất lượng. Mua sắm ngay !
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-700 hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto no-scrollbar pb-1 scroll-smooth"
          >
            {CATS.map((cat, i) => (
              <a
                key={i}
                href={cat.href}
                className="flex-shrink-0 flex flex-col items-center group"
                style={{ width: 130 }}
              >
                {/* White card with image */}
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow p-3 flex items-center justify-center"
                  style={{ height: 120 }}>
                  <img
                    src={cat.img}
                    alt={cat.name.replace('\n', ' ')}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=240&h=240&fit=crop'; }}
                    loading="lazy"
                  />
                </div>
                {/* Label */}
                <p className="mt-2.5 text-center text-[11px] font-bold text-gray-700 group-hover:text-red-700 transition-colors uppercase leading-snug tracking-wide whitespace-pre-line">
                  {cat.name}
                </p>
              </a>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-700 hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
