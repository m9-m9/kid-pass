import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    chldrnNo: string;
    setChldrnNo: (no: string) => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            chldrnNo: "",
            setChldrnNo: (no: string) => set(() => ({ chldrnNo: no })),
        }),
        {
            name: "userInfo",
        },
    ),
);

export default useUserStore;
