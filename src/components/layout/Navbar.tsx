'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart, useWish } from '@/lib/store';
import { CATEGORIES } from '@/lib/data';

export default function Navbar() {
  const cartCount = useCart((s) => s.count());
  const wishIds = useWish((s) => s.ids);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-ink text-white text-xs py-2 text-center tracking-wide">
        شحن مجاني للطلبات فوق ٢٠٠ ريال 🚚 &nbsp;|&nbsp; الدفع الآمن بمدى وApple Pay وتابي 🔒
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 bg-cream transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-sand2'}`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
          {/* Mobile menu btn */}
          <button className="lg:hidden p-2 text-ink" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6 list-none">
            <li><Link href="/" className="text-sm font-medium text-ink/70 hover:text-gold transition-colors">الرئيسية</Link></li>
            {CATEGORIES.slice(0, 4).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="text-sm font-medium text-ink/70 hover:text-gold transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
            <li><Link href="/sale" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">العروض 🔥</Link></li>
          </ul>

          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tight text-ink">
            نَقاء<span className="text-gold">.</span>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button
              className="p-2 text-ink/70 hover:text-gold transition-colors relative"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="p-2 text-ink/70 hover:text-gold transition-colors relative">
              <Heart size={20} />
              {wishIds.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishIds.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="p-2 text-ink/70 hover:text-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="p-2 text-ink/70 hover:text-gold transition-colors">
              <User size={20} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="flex-1 bg-ink/50" onClick={() => setMobileOpen(false)} />
          <div className="w-72 bg-cream h-full shadow-2xl p-6 flex flex-col gap-4 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-black">نَقاء<span className="text-gold">.</span></span>
              <button onClick={() => setMobileOpen(false)}><X size={22} /></button>
            </div>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="flex items-center gap-3 py-3 border-b border-sand2 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-xl">{c.emoji}</span> {c.name}
                <span className="mr-auto text-ink/40 text-xs">{c.count}</span>
              </Link>
            ))}
            <Link href="/sale" className="text-red-600 font-bold py-3">العروض 🔥</Link>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-ink/70 flex items-start justify-center pt-24 px-4 animate-fade-in">
          <div className="bg-cream rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex gap-3 items-center">
              <Search size={20} className="text-ink/40" />
              <input
                autoFocus
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-ink/30"
                placeholder="ابحث عن منتج..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query) {
                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
              <button onClick={() => setSearchOpen(false)}><X size={20} /></button>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['عباءة', 'كنبة', 'سجادة', 'ثوب'].map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${tag}`}
                  className="text-xs bg-sand2 px-3 py-1.5 rounded-full hover:bg-gold hover:text-white transition-colors"
                  onClick={() => setSearchOpen(false)}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
