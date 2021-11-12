import { signInTranslations } from "./namespaces/signin.translations";
import { notificationTranslations } from "./namespaces/notifications.translations";
import { pageTranslations } from "./namespaces/pages.translations";
import { asTranslation, Language } from "./_translation_interface";
import { soldierActionTranslations } from "./namespaces/soldierActions.translations";

export const translations = asTranslation({
  ...pageTranslations,
  ...notificationTranslations,
  ...signInTranslations,
  ...soldierActionTranslations,
  helloWorld: {
    [Language.ENGLISH]: "Hello World",
    [Language.SPANISH]: "Hola Mundo",
  },
  helloWorldSubtitle: {
    [Language.ENGLISH]: "Hello team",
    [Language.SPANISH]: "Hola equipo!",
  },
  weapons: {
    [Language.ENGLISH]: "Weapons",
    [Language.SPANISH]: "Armas",
  },
  requests: {
    [Language.ENGLISH]: "Requests",
    [Language.SPANISH]: "Peticiones",
  },
  reservations: {
    [Language.ENGLISH]: "Reservations",
    [Language.SPANISH]: "Reservaciones",
  },
  addReservation: {
    [Language.ENGLISH]: "Add reservation",
    [Language.SPANISH]: "Agregar reservación",
  },
  id: {
    [Language.ENGLISH]: "Id",
    [Language.SPANISH]: "Identificación",
  },
  name: {
    [Language.ENGLISH]: "Name",
    [Language.SPANISH]: "Nombre",
  },
  quantity: {
    [Language.ENGLISH]: "Quanity",
    [Language.SPANISH]: "Cantidad",
  },
  category: {
    [Language.ENGLISH]: "Category",
    [Language.SPANISH]: "Categoría",
  },
  role: {
    [Language.ENGLISH]: "Role",
    [Language.SPANISH]: "Roles",
  },
  items: {
    [Language.ENGLISH]: "Items",
    [Language.SPANISH]: "Elementos",
  },
  status: {
    [Language.ENGLISH]: "Status",
    [Language.SPANISH]: "Estado",
  },
  pendingForPickUp: {
    [Language.ENGLISH]: "Pending for pick up",
    [Language.SPANISH]: "Pendiente de ser recogido",
  },
  returned: {
    [Language.ENGLISH]: "Returned",
    [Language.SPANISH]: "Devuelto",
  },
  inUse: {
    [Language.ENGLISH]: "In use",
    [Language.SPANISH]: "En uso",
  },
  commander: {
    [Language.ENGLISH]: "Commander",
    [Language.SPANISH]: "Comandante",
  },
  officer: {
    [Language.ENGLISH]: "Officer",
    [Language.SPANISH]: "Oficial",
  },
  troop: {
    [Language.ENGLISH]: "Troop",
    [Language.SPANISH]: "Tropa",
  },
  approve: {
    [Language.ENGLISH]: "Approve",
    [Language.SPANISH]: "Aprobar",
  },
  approved: {
    [Language.ENGLISH]: "Approved",
    [Language.SPANISH]: "Aprobado",
  },
  reject: {
    [Language.ENGLISH]: "Reject",
    [Language.SPANISH]: "Rechazar",
  },
  rejected: {
    [Language.ENGLISH]: "Rejected",
    [Language.SPANISH]: "Rechazado",
  },
  pending: {
    [Language.ENGLISH]: "Pending",
    [Language.SPANISH]: "Pendiente",
  },
  light: {
    [Language.ENGLISH]: "Light",
    [Language.SPANISH]: "Ligero",
  },
  medium: {
    [Language.ENGLISH]: "Medium",
    [Language.SPANISH]: "Medio",
  },
  heavy: {
    [Language.ENGLISH]: "Heavy",
    [Language.SPANISH]: "Pesada",
  },
  add: {
    [Language.ENGLISH]: "Add",
    [Language.SPANISH]: "Agregar",
  },
});
