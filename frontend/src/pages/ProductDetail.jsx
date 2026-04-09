import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';
import OrderModal from '../components/OrderModal';

const fmt = n => n?.toLocaleString('vi-VN') + 'đ';

function deriveSpecs(product) {
  const name = product?.name || '';
  const volMatch = name.match(/(\d+)\s*ml/i);
  const vol = volMatch ? volMatch[1] + 'ml' : '200ml';
  const sectionName = product?.section_name || '';
  const groupName = product?.group_name || '';
  const isAmTuSa = groupName.includes('Tử Sa') || name.includes('Tử Sa');
  const isChen = sectionName.includes('Chén') || name.includes('Chén');
  const isKhay = sectionName.includes('Khay') || name.includes('Khay');
  const artisans = ['实力派艺人 – Nghệ nhân thực lực phái', 'Truyền thống Nghi Hưng', 'Nghệ nhân tại Giang Tô', 'Thủ công cao cấp'];
  const artisan = artisans[product?.id % artisans.length];
  let chatDat = 'Đất tím Nghi Hưng nguyên khoáng';
  if (name.includes('Nâu') || name.includes('nâu')) chatDat = 'Đất nâu Nghi Hưng cao cấp';
  else if (name.includes('Đỏ') || name.includes('đỏ')) chatDat = 'Đất đỏ Chu Nê nguyên liệu';
  else if (name.includes('Tím') || name.includes('tím')) chatDat = 'Đất tím Tử Sa thượng hạng';
  else if (name.includes('Vàng') || name.includes('vàng')) chatDat = 'Đất vàng Đoạn Nê thiên nhiên';
  let dangAm = 'Đức Chung';
  ['Tây Thi','Thạch Biều','Thủy Bình','Tiếu Anh','Báo Xuân','Phỏng Cổ','Tứ Phương'].forEach(d => {
    if (name.includes(d)) dangAm = d;
  });
  const volNum = parseInt(vol) || 200;
  const w = Math.round(volNum * 0.058 + 8);
  const h = Math.round(volNum * 0.035 + 5.5);
  return {
    ma: `MS${50000 + (product?.id || 1) * 89}`.slice(0, 8),
    ngheNhan: artisan,
    dangAm: isAmTuSa ? dangAm : (isChen ? 'Chén tròn' : sectionName),
    chatDat: isAmTuSa ? chatDat : (name.includes('Sứ') ? 'Sứ cao cấp' : name.includes('Gỗ') ? 'Gỗ tự nhiên' : 'Vật liệu cao cấp'),
    luoiLoc: isAmTuSa ? 'Cầu không' : (isChen ? 'Không' : 'Tích hợp'),
    dungTich: isChen ? (vol || '50ml') : (isKhay ? 'N/A' : vol),
    xuatXu: 'Nghi Hưng, Trung Quốc',
    kichThuoc: `${w}.4 x ${h}.0cm`,
    dongGoi: 'Hộp đựng, chứng thư nghệ nhân, túi xách',
  };
}

function buildDesc(product) {
  const name = product?.name || 'sản phẩm';
  const groupName = product?.group_name || '';
  const isAmTuSa = groupName.includes('Tử Sa') || name.includes('Tử Sa');
  if (isAmTuSa) {
    return `Trong giới sành trà, sở hữu một chiếc ấm Tử Sa không chỉ là có một trà cụ để pha nước, mà là đang nắm giữ một tác phẩm nghệ thuật, một người "trà hữu" tri kỳ. Hôm nay, Thế Giới Trà Đạo xin giới thiệu đến quý trà nhân một kiệt tác thực thụ: ${name} được chế tác từ chất đất nguyên khoáng, dung tích phù hợp cho các buổi thưởng trà từ 2–4 người.\n\nẤm tử sa Nghi Hưng được làm từ đất tử sa thiên nhiên, khai thác tại vùng Nghi Hưng, Giang Tô, Trung Quốc – nơi nổi tiếng với truyền thống làm ấm lâu đời hàng trăm năm. Mỗi chiếc ấm đều được tạo hình thủ công bởi nghệ nhân lành nghề, mang lại nét độc đáo và giá trị nghệ thuật cao.\n\nĐất tử sa có tính chất thấm hút tốt, giúp hương trà quyện sâu vào thành ấm theo thời gian, tạo nên hương vị trà ngày càng đặc biệt.`;
  }
  return `${name} là sản phẩm trà đạo cao cấp, được chế tác tỉ mỉ bởi những nghệ nhân lành nghề với nhiều năm kinh nghiệm trong nghề làm đồ trà. Sản phẩm sử dụng nguyên liệu thiên nhiên chất lượng cao, đảm bảo độ bền và tính thẩm mỹ tuyệt vời.\n\nThế Giới Trà Đạo cam kết cung cấp sản phẩm chính hãng, đúng như mô tả và hình ảnh. Mỗi sản phẩm đều trải qua quy trình kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng.\n\nSản phẩm phù hợp làm quà tặng ý nghĩa cho người thân, bạn bè hoặc đối tác kinh doanh yêu thích văn hóa trà đạo.`;
}

const TRUST = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#C0392B]" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.605 3.734 3.745 3.745 0 01-3.734.605A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.734-.605 3.745 3.745 0 01-.605-3.734A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.605-3.734 3.745 3.745 0 013.734-.605A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.734.605 3.745 3.745 0 01.605 3.734A3.745 3.745 0 0121 12z"/></svg>,
    title: 'CAM KẾT', desc: 'Hàng chính hãng, đúng như mô tả',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#C0392B]" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>,
    title: 'BẢO ĐẢM', desc: 'Nhận hàng kiểm tra rồi mới thanh toán',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#C0392B]" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>,
    title: 'GIAO HÀNG NHANH', desc: 'Toàn quốc 1–3 ngày làm việc',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#C0392B]" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
    title: 'TƯ VẤN TẬN TÂM', desc: 'Hỗ trợ 8:00–21:00 mỗi ngày',
  },
];

function Stars({ n = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= n ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [data, setData]           = useState(null);
  const [latest, setLatest]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty]             = useState(1);
  const [descOpen, setDescOpen]   = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setQty(1);
    setDescOpen(false);
    Promise.all([
      axios.get(`/api/products/${id}`),
      axios.get('/api/products/latest?limit=10'),
    ])
      .then(([pRes, lRes]) => {
        setData(pRes.data);
        setLatest(lRes.data);
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C0392B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Đang tải sản phẩm...</p>
        </div>
      </div>
    </div>
  );

  if (!data?.product) return null;

  const { product, related } = data;
  const specs = deriveSpecs(product);
  const desc = buildDesc(product);
  const discount = product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100) : 0;

  const thumbSeeds = [product.id, product.id + 1, product.id + 3, product.id + 7];
  const thumbUrls = [
    product.image_url,
    ...thumbSeeds.slice(1).map(s => `https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=120&h=120&fit=crop&q=70&sig=${s}`),
  ];

  function handleAddToCart() {
    addToCart(product, qty);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 mb-3 md:mb-4 overflow-hidden">
          <Link to="/" className="hover:text-[#C0392B] flex-shrink-0">TRANG CHỦ</Link>
          <span className="flex-shrink-0">/</span>
          <span className="flex-shrink-0 hidden sm:inline">ẤM TRÀ</span>
          <span className="flex-shrink-0 hidden sm:inline">/</span>
          <span className="text-[#C0392B] font-medium truncate">{product.section_name || product.name}</span>
        </nav>

        {/* ─────────────── MOBILE LAYOUT (< lg) ─────────────── */}
        <div className="lg:hidden space-y-3">

          {/* Gallery */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-3">
            <div className="relative rounded-xl overflow-hidden bg-gray-50 mb-2.5">
              <img
                src={thumbUrls[activeImg]}
                alt={product.name}
                className="w-full object-cover"
                style={{ aspectRatio: '1/1', maxHeight: 340 }}
                onError={e => { e.target.src = `https://picsum.photos/seed/pd${product.id}/600/600`; }}
              />
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-[#C0392B] text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {thumbUrls.map((url, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-[#C0392B]' : 'border-gray-200'
                  }`}>
                  <img src={url} alt="" className="w-full h-full object-cover"
                    onError={e => { e.target.src = `https://picsum.photos/seed/th${product.id}${i}/60/60`; }}/>
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h1 className="text-base sm:text-lg font-bold text-gray-800 leading-snug mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-3">
              <Stars n={5} />
              <span className="text-xs text-gray-500">(24 đánh giá)</span>
              <span className="text-xs text-green-600 font-medium">• Còn hàng</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4 pb-3 border-b border-gray-100">
              <span className="text-2xl font-bold text-[#C0392B]">{fmt(product.price)}</span>
              {product.original_price > product.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">{fmt(product.original_price)}</span>
                  <span className="bg-red-100 text-[#C0392B] text-xs font-bold px-1.5 py-0.5 rounded">-{discount}%</span>
                </>
              )}
            </div>

            {/* Key specs (compact for mobile) */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-4">
              {[
                ['Mã SP', specs.ma],
                ['Xuất xứ', specs.xuatXu],
                ['Chất đất', specs.chatDat],
                ['Dung tích', specs.dungTich],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="text-[11px] text-gray-400 block">{k}</span>
                  <span className="text-xs font-medium text-gray-700">{v}</span>
                </div>
              ))}
            </div>

            {/* Qty + Buttons */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-medium">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-base font-medium text-gray-600 hover:bg-gray-50">−</button>
                  <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold border-x border-gray-200">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-base font-medium text-gray-600 hover:bg-gray-50">+</button>
                </div>
              </div>
              <button onClick={handleAddToCart}
                className={`w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-all ${
                  cartAdded
                    ? 'bg-green-50 border-green-400 text-green-700'
                    : 'bg-white border-[#C0392B] text-[#C0392B] active:bg-[#C0392B] active:text-white'
                }`}>
                {cartAdded ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/></svg>Đã thêm vào giỏ</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>Thêm vào giỏ hàng</>
                )}
              </button>
              <button onClick={() => setOrderOpen(true)}
                className="w-full h-11 rounded-xl bg-[#C0392B] hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                MUA NGAY — Nhận hàng mới trả tiền
              </button>
            </div>
          </div>

          {/* Trust badges (mobile: 2x2 grid) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
            <div className="grid grid-cols-2 gap-2">
              {TRUST.map((t, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">{t.icon}</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800">{t.title}</p>
                    <p className="text-[10px] text-gray-500 leading-snug">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full specs (collapsible) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#C0392B] rounded-full"/>
              <h2 className="font-bold text-xs text-gray-700 uppercase tracking-wide">Thông số chi tiết</h2>
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Mã sản phẩm', specs.ma],
                    ['Nghệ nhân', specs.ngheNhan],
                    ['Dáng ấm', specs.dangAm],
                    ['Chất đất', specs.chatDat],
                    ['Lưới lọc', specs.luoiLoc],
                    ['Dung tích', specs.dungTich],
                    ['Xuất xứ', specs.xuatXu],
                    ['Kích thước', specs.kichThuoc],
                    ['Đóng gói', specs.dongGoi],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-50 last:border-0">
                      <td className="py-1.5 pr-3 text-gray-500 font-medium w-[120px] text-xs align-top">{k}</td>
                      <td className="py-1.5 text-gray-800 text-xs">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#C0392B] rounded-full"/>
              <h2 className="font-bold text-xs text-gray-700 uppercase tracking-wide">Mô tả sản phẩm</h2>
            </div>
            <div className="p-4">
              <div className={`text-sm text-gray-600 leading-relaxed whitespace-pre-line overflow-hidden transition-all duration-300 ${descOpen ? '' : 'max-h-24'}`}>
                {desc}
              </div>
              <button onClick={() => setDescOpen(o => !o)}
                className="mt-2 text-[#C0392B] text-sm font-medium hover:underline flex items-center gap-1">
                {descOpen ? 'Thu gọn' : 'Xem thêm'}
                <svg className={`w-3.5 h-3.5 transition-transform ${descOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Related (mobile: 2-col) */}
          {related?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-[#5C3317] px-4 py-2.5">
                <h2 className="font-bold text-xs text-white uppercase tracking-wide">Sản Phẩm Tương Tự</h2>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2.5">
                {related.slice(0, 4).map(p => {
                  const disc = p.original_price > p.price ? Math.round((1 - p.price / p.original_price) * 100) : 0;
                  return (
                    <Link key={p.id} to={`/san-pham/${p.id}`}
                      className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                      <div className="relative" style={{ paddingBottom: '100%' }}>
                        <img src={p.image_url} alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={e => { e.target.src = `https://picsum.photos/seed/rel${p.id}/300/300`; }}/>
                        {disc > 0 && <span className="absolute top-1.5 left-1.5 bg-[#C0392B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{disc}%</span>}
                      </div>
                      <div className="p-2.5">
                        <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug mb-1 group-hover:text-[#C0392B] transition-colors">{p.name}</p>
                        <p className="text-xs font-bold text-[#C0392B]">{fmt(p.price)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Latest products (mobile: horizontal scroll) */}
          {latest.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
              <div className="bg-[#C0392B] px-4 py-2.5">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Sản Phẩm Mới</h3>
              </div>
              <div className="p-3 flex gap-2.5 overflow-x-auto pb-4">
                {latest.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/san-pham/${p.id}`}
                    className="flex-shrink-0 w-28 group">
                    <img src={p.image_url} alt={p.name}
                      className="w-28 h-28 object-cover rounded-lg border border-gray-200 mb-1.5"
                      onError={e => { e.target.src = `https://picsum.photos/seed/lat${p.id}/120/120`; }}/>
                    <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug group-hover:text-[#C0392B] mb-0.5">{p.name}</p>
                    <p className="text-xs font-bold text-[#C0392B]">{fmt(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─────────────── DESKTOP LAYOUT (≥ lg) ─────────────── */}
        <div className="hidden lg:flex gap-5 items-start">

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Row: Gallery + Product Info */}
            <div className="flex gap-4 items-start">

              {/* Gallery */}
              <div className="w-[280px] flex-shrink-0">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-2.5 relative">
                  <img
                    src={thumbUrls[activeImg]}
                    alt={product.name}
                    className="w-full object-cover"
                    style={{ aspectRatio: '1/1' }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/pd${product.id}/600/600`; }}
                  />
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#C0392B] text-white text-xs font-bold px-2 py-0.5 rounded-lg">-{discount}%</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {thumbUrls.map((url, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`w-[60px] h-[60px] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImg === i ? 'border-[#C0392B] shadow-md' : 'border-gray-200 hover:border-gray-400'
                      }`}>
                      <img src={url} alt="" className="w-full h-full object-cover"
                        onError={e => { e.target.src = `https://picsum.photos/seed/th${product.id}${i}/120/120`; }}/>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <h1 className="text-xl font-bold text-gray-800 leading-snug mb-3">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Stars n={5} />
                    <span className="text-xs text-gray-500">(24 đánh giá)</span>
                    <span className="text-xs text-green-600 font-medium">• Còn hàng</span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100">
                    <span className="text-3xl font-bold text-[#C0392B]">{fmt(product.price)}</span>
                    {product.original_price > product.price && (
                      <>
                        <span className="text-base text-gray-400 line-through">{fmt(product.original_price)}</span>
                        <span className="bg-red-100 text-[#C0392B] text-xs font-bold px-2 py-0.5 rounded-md">-{discount}%</span>
                      </>
                    )}
                  </div>

                  <table className="w-full text-sm mb-4">
                    <tbody>
                      {[
                        ['Mã sản phẩm', specs.ma],
                        ['Nghệ nhân', specs.ngheNhan],
                        ['Dáng ấm', specs.dangAm],
                        ['Chất đất', specs.chatDat],
                        ['Lưới lọc', specs.luoiLoc],
                        ['Dung tích', specs.dungTich],
                        ['Xuất xứ', specs.xuatXu],
                        ['Kích thước', specs.kichThuoc],
                        ['Đóng gói', specs.dongGoi],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-b border-gray-50 last:border-0">
                          <td className="py-1.5 pr-3 text-gray-500 font-medium w-[130px] align-top">{k}</td>
                          <td className="py-1.5 text-gray-800">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Qty + Buttons */}
                  <div className="flex items-center gap-3 mt-5">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-9 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-50">-</button>
                      <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold border-x border-gray-200">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)}
                        className="w-9 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-50">+</button>
                    </div>
                    <button onClick={handleAddToCart}
                      className={`flex-1 h-10 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
                        cartAdded
                          ? 'bg-green-50 border-green-400 text-green-700'
                          : 'bg-white border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white'
                      }`}>
                      {cartAdded ? (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/></svg>Đã thêm vào giỏ</>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>Thêm vào giỏ hàng</>
                      )}
                    </button>
                  </div>
                  <button onClick={() => setOrderOpen(true)}
                    className="mt-3 flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#C0392B] hover:bg-red-700 text-white font-bold text-sm transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    MUA NGAY
                    <span className="text-xs font-normal opacity-80">— Giao tận nơi, kiểm hàng trước khi trả tiền</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-5 py-3 flex items-center gap-3">
                <div className="w-1 h-5 bg-[#C0392B] rounded-full"/>
                <h2 className="font-bold text-sm text-gray-800 uppercase tracking-wide">Mô Tả Sản Phẩm</h2>
              </div>
              <div className="p-5">
                <div className={`text-sm text-gray-600 leading-relaxed whitespace-pre-line overflow-hidden transition-all duration-300 ${descOpen ? '' : 'max-h-24'}`}>
                  {desc}
                </div>
                <button onClick={() => setDescOpen(o => !o)}
                  className="mt-3 text-[#C0392B] text-sm font-medium hover:underline flex items-center gap-1">
                  {descOpen ? 'Thu gọn' : 'Xem thêm'}
                  <svg className={`w-3.5 h-3.5 transition-transform ${descOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Related */}
            {related?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                <div className="bg-[#5C3317] px-5 py-3">
                  <h2 className="font-bold text-sm text-white uppercase tracking-wide">Sản Phẩm Tương Tự</h2>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {related.slice(0, 4).map(p => {
                    const disc = p.original_price > p.price ? Math.round((1 - p.price / p.original_price) * 100) : 0;
                    return (
                      <Link key={p.id} to={`/san-pham/${p.id}`}
                        className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="relative" style={{ paddingBottom: '100%' }}>
                          <img src={p.image_url} alt={p.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={e => { e.target.src = `https://picsum.photos/seed/rel${p.id}/300/300`; }}/>
                          {disc > 0 && <span className="absolute top-2 left-2 bg-[#C0392B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{disc}%</span>}
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-gray-700 group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug mb-2 font-medium">{p.name}</p>
                          <p className="text-sm font-bold text-[#C0392B]">{fmt(p.price)}</p>
                          {p.original_price > p.price && <p className="text-[11px] text-gray-400 line-through">{fmt(p.original_price)}</p>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-[220px] flex-shrink-0 flex flex-col gap-3 self-start sticky top-[76px]">
            {/* Trust badges */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {TRUST.map((t, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 ${i < TRUST.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="flex-shrink-0 mt-0.5">{t.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">{t.title}</p>
                    <p className="text-[11px] text-gray-500 leading-snug">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Latest products */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-[#C0392B] px-3 py-2">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Sản Phẩm Mới</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {latest.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/san-pham/${p.id}`}
                    className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 transition-colors group">
                    <img src={p.image_url} alt={p.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                      onError={e => { e.target.src = `https://picsum.photos/seed/lat${p.id}/60/60`; }}/>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-700 group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug mb-0.5">{p.name}</p>
                      <p className="text-xs font-bold text-[#C0392B]">{fmt(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ─────────────── END DESKTOP LAYOUT ─────────────── */}

      </div>

      <Footer />
      <FloatingContact />
      {orderOpen && <OrderModal product={product} onClose={() => setOrderOpen(false)} />}
    </div>
  );
}
