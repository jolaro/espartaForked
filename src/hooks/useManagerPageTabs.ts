import { usePageTabs } from "components/molecules/PageTabs/usePageTabs";
import useTranslate from "./useTranslate";

export const useManagerPageTabs = () => {
  const t = useTranslate();

  const pageTabProps = usePageTabs([
    { name: t("page.manager.weapons"), href: "/manager/weapons" },
    { name: t("page.manager.requests"), href: "/manager/requests" },
    { name: t("page.manager.assign"), href: "/manager/assign" },
  ]);
  return pageTabProps;
};
