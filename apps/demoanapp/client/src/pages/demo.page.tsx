import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { GameInfo, GamesApi } from "../generated-api";

class DemoPage extends React.Component<{}, { data: GameInfo[]; columns: MUIDataTableColumnDef[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      columns: [
        {
          name: "team1",
          label: "Team 1",
        },
        {
          name: "team2",
          label: "Team 2",
        },
        {
          name: "team1Score",
          label: "Team 1 Score",
        },
        {
          name: "team2Score",
          label: "Team 2 Score",
        },
        {
          name: "map",
          label: "Map",
        },
      ],
    };
  }

  async componentDidMount() {
    const gamesApi = new GamesApi();
    const response = await gamesApi.gamesControllerGetAll();
    this.setState({ data: response.data });
  }

  render() {
    const { data, columns } = this.state;
    return <MUIDataTable title={"Demo List"} data={data} columns={columns} options={{ tableBodyHeight: "100%" }} />;
  }
}

export default DemoPage;
