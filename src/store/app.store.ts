// src/store/app.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string,  navigate: (path: string) => void) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password,navigate) => {
        // Mock validation for now
        if (email === 'chetan@scriptassist.com' && password === 'password') {
          set({ isAuthenticated: true, user: { email } });
          navigate('/dashboard');
        } else {
          alert('Invalid credentials');
        }
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage', // Name for localStorage
    }
  )
);