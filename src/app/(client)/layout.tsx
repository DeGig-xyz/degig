"use client";
import { Lexend } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/utils";
import { Toaster } from "@/components/ui/sonner";
import { SWRConfig } from "swr";
const fontSans = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.className, `antialiased`)}>
        <SWRConfig>{children}</SWRConfig>
        <Toaster />
      </body>
    </html>
  );
}
