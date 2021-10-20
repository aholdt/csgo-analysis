import { TeamRoundStats } from "./team-round-stats.entity";

export class TeamGameStats {
  constructor(teamRoundStats: TeamRoundStats[]) {
    this.objectType = "TeamGameStats";
    this.teamName = teamRoundStats[0].teamName;
    this.gameId = teamRoundStats[0].gameId;
    this.side = teamRoundStats[0].side;
    this.map = teamRoundStats[0].map;

    this.id = `${this.objectType}_${this.teamName}_${this.gameId}_${this.side}`;

    this.roundWinPct = teamRoundStats.reduce((total, next) => total + (next.roundWon ? 1 : 0), 0) / teamRoundStats.length;

    this.multiKillPct = teamRoundStats.reduce((total, next) => total + next.multiKills, 0) / teamRoundStats.length;
    this.openingKillPct = teamRoundStats.reduce((total, next) => total + next.openingKills, 0);

    this.fiveVsFourWinPct =
      teamRoundStats.reduce((total, next) => total + (next.fiveVsFourRound && next.fiveVsFourWin ? 1 : 0), 0) / teamRoundStats.length;
    this.fourVsFiveWinPct =
      teamRoundStats.reduce((total, next) => total + (next.fourVsFiveRound && next.fourVsFiveWin ? 1 : 0), 0) / teamRoundStats.length;
    this.tradePct =
      teamRoundStats.reduce((total, next) => (total + next.deaths > 0 ? next.deathsTraded / next.deaths : 1), 0) / teamRoundStats.length;

    this.molotovAdr = teamRoundStats.reduce((total, next) => total + next.molotovAdr, 0) / teamRoundStats.length;
    this.heAdr = teamRoundStats.reduce((total, next) => total + next.heAdr, 0) / teamRoundStats.length;
    this.flashAssists = teamRoundStats.reduce((total, next) => total + next.flashAssists, 0) / teamRoundStats.length;
  }

  id!: string;
  objectType: string;
  teamName: string;
  gameId: string;
  map: string;
  side: string;

  roundWinPct: number;

  multiKillPct: number; // 2 kills or more
  openingKillPct: number;

  fourVsFiveWinPct: number;
  fiveVsFourWinPct: number;
  tradePct: number;

  molotovAdr: number;
  heAdr: number;
  flashAssists: number;
}
