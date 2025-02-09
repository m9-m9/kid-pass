// useModalStore.ts
import { create } from "zustand";
import { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  comp: ReactNode | null;
  position?: 'center' | 'bottom';
  openModal: () => void;
  closeModal: () => void;
  setComp: (component: ReactNode, position?: 'center' | 'bottom') => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  comp: null,
  position: 'bottom', // 기본값
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setComp: (component, position = 'bottom') => set({ comp: component, position }),
}));