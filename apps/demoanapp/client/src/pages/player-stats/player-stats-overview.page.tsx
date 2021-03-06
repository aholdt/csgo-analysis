import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router-dom";
import { PlayerGameStats, PlayerstatsApi } from "../../generated-api";

class PlayerStatsOverviewPage extends React.Component<any, { data: PlayerGameStats[]; columns: MUIDataTableColumnDef[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: "playerName",
          label: "Player Name",
        },
        {
          name: "kills",
          label: "Kills",
          options: {
            filter: false,
          },
        },
        {
          name: "deaths",
          label: "Deaths",
          options: {
            filter: false,
          },
        },
        {
          name: "assists",
          label: "Assists",
          options: {
            filter: false,
          },
        },
        {
          name: "adr",
          label: "ADR",
          options: {
            filter: false,
          },
        },
        {
          name: "deathsTraded",
          label: "Deaths Traded %",
          options: {
            customBodyRender: (value) => <span>{value.toFixed(2)}%</span>,
            filter: false,
          },
        },
        {
          name: "flashAssists",
          label: "Flash Assists",
          options: {
            filter: false,
          },
        },
        {
          name: "molotovDamage",
          label: "Molotov Damage",
          options: {
            filter: false,
          },
        },
        {
          name: "heDamage",
          label: "HE Damage",
          options: {
            filter: false,
          },
        },
        {
          name: "ud",
          label: "UD",
          options: {
            filter: false,
          },
        },
      ],
    };
  }

  async componentDidMount() {
    const api = new PlayerstatsApi();
    const response = await api.playerstatsControllerGetAll();
    this.setState({ data: response.data });
  }

  render() {
    const { data, columns } = this.state;
    return <MUIDataTable title={"Player Stats"} data={data} columns={columns} options={{ tableBodyHeight: "100%" }} />;
  }
}

export default withRouter(PlayerStatsOverviewPage);
