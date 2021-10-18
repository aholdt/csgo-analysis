import { PlayerRoundStats } from "../public-models/player-round-stats.entity";
import { TeamRoundStats } from "../public-models/team-round-stats.entity";

export class RoundStats {
  playerStats: PlayerRoundStats[] = [];
  team1Stats: TeamRoundStats;
  team2Stats: TeamRoundStats;
}
