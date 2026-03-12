'use client';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart, useWish } from '@/lib/store';
import { Product, formatPrice, calcDiscount } from '@/lib/data';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const { toggle, has } = useWish();
  const [added, setAdded] = useState(false);
  const wished = has(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0], product.sizes?.[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice ? calcDiscount(product.price, product.originalPrice) : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image area */}
        <div className="relative aspect-[3/4] bg-sand flex items-center justify-center overflow-hidden">
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {discount && <span className="badge-sale">-{discount}٪</span>}
            {product.isNew && <span className="badge-new">جديد</span>}
          </div>

          {/* Wishlist */}
          <button
            className="absolute top-2 left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:scale-110 transition-transform"
            onClick={(e) => { e.preventDefault(); toggle(product.id); }}
          >
            <Heart
              size={16}
              className={wished ? 'fill-red-500 text-red-500' : 'text-ink/40'}
            />
          </button>

          {/* Quick add overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAdd}
              className={`w-full py-3 text-sm font-bold text-white transition-colors ${
                added ? 'bg-sage' : 'bg-ink hover:bg-gold'
              }`}
            >
              {added ? '✓ تمت الإضافة' : 'أضف للسلة'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-ink/40 mb-1">{product.category}</p>
          <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2">{product.nameAr}</h3>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="flex gap-1 mb-2">
              {product.colors.slice(0, 3).map((c) => (
                <span key={c} className="text-[10px] bg-sand px-1.5 py-0.5 rounded text-ink/60">{c}</span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-ink/40">+{product.colors.length - 3}</span>
              )}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star size={11} className="fill-gold text-gold" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-ink/30">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-black text-base">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-ink/30 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
