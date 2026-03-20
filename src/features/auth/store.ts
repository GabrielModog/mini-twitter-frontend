import { create } from "zustand";
import type { IUser } from "./types";

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (userData: AuthState['user'], accessToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
}

export const AuthStore = create<AuthState>(
  (set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: (userData, accessToken) =>
      set({
        user: userData,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }),

    logout: () =>
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      }),

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (err) => set({ error: err, isLoading: false }),
  })
)