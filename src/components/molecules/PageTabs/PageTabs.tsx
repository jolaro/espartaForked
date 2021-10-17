import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { PageTab } from "./usePageTabs";

function a11yProps(index: any) {
  return {
    id: `page-tab-${index}`,
    "aria-controls": `tab-panel-${index}`,
  };
}

interface PageTabsProps {
  tabs: PageTab[];
  activeTab: number;
  onChange: (tabId: number) => void;
}

const PageTabs: React.FC<PageTabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={activeTab}
        onChange={(event: React.SyntheticEvent, newValue: number) => onChange(newValue)}
        aria-label="basic tabs example"
      >
        {tabs.map((tab, i) => (
          <Tab key={tab.name} label={tab.name} {...a11yProps(i)} />
        ))}
      </Tabs>
    </Box>
  );
};

export default PageTabs;
