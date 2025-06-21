"use client";

import { TransliterationStyle } from "@/types/transliteration";

interface ExamplesSectionProps {
  style: TransliterationStyle;
  onExampleClick: (arabicText: string, romanText: string) => void;
  isSwapped?: boolean;
}

const examples = {
  [TransliterationStyle.IJMES]: [
    { arabic: "السلام عليكم", roman: "al-salām ʿalaykum" },
    { arabic: "ابن سينا", roman: "ibn sīnā" },
    { arabic: "الأشباه والنظائر", roman: "al-ashbāh wa-al-naẓāʾir" },
  ],
  [TransliterationStyle.ALALC]: [
    { arabic: "السلام عليكم", roman: "al-salām ʻalaykum" },
    { arabic: "ابن سينا", roman: "ibn sīnā" },
    { arabic: "الأشباه والنظائر", roman: "al-ashbāh wa-al-naẓāʼir" },
  ],
  [TransliterationStyle.DIN]: [
    { arabic: "السلام عليكم", roman: "as-salâm ʿalaikum" },
    { arabic: "ابن سينا", roman: "ibn sînâ" },
    { arabic: "الأشباه والنظائر", roman: "al-ašbâh wa-an-naẓâ'ir" },
  ],
  [TransliterationStyle.BUCKWALTER]: [
    { arabic: "السلام عليكم", roman: "AlslAm ElykM" },
    { arabic: "ابن سينا", roman: "Abn synA" },
    { arabic: "الأشباه والنظائر", roman: "Al>$bAh wAlnZA}r" },
  ],
  [TransliterationStyle.CUSTOM]: [
    { arabic: "السلام عليكم", roman: "as-salaam alaykum" },
    { arabic: "ابن سينا", roman: "ibn sina" },
    { arabic: "الأشباه والنظائر", roman: "al-ashbah wa-al-nazair" },
  ],
};

export function ExamplesSection({ style, onExampleClick, isSwapped = false }: ExamplesSectionProps) {
  const styleExamples = examples[style] || [];

  return (
    <div className="mt-3 sm:mt-4">
      <h3 className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
        Or try these examples:
      </h3>
      <div className="flex flex-col sm:flex-row gap-2">
        {styleExamples.map((example, index) => {
          const displayText = isSwapped ? example.roman : example.arabic;
          const clickHandler = isSwapped 
            ? () => onExampleClick(example.roman, example.arabic)
            : () => onExampleClick(example.arabic, example.roman);
          
          return (
            <button
              key={index}
              onClick={clickHandler}
              className="flex-1 p-2 sm:p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-[#9d5148] hover:bg-neutral-100 transition-all duration-200 text-center cursor-pointer"
            >
              <div className={`text-neutral-800 text-xs sm:text-sm ${isSwapped ? '' : 'font-arabic'}`}>
                {displayText}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}