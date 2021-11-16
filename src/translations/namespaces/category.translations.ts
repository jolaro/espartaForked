import { asTranslation, Language } from "translations/_translation_interface";

export const categoryTranslations = asTranslation({
  "category.light": {
    [Language.ENGLISH]: "Light",
    [Language.SPANISH]: "Ligero",
  },
  "category.medium": {
    [Language.ENGLISH]: "Medium",
    [Language.SPANISH]: "Medio",
  },
  "category.heavy": {
    [Language.ENGLISH]: "Heavy",
    [Language.SPANISH]: "Pesada",
  },
  "category.all": {
    [Language.ENGLISH]: "All",
    [Language.SPANISH]: "Todos",
  },
  "category.filterTitle": {
    [Language.ENGLISH]: "Category Filter",
    [Language.SPANISH]: "Filtro de categoría",
  },
});
