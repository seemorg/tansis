"use client";

import { TransliterationStyle } from "@/types/transliteration";

interface ExamplesSectionProps {
  style: TransliterationStyle;
  onExampleClick: (arabicText: string) => void;
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
    <div className="mt-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
      <h3 className="text-sm font-medium text-neutral-600 mb-3">
        Try these examples:
      </h3>
      <div className="space-y-2">
        {styleExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.arabic)}
            className="w-full text-left p-3 bg-white rounded-lg border border-neutral-200 hover:border-[#9d5148] hover:bg-neutral-50 transition-all duration-200 group"
          >
            <div className="flex justify-between items-center">
              <div className="font-arabic text-right text-neutral-800">
                {example.arabic}
              </div>
              <div className="text-sm text-neutral-500 group-hover:text-[#9d5148] transition-colors">
                {example.roman}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}