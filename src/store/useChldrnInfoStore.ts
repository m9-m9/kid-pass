import { create } from "zustand";

interface ChldrnInfoState {
  age: string;
  details: string[];
  symptom: string[];
  allergic: string[];
  etc: string | null;
  chldrnSexdstn: string;
  gender: string;
  setAge: (age: string) => void;
  setChldrnSexdstn: (chldrnSexdstn: string) => void;
  setDetails: (details: string[]) => void;
  setSymptom: (symptom: string[]) => void;
  setAllergic: (allergic: string[]) => void;
  setEtc: (etc: string) => void;
  setGender: (gender: string) => void;
}

export const useChldrnInfoStore = create<ChldrnInfoState>((set) => ({
  chldrnSexdstn: "",
  age: "",
  details: [],
  symptom: [],
  allergic: [],
  etc: null,
  gender: "",
  setAge: (age: string) => set({ age }),
  setChldrnSexdstn: (chldrnSexdstn: string) => set({ chldrnSexdstn }),
  setDetails: (details: string[]) => set({ details }),
  setSymptom: (symptom: string[]) => set({ symptom }),
  setAllergic: (allergic: string[]) => set({ allergic }),
  setEtc: (etc: string) => set({ etc }),
  setGender: (gender: string) => set({ gender }),
}));
