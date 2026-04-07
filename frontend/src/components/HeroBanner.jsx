const NEWS = [
  {
    id: 1,
    title: 'THÔNG BÁO LỊCH NGHỈ TẾT NGUYÊN ĐÁN – BÍNH NGỌ 2026',
    date: '03/02/2026',
    img: 'https://picsum.photos/seed/news1/200/200',
  },
  {
    id: 2,
    title: 'Hướng Dẫn Cách Khai Ấm Tử Sa Đúng Chuẩn, Chi Tiết',
    date: '29/02/2024',
    img: 'https://picsum.photos/seed/news2/200/200',
  },
  {
    id: 3,
    title: 'Tổng Hợp Các Loại Dáng Ấm Tử Sa Trung Quốc Hiện Nay',
    date: '14/05/2024',
    img: 'https://picsum.photos/seed/news3/200/200',
  },
  {
    id: 4,
    title: 'Giải mã câu nói "Nhất thủy, nhì trà, tam pha, tứ ấm"',
    date: '05/10/2024',
    img: 'https://picsum.photos/seed/news4/200/200',
  },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
      </svg>
    ),
    title: 'Vận chuyển miễn phí',
    desc: 'Miễn phí vận chuyển toàn quốc cho các đơn hàng trên 300K',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6v2m0 8v2M8 12h2m4 0h2M9.172 9.172l1.414 1.414m2.828 2.828l1.414 1.414M9.172 14.828l1.414-1.414m2.828-2.828l1.414-1.414"/>
      </svg>
    ),
    title: 'Cam kết chất lượng',
    desc: 'Hoàn 100% tiền nếu khách hàng không hài lòng về sản phẩm',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
      </svg>
    ),
    title: 'Quan điểm kinh doanh',
    desc: 'Khách hàng là người quyết định sự phát triển của chúng tôi',
  },
];

export default function HeroBanner() {
  return (
    <>
      {/* Hero: image left + news right */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex gap-4 items-stretch">

            {/* Left: hero image */}
            <div className="flex-1 min-w-0 rounded-lg overflow-hidden bg-black" style={{ maxHeight: 460 }}>
              <img
                src="https://picsum.photos/seed/hero_tea_main/960/600"
                alt="Bộ trà đạo cao cấp"
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://picsum.photos/seed/teapot/960/600'; }}
              />
            </div>

            {/* Right: news list */}
            <div className="w-72 xl:w-80 flex-shrink-0 flex flex-col gap-0 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hidden md:flex">
              {NEWS.map((item, i) => (
                <a
                  key={item.id}
                  href="#blog"
                  className={`flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors group ${i < NEWS.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = `https://picsum.photos/seed/n${item.id}/200/200`; }}
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-red-700 transition-colors leading-snug line-clamp-3">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1.5">{item.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-[#7B4723]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-5">
                <div className="text-white flex-shrink-0 opacity-90">{f.icon}</div>
                <div>
                  <div className="text-white font-bold text-sm">{f.title}</div>
                  <div className="text-white/70 text-xs mt-0.5 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
