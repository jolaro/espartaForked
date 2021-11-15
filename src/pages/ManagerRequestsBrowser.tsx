import PageTabs from "components/molecules/PageTabs/PageTabs";
import { RequestsTableBody } from "components/molecules/RequestsTableBody";
import { useManagerPageTabs } from "hooks/useManagerPageTabs";
import BodyLayout from "layouts/BodyLayout";
import React from "react";

interface ManagerRequestsBrowserProps {}

const ManagerRequestsBrowser: React.FC<ManagerRequestsBrowserProps> = () => {
  const pageTabProps = useManagerPageTabs();

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <RequestsTableBody />
    </BodyLayout>
  );
};

export default ManagerRequestsBrowser;
