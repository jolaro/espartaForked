import { AssignTableBody } from "components/molecules/AssignTableBody";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useManagerPageTabs } from "hooks/useManagerPageTabs";
import BodyLayout from "layouts/BodyLayout";
import React from "react";

interface ManagerAssignItemsProps {}

const ManagerAssignItems: React.FC<ManagerAssignItemsProps> = () => {
  const pageTabProps = useManagerPageTabs();

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <AssignTableBody />
    </BodyLayout>
  );
};

export default ManagerAssignItems;
