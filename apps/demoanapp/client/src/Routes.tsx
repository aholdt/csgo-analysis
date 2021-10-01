import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import DemoPage from "./pages/demo.page";

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
    component: DemoPage,
    icon: InboxIcon,
  },
  {
    path: "/standings",
    sidebarName: "Standings",
    component: Standings,
    icon: InboxIcon,
  },
  {
    path: "/teams",
    sidebarName: "Teams",
    component: Teams,
    icon: InboxIcon,
  },
];

export class Route {
  path!: string;
  sidebarName!: string;
  component!: React.FC;
  icon: any;
}

export default Routes;
