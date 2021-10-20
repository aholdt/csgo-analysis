import { PlayerStats } from "./player-stats.entity";

export class PlayerRoundStats extends PlayerStats {
  constructor(
    public roundNumber: number,
    public playerName: string,
    public playerId: number,
    public gameId: string,
    public side: string,
    public map: string
  ) {
    super();
    this.objectType = "PlayerRoundStats";
    this.id = `${this.objectType}_${this.gameId}_${this.roundNumber}_${this.playerName}`;
  }
  damage = 0;
  id!: string;
  objectType: string;
}
