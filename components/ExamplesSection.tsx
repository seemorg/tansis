"use client";

import { TransliterationStyle } from "@/types/transliteration";

interface ExamplesSectionProps {
  style: TransliterationStyle;
  onExampleClick: (arabicText: string, romanText: string) => void;
}

const examples = {
  [TransliterationStyle.IJMES]: [
    { arabic: "السلام عليكم", roman: "al-salām ʿalaykum" },
    { arabic: "مرحبا", roman: "marḥaban" },
    { arabic: "شكرا لك", roman: "shukran lak" },
  ],
  [TransliterationStyle.ALALC]: [
    { arabic: "السلام عليكم", roman: "al-salām ʻalaykum" },
    { arabic: "مرحبا", roman: "marḥaban" },
    { arabic: "شكرا لك", roman: "shukran lak" },
  ],
  [TransliterationStyle.DIN]: [
    { arabic: "السلام عليكم", roman: "as-salâm ʿalaikum" },
    { arabic: "مرحبا", roman: "marḥaban" },
    { arabic: "شكرا لك", roman: "šukran lak" },
  ],
  [TransliterationStyle.BUCKWALTER]: [
    { arabic: "السلام عليكم", roman: "AlslAm ElykM" },
    { arabic: "مرحبا", roman: "mrHbA" },
    { arabic: "شكرا لك", roman: "$krA lk" },
  ],
  [TransliterationStyle.CUSTOM]: [
    { arabic: "السلام عليكم", roman: "as-salaam alaykum" },
    { arabic: "مرحبا", roman: "marhaban" },
    { arabic: "شكرا لك", roman: "shukran lak" },
  ],
};

export function ExamplesSection({ style, onExampleClick }: ExamplesSectionProps) {
  const styleExamples = examples[style] || [];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-neutral-600 mb-2">
        Try these examples:
      </h3>
      <div className="flex gap-2">
        {styleExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.arabic, example.roman)}
            className="flex-1 p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-[#9d5148] hover:bg-neutral-100 transition-all duration-200 text-center cursor-pointer"
          >
            <div className="font-arabic text-neutral-800 text-sm">
              {example.arabic}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}