'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart3, Settings, LogOut } from 'lucide-react';

const LINKS = [
  { href: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { href: '/admin/products', icon: Package, label: 'المنتجات' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'الطلبات' },
  { href: '/admin/customers', icon: Users, label: 'العملاء' },
  { href: '/admin/coupons', icon: Tag, label: 'الكوبونات' },
  { href: '/admin/analytics', icon: BarChart3, label: 'التقارير' },
  { href: '/admin/settings', icon: Settings, label: 'الإعدادات' },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="w-56 bg-[#1A1208] text-white flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="text-xl font-black">
          نَقاء<span className="text-[#C9973A]">.</span>
        </Link>
        <p className="text-xs text-white/30 mt-0.5">لوحة الإدارة</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {LINKS.map(({ href, icon: Icon, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? 'bg-[#C9973A] text-white font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <LogOut size={17} />
          الخروج للمتجر
        </Link>
      </div>
    </aside>
  );
}
