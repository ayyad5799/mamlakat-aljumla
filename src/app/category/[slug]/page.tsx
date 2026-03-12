'use client';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/store/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/data';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  const [sort, setSort] = useState('default');
  const [priceMax, setPriceMax] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => !params.slug || p.category === params.slug || params.slug === 'all');
    if (priceMax < 10000) list = list.filter((p) => p.price <= priceMax);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'newest') list = [...list].filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
    return list;
  }, [params.slug, sort, priceMax]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black">
              {category?.emoji} {category?.name ?? 'جميع المنتجات'}
            </h1>
            <p className="text-sm text-ink/40">{products.length} منتج</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm border border-sand2 px-4 py-2 rounded-lg hover:border-gold transition-colors"
            >
              <SlidersHorizontal size={16} /> تصفية
            </button>
            <select
              className="text-sm border border-sand2 px-3 py-2 rounded-lg focus:outline-none focus:border-gold bg-white"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="newest">الأحدث أولاً</option>
            </select>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-sand rounded-xl p-5 mb-6 flex flex-wrap gap-6 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-bold block mb-2">
                الحد الأقصى للسعر: <span className="text-gold">{priceMax.toLocaleString('ar-SA')} ر.س</span>
              </label>
              <input
                type="range" min="50" max="10000" step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#C9973A]"
              />
            </div>
            <button
              onClick={() => { setSort('default'); setPriceMax(10000); setShowFilters(false); }}
              className="flex items-center gap-1 text-sm text-ink/50 hover:text-red-500 transition-colors"
            >
              <X size={14} /> إعادة تعيين
            </button>
          </div>
        )}

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 text-ink/40">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-bold">لا توجد منتجات بهذه المواصفات</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
