import { create } from 'zustand';

const TOKEN_KEY = 'coffee_token';
const USER_KEY = 'coffee_user';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  hydrated: false,
  hydrate: () => {
    if (typeof window === 'undefined' || get().hydrated) return;
    const token = localStorage.getItem(TOKEN_KEY);
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      user = null;
    }
    set({ token, user, hydrated: true });
  },
  login: ({ user, token }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    set({ user, token, hydrated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    set({ user: null, token: null, hydrated: true });
  },
  isAdmin: () => get().user?.role === 'admin',
}));
