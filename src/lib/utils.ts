import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { StoreApi, UseBoundStore, create } from "zustand";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ExitModalState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useExitModal = create<ExitModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
