interface Translations {
  en: string;
  es: string;
}

export const translations = {
  helloWorld: {
    en: "Hello World",
    es: "Hola Mundo",
  },
};

export const getTranslations = (language: keyof Translations) => {
  return Object.entries(translations)
    .map(([key, value]) => ({ key, value: value[language] }))
    .reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
};
