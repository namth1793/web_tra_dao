import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

const fmt = n => Number(n).toLocaleString('vi-VN') + 'đ';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-700 mb-2">Giỏ hàng trống</h2>
      <p className="text-sm text-gray-500 mb-6">Hãy khám phá bộ sưu tập đồ trà đạo của chúng tôi</p>
      <Link to="/#products"
        className="bg-[#C0392B] hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  async function handleCheckout(e) {
    e.preventDefault();
    if (!cart.length) return;
    if (!form.name || !form.phone || !form.address) return;
    setLoading(true);
    setErr('');
    try {
      await axios.post('/api/orders/cart', {
        items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address,
        note: form.note,
        payment: 'cod',
      });
      clearCart();
      setDone(true);
    } catch {
      setErr('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng <strong>30 phút</strong>.
              Cảm ơn quý khách đã tin tưởng Thế Giới Trà Đạo!
            </p>
            <Link to="/"
              className="inline-block bg-[#C0392B] hover:bg-red-700 text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-[#C0392B]">TRANG CHỦ</Link>
          <span>/</span>
          <span className="text-[#C0392B] font-medium">GIỎ HÀNG</span>
        </nav>

        <h1 className="text-lg font-bold text-gray-800 mb-4">
          Giỏ hàng
          {cart.length > 0 && <span className="text-gray-400 font-normal text-sm ml-2">({cart.length} sản phẩm)</span>}
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <EmptyCart />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ── Left: Cart items ── */}
            <div className="flex-1 min-w-0 space-y-3">

              {/* Items list */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-sm text-gray-700">Sản phẩm trong giỏ</h2>
                  <button onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-600 transition-colors">
                    Xóa tất cả
                  </button>
                </div>

                <div className="divide-y divide-gray-50">
                  {cart.map(item => {
                    const discount = item.original_price > item.price
                      ? Math.round((1 - item.price / item.original_price) * 100) : 0;
                    return (
                      <div key={item.id} className="flex items-start gap-3 p-4">
                        {/* Image */}
                        <Link to={`/san-pham/${item.id}`} className="flex-shrink-0">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl border border-gray-100"
                            onError={e => { e.target.src = `https://picsum.photos/seed/c${item.id}/200/200`; }}
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/san-pham/${item.id}`}
                            className="text-sm font-medium text-gray-800 hover:text-[#C0392B] transition-colors line-clamp-2 leading-snug block mb-1.5">
                            {item.name}
                          </Link>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-[#C0392B]">{fmt(item.price)}</span>
                            {discount > 0 && (
                              <>
                                <span className="text-xs text-gray-400 line-through">{fmt(item.original_price)}</span>
                                <span className="text-[10px] font-bold bg-red-100 text-[#C0392B] px-1.5 py-0.5 rounded">-{discount}%</span>
                              </>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Qty control */}
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button onClick={() => updateQty(item.id, item.qty - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-base font-medium">
                                −
                              </button>
                              <span className="w-9 h-8 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                                {item.qty}
                              </span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-base font-medium">
                                +
                              </button>
                            </div>

                            {/* Subtotal + remove */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-gray-800">{fmt(item.price * item.qty)}</span>
                              <button onClick={() => removeFromCart(item.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue shopping */}
              <Link to="/#products"
                className="inline-flex items-center gap-1.5 text-sm text-[#C0392B] hover:underline">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* ── Right: Order summary + Form ── */}
            <div className="w-full lg:w-[380px] flex-shrink-0 space-y-3">

              {/* Summary */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <h2 className="font-semibold text-sm text-gray-700 mb-3">Tóm tắt đơn hàng</h2>
                <div className="space-y-2 mb-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-500 line-clamp-1 pr-2 flex-1">{item.name} × {item.qty}</span>
                      <span className="font-medium text-gray-800 flex-shrink-0">{fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Tạm tính</span>
                    <span className="font-medium">{fmt(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                    <span className="font-bold text-gray-800">Tổng cộng</span>
                    <span className="text-xl font-bold text-[#C0392B]">{fmt(cartTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout form */}
              <form onSubmit={handleCheckout} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <h2 className="font-semibold text-sm text-gray-700 mb-4">Thông tin giao hàng</h2>

                {err && (
                  <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg mb-3">{err}</p>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1">Họ và tên *</label>
                    <input required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Nguyễn Văn A"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C0392B] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1">Số điện thoại *</label>
                    <input required type="tel" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="0988 xxx xxx"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C0392B] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1">Địa chỉ giao hàng *</label>
                    <input required value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      placeholder="Số nhà, đường, phường, tỉnh/thành"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C0392B] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-medium mb-1">Ghi chú</label>
                    <textarea rows={2} value={form.note}
                      onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                      placeholder="Yêu cầu đặc biệt (không bắt buộc)"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C0392B] transition-colors resize-none" />
                  </div>
                </div>

                {/* COD notice */}
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mt-3 text-xs text-amber-800">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Thanh toán khi nhận hàng (COD). Chúng tôi sẽ gọi xác nhận trong <strong>30 phút</strong>.</span>
                </div>

                <button type="submit" disabled={loading}
                  className="mt-4 w-full bg-[#C0392B] hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Đang gửi...</>
                    : <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Đặt hàng — {fmt(cartTotal)}
                      </>
                  }
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
