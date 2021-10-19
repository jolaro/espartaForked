import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../atoms/TabPanel";
import InventoryTable from "../molecules/InventoryTable";
import { WeaponsTableBody } from "../molecules/WeaponsTableBody";
import { RequestPage } from "@mui/icons-material";
import { RequestsTableBody } from "../molecules/RequestsTableBody";
import { SoldiersTableBody } from "../molecules/SoldiersTableBody";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function InventoryTabs() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Items" {...a11yProps(0)} />
          <Tab label="Request" {...a11yProps(1)} />
          <Tab label="Assign" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <InventoryTable headers={["Id", "Name", "Quantity", "Category"]} >
          <WeaponsTableBody/>
        </InventoryTable>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <InventoryTable headers={["Id", "Name", "Role", "Items", "Status", ""]}>
          <RequestsTableBody/>
        </InventoryTable>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <InventoryTable headers={["Id", "Name", "Role", "Items", "Status"]}>
          <SoldiersTableBody/>
        </InventoryTable>
      </TabPanel>
    </Box>
  );
}

export default InventoryTabs;