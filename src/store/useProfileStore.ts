import { create } from "zustand";

interface ProfileState {
    age: string;
    details: string[];
    symptom: string[];
    allergic: string[];
    etc: string | null;
    setAge: (age: string) => void;
    setDetails: (details: string[]) => void;
    setSymptom: (symptom: string[]) => void;
    setAllergic: (allergic: string[]) => void;
    setEtc: (etc: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    age: "",
    details: [],
    symptom: [],
    allergic: [],
    etc: null,
    setAge: (age: string) => set({ age }),
    setDetails: (details: string[]) => set({ details }),
    setSymptom: (symptom: string[]) => set({ symptom }),
    setAllergic: (allergic: string[]) => set({ allergic }),
    setEtc: (etc: string) => set({ etc }),
}));
