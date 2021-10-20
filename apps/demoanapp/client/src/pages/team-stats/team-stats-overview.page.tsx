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
          options: {
            filter: false,
          },
        },
        {
          name: "roundWinPct",
          label: "Win %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "multiKillPct",
          label: "Multi Kill %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "openingKillPct",
          label: "Opening Kill %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "fourVsFiveWinPct",
          label: "4v5 Win %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "fiveVsFourWinPct",
          label: "5v4 Win %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "tradePct",
          label: "Trade %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "molotovAdr",
          label: "Molotov ADR",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}</span>,
            filter: false,
          },
        },
        {
          name: "heAdr",
          label: "HE ADR",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}</span>,
            filter: false,
          },
        },
        {
          name: "flashAssists",
          label: "Flash assists",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}</span>,
            filter: false,
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
