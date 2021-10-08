import App from "../App";
import Home from "pages/Home";
import { TranslationKeys } from "translations/_translation_interface";
import { pageTranslations } from "translations/namespaces/pages.translations";
import { getPropertyName } from "utils/get_property_name.util";

interface Route {
  title: TranslationKeys;
  path: string;
  component: React.FC;
  exact?: boolean;
}

const routes: Route[] = [
  {
    title: getPropertyName(pageTranslations, (p) => p.home),
    path: "/",
    component: Home,
    exact: true,
  },
  {
    title: getPropertyName(pageTranslations, (p) => p.sandbox),
    path: "/app/sandbox",
    component: App,
  },
];

export default routes;
