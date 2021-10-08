import { translations } from "./translations";
import { Language } from "./_translation_interface";

/**
 * Transforms the `translations` object to the required format for i18n library
 * @param language the language which translations will be fetched
 * @returns key: value pairs for the selected language translations
 */
export const getTranslations = (language: Language) => {
  return Object.entries(translations)
    .map(([key, value]) => ({ key, value: value[language] }))
    .reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
};
