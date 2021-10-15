import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../atoms/TabPanel";
import InventoryItemsTable from "../molecules/InventoryItemsTable";
import InventoryRequestTable from "../molecules/InventoryRequestTable";
import InventoryTable from "../molecules/InventoryTable";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function InventoryTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <InventoryTable value={0} headers={["Id", "Name", "CurrentQuantity", "Category"]}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InventoryTable value={1} headers={["Id", "Name", "Items", "Status", "Role"]}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </Box>
  );
}

export default InventoryTabs;