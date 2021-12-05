import { Language } from "translations/_translation_interface";
import { asTranslation } from "translations/_translation_interface";

export const addItemTranslations = asTranslation({
  "addItem.nameLabel": {
    [Language.ENGLISH]: "Name",
    [Language.SPANISH]: "Nombre",
  },
  "addItem.quantityLabel": {
    [Language.ENGLISH]: "Quantity",
    [Language.SPANISH]: "Cantidad",
  },
  "addItem.categoryLabel": {
    [Language.ENGLISH]: "Category",
    [Language.SPANISH]: "Categoría",
  },
  "addItem.locationLabel": {
    [Language.ENGLISH]: "Location",
    [Language.SPANISH]: "Localización",
  },
  "addItem.serialCodeLabel": {
    [Language.ENGLISH]: "Serial code for item",
    [Language.SPANISH]: "Código de serie del artículo",
  },
  "addItem.addItemsButton": {
    [Language.ENGLISH]: "Add stock",
    [Language.SPANISH]: "Agregar stock",
  },
  "addItem.addItemsTitle": {
    [Language.ENGLISH]: "Add new stock",
    [Language.SPANISH]: "Agregar nuevo stock",
  },
  "addItem.nextButtonText": {
    [Language.ENGLISH]: "Next",
    [Language.SPANISH]: "Próximo",
  },
  "addItem.step0": {
    [Language.ENGLISH]: "Create Item Type",
    [Language.SPANISH]: "Crear tipo de artículo",
  },
  "addItem.step1": {
    [Language.ENGLISH]: "Add individual items",
    [Language.SPANISH]: "Agregar elementos individuales",
  },
  "addItem.successSnackbar": {
    [Language.ENGLISH]: "Successfully added items",
    [Language.SPANISH]: "Elementos agregados con éxito",
  },
});
