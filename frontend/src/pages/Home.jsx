import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import ProductSection from '../components/ProductSection';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

// Group header banner (e.g. "ẤM TỬ SA CAO CẤP")
function GroupHeader({ group }) {
  const colors = {
    'am-tu-sa':  { bg: 'bg-[#7B2D2D]', text: 'Bộ sưu tập ấm tử sa Nghi Hưng nguyên khoáng cao cấp' },
    'bo-am-tra': { bg: 'bg-[#4A3728]', text: 'Bộ ấm trà, chén, khay và phụ kiện trà đạo tinh tế' },
    'dung-cu':   { bg: 'bg-[#2C4A3A]', text: 'Dụng cụ pha trà chuyên nghiệp, hũ đựng và thuyền trà' },
  };
  const c = colors[group.slug] || { bg: 'bg-gray-700', text: '' };

  return (
    <div className={`${c.bg} text-white px-5 py-3.5 flex items-center justify-between rounded-t-xl`}>
      <div>
        <h2 className="font-bold text-base uppercase tracking-wide">{group.name}</h2>
        <p className="text-white/60 text-xs mt-0.5">{c.text}</p>
      </div>
      <span className="text-white/40 text-xs">{group.sections.reduce((s, sec) => s + sec.products.length, 0)}+ sản phẩm</span>
    </div>
  );
}

// Skeleton for loading state
function Skeleton() {
  return (
    <div className="mb-6">
      <div className="h-14 bg-gray-200 rounded-t-xl animate-pulse" />
      <div className="bg-white rounded-b-xl p-4">
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl" style={{ paddingBottom: '100%' }} />
              <div className="p-2 space-y-1.5">
                <div className="h-2.5 bg-gray-200 rounded w-full" />
                <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [groups, setGroups]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products/by-group')
      .then(res => setGroups(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <HeroBanner />
      <CategorySection />

      <div id="products" className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-0">
        {loading ? (
          <><Skeleton /><Skeleton /><Skeleton /></>
        ) : (
          groups.map((group, gi) => (
            <div key={group.id} className={`mb-8 rounded-xl overflow-hidden shadow-sm border border-gray-200`}>
              <GroupHeader group={group} />
              <div className="bg-white divide-y divide-gray-100">
                {group.sections.map((section, si) => (
                  <ProductSection
                    key={section.id}
                    section={section}
                    bgAlt={si % 2 === 1}
                    compact
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <BlogSection />
      <Footer />
      <FloatingContact />
    </div>
  );
}
