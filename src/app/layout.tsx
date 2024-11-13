"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/layouts/ThemeToggle/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useEffect } from "react";
import useAuthStore from "../../store/AuthStore";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resetInactivityTimer = useAuthStore(
    (state) => state.resetInactivityTimer,
  );

  useEffect(() => {
    const handleUserActivity = () => resetInactivityTimer();

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
  }, [resetInactivityTimer]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
