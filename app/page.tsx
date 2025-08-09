"use client";

import { useState } from "react";
import { TransliteratorCard } from "@/components/TransliteratorCard";
import { TransliterationStyle } from "@/types/transliteration";

export default function Home() {
  const defaultStyle = TransliterationStyle.SHARIASOURCE;

  const [arabic, setArabic] = useState("");
  const [roman, setRoman] = useState("");
  const [style, setStyle] = useState<TransliterationStyle>(defaultStyle);
  const [loading, setLoading] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  const handleTransliterate = async (reverse = false) => {
    // When swapped, input is always in arabic state and output goes to roman state
    // When not swapped, use the reverse parameter to determine direction
    const inputText = isSwapped ? arabic : (reverse ? roman : arabic);
    if (!inputText.trim()) return;

    // When swapped, we want reverse transliteration (roman to arabic)
    // When not swapped, use the reverse parameter
    const shouldReverse = isSwapped ? true : reverse;

    setLoading(true);
    try {
      const response = await fetch("/api/transliterate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, style, reverse: shouldReverse }),
      });

      if (!response.ok) {
        throw new Error("Failed to transliterate");
      }

      const data = await response.json();
      
      // When swapped, output always goes to roman state
      // When not swapped, use the reverse parameter to determine where output goes
      if (isSwapped) {
        setRoman(data.transliteration);
      } else if (reverse) {
        setArabic(data.transliteration);
      } else {
        setRoman(data.transliteration);
      }
    } catch (error) {
      console.error("Transliteration error:", error);
      const errorMessage = "Error: Failed to transliterate text";
      
      // When swapped, error always goes to roman state
      // When not swapped, use the reverse parameter to determine where error goes
      if (isSwapped) {
        setRoman(errorMessage);
      } else if (reverse) {
        setArabic(errorMessage);
      } else {
        setRoman(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-start sm:items-center justify-center bg-white sm:bg-gradient-to-br sm:from-neutral-50 sm:via-neutral-100 sm:to-neutral-200 p-4 md:p-6 pt-8 sm:pt-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-white/20 to-transparent hidden sm:block"></div>
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">
            Tansis AI
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 px-2">
            Convert Arabic or plain text to translitered English
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
