import { asTranslation, Language } from "../_translation_interface";

export const signInTranslations = asTranslation({
  "signIn.title": {
    [Language.ENGLISH]: "Sign In",
    [Language.SPANISH]: "Registrarse",
  },
  "signIn.email": {
    [Language.ENGLISH]: "Email Address",
    [Language.SPANISH]: "Dirección de correo electrónico",
  },
  "signIn.password": {
    [Language.ENGLISH]: "Password",
    [Language.SPANISH]: "Contraseña",
  },
  "signIn.rememberMe": {
    [Language.ENGLISH]: "Remember me",
    [Language.SPANISH]: "Recuérdame",
  },
  "signIn.requiredField": {
    [Language.ENGLISH]: "This field is required",
    [Language.SPANISH]: "Este campo es obligatorio",
  },
  "signIn.passwordTooShort": {
    [Language.ENGLISH]: "Password must be at least 8 characters",
    [Language.SPANISH]: "La contraseña debe tener al menos 8 caracteres",
  },
  "signIn.invalidEmail": {
    [Language.ENGLISH]: "The entered email is invalid",
    [Language.SPANISH]: "El correo electrónico ingresado no es válido",
  },
});
