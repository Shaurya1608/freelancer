import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "FreelanceHub",
  description: "A modern marketplace to hire top freelancers and find great projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow dark:focus:bg-gray-800"
          >
            Skip to content
          </a>
          <NavBar />
          <main id="content" className="page-enter">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
