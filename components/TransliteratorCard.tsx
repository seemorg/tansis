"use client";

import { motion } from "framer-motion";
import { ArrowDownWideNarrow } from "lucide-react";
import { TextArea } from "./TextArea";
import { StyleDropdown } from "./StyleDropdown";
import { ActionButtons } from "./ActionButtons";
import { ExamplesSection } from "./ExamplesSection";
import { TransliterationStyle } from "@/types/transliteration";

interface TransliteratorCardProps {
  arabic: string;
  setArabic: (value: string) => void;
  roman: string;
  setRoman: (value: string) => void;
  style: TransliterationStyle;
  setStyle: (style: TransliterationStyle) => void;
  onSubmit: () => void;
  onReverseTransliterate: () => void;
  loading: boolean;
  isSwapped?: boolean;
  setIsSwapped?: (swapped: boolean) => void;
}

export function TransliteratorCard({
  arabic,
  setArabic,
  roman,
  setRoman,
  style,
  setStyle,
  onSubmit,
  onReverseTransliterate,
  loading,
  isSwapped = false,
  setIsSwapped,
}: TransliteratorCardProps) {
  const handleSwap = () => {
    // Simply swap the contents
    const temp = arabic;
    setArabic(roman);
    setRoman(temp);
    
    // Toggle the swapped state
    setIsSwapped?.(!isSwapped);
  };

  const handleClear = () => {
    setArabic("");
    setRoman("");
  };

  const canTransliterate = !loading;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <StyleDropdown value={style} onValueChange={setStyle} />
          <div className="text-lg font-semibold text-neutral-700">
            Usul Transliteration
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <TextArea
            variant="input"
            value={arabic}
            onChange={setArabic}
            placeholder={isSwapped ? "Enter romanized text here..." : "اكتب النص العربي هنا..."}
            className="min-h-[120px]"
            isSwapped={isSwapped}
          />

          {/* Examples Section */}
          <ExamplesSection
            style={style}
            isSwapped={isSwapped}
            onExampleClick={(arabicText, romanText) => {
              setArabic(arabicText);
              setRoman(romanText);
            }}
          />

          {/* Arrow with rotation animation */}
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: loading ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="my-3 text-neutral-400"
            >
              <ArrowDownWideNarrow className="h-6 w-6" />
            </motion.div>
          </div>

          {/* Output Area */}
          <div className="relative">
            <motion.div
              key={roman}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TextArea
                variant="output"
                value={roman}
                onChange={() => {}}
                readOnly
                placeholder={isSwapped ? "النص العربي سيظهر هنا..." : "Transliteration will appear here..."}
                className="min-h-[120px]"
                isSwapped={isSwapped}
              />
            </motion.div>

            {roman.trim() && (
              <ActionButtons
                variant="inline"
                copyText={roman}
                shareText={roman}
                disabled={loading}
                isSwapped={isSwapped}
              />
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <ActionButtons
          variant="footer"
          onClear={handleClear}
          onSwap={handleSwap}
          onTransliterate={onSubmit}
          disabled={!canTransliterate}
          loading={loading}
        />
      </div>
    </div>
  );
}