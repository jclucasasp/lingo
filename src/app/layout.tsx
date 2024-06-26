import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Nunito } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";
import { Exitmodal } from "@/components/exit-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo",
  description: "Duo Lingo clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <Exitmodal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
