import type { Metadata } from "next";
import { Geist, Geist_Mono, UnifrakturMaguntia, Nosifer } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Gothic / dripping horror fonts for a more demonic aesthetic
const blackletter = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-occult"
});

const dripping = Nosifer({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-drip"
});

export const metadata: Metadata = {
  title: "Glyph Translator",
  description: "NIGHTMARENIGHTMARENIGHTMARE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${blackletter.variable} ${dripping.variable} antialiased occult-bg`}
      >
        {children}
      </body>
    </html>
  );
}
