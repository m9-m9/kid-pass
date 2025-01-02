import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    setAccessToken: (name: string) => void;
    setRefreshToken: (name: string) => void;
    accessToken?: string;
    refreshToken?: string;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: undefined,
            refreshToken: undefined,
            setAccessToken: (v: string) => set(() => ({ accessToken: v })),
            setRefreshToken: (v: string) => set(() => ({ refreshToken: v })),
        }),
        {
            name: "kidlove", // localstorage key
        },
    ),
);

export default useAuthStore;
