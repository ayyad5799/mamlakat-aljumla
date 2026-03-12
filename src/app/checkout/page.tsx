'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/lib/store';
import { formatPrice, CITIES, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'mada', label: 'مدى', icon: '🏦', desc: 'بطاقة مدى السعودية' },
  { id: 'apple', label: 'Apple Pay', icon: '🍎', desc: 'ادفع بـ Apple Pay' },
  { id: 'visa', label: 'Visa / Mastercard', icon: '💳', desc: 'بطاقة ائتمانية أو خصم' },
  { id: 'tabby', label: 'تابي', icon: '📱', desc: 'ادفع على ٤ دفعات بدون فوائد' },
  { id: 'tamara', label: 'تمارا', icon: '💰', desc: 'قسّم على ٣ أشهر' },
  { id: 'cod', label: 'الدفع عند الاستلام', icon: '💵', desc: 'ادفع نقداً عند التوصيل' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const subtotal = total();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = subtotal + shipping;

  const [step, setStep] = useState<'info' | 'payment' | 'done'>('info');
  const [form, setForm] = useState({
    name: '', phone: '', city: '', address: '', notes: '',
  });
  const [payment, setPayment] = useState('mada');
  const [orderNum] = useState(() => 'NQ-' + Math.floor(100000 + Math.random() * 900000));

  const handleSubmit = () => {
    clearCart();
    setStep('done');
  };

  if (step === 'done') {
    return (
      <>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <CheckCircle size={64} className="text-sage mx-auto mb-4" />
          <h1 className="text-3xl font-black mb-2">تم استلام طلبك! 🎉</h1>
          <p className="text-ink/50 mb-2">رقم طلبك: <strong className="text-gold">{orderNum}</strong></p>
          <p className="text-sm text-ink/40 mb-8">سيصلك رسالة تأكيد على واتساب قريباً</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            العودة للمتجر
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black mb-8">إتمام الطلب</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          {['معلومات التوصيل', 'طريقة الدفع'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                (i === 0 && step === 'info') || (i === 1 && step === 'payment')
                  ? 'bg-gold text-white'
                  : i === 0 && step === 'payment' ? 'bg-sage text-white' : 'bg-sand2 text-ink/50'
              }`}>{i + 1}</span>
              <span className={step === (i === 0 ? 'info' : 'payment') ? 'font-bold' : 'text-ink/40'}>{s}</span>
              {i === 0 && <span className="text-ink/20 mx-1">←</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'info' ? (
              <div className="card p-6 space-y-4">
                <h2 className="font-black">معلومات التوصيل</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink/60 block mb-1">الاسم الكامل *</label>
                    <input className="input" placeholder="محمد العمري"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink/60 block mb-1">رقم الجوال *</label>
                    <input className="input" placeholder="05xxxxxxxx" dir="ltr"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-ink/60 block mb-1">المدينة *</label>
                  <select className="input" value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}>
                    <option value="">اختر المدينة</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-ink/60 block mb-1">العنوان التفصيلي *</label>
                  <textarea className="input resize-none" rows={3}
                    placeholder="الحي، الشارع، رقم المبنى..."
                    value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold text-ink/60 block mb-1">ملاحظات (اختياري)</label>
                  <input className="input" placeholder="أي تعليمات خاصة للتوصيل"
                    value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <button
                  onClick={() => {
                    if (form.name && form.phone && form.city && form.address) setStep('payment');
                  }}
                  className="btn-dark w-full py-4 rounded-xl font-black text-base"
                >
                  التالي: طريقة الدفع ←
                </button>
              </div>
            ) : (
              <div className="card p-6">
                <h2 className="font-black mb-4">اختر طريقة الدفع</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        payment === m.id ? 'border-gold bg-gold/5' : 'border-sand2 hover:border-gold/40'
                      }`}
                    >
                      <input type="radio" name="payment" value={m.id} checked={payment === m.id}
                        onChange={() => setPayment(m.id)} className="hidden" />
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <p className="font-bold text-sm">{m.label}</p>
                        <p className="text-xs text-ink/40">{m.desc}</p>
                      </div>
                      {payment === m.id && <CheckCircle size={18} className="text-gold mr-auto" />}
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('info')} className="btn-outline flex-1 py-4 rounded-xl">
                    ← رجوع
                  </button>
                  <button onClick={handleSubmit} className="btn-dark flex-1 py-4 rounded-xl font-black text-base">
                    تأكيد الطلب 🎉
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h3 className="font-black mb-4">ملخص الطلب</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 text-sm">
                    <span className="text-2xl">{item.product.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{item.product.nameAr}</p>
                      <p className="text-ink/40">×{item.quantity}</p>
                    </div>
                    <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-sand2 pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ink/60">المجموع</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-ink/60">الشحن</span><span className={shipping === 0 ? 'text-sage font-bold' : ''}>{shipping === 0 ? 'مجاني' : formatPrice(shipping)}</span></div>
                <div className="flex justify-between font-black text-base pt-1 border-t border-sand2">
                  <span>الإجمالي</span><span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
