import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, withRouter } from "react-router-dom";
import TeamStatsAggregated from "./team-stats-aggregated";
import TeamStatsRaw from "./team-stats-raw";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TeamStatsOverviewPage = withRouter((props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div>
      <BrowserRouter>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Teams" {...a11yProps(0)} />
            <Tab label="Raw" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TeamStatsAggregated></TeamStatsAggregated>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamStatsRaw></TeamStatsRaw>
        </TabPanel>
      </BrowserRouter>
    </div>
  );
});

export default TeamStatsOverviewPage;
