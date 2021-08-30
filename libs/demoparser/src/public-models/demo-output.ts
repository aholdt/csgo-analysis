import { GameInfo } from "./game-info.entity";
import { RoundReplay } from "./round-replays.entity";

export class DemoOutput {
  roundReplays: RoundReplay[] = [];
  gameInfo: GameInfo;
}
