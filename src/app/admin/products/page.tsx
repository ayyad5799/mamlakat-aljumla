'use client';
import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, formatPrice } from '@/lib/data';

export default function AdminProducts() {
  const [query, setQuery] = useState('');
  const filtered = PRODUCTS.filter(
    (p) => p.nameAr.includes(query) || p.category.includes(query)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-ink">المنتجات</h1>
          <p className="text-sm text-ink/40">{PRODUCTS.length} منتج إجمالاً</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C9973A] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#E8B84B] transition-colors">
          <Plus size={16} /> إضافة منتج
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute top-3 right-3 text-ink/30" />
        <input
          className="w-full border border-gray-200 rounded-lg pr-9 pl-4 py-2.5 text-sm focus:outline-none focus:border-[#C9973A] bg-white"
          placeholder="ابحث باسم المنتج أو التصنيف..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-right px-4 py-3 font-bold text-ink/60">المنتج</th>
              <th className="text-right px-4 py-3 font-bold text-ink/60">التصنيف</th>
              <th className="text-right px-4 py-3 font-bold text-ink/60">السعر</th>
              <th className="text-right px-4 py-3 font-bold text-ink/60">المخزون</th>
              <th className="text-right px-4 py-3 font-bold text-ink/60">التقييم</th>
              <th className="text-right px-4 py-3 font-bold text-ink/60">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F5EFE6] rounded-lg flex items-center justify-center text-xl">
                      {p.emoji}
                    </div>
                    <div>
                      <p className="font-bold">{p.nameAr}</p>
                      {p.isNew && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">جديد</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink/60">{p.category}</td>
                <td className="px-4 py-3">
                  <span className="font-bold">{formatPrice(p.price)}</span>
                  {p.originalPrice && (
                    <span className="text-ink/30 line-through text-xs block">{formatPrice(p.originalPrice)}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${p.stockCount < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                    {p.stockCount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-amber-500">★</span> {p.rating} ({p.reviewCount})
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/product/${p.slug}`} className="p-1.5 text-ink/30 hover:text-blue-500 transition-colors">
                      <Eye size={15} />
                    </Link>
                    <button className="p-1.5 text-ink/30 hover:text-[#C9973A] transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button className="p-1.5 text-ink/30 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
