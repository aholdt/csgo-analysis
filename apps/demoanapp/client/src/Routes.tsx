import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import DemoDetailsPage from "./pages/demo-details.page";
import DemoOverviewPage from "./pages/demo-overview.page";

const Standings: React.FC = () => {
  return <h1>Standings</h1>;
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
    sidebarName: "Demos",
    component: DemoDetailsPage,
  },
  {
    path: "/standings",
    sidebarName: "Standings",
    component: Standings,
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
