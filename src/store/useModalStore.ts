// src/store/modalStore.ts
import { create } from "zustand";
import { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  comp: ReactNode | null;
  openModal: () => void;
  closeModal: () => void;
  setComp: (component: ReactNode) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  comp: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setComp: (component) => set({ comp: component }),
}));
