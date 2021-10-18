import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import DemoDetailsPage from "./pages/demo-details/demo-details.page";
import DemoOverviewPage from "./pages/demo-overview.page";
import PlayerStatsOverviewPage from "./pages/player-stats/player-stats-overview.page";
import teamStatsOverviewPage from "./pages/team-stats/team-stats-overview.page";

const Teams: React.FC = () => {
  return <h1>Teams</h1>;
};

const Routes: Route[] = [
  {
    path: "/demos",
    sidebarName: "Demos",
    component: DemoOverviewPage,
    icon: InboxIcon,
    displayInSidebar: true,
  },
  {
    path: "/demos/:id",
    sidebarName: "Demos > Demo",
    component: DemoDetailsPage,
  },
  {
    path: "/player-stats",
    sidebarName: "Player Stats",
    component: PlayerStatsOverviewPage,
    icon: InboxIcon,
    displayInSidebar: true,
  },
  {
    path: "/team-stats",
    sidebarName: "Team Stats",
    component: teamStatsOverviewPage,
    icon: InboxIcon,
    displayInSidebar: true,
  },
];

export class Route {
  path!: string;
  sidebarName!: string;
  component!: any;
  icon?: any;
  displayInSidebar? = false;
}

export default Routes;
