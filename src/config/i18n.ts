import { getTranslations } from "../translations/translations.util";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Language } from "translations/_translation_interface";

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
  lng: Language.ENGLISH,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
