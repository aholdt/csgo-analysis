import { PlayerRoundStats } from "./player-round-stats.entity";
import { PlayerStats } from "./player-stats.entity";

export class PlayerGameStats extends PlayerStats {
  constructor(roundStats: PlayerRoundStats[]) {
    super();
    this.objectType = "PlayerGameStats";
    this.playerId = roundStats[0].playerId;
    this.playerName = roundStats[0].playerName;
    this.gameId = roundStats[0].gameId;
    this.map = roundStats[0].map;
    this.id = `${this.objectType}_${this.gameId}_${this.playerId}`;
    this.adr = roundStats.reduce((total, next) => total + next.damage, 0) / roundStats.length;
    this.kills = roundStats.reduce((total, next) => total + next.kills, 0);
    this.deaths = roundStats.reduce((total, next) => total + next.deaths, 0);
    this.assists = roundStats.reduce((total, next) => total + next.assists, 0);
    this.openingKills = roundStats.reduce((total, next) => total + next.openingKills, 0);
    this.heDamage = roundStats.reduce((total, next) => total + next.heDamage, 0);
    this.molotovDamage = roundStats.reduce((total, next) => total + next.molotovDamage, 0);
    this.ud = this.heDamage + this.molotovDamage;
    this.flashAssists = roundStats.reduce((total, next) => total + next.flashAssists, 0);
  }
  adr: number;
  id!: string;
  objectType: string;
}
