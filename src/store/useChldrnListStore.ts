import { create } from "zustand";
import { persist } from "zustand/middleware";


interface ChildInfo {
    chldrnNo: number;
    chldrnNm: string;
}

interface ChldrnListState {
    children: ChildInfo[];
    setChldrnList: (info: ChildInfo[]) => void;
}

const useChldrnListStore = create<ChldrnListState>()(
    persist(
        (set) => ({
            children: [],
            setChldrnList: (info) => set(() => ({ 
                children: info
            })),
        }),
        {
            name: "chldrnList",
        },
    ),
);

export default useChldrnListStore;