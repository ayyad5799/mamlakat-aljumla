import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/store/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/data';

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = PRODUCTS.filter((p) => p.isNew);

  return (
    <>
      <Navbar />
      <main>
        {/* ===== HERO ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          <div className="bg-ink px-8 lg:px-16 py-16 flex flex-col justify-center gap-6">
            <span className="inline-block bg-gold text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-sm w-fit">
              تشكيلة صيف ٢٠٢٥
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05]">
              أناقة<br />تُعبّر عن<br />
              <em className="not-italic text-gold">هويّتك</em>
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              عباءات مصممة بدقة، مفروشات فاخرة — كل قطعة تحكي قصة ذوق رفيع.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/category/womens" className="btn-primary text-sm">
                تسوّق الآن
              </Link>
              <Link href="/category/home" className="btn-outline text-sm text-white border-white/30 hover:border-white">
                استكشف المفروشات
              </Link>
            </div>
          </div>
          <div className="bg-sand relative flex items-center justify-center overflow-hidden min-h-[320px]">
            <div className="absolute w-64 h-64 rounded-full bg-sand2" />
            <div className="relative z-10 text-center">
              <div className="text-[120px] leading-none">🧕</div>
              <p className="text-ink/40 text-sm mt-2">التشكيلة الجديدة</p>
            </div>
            <div className="absolute bottom-6 left-6 bg-ink text-white rounded-lg px-4 py-3 text-sm">
              <strong className="text-gold text-xl block">+٢٠٠٠</strong>
              منتج متاح الآن
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <div className="bg-gold">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 lg:gap-12 text-white text-center">
            {[
              { v: '٥٠٪', l: 'خصم على المفروشات' },
              { v: 'شحن مجاني', l: 'للطلبات فوق ٢٠٠ ريال' },
              { v: '١٤ يوم', l: 'سياسة الإرجاع المجاني' },
              { v: '٢٤/٧', l: 'دعم العملاء' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-black text-lg">{s.v}</div>
                <div className="text-xs opacity-80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CATEGORIES ===== */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-black">تصفح <span className="text-gold">التصنيفات</span></h2>
            <Link href="/categories" className="text-sm text-gold font-bold hover:underline">عرض الكل →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
                style={{ background: cat.bgColor }}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                <div className="absolute bottom-0 right-0 left-0 p-2 text-center"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
                  <p className="text-white text-xs font-bold leading-tight">{cat.name}</p>
                  <p className="text-white/60 text-[10px]">{cat.count} منتج</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== FEATURED PRODUCTS ===== */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-black">المنتجات <span className="text-gold">المميزة</span></h2>
            <Link href="/products" className="text-sm text-gold font-bold hover:underline">عرض الكل →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* ===== PROMO BANNER ===== */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-ink rounded-2xl px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-gold/10" />
            <div>
              <h2 className="text-3xl font-black text-white">
                خصم <em className="not-italic text-gold">١٥٪</em> على أول طلب
              </h2>
              <p className="text-white/50 text-sm mt-1">سجّل الآن واحصل على الكود فوراً</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="border-2 border-dashed border-gold/60 bg-gold/10 px-8 py-3 rounded-xl text-gold text-2xl font-black tracking-widest cursor-pointer hover:bg-gold/20 transition-colors"
                onClick={() => navigator.clipboard?.writeText('NAQAA15')}
              >
                NAQAA15
              </div>
              <p className="text-white/30 text-xs">اضغط لنسخ الكود</p>
            </div>
          </div>
        </div>

        {/* ===== NEW ARRIVALS ===== */}
        {newArrivals.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="text-2xl font-black">وصل <span className="text-gold">حديثاً</span> ✨</h2>
              <Link href="/new" className="text-sm text-gold font-bold hover:underline">عرض الكل →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
