'use client';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/store/ProductCard';
import { useWish } from '@/lib/store';
import { PRODUCTS } from '@/lib/data';

export default function WishlistPage() {
  const { ids } = useWish();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black mb-2">المفضلة ♡</h1>
        <p className="text-sm text-ink/40 mb-8">{products.length} منتج</p>
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">🤍</div>
            <h2 className="text-xl font-black mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-ink/40 mb-6">اضغط على قلب أي منتج لحفظه هنا</p>
            <Link href="/" className="btn-primary">تصفح المنتجات</Link>
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
