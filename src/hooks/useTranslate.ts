import { useTranslation } from "react-i18next";
import { translations } from "translations/translations";

const useTranslate = () => {
  const { t: translate } = useTranslation();

  const t = (key: keyof typeof translations) => translate(key);

  return t;
};

export default useTranslate;
