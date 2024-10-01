import { create } from "zustand";

interface UsrState {
  name: string;
  setName: (name: string) => void;
}

const useUsrStore = create<UsrState>((set) => ({
  name: "kim",
  setName: (v: string) => set(() => ({ name: v })),
}));

export default useUsrStore;
