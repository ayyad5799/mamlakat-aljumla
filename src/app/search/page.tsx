'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/store/ProductCard';
import { PRODUCTS } from '@/lib/data';

function SearchResults() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const results = PRODUCTS.filter((p) =>
    p.nameAr.includes(q) || p.tags.some((t) => t.includes(q)) || p.description.includes(q)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black mb-1">نتائج البحث عن: <span className="text-gold">"{q}"</span></h1>
      <p className="text-sm text-ink/40 mb-8">{results.length} نتيجة</p>
      {results.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-7xl mb-4">🔍</div>
          <p className="font-black text-xl mb-2">لا توجد نتائج</p>
          <p className="text-ink/40">جرّب كلمات أخرى مثل: عباءة، كنبة، سجادة</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="p-10 text-center">جاري البحث...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
}
