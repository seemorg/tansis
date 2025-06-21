"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { TransliteratorCard } from "@/components/TransliteratorCard";
import { StyleNavigation } from "@/components/StyleNavigation";
import { TransliterationStyle } from "@/types/transliteration";
import { getStyleLabel } from "@/lib/styles";

const validStyles: Record<string, TransliterationStyle> = {
  "ijmes": TransliterationStyle.IJMES,
  "ala-lc": TransliterationStyle.ALALC,
  "din-31635": TransliterationStyle.DIN,
  "buckwalter": TransliterationStyle.BUCKWALTER,
  "custom": TransliterationStyle.CUSTOM,
};

export default function StylePage() {
  const params = useParams();
  const styleParam = params.style as string;
  
  if (!styleParam || !validStyles[styleParam]) {
    notFound();
  }

  const currentStyle = validStyles[styleParam];
  const styleLabel = getStyleLabel(currentStyle);

  const [arabic, setArabic] = useState("");
  const [roman, setRoman] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransliterate = async (reverse = false) => {
    const inputText = reverse ? roman : arabic;
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/transliterate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, style: currentStyle, reverse }),
      });

      if (!response.ok) {
        throw new Error("Failed to transliterate");
      }

      const data = await response.json();
      if (reverse) {
        setArabic(data.transliteration);
      } else {
        setRoman(data.transliteration);
      }
    } catch (error) {
      console.error("Transliteration error:", error);
      const errorMessage = "Error: Failed to transliterate text";
      if (reverse) {
        setArabic(errorMessage);
      } else {
        setRoman(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-white/20 to-transparent"></div>
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            {styleLabel} Transliterator
          </h1>
          <p className="text-neutral-600">
            Convert Arabic text to Latin script using {styleLabel} standards
          </p>
        </div>
        <StyleNavigation />
        <TransliteratorCard
          arabic={arabic}
          setArabic={setArabic}
          roman={roman}
          setRoman={setRoman}
          style={currentStyle}
          setStyle={() => {}} // Disabled for specific style pages
          styleDropdownDisabled={true}
          onSubmit={() => handleTransliterate(false)}
          onReverseTransliterate={() => handleTransliterate(true)}
          loading={loading}
        />
      </div>
    </main>
  );
}