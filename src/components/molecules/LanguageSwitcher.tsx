import React from "react";
import { ReactComponent as UKFlag } from "../../assets/flags/united-kingdom.svg";
import { ReactComponent as ESFlag } from "../../assets/flags/spain.svg";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ width: 100, display: "flex", gap: "10px" }}>
      <UKFlag onClick={() => i18n.changeLanguage("en")} />
      <ESFlag onClick={() => i18n.changeLanguage("es")} />
    </div>
  );
};

export default LanguageSwitcher;
