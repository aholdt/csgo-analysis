import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router";
import FileUploadSpeedDial from "../components/file-upload-speed-dial";
import { FilesApi, GameInfo, GamesApi } from "../generated-api";

class DemoOverviewPage extends React.Component<any, { data: GameInfo[]; columns: MUIDataTableColumnDef[] }> {
  open: boolean | undefined;
  private onRowClick(rowData: string[]) {
    const id = rowData[0];
    const path = this.props.history.location.pathname + "/" + id;
    this.props.history.push(path);
  }

  constructor(props: any) {
    super(props);

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

  handleFilesSelected = async (e: React.FormEvent<HTMLInputElement>) => {
    var files = e.currentTarget?.files;
    if (!files) {
      return;
    }

    const api = new FilesApi();
    for (var i = 0; i < files.length; i++) {
      const file = files.item(i);
      await api.filesControllerUploadFile(file);
    }
  };

  render() {
    const { data, columns } = this.state;
    return (
      <div>
        <MUIDataTable
          title={"Demo List"}
          data={data}
          columns={columns}
          options={{ tableBodyHeight: "100%", onRowClick: (rowData) => this.onRowClick(rowData) }}
        />
        <FileUploadSpeedDial fileUploadCallback={this.handleFilesSelected} />
      </div>
    );
  }
}

export default withRouter(DemoOverviewPage);
