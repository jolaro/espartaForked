import { asTranslation, Language } from "../_translation_interface";

export const pageTranslations = asTranslation({
  home: {
    [Language.ENGLISH]: "Home English",
    [Language.SPANISH]: "Hogar",
  },
  sandbox: {
    [Language.ENGLISH]: "Sandbox",
    [Language.SPANISH]: "Sandbox",
  },
});
