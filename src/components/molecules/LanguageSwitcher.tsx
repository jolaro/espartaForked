import { Alert, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Snackbar } from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { Downgraded, useHookstate } from "@hookstate/core";
import { AVAILABLE_LANGUAGES, Language } from "translations/_translation_interface";
import { languageSwitcherStyles } from "styles/mui/langaugeSwitcherStyles";
import { useTranslation } from "react-i18next";
import useTranslate from "hooks/useTranslate";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const t = useTranslate();
  const languageMenuAnchorElement = useHookstate<null | HTMLElement>(null);
  const open = Boolean(languageMenuAnchorElement.get());
  const isSnackbarOpen = useHookstate(false);

  const handleClose = () => {
    languageMenuAnchorElement.set(null);
  };

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    languageMenuAnchorElement.set(event.currentTarget);
  };

  const handleLanguageChange = (language: Language) => {
    isSnackbarOpen.set(true);
    i18n.changeLanguage(language);
    handleClose();
  };

  const availableLanguages = Object.entries(AVAILABLE_LANGUAGES).map(([key, _l]) => (
    <MenuItem
      onClick={() => handleLanguageChange(key as Language)}
      key={_l.title}
      sx={languageSwitcherStyles.menuItem}
      selected={key === i18n.language}
    >
      <ListItemIcon>
        <_l.icon />
      </ListItemIcon>
      <ListItemText sx={languageSwitcherStyles.menuItemText}>{_l.title}</ListItemText>
    </MenuItem>
  ));

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackbarOpen.get()}
        autoHideDuration={1500}
        onClose={() => isSnackbarOpen.set(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("notification.languageChanged")}
        </Alert>
      </Snackbar>
      <IconButton aria-label="language" onClick={handleOpenLanguageMenu}>
        <LanguageIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={languageMenuAnchorElement.attach(Downgraded).get()}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {availableLanguages}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
