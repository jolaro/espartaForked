import Home from "pages/Home";
import { TranslationKeys } from "translations/_translation_interface";
import { pageTranslations } from "translations/namespaces/pages.translations";
import { getPropertyName } from "utils/get_property_name.util";
import HomeIcon from "@mui/icons-material/Home";
import { SignInSide } from "pages/SignIn";
import SoldierBrowseItems from "pages/SoldierBrowseItems";
import SoldierMyRequests from "pages/SoldierMyRequests";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import ListAltIcon from "@mui/icons-material/ListAlt";

import Reservation from "pages/Reservation";
import ManagerWeaponItems from "pages/ManagerWeaponItems";
import ManagerRequestsBrowser from "pages/ManagerRequestsBrowser";
import ManagerAssignItems from "pages/ManagerAssignItems";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export interface Route {
  /**
   * Unique id for every route
   */
  id: number;

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

  /**
   * Should the page be excluded from rendering in the navigation
   */
  hidden?: boolean;

  /**
   * If the route is restricted and only logged in users can access it.
   */
  restricted: boolean;

  /**
   * In which group the link should be displayed
   */
  group: string;
}

const routes: Route[] = [
  {
    id: 1,
    title: getPropertyName(pageTranslations, (p) => p["page.home"]),
    path: "/",
    component: Home,
    icon: HomeIcon,
    exact: true,
    restricted: true,
    hidden: true,
    group: "Manager",
  },
  {
    id: 2,
    title: getPropertyName(pageTranslations, (p) => p["page.manager.weapons"]),
    path: "/manager/weapons",
    icon: VerticalSplitIcon,
    component: ManagerWeaponItems,
    exact: true,
    hidden: false,
    restricted: true,
    group: "Manager",
  },
  {
    id: 2,
    title: getPropertyName(pageTranslations, (p) => p["page.reservation"]),
    path: "/manager/assign/reservation",
    component: Reservation,
    exact: true,
    restricted: true,
    hidden: true,
    group: "Manager",
  },
  {
    id: 3,
    title: getPropertyName(pageTranslations, (p) => p["page.manager.requests"]),
    path: "/manager/requests",
    icon: FormatListBulletedIcon,
    component: ManagerRequestsBrowser,
    exact: true,
    hidden: false,
    restricted: true,
    group: "Manager",
  },
  {
    id: 4,
    title: getPropertyName(pageTranslations, (p) => p["page.manager.assign"]),
    path: "/manager/assign",
    icon: AssignmentIndIcon,
    component: ManagerAssignItems,
    exact: true,
    hidden: false,
    restricted: true,
    group: "Manager",
  },
  {
    id: 5,
    title: getPropertyName(pageTranslations, (p) => p["page.signin"]),
    path: "/sign-in",
    component: SignInSide,
    exact: true,
    hidden: true,
    restricted: false,
    group: "Other",
  },
  {
    id: 6,
    title: getPropertyName(pageTranslations, (p) => p["page.soldier.browseItems"]),
    path: "/soldier/browse",
    icon: VerticalSplitIcon,
    component: SoldierBrowseItems,
    exact: true,
    hidden: false,
    restricted: true,
    group: "Soldier",
  },
  {
    id: 7,
    title: getPropertyName(pageTranslations, (p) => p["page.soldier.myRequests"]),
    path: "/soldier/requests",
    icon: ListAltIcon,
    component: SoldierMyRequests,
    exact: true,
    hidden: false,
    restricted: true,
    group: "Soldier",
  },
];

export default routes;
