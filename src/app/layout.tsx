'use client';
import { usePathname } from 'next/navigation';

import type { Metadata } from "next";
import { Sora,Inter,Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Landing Page/Navbar";
import MainNavbar from "./components/Main-Navbar/main-navbar";
import Footer from "./components/Landing Page/Footer";

const sora = Sora({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable}${poppins.variable} antialiased`}
      >
        <main className="main">
        {!isHomePage && <MainNavbar />}
        <Providers>{children}</Providers>
        <Footer />
        </main>
      </body>
    </html>
  );
}

import { Providers } from "./providers";



