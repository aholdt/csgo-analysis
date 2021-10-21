import { CircularProgress } from "@mui/material";
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router-dom";
import { TeamGameStats, TeamstatsApi } from "../../generated-api";

class TeamStatsRaw extends React.Component<any, { data: TeamGameStats[]; columns: MUIDataTableColumnDef[]; isLoading: boolean }> {
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
          name: "map",
          label: "Map",
        },
        {
          name: "side",
          label: "Side",
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
      isLoading: false,
    };
  }

  async componentDidMount() {
    const api = new TeamstatsApi();
    this.setState({ isLoading: true });
    const response = await api.teamstatsControllerGetAll();
    this.setState({ data: response.data, isLoading: false });
  }

  render() {
    const { data, columns } = this.state;
    const options: MUIDataTableOptions = {
      tableBodyHeight: "100%",
      downloadOptions: {
        filterOptions: {
          useDisplayedRowsOnly: true,
        },
      },
    };
    return (
      <React.Fragment>
        {this.state.isLoading && (
          <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 2000 }}>
            <CircularProgress />
          </div>
        )}
        <MUIDataTable title={undefined} data={data} columns={columns} options={options} />
      </React.Fragment>
    );
  }
}

export default withRouter(TeamStatsRaw);
