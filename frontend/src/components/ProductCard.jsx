import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderModal from './OrderModal';

function fmt(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded]   = useState(false);
  const [wish, setWish]     = useState(false);
  const [order, setOrder]   = useState(false);

  const discount = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  function handleCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    onAddToCart?.(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleWish(e) {
    e.preventDefault();
    e.stopPropagation();
    setWish(w => !w);
  }

  function handleOrder(e) {
    e.preventDefault();
    e.stopPropagation();
    setOrder(true);
  }

  return (
    <>
      <Link to={`/san-pham/${product.id}`} className="product-card bg-card-bg rounded-xl overflow-hidden border border-border-warm shadow-card flex flex-col group cursor-pointer" style={{ textDecoration: 'none' }}>
        {/* Image wrapper */}
        <div className="relative overflow-hidden bg-section-alt" style={{ paddingBottom: '100%' }}>
          <img
            src={product.image_url}
            alt={product.name}
            className="product-img absolute inset-0 w-full h-full object-cover"
            onError={e => { e.target.src = `https://picsum.photos/seed/p${product.id}/400/400`; }}
            loading="lazy"
          />

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-price-red text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
              -{discount}%
            </span>
          )}

          {/* Wishlist btn */}
          <button
            onClick={handleWish}
            className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
          >
            <svg
              className={`w-3.5 h-3.5 ${wish ? 'text-price-red fill-price-red' : 'text-text-muted'}`}
              fill={wish ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </button>

          {/* Hover overlay: 2 buttons */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex">
            <button
              onClick={handleCart}
              className={`flex-1 py-2 text-[11px] font-semibold flex items-center justify-center gap-1 ${
                added ? 'bg-green-600 text-white' : 'bg-[#4A3728] text-white hover:bg-[#3A2718]'
              }`}
            >
              {added ? (
                <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5"/></svg>Đã thêm</>
              ) : (
                <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>Thêm giỏ</>
              )}
            </button>
            <button
              onClick={handleOrder}
              className="flex-1 py-2 text-[11px] font-bold bg-red-700 hover:bg-red-600 text-white flex items-center justify-center gap-1 border-l border-red-900"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
              </svg>
              Mua ngay
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="text-xs font-medium text-text-body line-clamp-2 flex-1 leading-snug mb-2.5 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-price-red font-bold text-sm">{fmt(product.price)}</div>
              {product.original_price > product.price && (
                <div className="text-text-muted text-[11px] line-through leading-none">{fmt(product.original_price)}</div>
              )}
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-2.5 h-2.5 ${s <= 4 ? 'text-accent' : 'text-border-warm'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {order && <OrderModal product={product} onClose={() => setOrder(false)} />}
    </>
  );
}
