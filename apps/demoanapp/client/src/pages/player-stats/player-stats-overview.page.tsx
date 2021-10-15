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
        },
        {
          name: "deaths",
          label: "Deaths",
        },
        {
          name: "adr",
          label: "ADR",
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
