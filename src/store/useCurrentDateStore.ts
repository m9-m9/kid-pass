import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

interface CurrentDateStore {
  currentDate: Dayjs;
  setCurrentDate: (date: Dayjs) => void;
}

const useCurrentDateStore = create<CurrentDateStore>((set) => ({
  currentDate: dayjs(),
  setCurrentDate: (date: Dayjs) => set({ currentDate: date }),
}));

export default useCurrentDateStore;
