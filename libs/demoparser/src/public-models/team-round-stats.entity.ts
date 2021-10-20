import { PlayerRoundStats } from "./player-round-stats.entity";

export class TeamRoundStats {
  constructor(
    public teamName: string,
    public gameId: string,
    public roundNumber: number,
    public side: string,
    public roundWon: boolean,
    public opponentTeamName: string,
    public map: string,
    playerStats: PlayerRoundStats[]
  ) {
    this.objectType = "TeamRoundStats";
    this.id = `${this.objectType}_${this.teamName}_${this.gameId}_${this.roundNumber}`;

    this.multiKills = playerStats.reduce((total, next) => (total + next.kills >= 2 ? 1 : 0), 0);
    this.openingKills = playerStats.reduce((total, next) => total + next.openingKills, 0);
    this.kills = playerStats.reduce((total, next) => total + next.kills, 0);

    if (this.openingKills > 0) {
      this.fiveVsFourRound = true;
      if (this.roundWon) {
        this.fiveVsFourWin = true;
      }
    } else {
      this.fourVsFiveRound = true;
      if (this.roundWon) {
        this.fourVsFiveWin = true;
      }
    }

    this.deathsTraded = playerStats.reduce((total, next) => total + next.deathsTraded, 0);
    this.deaths = playerStats.reduce((total, next) => total + next.deaths, 0);

    this.molotovAdr = playerStats.reduce((total, next) => total + next.molotovDamage, 0);
    this.heAdr = playerStats.reduce((total, next) => total + next.heDamage, 0);
    this.flashAssists = playerStats.reduce((total, next) => total + next.flashAssists, 0);
  }

  id!: string;
  objectType: string;

  multiKills: number; // 2 kills or more
  openingKills: number;
  kills: number;

  fourVsFiveRound: boolean;
  fiveVsFourRound: boolean;
  fourVsFiveWin: boolean;
  fiveVsFourWin: boolean;
  deathsTraded: number;
  deaths: number;

  molotovAdr: number;
  heAdr: number;
  flashAssists: number;
}
