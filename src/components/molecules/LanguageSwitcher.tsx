import { Alert, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Snackbar } from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { Downgraded, useHookstate } from "@hookstate/core";
import { AVAILABLE_LANGUAGES, Language } from "translations/_translation_interface";
import { languageSwitcherStyles } from "styles/mui/langaugeSwitcherStyles";
import { useTranslation } from "react-i18next";
import useTranslate from "hooks/useTranslate";
import { STORAGE_LANGUAGE_KEY } from "config/i18n";
import { useSnackbar } from "notistack";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const t = useTranslate();
  const languageMenuAnchorElement = useHookstate<null | HTMLElement>(null);
  const open = Boolean(languageMenuAnchorElement.get());
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    languageMenuAnchorElement.set(null);
  };

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    languageMenuAnchorElement.set(event.currentTarget);
  };

  const handleLanguageChange = (language: Language) => {
    enqueueSnackbar(t("notification.languageChanged"));
    i18n.changeLanguage(language);
    window.localStorage.setItem(STORAGE_LANGUAGE_KEY, language);
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
