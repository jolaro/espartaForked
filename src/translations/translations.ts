import { pageTranslations } from "./namespaces/pages.translations";
import { asTranslation, Language } from "./_translation_interface";

export const translations = asTranslation({
  ...pageTranslations,
  helloWorld: {
    [Language.ENGLISH]: "Hello World",
    [Language.SPANISH]: "Hola Mundo",
  },
  helloWorldSubtitle: {
    [Language.ENGLISH]: "Hello team",
    [Language.SPANISH]: "Hola equipo!",
  },
});
