import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStyleLabel } from "@/lib/styles";
import { TransliterationStyle } from "@/types/transliteration";

const validStyles: Record<string, TransliterationStyle> = {
  "ijmes": TransliterationStyle.IJMES,
  "ala-lc": TransliterationStyle.ALALC,
  "din-31635": TransliterationStyle.DIN,
  "buckwalter": TransliterationStyle.BUCKWALTER,
  "custom": TransliterationStyle.CUSTOM,
};

const styleDescriptions: Record<string, string> = {
  "ijmes": "International Journal of Middle Eastern Studies (IJMES) transliteration standard for Arabic text conversion",
  "ala-lc": "American Library Association - Library of Congress (ALA-LC) romanization system for Arabic",
  "din-31635": "DIN 31635 German standard for Arabic transliteration and romanization",
  "buckwalter": "Buckwalter ASCII transliteration system for Arabic text processing",
  "custom": "Custom simplified transliteration system for easy Arabic text conversion",
};

type Props = {
  params: { style: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style } = params;
  
  if (!validStyles[style]) {
    return {
      title: "Page Not Found",
      description: "The requested transliteration style was not found.",
    };
  }

  const currentStyle = validStyles[style];
  const styleLabel = getStyleLabel(currentStyle);
  const description = styleDescriptions[style];

  return {
    title: `${styleLabel} Transliterator - Usul Transliteration`,
    description: `${description}. Convert Arabic text to Latin script using ${styleLabel} standards with Usul Transliteration.`,
    keywords: `Arabic, transliteration, ${styleLabel}, ${style}, romanization, Usul, converter`,
    authors: [{ name: "Usul Transliteration" }],
    openGraph: {
      title: `${styleLabel} Arabic Transliterator`,
      description: `Convert Arabic text using ${styleLabel} transliteration standards`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${styleLabel} Arabic Transliterator`,
      description: `Convert Arabic text using ${styleLabel} transliteration standards`,
    },
  };
}

export default function StyleLayout({ children, params }: Props) {
  const { style } = params;
  
  if (!validStyles[style]) {
    notFound();
  }

  return <>{children}</>;
}