import { type ClassValue, clsx } from "clsx"
import { revalidatePath } from "next/cache";
import { twMerge } from "tailwind-merge"
import { create } from "zustand";

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

export function Revalidate(paths: string[]) {
  paths.map((path) => {
      revalidatePath(path);
  });
}
