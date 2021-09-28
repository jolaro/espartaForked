import { Button } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import React from "react";
import LanguageSwitcher from "components/molecules/LanguageSwitcher";

const App: React.FC = () => {
  const t = useTranslate();

  return (
    <div className="App">
      <h1>{t("helloWorld")}</h1>
      <LanguageSwitcher />
      <Button variant="contained">It's cool</Button>
    </div>
  );
};

export default App;
