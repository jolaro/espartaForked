import { Language } from "translations/_translation_interface";
import { asTranslation } from "translations/_translation_interface";

export const reservationTranslations = asTranslation({
  "reservation.createReservationButton": {
    [Language.ENGLISH]: "Create reservation",
    [Language.SPANISH]: "Crear reserva",
  },
  "reservation.manualAddButton": {
    [Language.ENGLISH]: "Manually Add",
    [Language.SPANISH]: "Agregar manualmente",
  },
  "reservation.scanButton": {
    [Language.ENGLISH]: "Scan",
    [Language.SPANISH]: "Escanear",
  },
  "reservation.weaponsTitle": {
    [Language.ENGLISH]: "Weapons",
    [Language.SPANISH]: "Armas",
  },
  "reservation.noWeaponTitle": {
    [Language.ENGLISH]: "No weapons selected",
    [Language.SPANISH]: "No se seleccionaron armas",
  },
  "reservation.noWeaponText": {
    [Language.ENGLISH]: "Please add weapons by scanning QR code or entering them manually",
    [Language.SPANISH]: "Agregue armas escaneando el código QR o ingresándolas manualmente",
  },
  "reservation.noSoldierTitle": {
    [Language.ENGLISH]: "No soldier selected",
    [Language.SPANISH]: "Ninguna soldado seleccionada",
  },
  "reservation.noSoldierText": {
    [Language.ENGLISH]: "Please select the soldier who is going to borrow items",
    [Language.SPANISH]: "Seleccione el soldado que va a pedir prestados los artículos",
  },
  "reservation.addSoldierButton": {
    [Language.ENGLISH]: "Add Soldier",
    [Language.SPANISH]: "Agregar soldado",
  },
  "reservation.soldierTitle": {
    [Language.ENGLISH]: "Soldier",
    [Language.SPANISH]: "Soldado",
  },
  "reservation.reservationCreatedToast": {
    [Language.ENGLISH]: "Reservation successfully created",
    [Language.SPANISH]: "Reserva creada correctamente",
  },
});
