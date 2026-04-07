const posts = [
  {
    id: 1,
    category: 'Văn Hóa Trà',
    title: 'Trà Đạo Nhật Bản – Nghệ Thuật Sống Tỉnh Thức',
    excerpt: 'Trà đạo (Chadō) không chỉ là cách pha trà, đó là triết lý sống của người Nhật: sự hài hòa, tôn trọng, thanh tịnh và an nhiên trong từng khoảnh khắc.',
    date: '15 tháng 3, 2024',
    readTime: '5 phút đọc',
    img: 'https://picsum.photos/seed/blog1/600/400',
  },
  {
    id: 2,
    category: 'Hướng Dẫn',
    title: 'Cách Chọn Ấm Tử Sa Thật – Giả Phân Biệt Như Thế Nào?',
    excerpt: 'Tử sa là một trong những loại ấm trà được yêu thích nhất. Bài viết này hướng dẫn bạn cách nhận biết tử sa chính hãng và tránh hàng giả trên thị trường.',
    date: '8 tháng 3, 2024',
    readTime: '7 phút đọc',
    img: 'https://picsum.photos/seed/blog2/600/400',
  },
  {
    id: 3,
    category: 'Kiến Thức',
    title: 'Bí Quyết Pha Trà Ô Long Đúng Chuẩn Để Ra Hương Vị Tốt Nhất',
    excerpt: 'Nhiệt độ nước, thời gian ngâm, tỉ lệ trà — mỗi yếu tố đều ảnh hưởng đến chất lượng tách trà. Khám phá bí quyết pha trà ô long hoàn hảo từ các trà nhân.',
    date: '1 tháng 3, 2024',
    readTime: '6 phút đọc',
    img: 'https://picsum.photos/seed/blog3/600/400',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-10 md:py-14 bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-1">Kiến Thức</p>
            <h2 className="text-xl md:text-2xl font-bold text-text-dark">Bài Viết Về Trà Đạo</h2>
          </div>
          <a href="#blog-all" className="hidden md:flex items-center gap-1 text-primary text-sm font-medium hover:text-primary-h">
            Xem tất cả
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map(post => (
            <article
              key={post.id}
              className="bg-card-bg rounded-xl overflow-hidden border border-border-warm shadow-card hover:shadow-card-h transition-shadow group cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden relative" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  onError={e => { e.target.src = 'https://picsum.photos/seed/blogfallback/600/400'; }}
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-primary/90 text-cream text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center gap-3 text-[11px] text-text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                    </svg>
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-text-dark leading-snug line-clamp-2 mb-2.5 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>

                <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                  Đọc tiếp
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
