import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const IMAGES = [
  'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=900&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1556742400-b5b7b99e7a0f?w=900&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=900&h=500&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1576092762791-5985bd2b0c30?w=900&h=500&fit=crop&auto=format&q=80',
];

const STATS = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '5.000+', label: 'Khách hàng tin tưởng' },
  { value: '500+', label: 'Mẫu sản phẩm' },
  { value: '100%', label: 'Nguyên khoáng đảm bảo' },
];

const FAQ = [
  {
    q: 'Công ty có xuất hóa đơn đỏ (VAT) không?',
    a: 'Có. Công ty TNHH Thế Giới Trà Đạo xuất hóa đơn điện tử GTGT đầy đủ, hợp lệ cho khách hàng. Quý khách (đặc biệt là khách hàng doanh nghiệp mua làm quà tặng) chỉ cần cung cấp thông tin MST khi đặt hàng, hệ thống kế toán của chúng tôi sẽ xuất và gửi hóa đơn điện tử ngay sau khi đơn hàng hoàn tất.',
  },
  {
    q: 'Ấm Tử Sa tại Thế Giới Trà Đạo có đảm bảo là đất nguyên khoáng không?',
    a: 'Hoàn toàn đảm bảo. Chúng tôi chỉ phân phối ấm Tử Sa được làm từ đất nguyên khoáng thật, nói không với hàng pha trộn hóa chất tạo màu. Khách hàng am hiểu có thể tự do kiểm tra chất đất khi nhận hàng.',
  },
  {
    q: 'Tôi ở xa thì mua hàng và thanh toán như thế nào?',
    a: 'Chúng tôi hỗ trợ giao hàng toàn quốc (COD). Quý khách đặt hàng trên website thegioitradao.com, nhận hàng tại nhà, mở ra kiểm tra đúng sản phẩm, nguyên vẹn rồi mới thanh toán cho nhân viên giao hàng.',
  },
  {
    q: 'Nếu trong quá trình vận chuyển hàng bị nứt, vỡ thì sao?',
    a: 'Quý khách hoàn toàn yên tâm. Nếu phát hiện sản phẩm bị nứt, vỡ do vận chuyển khi đồng kiểm, quý khách chỉ cần từ chối nhận hàng. Thế Giới Trà Đạo sẽ chịu hoàn toàn trách nhiệm và gửi ngay một sản phẩm mới thay thế.',
  },
  {
    q: 'Tôi mới tìm hiểu về trà đạo, có được tư vấn không?',
    a: 'Chắc chắn rồi! Đừng ngần ngại liên hệ với hotline hoặc Zalo của chúng tôi. Thế Giới Trà Đạo luôn sẵn lòng chia sẻ kiến thức, giúp bạn chọn được chiếc ấm đầu tiên ưng ý và phù hợp với loại trà bạn đang uống.',
  },
];

function SectionTitle({ num, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-[#C0392B] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{num}</div>
      <h2 className="text-xl font-bold text-text-dark">{title}</h2>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="border border-border-warm rounded-xl overflow-hidden mb-3">
      <div className="flex items-start gap-3 p-4">
        <div className="w-6 h-6 bg-[#C0392B]/10 text-[#C0392B] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">Q</div>
        <div>
          <p className="font-semibold text-text-dark text-sm mb-2">{q}</p>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-green-50 text-green-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">A</div>
            <p className="text-sm text-text-body leading-relaxed">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero */}
      <div className="bg-[#5C3317] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
            <Link to="/" className="hover:text-white">TRANG CHỦ</Link>
            <span>/</span>
            <span className="text-white">VỀ CHÚNG TÔI</span>
          </nav>
          <h1 className="text-2xl font-bold text-white">Về Chúng Tôi</h1>
          <p className="text-white/60 text-sm mt-1">Công ty TNHH Thế Giới Trà Đạo – Điểm đến tin cậy của người yêu trà</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">

        {/* Stats bar */}
        <div className="bg-white rounded-xl border border-border-warm shadow-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-[#C0392B] mb-1">{s.value}</div>
                <div className="text-sm text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1 – Giới thiệu */}
        <div className="bg-white rounded-xl border border-border-warm shadow-card p-6 md:p-8">
          <SectionTitle num="1" title="Giới Thiệu Chung" />
          <div className="space-y-4 text-[15px] text-text-body leading-relaxed">
            <p>
              Thưởng trà từ lâu đã vượt qua ranh giới của một thói quen giải khát để trở thành một nghệ thuật tĩnh tâm, một nét đẹp văn hóa truyền thống sâu sắc. Để có một chén trà ngon, bên cạnh loại trà thượng hạng và nguồn nước thanh khiết, không thể thiếu sự góp mặt của những bộ ấm chén và trà cụ tinh xảo.
            </p>
            <p>
              Thấu hiểu và trân trọng những giá trị cốt lõi đó, <strong className="text-text-dark font-semibold">Công ty TNHH Thế Giới Trà Đạo</strong> ra đời. Chúng tôi tự hào là điểm đến tin cậy của những người yêu trà trên toàn quốc, chuyên cung cấp các dòng ấm Tử Sa Nghi Hưng chính hãng cùng hệ thống trà cụ cao cấp, giúp nâng tầm trải nghiệm thưởng trà của bạn.
            </p>
          </div>

          {/* Image */}
          <div className="mt-6 rounded-xl overflow-hidden">
            <img src={IMAGES[0]} alt="Thế Giới Trà Đạo" className="w-full h-64 md:h-80 object-cover" />
            <p className="text-xs text-center text-text-muted bg-gray-50 py-2 border-t border-border-warm">
              Thế Giới Trà Đạo là địa điểm tin cậy chuyên về ấm tử sa, được khách hàng tin tưởng và đặt mua
            </p>
          </div>
        </div>

        {/* Section 2 – Sứ mệnh */}
        <div className="bg-white rounded-xl border border-border-warm shadow-card p-6 md:p-8">
          <SectionTitle num="2" title="Sứ Mệnh và Tầm Nhìn" />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#C0392B]/5 border border-[#C0392B]/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <h3 className="font-bold text-text-dark">Tầm nhìn</h3>
              </div>
              <p className="text-sm text-text-body leading-relaxed">
                Trở thành thương hiệu uy tín hàng đầu tại Việt Nam trong lĩnh vực phân phối các sản phẩm, vật phẩm trà đạo nhập khẩu cao cấp. Chúng tôi mong muốn kiến tạo nên một cộng đồng giao lưu, chia sẻ đam mê trà đạo lành mạnh và sâu sắc.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                </svg>
                <h3 className="font-bold text-text-dark">Sứ mệnh</h3>
              </div>
              <p className="text-sm text-text-body leading-relaxed">
                Làm cầu nối mang tinh hoa nghệ thuật chế tác thủ công từ những nghệ nhân danh tiếng đến gần hơn với không gian sống của người Việt. Mỗi sản phẩm được trao đi không chỉ là vật dụng, mà là một tác phẩm nghệ thuật mang đậm giá trị thời gian.
              </p>
            </div>
          </div>

          <p className="text-[15px] text-text-body leading-relaxed italic border-l-4 border-amber-500 pl-4 bg-amber-50/50 py-3 pr-4 rounded-r-lg">
            Chúng tôi tâm niệm, giá trị của một trà cụ không nằm ở mức giá, mà nằm ở câu chuyện, ở chất đất, ở cái tâm của người nghệ nhân và sự trân trọng của người thưởng trà.
          </p>

          <div className="mt-6 rounded-xl overflow-hidden">
            <img src={IMAGES[1]} alt="Top 1 google" className="w-full h-56 object-cover" />
            <p className="text-xs text-center text-text-muted bg-gray-50 py-2 border-t border-border-warm">
              Với vị trí top 1 Google tìm kiếm, Thế Giới Trà Đạo khẳng định được uy tín và thương hiệu trong lòng khách hàng
            </p>
          </div>
        </div>

        {/* Section 3 – Sản phẩm */}
        <div className="bg-white rounded-xl border border-border-warm shadow-card p-6 md:p-8">
          <SectionTitle num="3" title="Sản Phẩm Chủ Đạo" />
          <p className="text-[15px] text-text-body leading-relaxed mb-5">
            Tại Thế Giới Trà Đạo, chúng tôi khắt khe trong việc tuyển chọn và cung cấp các dòng sản phẩm:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: '🫖',
                title: 'Ấm Tử Sa Nghi Hưng',
                desc: 'Cam kết chế tác từ nguồn đất Tử Sa nguyên khoáng chuẩn tự nhiên. Đa dạng các dáng ấm từ kinh điển (Tây Thi, Thạch Biều, Đức Chung…) đến hiện đại, được nhào nặn bởi đôi bàn tay của các nghệ nhân lành nghề.',
              },
              {
                icon: '🍵',
                title: 'Trà cụ chuyên nghiệp',
                desc: 'Tống trà, chén tống, lọc trà, khay trà gỗ tự nhiên… đáp ứng đầy đủ tiêu chuẩn khắt khe cho một bàn trà trọn vẹn.',
              },
              {
                icon: '⚡',
                title: 'Bàn trà điện thông minh',
                desc: 'Sự kết hợp hoàn hảo giữa công nghệ tiện ích hiện đại và nét thanh lịch truyền thống.',
              },
              {
                icon: '✨',
                title: 'Phụ kiện bàn trà',
                desc: 'Linh vật (trà cưng), chổi dưỡng ấm, dụng cụ vệ sinh, nhíp gắp trà… đầy đủ cho không gian trà đạo hoàn chỉnh.',
              },
            ].map(item => (
              <div key={item.title} className="border border-border-warm rounded-xl p-4 hover:border-[#C0392B]/30 hover:shadow-card transition-all">
                <p className="text-2xl mb-2">{item.icon}</p>
                <h3 className="font-bold text-text-dark mb-1.5">{item.title}</h3>
                <p className="text-sm text-text-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl overflow-hidden">
            <img src={IMAGES[2]} alt="Sản phẩm trà đạo" className="w-full h-56 object-cover" />
            <p className="text-xs text-center text-text-muted bg-gray-50 py-2 border-t border-border-warm">
              Với nhiều mẫu ấm đa dạng về dáng ấm và chất đất từ Nghi Hưng, khách hàng có thể thoải mái lựa chọn, sưu tầm
            </p>
          </div>
        </div>

        {/* Section 4 – Tại sao chọn */}
        <div className="bg-white rounded-xl border border-border-warm shadow-card p-6 md:p-8">
          <SectionTitle num="4" title="Tại Sao Khách Hàng Tin Chọn Thế Giới Trà Đạo?" />
          <p className="text-[15px] text-text-body mb-5 leading-relaxed">
            Sự an tâm của khách hàng là kim chỉ nam trong mọi hoạt động kinh doanh của chúng tôi:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { icon: '🔍', title: 'Tuyển chọn kỹ lưỡng', desc: 'Mỗi chiếc ấm, mỗi món trà cụ đều được kiểm tra tỉ mỉ về chất lượng đất, độ hoàn thiện, nắp ấm, dòng chảy trước khi đến tay khách hàng.' },
              { icon: '🏷️', title: 'Cam kết chất lượng & Nguồn gốc', desc: 'Minh bạch về xuất xứ sản phẩm. Pháp lý minh bạch với MST: 0801488117, xuất hóa đơn điện tử GTGT đầy đủ.' },
              { icon: '🚚', title: 'Chính sách mua sắm an tâm 100%', desc: 'Giao hàng tận nơi toàn quốc, khách hàng được kiểm tra hàng trước khi thanh toán.' },
              { icon: '🔄', title: 'Miễn phí đổi trả', desc: 'Sẵn sàng hỗ trợ đổi trả miễn phí và nhanh chóng nếu sản phẩm có lỗi từ nhà sản xuất hoặc hư hỏng trong vận chuyển.' },
              { icon: '💬', title: 'Tư vấn am hiểu', desc: 'Đội ngũ am hiểu sâu sắc về trà đạo, luôn sẵn sàng hỗ trợ chọn ấm hợp mệnh, hướng dẫn khai ấm và dưỡng ấm chuẩn xác nhất.' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-red-50/50 transition-colors">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-text-body leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl overflow-hidden">
            <img src={IMAGES[3]} alt="Khách hàng tin tưởng" className="w-full h-56 object-cover" />
          </div>
        </div>

        {/* Section 5 – FAQ */}
        <div className="bg-white rounded-xl border border-border-warm shadow-card p-6 md:p-8">
          <SectionTitle num="5" title="Câu Hỏi Thường Gặp (FAQ)" />
          <div>
            {FAQ.map((item, i) => <FaqItem key={i} {...item} />)}
          </div>
        </div>

        {/* Section 6 – Kết luận */}
        <div className="bg-gradient-to-r from-[#5C3317] to-[#7B4723] rounded-xl p-8 text-center">
          <img src={IMAGES[4]} alt="Trà đạo" className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-white/20" />
          <h2 className="text-xl font-bold text-white mb-3">Kết Luận</h2>
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto text-[15px]">
            Dù bạn là một trà nhân sành sỏi hay chỉ mới bắt đầu bước vào thế giới trà đạo tĩnh lặng, Thế Giới Trà Đạo luôn sẵn sàng đồng hành cùng bạn. Hãy để chúng tôi mang đến cho bạn những trà cụ tinh tế nhất, góp phần tạo nên những giây phút thưởng trà an yên và trọn vẹn.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link to="/" className="bg-white text-[#5C3317] font-bold px-6 py-2.5 rounded-lg hover:bg-amber-50 transition-colors text-sm">
              Xem Sản Phẩm
            </Link>
            <Link to="/lien-he" className="border border-white/40 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm">
              Liên Hệ Ngay
            </Link>
          </div>
        </div>

      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
