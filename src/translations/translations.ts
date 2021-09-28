export enum Language {
  ENGLISH = "en",
  SPANISH = "es",
}

export const translations = {
  helloWorld: {
    [Language.ENGLISH]: "Hello World",
    [Language.SPANISH]: "Hola Mundo",
  },
  helloWorldSubtitle: {
    [Language.ENGLISH]: "Hello team",
    [Language.SPANISH]: "Hola equipo!",
  },
};
