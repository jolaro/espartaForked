import { getTranslations } from "../translations/translations.util";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Language } from "translations/_translation_interface";

export const STORAGE_LANGUAGE_KEY = "language";
const DEFAULT_LANGUAGE = window.localStorage.getItem(STORAGE_LANGUAGE_KEY) || "en";

const resources = {
  en: {
    translation: getTranslations(Language.ENGLISH),
  },
  es: {
    translation: getTranslations(Language.SPANISH),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: Language.ENGLISH,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  cache: {
    enabled: false,
    prefix: "translation_",
    expirationTime: Infinity,
    Version: {},
  },
});

export default i18n;
