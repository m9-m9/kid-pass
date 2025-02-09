import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChildInfo {
  chldrnNo: string;
  chldrnNm: string;
  chldrnSexdstn: string;
}
interface ChldrnListState {
  children: ChildInfo[];
  currentKid: string | null;
  setChldrnList: (info: ChildInfo[]) => void;
  setCurrentKid: (kidNo: string) => void;
}

const useChldrnListStore = create<ChldrnListState>()(
  persist(
    (set) => ({
      children: [],
      currentKid: null,
      setChldrnList: (info) => set(() => ({ children: info })),
      setCurrentKid: (kidNo) => {
        localStorage.setItem("currentkid", kidNo);
        set(() => ({ currentKid: kidNo }));
      },
    }),
    {
      name: "chldrnList",
    }
  )
);
export default useChldrnListStore;
