import React from "react";
import DemoPage from "./pages/demo.page";

const Standings: React.FC = () => {
  return <h1>Standings</h1>;
};

const Teams: React.FC = () => {
  return <h1>Teams</h1>;
};

const Routes = [
  {
    path: "/demos",
    sidebarName: "Demos",
    component: DemoPage,
  },
  {
    path: "/standings",
    sidebarName: "Standings",
    component: Standings,
  },
  {
    path: "/teams",
    sidebarName: "Teams",
    component: Teams,
  },
];

export default Routes;
