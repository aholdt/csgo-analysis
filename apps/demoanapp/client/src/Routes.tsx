import InboxIcon from "@mui/icons-material/MoveToInbox";
import DemoDetailsPage from "./pages/demo-details/demo-details.page";
import DemoOverviewPage from "./pages/demo-overview.page";
import PlayerStatsOverviewPage from "./pages/player-stats/player-stats-overview.page";
import TeamStatsOverviewPage from "./pages/team-stats/team-stats-overview.page";

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
    component: TeamStatsOverviewPage,
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
