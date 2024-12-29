import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UsrState {
    setAccessToken: (name: string) => void;
    setRefreshToken: (name: string) => void;
    accessToken?: string;
    refreshToken?: string;
}

const useUsrStore = create<UsrState>()(
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

export default useUsrStore;
