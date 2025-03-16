import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  setAccessToken: (name: string) => void;
  setRefreshToken: (name: string) => void;
  setCrtChldrnNo: (key: string) => void;
  setUserInfo: (userInfo: {
    name: string;
    email: string;
    profileImage: string;
  }) => void;
  accessToken?: string;
  refreshToken?: string;
  crtChldrnNo?: string;
  userInfo?: {
    name: string;
    email: string;
    profileImage: string;
  };
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: undefined,
      refreshToken: undefined,
      crtChldrnNo: undefined,
      setAccessToken: (v: string) => set(() => ({ accessToken: v })),
      setRefreshToken: (v: string) => set(() => ({ refreshToken: v })),
      setCrtChldrnNo: (v: string) => set(() => ({ crtChldrnNo: v })),
      setUserInfo: (v: { name: string; email: string; profileImage: string }) =>
        set(() => ({ userInfo: v })),
    }),
    {
      name: "kidlove", // localstorage key
    }
  )
);

export default useAuthStore;
