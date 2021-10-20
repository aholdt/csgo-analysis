import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router-dom";
import { TeamGameStats, TeamstatsApi } from "../../generated-api";

class TeamStatsOverviewPage extends React.Component<any, { data: TeamGameStats[]; columns: MUIDataTableColumnDef[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: "teamName",
          label: "Team Name",
        },
        {
          name: "maps",
          label: "Maps",
        },
        {
          name: "roundWinPct",
          label: "Win %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
          },
        },
      ],
    };
  }

  async componentDidMount() {
    const api = new TeamstatsApi();
    const response = await api.teamstatsControllerGetAllByTeam();
    this.setState({ data: response.data });
  }

  render() {
    const { data, columns } = this.state;
    return <MUIDataTable title={undefined} data={data} columns={columns} options={{ tableBodyHeight: "100%" }} />;
  }
}

export default withRouter(TeamStatsOverviewPage);
