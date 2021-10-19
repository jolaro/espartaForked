import { useLocation, useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import { useHistory } from "react-router-dom";

export interface PageTab {
  href: string;
  name: string;
}

export const usePageTabs = (tabs: PageTab[]) => {
  const match = useRouteMatch();
  const activeTab = useHookstate(0);
  const history = useHistory();

  const getTab = (index: number) => tabs[index];

  const onChange = (number: number) => {
    activeTab.set(number);

    history.push(getTab(number).href);
  };

  useEffect(() => {
    const pageTab = tabs.findIndex((t) => match.url.includes(t.href));

    if (pageTab) {
      onChange(pageTab);
    }
  }, [match.url]);

  return {
    activeTab: activeTab.get(),
    onChange,
    tabs,
  };
};
