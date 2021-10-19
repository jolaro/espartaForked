import { usePageTabs } from "components/molecules/PageTabs/usePageTabs";
import useTranslate from "./useTranslate";

export const useSoldierPageTabs = () => {
  const t = useTranslate();
  const pageTabProps = usePageTabs([
    { name: t("page.soldier.browseItems"), href: "/soldier/browse" },
    { name: t("page.soldier.myRequests"), href: "/soldier/requests" },
  ]);
  return pageTabProps;
};
