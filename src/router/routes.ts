import App from "../App";
import Home from "pages/Home";
import { TranslationKeys } from "translations/_translation_interface";
import { pageTranslations } from "translations/namespaces/pages.translations";
import { getPropertyName } from "utils/get_property_name.util";

interface Route {
  /**
   * Title which the user will see.
   * Use translation object and helper function
   * to retrieve the value
   *
   * ex: getPropertyName(pageTranslations, (p) => p.home)
   */
  title: TranslationKeys;

  /**
   * The path on which the page will be accessible
   */
  path: string;

  /**
   * What component to render when the `path` url has been requested
   */
  component: React.FC;

  /**
   * Whether to match path as exact or as a base
   */
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
