import { create } from 'zustand';

const CART_KEY = 'coffee_cart';

function save(items) {
  if (typeof window !== 'undefined') localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function load() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set, get) => ({
  items: [],
  hydrated: false,
  hydrate: () => {
    if (!get().hydrated) set({ items: load(), hydrated: true });
  },
  addItem: (product, quantity = 1) => {
    const items = [...get().items];
    const found = items.find((item) => item._id === product._id);
    if (found) found.quantity += quantity;
    else items.push({ ...product, quantity });
    save(items);
    set({ items });
  },
  removeItem: (id) => {
    const items = get().items.filter((item) => item._id !== id);
    save(items);
    set({ items });
  },
  updateQuantity: (id, quantity) => {
    const qty = Math.max(1, Number(quantity));
    const items = get().items.map((item) => item._id === id ? { ...item, quantity: qty } : item);
    save(items);
    set({ items });
  },
  clearCart: () => {
    save([]);
    set({ items: [] });
  },
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
