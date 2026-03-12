'use client';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/store';
import { formatPrice, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/data';

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();
  const subtotal = total();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = subtotal + shipping;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="text-7xl mb-6">🛍</div>
          <h2 className="text-2xl font-black mb-2">سلتك فارغة</h2>
          <p className="text-ink/50 mb-8">لم تضف أي منتجات بعد</p>
          <Link href="/" className="btn-primary inline-block">تصفح المنتجات</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black mb-8 flex items-center gap-2">
          <ShoppingBag size={24} /> سلة التسوق
          <span className="text-sm font-normal text-ink/40 mr-2">({items.length} منتج)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="card flex gap-4 p-4">
                <div className="w-24 h-28 bg-sand rounded-xl flex items-center justify-center text-4xl shrink-0">
                  {item.product.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Link href={`/product/${item.product.slug}`} className="font-bold hover:text-gold transition-colors">
                      {item.product.nameAr}
                    </Link>
                    <button onClick={() => removeItem(item.product.id)} className="text-ink/30 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {item.selectedColor && <p className="text-xs text-ink/40 mt-1">اللون: {item.selectedColor}</p>}
                  {item.selectedSize && <p className="text-xs text-ink/40">المقاس: {item.selectedSize}</p>}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-sand2 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-sand transition-colors"
                      ><Minus size={14} /></button>
                      <span className="px-3 text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-sand transition-colors"
                      ><Plus size={14} /></button>
                    </div>
                    <span className="font-black">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-black text-lg mb-4">ملخص الطلب</h2>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-ink/60">المجموع الفرعي</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/60">الشحن</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-sage' : ''}`}>
                    {shipping === 0 ? 'مجاني 🎉' : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-gold bg-gold/10 rounded-lg p-2">
                    أضف {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} للحصول على شحن مجاني
                  </p>
                )}
                <div className="border-t border-sand2 pt-3 flex justify-between text-base">
                  <span className="font-bold">الإجمالي</span>
                  <span className="font-black text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input placeholder="كود الخصم" className="input text-sm flex-1" />
                <button className="btn-outline text-sm px-4">تطبيق</button>
              </div>

              <Link href="/checkout" className="btn-dark w-full text-center block py-4 rounded-xl font-black text-base">
                إتمام الطلب ←
              </Link>

              <div className="flex justify-center gap-4 mt-4 text-2xl">
                {['🏦', '🍎', '💳', '📱'].map((i) => (
                  <span key={i} title="وسائل الدفع">{i}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
