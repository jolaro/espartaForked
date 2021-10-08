import { translations } from "./translations";

export enum Language {
  ENGLISH = "en",
  SPANISH = "es",
}

export type LanguageValue = {
  [key in Language]: string;
};

export const asTranslation = <T>(et: { [K in keyof T]: LanguageValue }) => et;

export type TranslationKeys = keyof typeof translations;
