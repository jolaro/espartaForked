import { Button } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import React from "react";
import LanguageSwitcher from "components/molecules/LanguageSwitcher";
import BodyLayout from "layouts/BodyLayout";
import { useSnackbar } from "notistack";
import { TranslationKeys } from "./translations/_translation_interface";

const App: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslate();

  return (
    <BodyLayout>
      <div className="App">
        <h1>{t("helloWorld")}</h1>
        <h3>{t("helloWorldSubtitle")}</h3>
        <LanguageSwitcher />
        <Button variant="contained" onClick={() => enqueueSnackbar("Test 123", { variant: "success" })}>
          It's cool
        </Button>
      </div>
    </BodyLayout>
  );
};

export default App;
