import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearTokens: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "token-storage",
    }
  )
);
