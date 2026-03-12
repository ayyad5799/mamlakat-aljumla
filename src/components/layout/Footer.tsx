import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-16">
      {/* Trust Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: '🚚', title: 'شحن سريع', sub: '٢–٤ أيام داخل المملكة' },
            { icon: '🔄', title: 'إرجاع مجاني', sub: 'خلال ١٤ يوم' },
            { icon: '🔒', title: 'دفع آمن', sub: 'مدى · Apple Pay · تابي' },
            { icon: '💬', title: 'دعم ٢٤/٧', sub: 'واتساب وخدمة العملاء' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <span className="font-bold text-sm">{item.title}</span>
              <span className="text-xs text-white/50">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-black mb-4">نَقاء<span className="text-gold">.</span></h3>
          <p className="text-white/50 text-sm leading-relaxed">
            متجرك المفضل للملابس والمفروشات الفاخرة في المملكة العربية السعودية.
          </p>
          <div className="flex gap-3 mt-4">
            {['إكس', 'إنستقرام', 'تيك توك'].map((s) => (
              <a key={s} href="#" className="text-xs text-white/40 hover:text-gold transition-colors">{s}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4 text-white/80">أقسام المتجر</h4>
          <ul className="space-y-2">
            {['عباءات وملابس نسائية', 'ملابس رجالية', 'ملابس أطفال', 'مفروشات', 'سجاد', 'العروض'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-white/50 hover:text-gold transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4 text-white/80">خدمة العملاء</h4>
          <ul className="space-y-2">
            {['تتبع طلبك', 'سياسة الإرجاع', 'الشحن والتوصيل', 'الأسئلة الشائعة', 'تواصل معنا'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-white/50 hover:text-gold transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4 text-white/80">النشرة البريدية</h4>
          <p className="text-xs text-white/40 mb-3">اشترك للحصول على عروض حصرية</p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-gold"
            />
            <button className="btn-primary text-sm py-2">اشترك</button>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {['🏦 مدى', '🍎 Apple Pay', '💳 Visa', '📱 تابي'].map((p) => (
              <span key={p} className="text-xs bg-white/10 px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-white/30">
        © {new Date().getFullYear()} نَقاء — جميع الحقوق محفوظة | مسجل في المملكة العربية السعودية
      </div>
    </footer>
  );
}
