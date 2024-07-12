import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Exitmodal } from "@/components/exit-modal";
import { HeartModal } from "@/components/heart-modal";
import "./globals.css";

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
          <HeartModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
