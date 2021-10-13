import * as _ from "lodash";
import { DemoOutput } from "../public-models/demo-output";
import { GameInfo } from "../public-models/game-info.entity";
import { PlayerGameStats } from "../public-models/player-game-stats.entity";
import { PlayerRoundStats } from "../public-models/player-round-stats.entity";
import { RoundReplay } from "../public-models/round-replays.entity";
import { BombEvent } from "./bomb-event.entity";
import { Inventory } from "./inventory.entity";
import { Kill } from "./kills.entity";
import { PlayerHurt } from "./player-hurt.entity";
import { PlayerShot } from "./player-shot.entity";
import { Position } from "./position.entity";
import { Utility } from "./utility.entity";

export class ParsedDemoResult {
  public utilities: Map<number, Utility[]> = new Map<number, Utility[]>();
  public positions: Map<number, Position[]> = new Map<number, Position[]>();
  public playersHurt: Map<number, PlayerHurt[]> = new Map<number, PlayerHurt[]>();
  public playerShots: Map<number, PlayerShot[]> = new Map<number, PlayerShot[]>();
  public kills: Map<number, Kill[]> = new Map<number, Kill[]>();
  public inventories: Map<number, Inventory[]> = new Map<number, Inventory[]>();
  public bombEvents: Map<number, BombEvent[]> = new Map<number, BombEvent[]>();
  public playerRoundStats: Map<number, PlayerRoundStats[]> = new Map<number, PlayerRoundStats[]>();
  public gameInfo: GameInfo;

  mapToOutput(): DemoOutput {
    const roundReplays: RoundReplay[] = [];
    for (let index = 1; index < this.positions.size; index++) {
      roundReplays.push(<RoundReplay>{
        roundNumber: index,
        positions: this.positions.get(index),
        playerShot: this.playerShots.get(index),
        playersHurt: this.playersHurt.get(index),
        utilities: this.utilities.get(index),
        kills: this.kills.get(index),
        inventories: this.inventories.get(index),
        bombEvents: this.bombEvents.get(index),
      });
    }

    let playerRoundStats: PlayerRoundStats[] = [];
    const playerGameStats: PlayerGameStats[] = [];
    for (const a of this.playerRoundStats.values()) {
      playerRoundStats = playerRoundStats.concat(a);
    }
    const groupedRoundStats = _.groupBy(playerRoundStats, (x) => x.playerId);

    _.forEach(groupedRoundStats, (g) => {
      playerGameStats.push(new PlayerGameStats(g));
    });

    return <DemoOutput>{
      gameInfo: this.gameInfo,
      roundReplays: roundReplays,
      playerRoundStats: playerRoundStats,
      playerGameStats: playerGameStats,
    };
  }
}
