'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from './data';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

interface WishStore {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, color, size) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
        );
        if (existing) {
          set({ items: items.map((i) => i === existing ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...items, { product, quantity: 1, selectedColor: color, selectedSize: size }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.product.id !== id) }),
      updateQty: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set({ items: get().items.map((i) => i.product.id === id ? { ...i, quantity: qty } : i) });
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'naqaa-cart' }
  )
);

export const useWish = create<WishStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids;
        set({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] });
      },
      has: (id) => get().ids.includes(id),
    }),
    { name: 'naqaa-wish' }
  )
);
