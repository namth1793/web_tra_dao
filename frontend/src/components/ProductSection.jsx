import ProductCard from './ProductCard';

function fmt(n) { return n.toLocaleString('vi-VN') + 'đ'; }

export default function ProductSection({ section, onAddToCart, bgAlt = false, compact = false }) {
  if (!section?.products?.length) return null;

  return (
    <section
      id={section.slug}
      className={`px-4 md:px-5 py-5 ${bgAlt ? 'bg-gray-50' : 'bg-white'}`}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-0.5 h-5 bg-red-700 rounded-full block flex-shrink-0" />
          <h3 className="font-bold text-gray-800 text-sm md:text-base">{section.name}</h3>
          <span className="text-xs text-gray-400 hidden sm:inline">({section.products.length} sản phẩm)</span>
        </div>
        <a
          href={`/danh-muc/${section.slug}`}
          className="flex items-center gap-1 text-red-700 text-xs font-semibold hover:text-red-800 whitespace-nowrap"
        >
          Xem tất cả
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Products grid – max 10, 5 per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {section.products.slice(0, 10).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
