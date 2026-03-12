'use client';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/store/ProductCard';
import { PRODUCTS, formatPrice } from '@/lib/data';
import { useCart, useWish } from '@/lib/store';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const addItem = useCart((s) => s.addItem);
  const { toggle, has } = useWish();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<'desc' | 'shipping' | 'reviews'>('desc');
  const wished = has(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-ink/40 mb-6">
          <Link href="/" className="hover:text-gold">الرئيسية</Link>
          <ChevronRight size={12} />
          <Link href={`/category/${product.category}`} className="hover:text-gold">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-ink/70">{product.nameAr}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="aspect-[3/4] bg-sand rounded-2xl flex items-center justify-center relative">
            <span className="text-[140px]">{product.emoji}</span>
            {discount && (
              <span className="absolute top-4 right-4 badge-sale text-sm px-3 py-1">-{discount}٪</span>
            )}
            {product.isNew && (
              <span className="absolute top-4 left-4 badge-new text-sm px-3 py-1">جديد</span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs text-ink/40 uppercase tracking-widest mb-1">{product.category}</p>
              <h1 className="text-3xl font-black leading-snug">{product.nameAr}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-ink/20'}
                  />
                ))}
              </div>
              <span className="text-sm font-bold">{product.rating}</span>
              <span className="text-sm text-ink/40">({product.reviewCount} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-ink/30 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-red-600 text-sm font-bold bg-red-50 px-2 py-0.5 rounded">
                    وفّر {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm font-bold mb-2">اللون: <span className="text-gold">{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${
                      selectedColor === c
                        ? 'border-gold bg-gold/10 font-bold'
                        : 'border-sand2 hover:border-gold/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div>
                <p className="text-sm font-bold mb-2">المقاس: <span className="text-gold">{selectedSize}</span></p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[48px] py-2 px-3 rounded-lg text-sm border-2 transition-all font-medium ${
                        selectedSize === s
                          ? 'border-gold bg-gold/10 font-bold'
                          : 'border-sand2 hover:border-gold/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold">الكمية:</p>
              <div className="flex items-center border border-sand2 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 hover:bg-sand transition-colors text-lg font-bold"
                >−</button>
                <span className="px-4 py-2 font-bold min-w-[3rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 hover:bg-sand transition-colors text-lg font-bold"
                >+</button>
              </div>
              <span className="text-xs text-ink/40">{product.stockCount} قطعة متوفرة</span>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-base transition-all ${
                  added
                    ? 'bg-sage text-white'
                    : 'bg-ink text-white hover:bg-gold'
                }`}
              >
                <ShoppingBag size={18} />
                {added ? '✓ تمت الإضافة للسلة' : 'أضف للسلة'}
              </button>
              <button
                onClick={() => toggle(product.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  wished ? 'border-red-400 bg-red-50 text-red-500' : 'border-sand2 hover:border-gold text-ink/50'
                }`}
              >
                <Heart size={20} className={wished ? 'fill-red-500' : ''} />
              </button>
            </div>

            {/* Trust icons */}
            <div className="flex gap-4 pt-2 border-t border-sand2">
              {[
                { icon: <Truck size={16} />, text: 'شحن ٢–٤ أيام' },
                { icon: <RefreshCw size={16} />, text: 'إرجاع ١٤ يوم' },
                { icon: <Shield size={16} />, text: 'دفع آمن' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-1.5 text-xs text-ink/50">
                  {t.icon} {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-16">
          <div className="flex border-b border-sand2 gap-6 mb-6">
            {([['desc', 'الوصف'], ['shipping', 'الشحن'], ['reviews', 'التقييمات']] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                  tab === id ? 'border-gold text-ink' : 'border-transparent text-ink/40 hover:text-ink/70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'desc' && (
            <p className="text-ink/70 leading-relaxed max-w-2xl">{product.description}</p>
          )}
          {tab === 'shipping' && (
            <div className="space-y-3 text-sm text-ink/70 max-w-lg">
              <p>🚚 شحن سريع خلال ٢–٤ أيام عمل لجميع مناطق المملكة</p>
              <p>📦 شحن مجاني للطلبات التي تتجاوز ٢٠٠ ريال سعودي</p>
              <p>🔄 إمكانية الإرجاع المجاني خلال ١٤ يوماً من الاستلام</p>
              <p>📍 نوصل لجميع مناطق المملكة العربية السعودية</p>
            </div>
          )}
          {tab === 'reviews' && (
            <div className="space-y-4 max-w-xl">
              {[
                { name: 'سارة م.', rating: 5, text: 'جودة ممتازة وتوصيل سريع، راضية جداً' },
                { name: 'نورة ع.', rating: 4, text: 'المنتج جميل جداً، اللون طابق الصورة تماماً' },
                { name: 'منى ح.', rating: 5, text: 'أنصح بالشراء، خامة فاخرة وسعر معقول' },
              ].map((r) => (
                <div key={r.name} className="bg-sand rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-gold">
                      {r.name[0]}
                    </div>
                    <span className="font-bold text-sm">{r.name}</span>
                    <div className="flex gap-0.5 mr-auto">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={11} className="fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-ink/60">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-black mb-6">منتجات <span className="text-gold">مشابهة</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
