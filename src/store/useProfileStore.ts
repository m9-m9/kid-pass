import { create } from "zustand";

interface ProfileState {
    age: string;
    details: string[];
    symptom: boolean;
    etc: string | null;
    setAge: (age: string) => void;
    setDetails: (details: string[]) => void;
    setSymptom: (symptom: boolean) => void;
    setEtc: (etc: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    age: "",
    details: [],
    symptom: false,
    etc: null,
    setAge: (age: string) => set({ age }),
    setDetails: (details: string[]) => set({ details }),
    setSymptom: (symptom: boolean) => set({ symptom }),
    setEtc: (etc: string) => set({ etc }),
}));
