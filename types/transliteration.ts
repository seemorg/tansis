export enum TransliterationStyle {
  IJMES = "IJMES",
  ALALC = "ALA-LC", 
  DIN = "DIN31635",
  BUCKWALTER = "Buckwalter",
  CUSTOM = "Custom"
}

export interface TransliterationRequest {
  text: string;
  style: TransliterationStyle;
}

export interface TransliterationResponse {
  transliteration: string;
}

export interface StyleConfig {
  label: string;
  prompt: string;
}

export interface TransliteratorState {
  arabic: string;
  roman: string;
  style: TransliterationStyle;
  loading: boolean;
}