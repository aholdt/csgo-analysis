import { Button, CircularProgress } from "@material-ui/core";
import MUIDataTable, { DisplayData, FilterType, MUIDataTableColumn, MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router-dom";
import { TeamGameStats, TeamstatsApi } from "../../generated-api";

class TeamStatsOverviewPage extends React.Component<any, { data: TeamGameStats[]; columns: MUIDataTableColumnDef[]; isLoading: boolean }> {
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
          name: "side",
          label: "Side",
          options: {
            filterOptions: {
              names: ["CT", "T"],
            },
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
      isLoading: false,
    };
  }

  handleFilterSubmit(e: any, changedColumn: number) {
    const filterList = e();
    const sides = filterList[changedColumn];
    const side = sides.length ? sides[0] : undefined;
    this.loadData(side);
  }

  filterUpdate = (
    changedColumn: string | MUIDataTableColumn | null,
    filterList: string[][],
    type: FilterType | "chip" | "reset",
    changedColumnIndex: number,
    displayData: DisplayData
  ) => {
    if (type === "chip") {
      var newFilters = () => filterList;
      this.handleFilterSubmit(newFilters, changedColumnIndex);
    }
  };

  async componentDidMount() {
    await this.loadData();
  }

  private async loadData(side?: string) {
    const api = new TeamstatsApi();
    this.setState({ isLoading: true });
    let response: any;
    if (side) {
      response = await api.teamstatsControllerGetAllByTeamAndSide(side);
    } else {
      response = await api.teamstatsControllerGetAllByTeam();
    }
    this.setState({ data: response.data, isLoading: false });
  }

  render() {
    const { data, columns } = this.state;
    const options: MUIDataTableOptions = {
      tableBodyHeight: "100%",
      onFilterChange: this.filterUpdate,
      serverSide: true,
      sort: false,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button variant="contained" onClick={() => this.handleFilterSubmit(applyNewFilters, 2)}>
              Apply Filters
            </Button>
          </div>
        );
      },
      confirmFilters: true,
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

export default withRouter(TeamStatsOverviewPage);
