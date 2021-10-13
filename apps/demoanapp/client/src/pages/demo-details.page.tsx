import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { GameInfo, GamesApi } from "../generated-api";

class DemoDetailsPage extends React.Component<{}, { data: GameInfo[]; columns: MUIDataTableColumnDef[] }> {
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
    const gamesApi = new GamesApi();
    console.log(gamesApi);
  }

  render() {
    const { data, columns } = this.state;
    return <MUIDataTable title={"Player Stats"} data={data} columns={columns} options={{ tableBodyHeight: "100%" }} />;
  }
}

export default DemoDetailsPage;
