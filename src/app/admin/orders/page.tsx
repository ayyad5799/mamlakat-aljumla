'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

const ORDERS = [
  { id: 'NQ-100231', customer: 'سارة المحمد', phone: '0501234567', city: 'الرياض', items: 2, total: 349, status: 'delivered', payment: 'Apple Pay', date: '١٢ يناير ٢٠٢٥' },
  { id: 'NQ-100230', customer: 'فاطمة العلي', phone: '0559876543', city: 'جدة', items: 3, total: 890, status: 'shipped', payment: 'مدى', date: '١٢ يناير ٢٠٢٥' },
  { id: 'NQ-100229', customer: 'نورة القحطاني', phone: '0533456789', city: 'الدمام', items: 1, total: 1250, status: 'confirmed', payment: 'تابي', date: '١١ يناير ٢٠٢٥' },
  { id: 'NQ-100228', customer: 'منى السعيد', phone: '0512345678', city: 'مكة', items: 2, total: 449, status: 'pending', payment: 'الدفع عند الاستلام', date: '١١ يناير ٢٠٢٥' },
  { id: 'NQ-100227', customer: 'هيفاء الزهراني', phone: '0543216789', city: 'الطائف', items: 1, total: 3890, status: 'pending', payment: 'Visa', date: '١٠ يناير ٢٠٢٥' },
  { id: 'NQ-100226', customer: 'ريم البقمي', phone: '0567891234', city: 'الخبر', items: 4, total: 720, status: 'cancelled', payment: 'مدى', date: '١٠ يناير ٢٠٢٥' },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'قيد الانتظار', cls: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'مؤكد', cls: 'bg-blue-100 text-blue-800' },
  shipped:   { label: 'تم الشحن', cls: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'تم التسليم', cls: 'bg-green-100 text-green-800' },
  cancelled: { label: 'ملغي', cls: 'bg-red-100 text-red-800' },
};

export default function AdminOrders() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = ORDERS.filter((o) => {
    const matchStatus = filter === 'all' || o.status === filter;
    const matchQuery = o.customer.includes(query) || o.id.includes(query);
    return matchStatus && matchQuery;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-ink">الطلبات</h1>
        <p className="text-sm text-ink/40">{ORDERS.length} طلب إجمالاً</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === s
                ? 'bg-[#1A1208] text-white'
                : 'bg-white border border-gray-200 text-ink/60 hover:border-[#C9973A]'
            }`}
          >
            {s === 'all' ? 'الكل' : STATUS_MAP[s].label}
          </button>
        ))}
        <div className="relative mr-auto">
          <Search size={14} className="absolute top-2.5 right-3 text-ink/30" />
          <input
            placeholder="بحث..."
            className="border border-gray-200 rounded-lg pr-8 pl-3 py-1.5 text-xs focus:outline-none focus:border-[#C9973A]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['رقم الطلب', 'العميل', 'المدينة', 'المنتجات', 'الإجمالي', 'الدفع', 'الحالة', 'التاريخ'].map((h) => (
                <th key={h} className="text-right px-4 py-3 font-bold text-ink/60 text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-mono text-xs font-bold text-[#C9973A]">{o.id}</td>
                <td className="px-4 py-3">
                  <p className="font-bold">{o.customer}</p>
                  <p className="text-xs text-ink/40">{o.phone}</p>
                </td>
                <td className="px-4 py-3 text-ink/60">{o.city}</td>
                <td className="px-4 py-3 text-ink/60">{o.items} منتج</td>
                <td className="px-4 py-3 font-black">{o.total.toLocaleString('ar-SA')} ر.س</td>
                <td className="px-4 py-3 text-xs text-ink/60">{o.payment}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] px-2 py-1 rounded-full font-bold ${STATUS_MAP[o.status].cls}`}>
                    {STATUS_MAP[o.status].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-ink/40">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
