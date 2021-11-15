import { Box } from "@mui/material";
import { IconButton } from "components/atoms/IconButton";
import { AssignTableBody } from "components/molecules/AssignTableBody";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useManagerPageTabs } from "hooks/useManagerPageTabs";
import BodyLayout from "layouts/BodyLayout";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

interface ManagerAssignItemsProps {}

const ManagerAssignItems: React.FC<ManagerAssignItemsProps> = () => {
  const pageTabProps = useManagerPageTabs();
  const history = useHistory();

  const showCreateReservation = () => {
    history.push("/reservation");
  };

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <IconButton icon={<AddIcon />} text="Add Soldier" onHandleClick={showCreateReservation} />
      </Box>
      <AssignTableBody />
    </BodyLayout>
  );
};

export default ManagerAssignItems;
