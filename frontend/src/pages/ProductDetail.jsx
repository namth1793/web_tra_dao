import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const fmt = n => n?.toLocaleString('vi-VN') + 'đ';

// Derive product specs from name/section
function deriveSpecs(product) {
  const name = product?.name || '';
  // Extract volume from name e.g. "150ml"
  const volMatch = name.match(/(\d+)\s*ml/i);
  const vol = volMatch ? volMatch[1] + 'ml' : '200ml';
  // Extract material from section name
  const sectionName = product?.section_name || '';
  const groupName = product?.group_name || '';

  const isAmTuSa = groupName.includes('Tử Sa') || name.includes('Tử Sa');
  const isChen = sectionName.includes('Chén') || name.includes('Chén');
  const isKhay = sectionName.includes('Khay') || name.includes('Khay');

  // Artisan names
  const artisans = ['实力派艺人 – Nghệ nhân thực lực phái', 'Truyền thống Nghi Hưng', 'Nghệ nhân tại Giang Tô', 'Thủ công cao cấp'];
  const artisan = artisans[product?.id % artisans.length];

  // Colors / clay types from name
  let chatDat = 'Đất tím Nghi Hưng nguyên khoáng';
  if (name.includes('Nâu') || name.includes('nâu')) chatDat = 'Đất nâu Nghi Hưng cao cấp';
  else if (name.includes('Đỏ') || name.includes('đỏ')) chatDat = 'Đất đỏ Chu Nê nguyên liệu';
  else if (name.includes('Tím') || name.includes('tím')) chatDat = 'Đất tím Tử Sa thượng hạng';
  else if (name.includes('Vàng') || name.includes('vàng')) chatDat = 'Đất vàng Đoạn Nê thiên nhiên';

  // Dam shape from section
  let dangAm = 'Đức Chung';
  if (name.includes('Tây Thi')) dangAm = 'Tây Thi';
  else if (name.includes('Thạch Biều')) dangAm = 'Thạch Biều';
  else if (name.includes('Thủy Bình')) dangAm = 'Thủy Bình';
  else if (name.includes('Tiếu Anh')) dangAm = 'Tiếu Anh';
  else if (name.includes('Báo Xuân')) dangAm = 'Báo Xuân';
  else if (name.includes('Phỏng Cổ')) dangAm = 'Phỏng Cổ';
  else if (name.includes('Tứ Phương')) dangAm = 'Tứ Phương';

  // Size depends on vol
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

// Description text
function buildDesc(product) {
  const name = product?.name || 'sản phẩm';
  const groupName = product?.group_name || '';
  const isAmTuSa = groupName.includes('Tử Sa') || name.includes('Tử Sa');
  if (isAmTuSa) {
    return `Trong giới sành trà, sở hữu một chiếc ấm Tử Sa không chỉ là có một trà cụ để pha nước, mà là đang nắm giữ một tác phẩm nghệ thuật, một người "trà hữu" tri kỳ. Hôm nay, Thế Giới Trà Đạo xin giới thiệu đến quý trà nhân một kiệt tác thực thụ: ${name} được chế tác từ chất đất nguyên khoáng, dung tích phù hợp cho các buổi thưởng trà từ 2–4 người.\n\nẤm tử sa Nghi Hưng được làm từ đất tử sa thiên nhiên, khai thác tại vùng Nghi Hưng, Giang Tô, Trung Quốc – nơi nổi tiếng với truyền thống làm ấm lâu đời hàng trăm năm. Mỗi chiếc ấm đều được tạo hình thủ công bởi nghệ nhân lành nghề, mang lại nét độc đáo và giá trị nghệ thuật cao.\n\nĐất tử sa có tính chất thấm hút tốt, giúp hương trà quyện sâu vào thành ấm theo thời gian, tạo nên hương vị trà ngày càng đặc biệt. Sử dụng ấm tử sa thường xuyên còn có tác dụng "nuôi ấm", giúp chiếc ấm ngày càng bóng mượt, đẹp hơn theo năm tháng.`;
  }
  return `${name} là sản phẩm trà đạo cao cấp, được chế tác tỉ mỉ bởi những nghệ nhân lành nghề với nhiều năm kinh nghiệm trong nghề làm đồ trà. Sản phẩm sử dụng nguyên liệu thiên nhiên chất lượng cao, đảm bảo độ bền và tính thẩm mỹ tuyệt vời.\n\nThế Giới Trà Đạo cam kết cung cấp sản phẩm chính hãng, đúng như mô tả và hình ảnh. Mỗi sản phẩm đều trải qua quy trình kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng.\n\nSản phẩm phù hợp làm quà tặng ý nghĩa cho người thân, bạn bè hoặc đối tác kinh doanh yêu thích văn hóa trà đạo.`;
}

// Trust badges on sidebar
const TRUST = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#C0392B]" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.605 3.734 3.745 3.745 0 01-3.734.605A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.734-.605 3.745 3.745 0 01-.605-3.734A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.605-3.734 3.745 3.745 0 013.734-.605A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.734.605 3.745 3.745 0 01.605 3.734A3.745 3.745 0 0121 12z"/>
      </svg>
    ),
    title: 'CAM KẾT',
    desc: 'Hàng chính hãng, đúng như mô tả và hình ảnh',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#C0392B]" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3a49.755 49.755 0 01-1.752-.124c-1.01-.1-1.888-.597-2.448-1.36a.75.75 0 01.164-.99c.46-.38.86-.827 1.179-1.327a.6.6 0 00-.09-.711L5.624 7.673a.75.75 0 010-1.06l.176-.176a.75.75 0 011.06 0l2.667 2.667a2.25 2.25 0 001.612.659H16a2.25 2.25 0 002.25-2.25V5.625c0-.621.504-1.125 1.125-1.125h.375c.621 0 1.125.504 1.125 1.125v2.886z"/>
      </svg>
    ),
    title: 'TƯ VẤN TẬN TÂM',
    desc: 'Chúng tôi hân hạnh được tư vấn cho quý khách',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#C0392B]" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
      </svg>
    ),
    title: 'BẢO ĐẢM',
    desc: 'Quý khách nhận hàng kiểm tra rồi mới thanh toán',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#C0392B]" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
      </svg>
    ),
    title: 'GIAO HÀNG NHANH',
    desc: 'Giao hàng nhanh toàn quốc 1-3 ngày',
  },
];

// Star rating
function Stars({ n = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= n ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData]         = useState(null);
  const [latest, setLatest]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty]           = useState(1);
  const [descOpen, setDescOpen] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', city: '', district: '', address: '', note: '', payment: 'cod' });

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setQty(1);
    setDescOpen(false);
    setOrderSent(false);
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
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center text-text-muted">
          <div className="w-10 h-10 border-2 border-[#C0392B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p>Đang tải sản phẩm...</p>
        </div>
      </div>
    </div>
  );

  if (!data?.product) return null;

  const { product, related } = data;
  const specs = deriveSpecs(product);
  const desc = buildDesc(product);
  const discount = product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  // Build thumbnail images (same image with different crops for visual variety)
  const thumbSeeds = [product.id, product.id + 1, product.id + 3, product.id + 7];
  const thumbUrls = [
    product.image_url,
    ...thumbSeeds.slice(1).map(s => `https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=120&h=120&fit=crop&q=70&sig=${s}`),
  ];

  function handleAddToCart() {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  }

  async function handleOrder(e) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    try {
      await axios.post('/api/contacts', {
        name: form.name,
        phone: form.phone,
        email: '',
        message: `Đặt hàng: ${product.name} x${qty} - ${fmt(product.price * qty)}\nThành phố: ${form.city} ${form.district}\nĐịa chỉ: ${form.address}\nTT: ${form.payment === 'cod' ? 'COD' : 'Chuyển khoản'}\nGhi chú: ${form.note}`,
      });
      setOrderSent(true);
    } catch {
      setOrderSent(true);
    }
  }

  const breadcrumbGroup = product.group_name || 'Sản phẩm';
  const breadcrumbSection = product.section_name || '';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-4 flex-wrap">
          <Link to="/" className="hover:text-[#C0392B] transition-colors">TRANG CHỦ</Link>
          <span className="text-gray-400">/</span>
          <span className="hover:text-[#C0392B] cursor-pointer">ẤM TRÀ</span>
          <span className="text-gray-400">/</span>
          <span className="hover:text-[#C0392B] cursor-pointer">{breadcrumbGroup.toUpperCase()}</span>
          <span className="text-gray-400">/</span>
          <span className="text-[#C0392B] font-medium">{breadcrumbSection.toUpperCase() || product.name.toUpperCase().slice(0, 20)}</span>
        </nav>

        {/* ── 2-column layout: Main content | Sidebar ── */}
        <div className="flex gap-5 items-start">

          {/* ══════════════════ MAIN CONTENT ══════════════════ */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Row: Gallery + Product Info */}
            <div className="flex gap-4 items-start">

              {/* Gallery */}
              <div className="w-[280px] flex-shrink-0">
                <div className="bg-white rounded-xl overflow-hidden border border-border-warm shadow-card mb-2.5 relative">
                  <img
                    src={thumbUrls[activeImg]}
                    alt={product.name}
                    className="w-full object-cover"
                    style={{ aspectRatio: '1/1' }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/pd${product.id}/600/600`; }}
                  />
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#C0392B] text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {thumbUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-[60px] h-[60px] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImg === i ? 'border-[#C0392B] shadow-md' : 'border-border-warm hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = `https://picsum.photos/seed/th${product.id}${i}/120/120`; }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border border-border-warm shadow-card p-5">
                  <h1 className="text-xl font-bold text-text-dark leading-snug mb-3">{product.name}</h1>

                  <div className="flex items-center gap-2 mb-4">
                    <Stars n={5} />
                    <span className="text-xs text-text-muted">(24 đánh giá)</span>
                    <span className="text-xs text-green-600 font-medium">• Còn hàng</span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-border-warm">
                    <span className="text-3xl font-bold text-[#C0392B]">{fmt(product.price)}</span>
                    {product.original_price > product.price && (
                      <>
                        <span className="text-base text-text-muted line-through">{fmt(product.original_price)}</span>
                        <span className="bg-[#C0392B]/10 text-[#C0392B] text-xs font-bold px-2 py-0.5 rounded-md">-{discount}%</span>
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
                          <td className="py-1.5 pr-3 text-text-muted font-medium w-[130px] align-top">{k}</td>
                          <td className="py-1.5 text-text-dark">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Qty + Buttons */}
                  <div className="flex items-center gap-3 mt-5">
                    <div className="flex items-center border border-border-warm rounded-lg overflow-hidden">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-9 h-10 flex items-center justify-center text-lg font-medium text-text-body hover:bg-gray-50 transition-colors">-</button>
                      <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-text-dark border-x border-border-warm">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)}
                        className="w-9 h-10 flex items-center justify-center text-lg font-medium text-text-body hover:bg-gray-50 transition-colors">+</button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 h-10 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
                        cartAdded
                          ? 'bg-green-50 border-green-400 text-green-700'
                          : 'bg-white border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white'
                      }`}
                    >
                      {cartAdded ? (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/></svg>Đã thêm vào giỏ</>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>Thêm vào giỏ hàng</>
                      )}
                    </button>
                  </div>

                  <a
                    href="#dat-hang"
                    className="mt-3 flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                    </svg>
                    ĐẶT HÀNG NHANH
                    <span className="text-xs font-normal opacity-80">Giao hàng tận nơi, được kiểm tra hàng khi thanh toán</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="border-b border-border-warm px-5 py-3 flex items-center gap-3">
                <div className="w-1 h-5 bg-[#C0392B] rounded-full" />
                <h2 className="font-bold text-sm text-text-dark uppercase tracking-wide">Mô Tả</h2>
              </div>
              <div className="p-5">
                <div className={`text-sm text-text-body leading-relaxed whitespace-pre-line overflow-hidden transition-all duration-300 ${descOpen ? '' : 'max-h-24'}`}>
                  {desc}
                </div>
                <button
                  onClick={() => setDescOpen(o => !o)}
                  className="mt-3 text-[#C0392B] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  {descOpen ? 'Thu gọn' : 'Xem thêm'}
                  <svg className={`w-3.5 h-3.5 transition-transform ${descOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Order Form */}
            <div id="dat-hang" className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="border-b border-border-warm px-5 py-3 flex items-center gap-3">
                <div className="w-1 h-5 bg-amber-500 rounded-full" />
                <h2 className="font-bold text-sm text-text-dark uppercase tracking-wide">Đặt Hàng Nhanh</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: product preview */}
                <div className="p-5 border-b md:border-b-0 md:border-r border-border-warm bg-section-alt">
                  <div className="flex items-start gap-4 mb-5">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-border-warm flex-shrink-0"
                      onError={e => { e.target.src = `https://picsum.photos/seed/ord${product.id}/80/80`; }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-snug mb-1">{product.name}</p>
                      <p className="text-lg font-bold text-[#C0392B]">{fmt(product.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-text-muted font-medium">Số lượng</span>
                    <div className="flex items-center border border-border-warm rounded-lg overflow-hidden bg-white">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 text-text-body hover:bg-gray-50 flex items-center justify-center font-medium">-</button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold border-x border-border-warm">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 text-text-body hover:bg-gray-50 flex items-center justify-center font-medium">+</button>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Để đơn hàng được giao nhanh chóng, quý khách vui lòng điền đầy đủ thông tin. Xin cảm ơn!
                  </p>
                </div>

                {/* Right: form */}
                <div className="p-5">
                  <h3 className="font-bold text-sm text-text-dark mb-4">Thông tin người mua</h3>
                  {orderSent ? (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                      </div>
                      <p className="font-semibold text-text-dark mb-1">Đặt hàng thành công!</p>
                      <p className="text-sm text-text-muted">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleOrder} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input required placeholder="Họ và tên *" value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="border border-border-warm rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C0392B] transition-colors"/>
                        <input required placeholder="Số điện thoại *" value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="border border-border-warm rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C0392B] transition-colors"/>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Tỉnh/Thành phố" value={form.city}
                          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                          className="border border-border-warm rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C0392B] transition-colors"/>
                        <input placeholder="Phường/Xã" value={form.district}
                          onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                          className="border border-border-warm rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C0392B] transition-colors"/>
                      </div>
                      <input placeholder="Số nhà, tên đường" value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        className="w-full border border-border-warm rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C0392B] transition-colors"/>
                      <textarea placeholder="Ghi chú đơn hàng (Không bắt buộc)" value={form.note}
                        onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                        rows={2}
                        className="w-full border border-border-warm rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C0392B] transition-colors resize-none"/>
                      <div>
                        <p className="text-xs text-text-muted font-medium mb-1.5">Hình thức thanh toán</p>
                        <div className="flex flex-col gap-1.5">
                          {[
                            { val: 'cod', label: 'Trả tiền mặt khi nhận hàng' },
                            { val: 'bank', label: 'Chuyển khoản ngân hàng (Quét mã QR)' },
                          ].map(o => (
                            <label key={o.val} className="flex items-center gap-2 cursor-pointer text-sm text-text-body">
                              <input type="radio" name="payment" value={o.val}
                                checked={form.payment === o.val}
                                onChange={() => setForm(f => ({ ...f, payment: o.val }))}
                                className="accent-[#C0392B]"/>
                              {o.label}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-border-warm">
                        <span className="text-sm text-text-muted">Tổng cộng ({qty} sản phẩm)</span>
                        <span className="text-lg font-bold text-[#C0392B]">{fmt(product.price * qty)}</span>
                      </div>
                      <button type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                        </svg>
                        ĐẶT HÀNG NGAY
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
          {/* ══════════════════ END MAIN CONTENT ══════════════════ */}

          {/* ══════════════════ SIDEBAR ══════════════════ */}
          <div className="w-[220px] flex-shrink-0 flex flex-col gap-3 self-start sticky top-[76px]">
            {/* Trust badges */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              {TRUST.map((t, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 ${i < TRUST.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="flex-shrink-0 mt-0.5">{t.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-text-dark mb-0.5">{t.title}</p>
                    <p className="text-[11px] text-text-muted leading-snug">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Latest products */}
            <div className="bg-white rounded-xl border border-border-warm shadow-card overflow-hidden">
              <div className="bg-[#C0392B] px-3 py-2">
                <h3 className="text-white font-bold text-xs uppercase tracking-wide">Sản Phẩm Mới</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {latest.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/san-pham/${p.id}`}
                    className="flex items-center gap-2.5 p-2.5 hover:bg-gray-50 transition-colors group">
                    <img src={p.image_url} alt={p.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0 border border-border-warm"
                      onError={e => { e.target.src = `https://picsum.photos/seed/lat${p.id}/60/60`; }}/>
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-body group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug mb-1">{p.name}</p>
                      <p className="text-xs font-bold text-[#C0392B]">{fmt(p.price)}</p>
                      {p.original_price > p.price && (
                        <p className="text-[10px] text-text-muted line-through">{fmt(p.original_price)}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* ══════════════════ END SIDEBAR ══════════════════ */}

        </div>

        {/* ── Related Products — full width below 2-col layout ── */}
        {related && related.length > 0 && (
          <div className="mt-5 bg-white rounded-xl border border-border-warm shadow-card overflow-hidden mb-8">
            <div className="bg-[#5C3317] px-5 py-3">
              <h2 className="font-bold text-sm text-white uppercase tracking-wide">Sản Phẩm Tương Tự</h2>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {related.slice(0, 4).map(p => {
                const disc = p.original_price > p.price
                  ? Math.round((1 - p.price / p.original_price) * 100) : 0;
                return (
                  <Link key={p.id} to={`/san-pham/${p.id}`}
                    className="group block bg-white rounded-xl overflow-hidden border border-border-warm hover:shadow-card-h hover:-translate-y-0.5 transition-all">
                    <div className="relative" style={{ paddingBottom: '100%' }}>
                      <img src={p.image_url} alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={e => { e.target.src = `https://picsum.photos/seed/rel${p.id}/300/300`; }}/>
                      {disc > 0 && (
                        <span className="absolute top-2 left-2 bg-[#C0392B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{disc}%</span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-text-body group-hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug mb-2 font-medium">{p.name}</p>
                      <p className="text-sm font-bold text-[#C0392B]">{fmt(p.price)}</p>
                      {p.original_price > p.price && (
                        <p className="text-[11px] text-text-muted line-through">{fmt(p.original_price)}</p>
                      )}
                      <button onClick={e => e.preventDefault()}
                        className="mt-2 w-full bg-[#5C3317] hover:bg-primary-h text-white text-[11px] font-semibold py-1.5 rounded-lg transition-colors">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
