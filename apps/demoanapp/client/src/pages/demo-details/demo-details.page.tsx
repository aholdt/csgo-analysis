import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, withRouter } from "react-router-dom";
import PlayerStatsPage from "./player-stats.page";

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
const DemoDetailsPage = withRouter((props) => {
  const [value, setValue] = React.useState(0);
  const gameId = props.match.params.id;

  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div>
      <BrowserRouter>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="2D Viewer" {...a11yProps(1)} />
            <Tab label="Player Stats" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Summary
        </TabPanel>
        <TabPanel value={value} index={1}>
          2D Viewer
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PlayerStatsPage gameId={gameId}></PlayerStatsPage>
        </TabPanel>
      </BrowserRouter>
    </div>
  );
});

export default DemoDetailsPage;
