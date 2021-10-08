import { translations } from "./translations";
import { ReactComponent as UKFlag } from "../assets/flags/united-kingdom.svg";
import { ReactComponent as ESFlag } from "../assets/flags/spain.svg";

export enum Language {
  ENGLISH = "en",
  SPANISH = "es",
}

export type LanguageValue = {
  [key in Language]: string;
};

export const asTranslation = <T>(et: { [K in keyof T]: LanguageValue }) => et;

export const AVAILABLE_LANGUAGES = {
  [Language.ENGLISH]: {
    title: "English",
    icon: UKFlag,
  },
  [Language.SPANISH]: {
    title: "Espanol",
    icon: ESFlag,
  },
};

export type TranslationKeys = keyof typeof translations;
