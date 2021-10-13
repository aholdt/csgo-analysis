import { GameInfo } from "./game-info.entity";
import { PlayerGameStats } from "./player-game-stats.entity";
import { PlayerRoundStats } from "./player-round-stats.entity";
import { RoundReplay } from "./round-replays.entity";

export class DemoOutput {
  roundReplays: RoundReplay[] = [];
  gameInfo: GameInfo;
  playerRoundStats: PlayerRoundStats[] = [];
  playerGameStats: PlayerGameStats[] = [];
}
