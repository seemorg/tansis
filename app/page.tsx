"use client";

import { useState } from "react";
import { TransliteratorCard } from "@/components/TransliteratorCard";
import { TransliterationStyle } from "@/types/transliteration";

export default function Home() {
  const defaultStyle = TransliterationStyle.IJMES;

  const [arabic, setArabic] = useState("");
  const [roman, setRoman] = useState("");
  const [style, setStyle] = useState<TransliterationStyle>(defaultStyle);
  const [loading, setLoading] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

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
        body: JSON.stringify({ text: inputText, style, reverse }),
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
            Usul Transliteration
          </h1>
          <p className="text-neutral-600">
            Convert Arabic text to Latin script using various transliteration standards
          </p>
        </div>
        <TransliteratorCard
          arabic={arabic}
          setArabic={setArabic}
          roman={roman}
          setRoman={setRoman}
          style={style}
          setStyle={setStyle}
          onSubmit={() => handleTransliterate(false)}
          onReverseTransliterate={() => handleTransliterate(true)}
          loading={loading}
          isSwapped={isSwapped}
          setIsSwapped={setIsSwapped}
        />
      </div>
    </main>
  );
}
