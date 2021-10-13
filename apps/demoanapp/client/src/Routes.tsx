import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import DemoDetailsPage from "./pages/demo-details/demo-details.page";
import DemoOverviewPage from "./pages/demo-overview.page";

const Stats: React.FC = () => {
  return <h1>Stats</h1>;
};

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
    path: "/stats",
    sidebarName: "Stats",
    component: Stats,
    icon: InboxIcon,
    displayInSidebar: true,
  },
  {
    path: "/teams",
    sidebarName: "Teams",
    component: Teams,
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
