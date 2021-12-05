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
  "status.inUse": {
    [Language.ENGLISH]: "In Use",
    [Language.SPANISH]: "En uso",
  },
  "status.overdue": {
    [Language.ENGLISH]: "Overdue",
    [Language.SPANISH]: "Atrasada",
  },
  "status.returned": {
    [Language.ENGLISH]: "Returned",
    [Language.SPANISH]: "Devuelto",
  },
  "status.waitingApproval": {
    [Language.ENGLISH]: "Waiting approval",
    [Language.SPANISH]: "Esperando aprovación",
  },
});
