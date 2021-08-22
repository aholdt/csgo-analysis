import { DemoOutput } from "../public-models/demo-output";
import { GameInfo } from "../public-models/game-info";
import { RoundReplay } from "../public-models/round-replays";
import { BombEvent } from "./bomb-event";
import { Inventory } from "./inventory";
import { Kill } from "./kills";
import { PlayerHurt } from "./player-hurt";
import { PlayerShot } from "./player-shot";
import { Position } from "./positions";
import { Utility } from "./utility";

export class ParsedDemoResult {
  public utilities: Map<number, Utility[]> = new Map<number, Utility[]>();
  public positions: Map<number, Position[]> = new Map<number, Position[]>();
  public playersHurt: Map<number, PlayerHurt[]> = new Map<number, PlayerHurt[]>();
  public playerShots: Map<number, PlayerShot[]> = new Map<number, PlayerShot[]>();
  public kills: Map<number, Kill[]> = new Map<number, Kill[]>();
  public inventories: Map<number, Inventory[]> = new Map<number, Inventory[]>();
  public bombEvents: Map<number, BombEvent[]> = new Map<number, BombEvent[]>();
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

    return <DemoOutput>{
      gameInfo: this.gameInfo,
      roundReplays: roundReplays,
    };
  }
}
