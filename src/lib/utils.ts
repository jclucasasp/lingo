import { type ClassValue, clsx } from "clsx"
import { revalidatePath } from "next/cache";
import { twMerge } from "tailwind-merge"
import { create } from "zustand";
import { Roles } from "../../types/globals";
import { auth } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CustomModalState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useExitModal = create<CustomModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export const useHeartModal = create<CustomModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const usePractiseModal = create<CustomModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export function Revalidate(paths: string[]) {
  paths.map((path) => {
      revalidatePath(path);
  });
}

export function absoluteUrl(path: string): string {
  return process.env.NEXT_PUBLIC_BASE_URL + path;
}

export function checkRole(role: Roles) {
  const { sessionClaims } = auth();
  return sessionClaims?.metadata?.role === role;
}