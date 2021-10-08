import App from "../App";
import Home from "pages/Home";

interface Route {
  title: string;
  path: string;
  component: React.FC;
  exact?: boolean;
}

const routes: Route[] = [
  {
    title: "Home",
    path: "/",
    component: Home,
    exact: true,
  },
  {
    title: "App.tsx Test Component",
    path: "/app/sandbox",
    component: App,
  },
];

export default routes;
