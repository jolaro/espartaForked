import App from "../App";
import Home from "pages/Home";
import { TranslationKeys } from "translations/_translation_interface";
import { pageTranslations } from "translations/namespaces/pages.translations";
import { getPropertyName } from "utils/get_property_name.util";
import HomeIcon from "@mui/icons-material/Home";
import BiotechIcon from "@mui/icons-material/Biotech";

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
   * Icon which will be shown in navigation and other applicable places
   */
  icon?: React.FC;

  /**
   * Whether to match path as exact or as a base
   */
  exact?: boolean;
}

const routes: Route[] = [
  {
    title: getPropertyName(pageTranslations, (p) => p["page.sandbox"]),
    path: "/",
    component: Home,
    exact: true,
    icon: HomeIcon,
  },
  {
    title: getPropertyName(pageTranslations, (p) => p["page.home"]),
    path: "/app/sandbox",
    component: App,
    icon: BiotechIcon,
  },
];

export default routes;
