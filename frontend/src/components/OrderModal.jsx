import { useState, useEffect } from 'react';
import axios from 'axios';

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }

export default function OrderModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '', payment: 'cod' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const discount = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const total = product.price * qty;

  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setLoading(true);
    setErr('');
    try {
      await axios.post('/api/orders', {
        product_id:       product.id,
        product_name:     product.name,
        product_price:    product.price,
        quantity:         qty,
        customer_name:    form.name,
        customer_phone:   form.phone,
        customer_address: form.address,
        note:             form.note,
        payment:          form.payment,
      });
      setDone(true);
    } catch {
      setErr('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 bg-red-700 rounded-full" />
            <h2 className="font-bold text-gray-800 text-base">Đặt hàng nhanh</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {done ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Đặt hàng thành công!</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Chúng tôi đã nhận được đơn hàng của bạn và sẽ gọi điện xác nhận trong vòng <strong>30 phút</strong>.
            </p>
            <div className="mt-6 bg-gray-50 rounded-xl px-6 py-4 text-sm text-left w-full max-w-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Sản phẩm</span>
                <span className="font-medium text-gray-800 text-right max-w-[180px] leading-snug">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số lượng</span>
                <span className="font-medium text-gray-800">x{qty}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1.5 mt-1">
                <span className="font-semibold text-gray-700">Tổng tiền</span>
                <span className="font-bold text-red-700 text-base">{fmt(total)}</span>
              </div>
            </div>
            <button onClick={onClose}
              className="mt-6 bg-red-700 hover:bg-red-600 text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors">
              Đóng
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-1 min-h-0">

            {/* ── Left: Product info ── */}
            <div className="md:w-56 flex-shrink-0 bg-[#fdf8f3] p-5 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-100">
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  onError={e => { e.target.src = `https://picsum.photos/seed/p${product.id}/400/400`; }}
                />
                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                    -{discount}%
                  </span>
                )}
                {product.is_featured ? (
                  <span className="absolute top-2 right-2 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    Nổi bật
                  </span>
                ) : null}
              </div>

              {/* Name + price */}
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-snug mb-2">{product.name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-red-700 font-bold text-lg">{fmt(product.price)}</span>
                  {product.original_price > product.price && (
                    <span className="text-gray-400 text-xs line-through">{fmt(product.original_price)}</span>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Số lượng</p>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white w-fit">
                  <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg transition-colors">
                    −
                  </button>
                  <span className="w-10 h-9 flex items-center justify-center text-sm font-bold border-x border-gray-200">
                    {qty}
                  </span>
                  <button type="button" onClick={() => setQty(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 mt-auto">
                <p className="text-[11px] text-gray-400 mb-0.5">Tạm tính</p>
                <p className="text-red-700 font-bold text-xl">{fmt(total)}</p>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <form onSubmit={handleSubmit} className="flex-1 p-5 flex flex-col gap-3.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Thông tin giao hàng</p>

              {err && (
                <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{err}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Họ và tên *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-red-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1">Số điện thoại *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="0988 xxx xxx"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-red-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1">Địa chỉ giao hàng *</label>
                <input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="Số nhà, tên đường, phường/xã, tỉnh/thành phố"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-red-500 transition-colors" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1">Ghi chú</label>
                <textarea rows={2} value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  placeholder="Ghi chú thêm về đơn hàng (không bắt buộc)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-red-500 transition-colors resize-none" />
              </div>

              {/* Payment method */}
              <div>
                <p className="text-xs text-gray-500 font-medium mb-2">Hình thức thanh toán</p>
                <div className="space-y-2">
                  {[
                    { val: 'cod',  label: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
                    { val: 'bank', label: 'Chuyển khoản ngân hàng (QR code)', icon: '🏦' },
                  ].map(o => (
                    <label key={o.val} className={`flex items-center gap-3 border rounded-lg px-3.5 py-2.5 cursor-pointer transition-colors ${form.payment === o.val ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={o.val} checked={form.payment === o.val}
                        onChange={() => setForm(f => ({ ...f, payment: o.val }))}
                        className="accent-red-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notice */}
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-3 text-xs text-amber-800 leading-relaxed">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Chúng tôi sẽ gọi điện xác nhận đơn hàng trong <strong>30 phút</strong> sau khi đặt. Không thanh toán online.</span>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors mt-auto">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Đang gửi...</>
                  : <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Xác nhận đặt hàng — {fmt(total)}
                    </>
                }
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
