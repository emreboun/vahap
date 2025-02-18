import type { Metadata } from "next";
import {
  Lexend,
  Geist,
  Geist_Mono,
  Playfair_Display,
  Montserrat,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Satranç Okulu",
  description: "Online Satranç Okulu - Vahap Şanal",
};

const lexend = Lexend({
  subsets: ["latin"], // Choose subsets based on your needs
  weight: ["400", "700"], // Optional: Select specific font weights
  variable: "--font-lexend", // CSS variable for usage
});

const playfair = Playfair_Display({
  subsets: ["latin"], // Choose subsets based on your needs
  weight: ["400", "700"], // Optional: Select specific font weights
  variable: "--font-playfair", // CSS variable for usage
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='tr'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${playfair.variable} ${montserrat.variable}`}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
