import { Button, CircularProgress } from "@material-ui/core";
import MUIDataTable, { DisplayData, FilterType, MUIDataTableColumn, MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import React from "react";
import { withRouter } from "react-router-dom";
import { TeamGameStats, TeamstatsApi } from "../../generated-api";

class TeamStatsOverviewPage extends React.Component<any, { data: TeamGameStats[]; columns: MUIDataTableColumnDef[]; isLoading: boolean }> {
  side?: string;
  teamName?: string;
  map?: string;

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
        {
          name: "map",
          label: "Map",
          options: {
            display: false,
            filterOptions: { names: ["de_inferno", "de_ancient", "de_dust2", "de_vertigo", "de_overpass", "de_nuke", "de_mirage"] },
          },
        },
      ],
      isLoading: false,
    };
  }

  handleFilterSubmit(e: any) {
    const filterList = e();
    const sides = filterList[2];
    this.side = sides.length ? sides[0] : undefined;
    const teamNames = filterList[0];
    this.teamName = teamNames.length ? encodeURIComponent(teamNames[0]) : undefined;
    const maps = filterList[12];
    this.map = maps.length ? maps[0] : undefined;
    this.loadData();
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
      this.handleFilterSubmit(newFilters);
    }
  };

  async componentDidMount() {
    await this.loadData();
  }

  private async loadData() {
    const api = new TeamstatsApi();
    this.setState({ isLoading: true });
    const response = await api.teamstatsControllerGetAllByTeam(this.side, this.teamName, this.map);
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
            <Button variant="contained" onClick={() => this.handleFilterSubmit(applyNewFilters)}>
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
