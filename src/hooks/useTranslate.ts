import { useTranslation } from "react-i18next";
import { TranslationKeys } from "translations/_translation_interface";

const useTranslate = () => {
  const { t: translate } = useTranslation();

  const t = (key: TranslationKeys) => translate(key);

  return t;
};

export default useTranslate;
