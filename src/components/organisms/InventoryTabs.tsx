import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../atoms/TabPanel";
import InventoryTable from "../molecules/InventoryTable";
import { WeaponsTableBody } from "../molecules/WeaponsTableBody";
import { RequestsTableBody } from "../molecules/RequestsTableBody";
import { AssignTableBody } from "../molecules/AssignTableBody";
import useTranslate from "../../hooks/useTranslate";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function InventoryTabs() {
  const t = useTranslate();
  const id = t("id");
  const name = t("name");
  const quantity = t("quantity");
  const category = t("category");
  const role = t("role");
  const items = t("items");
  const status = t("status");
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("weapons")} {...a11yProps(0)} />
          <Tab label={t("requests")} {...a11yProps(1)} />
          <Tab label={t("assign")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <InventoryTable headers={[id, name, quantity, category]} >
          <WeaponsTableBody/>
        </InventoryTable>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <InventoryTable headers={[id, name, role, items, status, ""]}>
          <RequestsTableBody/>
        </InventoryTable>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <InventoryTable headers={[id, name, role, items, status]}>
          <AssignTableBody/>
        </InventoryTable>
      </TabPanel>
    </Box>
  );
}

export default InventoryTabs;