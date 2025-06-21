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

  const handleTransliterate = async () => {
    if (!arabic.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/transliterate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: arabic, style }),
      });

      if (!response.ok) {
        throw new Error("Failed to transliterate");
      }

      const data = await response.json();
      setRoman(data.transliteration);
    } catch (error) {
      console.error("Transliteration error:", error);
      setRoman("Error: Failed to transliterate text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-white/20 to-transparent"></div>
      <div className="relative z-10 w-full max-w-4xl">
        <TransliteratorCard
          arabic={arabic}
          setArabic={setArabic}
          roman={roman}
          setRoman={setRoman}
          style={style}
          setStyle={setStyle}
          onSubmit={handleTransliterate}
          loading={loading}
        />
      </div>
    </main>
  );
}
