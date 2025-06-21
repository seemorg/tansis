"use client";

import { motion } from "framer-motion";
import { ArrowDownWideNarrow } from "lucide-react";
import { TextArea } from "./TextArea";
import { StyleDropdown } from "./StyleDropdown";
import { ActionButtons } from "./ActionButtons";
import { TransliterationStyle } from "@/types/transliteration";

interface TransliteratorCardProps {
  arabic: string;
  setArabic: (value: string) => void;
  roman: string;
  setRoman: (value: string) => void;
  style: TransliterationStyle;
  setStyle: (style: TransliterationStyle) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function TransliteratorCard({
  arabic,
  setArabic,
  roman,
  setRoman,
  style,
  setStyle,
  onSubmit,
  loading,
}: TransliteratorCardProps) {
  const handleSwap = () => {
    if (roman.trim()) {
      setArabic(roman);
      setRoman(arabic);
    }
  };

  const handleClear = () => {
    setArabic("");
    setRoman("");
  };

  const canTransliterate = arabic.trim().length > 0 && !loading;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <StyleDropdown value={style} onValueChange={setStyle} />
          <div className="text-lg font-semibold text-neutral-700">
            Arabic Transliterator
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <TextArea
            variant="input"
            value={arabic}
            onChange={setArabic}
            placeholder="اكتب النص العربي هنا..."
            className="min-h-[120px]"
          />

          {/* Arrow with rotation animation */}
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: loading ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="my-3 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors"
              onClick={handleSwap}
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
                placeholder="Transliteration will appear here..."
                className="min-h-[120px]"
              />
            </motion.div>

            {roman.trim() && (
              <ActionButtons
                variant="inline"
                copyText={roman}
                shareText={roman}
                disabled={loading}
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
      </motion.div>
    </div>
  );
}