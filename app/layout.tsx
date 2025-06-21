import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Usul Transliteration - Arabic to Latin Script Converter",
  description: "Convert Arabic text to Latin script using various transliteration standards including IJMES, ALA-LC, DIN 31635, and Buckwalter with Usul Transliteration.",
  keywords: "Arabic, transliteration, IJMES, ALA-LC, DIN, Buckwalter, romanization, Usul",
  authors: [{ name: "Usul Transliteration" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${inter.variable} ${notoNaskhArabic.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
