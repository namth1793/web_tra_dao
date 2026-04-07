import { useRef } from 'react';

const U = (id, w = 240) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=80`;

const GROUPS = [
  {
    label: 'Ấm Tử Sa Cao Cấp',
    color: 'text-red-700',
    items: [
      { name: 'THẠCH BIỀU',       href: '#thach-bieu',    img: U('1544787219-7f47ccb76574') },
      { name: 'TÂY THI',          href: '#tay-thi',       img: U('1571934811356-5cc061b6821f') },
      { name: 'THỦY BÌNH',        href: '#thuy-binh',     img: U('1556742400-b5b7b99e7a0f') },
      { name: 'TIẾU ANH',         href: '#tieu-anh',      img: U('1603031823718-6d3eb2c60413') },
      { name: 'BÁO XUÂN',         href: '#bao-xuan',      img: U('1564890369478-c89ca6d9cde9') },
      { name: 'PHỎNG CỔ',         href: '#phong-co',      img: U('1576092762791-5985bd2b0c30') },
      { name: 'TỨ PHƯƠNG',        href: '#tu-phuong',     img: U('1594631252845-29fc4cc8cdd8') },
    ],
  },
  {
    label: 'Bộ Ấm Trà & Phụ Kiện',
    color: 'text-amber-800',
    items: [
      { name: 'BỘ ẤM TRÀ\nQUÀ TẶNG',  href: '#bo-am-qua-tang',  img: U('1563822249366-3efb23b8e0c9') },
      { name: 'BỘ ẤM TRÀ\nDU LỊCH',   href: '#bo-am-du-lich',   img: U('1510707577719-ae7c14805e3a') },
      { name: 'CHÉN UỐNG TRÀ',         href: '#chen-uong-tra',   img: U('1544027949-6b6010f1ddec') },
      { name: 'KHAY TRÀ',              href: '#khay-tra',        img: U('1509042239860-f519ffa06b78') },
      { name: 'BỘ CHÉN KHẢI',          href: '#bo-chen-khai',    img: U('1556742049-0cfed4f6a45d') },
      { name: 'CHÉN THIÊN MỤC',        href: '#chen-thien-muc',  img: U('1549619856-f6f6bce9e36e') },
      { name: 'PHỤ KIỆN\nTRÀ ĐẠO',    href: '#phu-kien-tra',    img: U('1597318181409-cf64d0b5d8a2') },
      { name: 'TRANG TRÍ\nBÀN TRÀ',   href: '#trang-tri-ban-tra', img: U('1548340748-6be3f0a10d5c') },
    ],
  },
  {
    label: 'Dụng Cụ Chuyên Nghiệp',
    color: 'text-green-800',
    items: [
      { name: 'DỤNG CỤ\nPHA TRÀ',     href: '#dung-cu-pha-tra', img: U('1504545102780-26b9453aa4b4') },
      { name: 'HŨ ĐỰNG TRÀ',          href: '#hu-dung-tra',     img: U('1556045011-7efac3bc44ec') },
      { name: 'TỐNG TRÀ',             href: '#tong-tra',         img: U('1558618666-fcd25c85cd64') },
      { name: 'BẾP ĐUN NƯỚC\nPHA TRÀ',href: '#bep-dun-nuoc',   img: U('1611073615830-c9addb78ea89') },
      { name: 'CUNG NHÃN TRÀ',        href: '#cung-nhan-tra',   img: U('1540189084-0d1e37a76384') },
      { name: 'MIẾNG LÓT\nCHÉN TRÀ',  href: '#mieng-lot-chen',  img: U('1606222026551-5e16c07a28d7') },
      { name: 'CỐC UỐNG TRÀ',         href: '#coc-uong-tra',    img: U('1576092762791-5985bd2b0c30') },
      { name: 'THUYỀN TRÀ',           href: '#thuyen-tra',      img: U('1548340748-6be3f0a10d5c') },
    ],
  },
];

export default function CategorySection() {
  const scrollRef = useRef(null);

  function scroll(dir) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
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
            Hàng trăm sản phẩm ấm trà tử sa, trà cụ... chất lượng. Mua sắm ngay!
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
            className="flex gap-4 overflow-x-auto no-scrollbar pb-1 scroll-smooth"
          >
            {GROUPS.map((group, gi) => (
              <div key={gi} className="flex-shrink-0 flex flex-col">
                {/* Group label */}
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-1 ${group.color}`}>
                  {group.label}
                </p>
                {/* Items row */}
                <div className="flex gap-3">
                  {group.items.map((cat, i) => (
                    <a
                      key={i}
                      href={cat.href}
                      className="flex-shrink-0 flex flex-col items-center group"
                      style={{ width: 110 }}
                    >
                      <div
                        className="w-full bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow p-2.5 flex items-center justify-center"
                        style={{ height: 110 }}
                      >
                        <img
                          src={cat.img}
                          alt={cat.name.replace('\n', ' ')}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=240&h=240&fit=crop'; }}
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-2 text-center text-[10px] font-bold text-gray-700 group-hover:text-red-700 transition-colors uppercase leading-snug tracking-wide whitespace-pre-line">
                        {cat.name}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
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
