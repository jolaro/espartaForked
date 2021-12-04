import { Box, Button } from "@mui/material";
import { IconButton } from "components/atoms/IconButton";
import { AssignTableBody } from "components/molecules/AssignTableBody";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useManagerPageTabs } from "hooks/useManagerPageTabs";
import BodyLayout from "layouts/BodyLayout";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import useTranslate from "hooks/useTranslate";

interface ManagerAssignItemsProps {}

const ManagerAssignItems: React.FC<ManagerAssignItemsProps> = () => {
  const t = useTranslate();
  const pageTabProps = useManagerPageTabs();
  const history = useHistory();

  const showCreateReservation = () => {
    history.push("/manager/assign/reservation");
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
        <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={showCreateReservation}>
          {t("reservation.createReservationButton")}
        </Button>
      </Box>
      <AssignTableBody />
    </BodyLayout>
  );
};

export default ManagerAssignItems;
