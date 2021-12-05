import { Button } from "@mui/material";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { WeaponsTableBody } from "components/molecules/WeaponsTableBody";
import AddItemDialog from "components/organisms/AddItemDialog/AddItemDialog";
import { useManagerPageTabs } from "hooks/useManagerPageTabs";
import BodyLayout from "layouts/BodyLayout";
import React from "react";

interface ManagerWeaponItemsProps {}

const ManagerWeaponItems: React.FC<ManagerWeaponItemsProps> = () => {
  const pageTabProps = useManagerPageTabs();

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <WeaponsTableBody />
    </BodyLayout>
  );
};

export default ManagerWeaponItems;
