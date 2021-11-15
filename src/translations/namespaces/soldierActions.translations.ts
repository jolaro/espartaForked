import { asTranslation, Language } from "../_translation_interface";

export const soldierActionTranslations = asTranslation({
  "soldierActions.requestTooltip": {
    [Language.ENGLISH]: "New Request For Item",
    [Language.SPANISH]: "Nueva solicitud de artículo",
  },
  "soldierActions.requestButtonText": {
    [Language.ENGLISH]: "Request",
    [Language.SPANISH]: "Solicitud",
  },
  "soldierActions.returnTooltip": {
    [Language.ENGLISH]: "Return Item",
    [Language.SPANISH]: "Devolver objeto",
  },
  "soldierActions.requestDialogTitle": {
    [Language.ENGLISH]: "New Borrow Request for ",
    [Language.SPANISH]: "Nueva solicitud de préstamo para ",
  },
  "soldierActions.requestDialogFromDate": {
    [Language.ENGLISH]: "From Date",
    [Language.SPANISH]: "Partir de la fecha",
  },
  "soldierActions.requestDialogUntilDate": {
    [Language.ENGLISH]: "Until Date",
    [Language.SPANISH]: "Hasta la fecha",
  },
  "soldierActions.requestDialogInfoAlert": {
    [Language.ENGLISH]:
      "Keep in mind you will have to wait for the request to be approved before you can get the selected item.",
    [Language.SPANISH]:
      "Tenga en cuenta que tendrá que esperar a que se apruebe la solicitud antes de poder obtener el artículo seleccionado.",
  },
});
