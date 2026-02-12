import { create } from "zustand";

export const useAuthStore = create((set)=>({
    // Estado inicial
    isLoggedIn: false,

    // Acciones para modificar el estado
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}))