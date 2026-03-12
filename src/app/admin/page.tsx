import { TrendingUp, ShoppingCart, Users, Package, AlertCircle } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';

const STATS = [
  { label: 'المبيعات هذا الشهر', value: '٤٨,٣٢٠ ر.س', change: '+١٢٪', icon: TrendingUp, color: 'bg-green-50 text-green-700' },
  { label: 'الطلبات الجديدة', value: '٢٣٧', change: '+٨٪', icon: ShoppingCart, color: 'bg-blue-50 text-blue-700' },
  { label: 'العملاء', value: '١,٨٤٥', change: '+٢٣٪', icon: Users, color: 'bg-purple-50 text-purple-700' },
  { label: 'المنتجات النشطة', value: String(PRODUCTS.length), change: '', icon: Package, color: 'bg-amber-50 text-amber-700' },
];

const RECENT_ORDERS = [
  { id: 'NQ-100231', customer: 'سارة المحمد', city: 'الرياض', total: '٣٤٩ ر.س', status: 'delivered', date: 'منذ ٢ ساعة' },
  { id: 'NQ-100230', customer: 'فاطمة العلي', city: 'جدة', total: '٨٩٠ ر.س', status: 'shipped', date: 'منذ ٣ ساعات' },
  { id: 'NQ-100229', customer: 'نورة القحطاني', city: 'الدمام', total: '١,٢٥٠ ر.س', status: 'confirmed', date: 'منذ ٥ ساعات' },
  { id: 'NQ-100228', customer: 'منى السعيد', city: 'مكة', total: '٤٤٩ ر.س', status: 'pending', date: 'منذ ٦ ساعات' },
  { id: 'NQ-100227', customer: 'هيفاء الزهراني', city: 'الطائف', total: '٣,٨٩٠ ر.س', status: 'pending', date: 'منذ ٨ ساعات' },
];

const LOW_STOCK = PRODUCTS.filter((p) => p.stockCount < 20);

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'قيد الانتظار', cls: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'مؤكد', cls: 'bg-blue-100 text-blue-800' },
  shipped:   { label: 'تم الشحن', cls: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'تم التسليم', cls: 'bg-green-100 text-green-800' },
  cancelled: { label: 'ملغي', cls: 'bg-red-100 text-red-800' },
};

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-ink">لوحة التحكم</h1>
        <p className="text-sm text-ink/40">مرحباً، هذه نظرة عامة على متجرك اليوم</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className={`inline-flex p-2 rounded-lg mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-black text-ink">{s.value}</p>
            <p className="text-xs text-ink/50 mt-0.5">{s.label}</p>
            {s.change && (
              <p className="text-xs text-green-600 font-bold mt-1">{s.change} هذا الشهر</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <h2 className="font-black">آخر الطلبات</h2>
            <a href="/admin/orders" className="text-xs text-[#C9973A] font-bold hover:underline">عرض الكل</a>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_ORDERS.map((o) => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-bold">{o.customer}</p>
                  <p className="text-xs text-ink/40">{o.id} · {o.city} · {o.date}</p>
                </div>
                <span className="font-black text-sm">{o.total}</span>
                <span className={`text-[11px] px-2 py-1 rounded-full font-bold ${STATUS_MAP[o.status].cls}`}>
                  {STATUS_MAP[o.status].label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <AlertCircle size={16} className="text-amber-500" />
            <h2 className="font-black">مخزون منخفض</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {LOW_STOCK.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <span className="text-xl">{p.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold line-clamp-1">{p.nameAr}</p>
                  <p className="text-xs text-amber-600 font-bold">متبقي: {p.stockCount} قطعة</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
