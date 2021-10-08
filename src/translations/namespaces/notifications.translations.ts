import { asTranslation, Language } from "../_translation_interface";

export const notificationTranslations = asTranslation({
  "notification.languageChanged": {
    [Language.ENGLISH]: "Language changed successfully",
    [Language.SPANISH]: "El idioma cambió con éxito",
  },
});
