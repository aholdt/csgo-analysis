import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router";
import { GameInfo, GamesApi } from "../generated-api";

class DemoOverviewPage extends React.Component<any, { data: GameInfo[]; columns: MUIDataTableColumnDef[] }> {
  private onRowClick(rowData: string[]) {
    const id = rowData[0];
    console.log(this.props.history.location);
    const path = this.props.history.location.pathname + "/" + id;
    console.log(path);
    this.props.history.push(path);
  }

  constructor(props: any) {
    super(props);
    console.log(props.history);

    this.state = {
      data: [],
      columns: [
        {
          name: "id",
          options: { display: false, filter: false },
        },
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
    return (
      <MUIDataTable
        title={"Demo List"}
        data={data}
        columns={columns}
        options={{ tableBodyHeight: "100%", onRowClick: (rowData) => this.onRowClick(rowData) }}
      />
    );
  }
}

export default withRouter(DemoOverviewPage);
