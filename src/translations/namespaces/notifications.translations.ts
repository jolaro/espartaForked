import { asTranslation, Language } from "../_translation_interface";

export const notificationTranslations = asTranslation({
  "notification.languageChanged": {
    [Language.ENGLISH]: "Language changed successfully",
    [Language.SPANISH]: "El idioma cambió con éxito",
  },
  "notification.signedOut": {
    [Language.ENGLISH]: "Successfully signed out",
    [Language.SPANISH]: "Salí exitosamente",
  },
  "notification.signedIn": {
    [Language.ENGLISH]: "Successfully signed in",
    [Language.SPANISH]: "Accedido exitosamente",
  },
});
