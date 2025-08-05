import { create } from 'zustand';
export const useTokenStore = create((set) => ({
    token: null,
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
}));
