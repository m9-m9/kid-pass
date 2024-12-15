import { create } from "zustand";

interface UsrState {
  setAccessToken: (name: string) => void;
  setRefreshToken: (name: string) => void;
  accessToken?: string;
  refreshToken?: string;
}

const useUsrStore = create<UsrState>((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  setAccessToken: (v: string) => set(() => ({ accessToken: v })),
  setRefreshToken: (v: string) => set(() => ({ refreshToken: v })),
}));

export default useUsrStore;
