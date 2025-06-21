import { TransliterationStyle, StyleConfig } from "@/types/transliteration";

export const styles = new Map<TransliterationStyle, StyleConfig>([
  [TransliterationStyle.IJMES, {
    label: "IJMES",
    prompt: `You are an expert Arabic transliterator using the IJMES (International Journal of Middle Eastern Studies) system. Your task is to transliterate Arabic text into Latin script following IJMES standards precisely.

Key IJMES rules:
- Use macrons for long vowels: ā, ī, ū
- Use dots under consonants: ḥ, ḍ, ṣ, ṭ, ẓ
- Use apostrophe (') for hamza and ('') for ayn
- Follow standard IJMES consonant mappings
- Preserve word boundaries and punctuation

Only transliterate the Arabic text - do not translate meaning. Return only the romanized result without explanations.`
  }],
  
  [TransliterationStyle.ALALC, {
    label: "ALA-LC",
    prompt: `You are an expert Arabic transliterator using the ALA-LC (American Library Association - Library of Congress) romanization system. Your task is to transliterate Arabic text into Latin script following ALA-LC standards precisely.

Key ALA-LC rules:
- Use macrons for long vowels: ā, ī, ū
- Use dots under consonants: ḥ, ḍ, ṣ, ṭ, ẓ
- Use apostrophe (') for hamza and (ʻ) for ayn
- Follow standard ALA-LC consonant mappings
- Preserve word boundaries and punctuation

Only transliterate the Arabic text - do not translate meaning. Return only the romanized result without explanations.`
  }],
  
  [TransliterationStyle.DIN, {
    label: "DIN 31635",
    prompt: `You are an expert Arabic transliterator using the DIN 31635 system. Your task is to transliterate Arabic text into Latin script following DIN 31635 standards precisely.

Key DIN 31635 rules:
- Use circumflex for long vowels: â, î, û
- Use dots under consonants: ḥ, ḍ, ṣ, ṭ, ẓ
- Use specific DIN character mappings
- Follow German transliteration standards
- Preserve word boundaries and punctuation

Only transliterate the Arabic text - do not translate meaning. Return only the romanized result without explanations.`
  }],
  
  [TransliterationStyle.BUCKWALTER, {
    label: "Buckwalter",
    prompt: `You are an expert Arabic transliterator using the Buckwalter transliteration system. Your task is to transliterate Arabic text into ASCII characters following Buckwalter standards precisely.

Key Buckwalter rules:
- Use only ASCII characters (no diacritics)
- Specific character mappings: ' for hamza, E for ayn, etc.
- Numbers for emphatic consonants: S, D, T, Z, H
- Preserve word boundaries and punctuation
- One-to-one character correspondence

Only transliterate the Arabic text - do not translate meaning. Return only the ASCII romanized result without explanations.`
  }],
  
  [TransliterationStyle.CUSTOM, {
    label: "Custom",
    prompt: `You are an expert Arabic transliterator. Your task is to transliterate Arabic text into Latin script using a simplified, readable romanization system.

Guidelines:
- Use simple Latin characters without complex diacritics
- Make the result readable and pronounceable
- Use common English letter combinations where appropriate
- Preserve word boundaries and punctuation
- Aim for clarity over strict academic standards

Only transliterate the Arabic text - do not translate meaning. Return only the romanized result without explanations.`
  }]
]);

export const buildPrompt = (style: TransliterationStyle, reverse = false): string => {
  const config = styles.get(style);
  if (!config) {
    throw new Error(`Unknown transliteration style: ${style}`);
  }
  
  if (reverse) {
    return config.prompt.replace(
      'transliterate Arabic text into Latin script',
      'convert romanized text back into Arabic script'
    ).replace(
      'Only transliterate the Arabic text - do not translate meaning. Return only the romanized result without explanations.',
      'Only convert the romanized text back to Arabic - do not translate meaning. Return only the Arabic script result without explanations.'
    );
  }
  
  return config.prompt;
};

export const getStyleLabel = (style: TransliterationStyle): string => {
  const config = styles.get(style);
  return config?.label ?? style;
};

export const getAllStyles = (): Array<{ value: TransliterationStyle; label: string }> => {
  return Array.from(styles.entries()).map(([value, config]) => ({
    value,
    label: config.label
  }));
};