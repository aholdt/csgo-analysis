import { GameInfo } from "../public-models/game-info";
import { PlayerHurt } from "./player-hurt";
import { PlayerShot } from "./player-shot";
import { Position } from "./positions";
import { Utility } from "./utility";

export class ParsedDemoResult {
  public utilities: Map<number, Utility[]> = new Map<number, Utility[]>();
  public positions: Map<number, Position[]> = new Map<number, Position[]>();
  public playersHurt: Map<number, PlayerHurt[]> = new Map<number, PlayerHurt[]>();
  public playerShots: Map<number, PlayerShot[]> = new Map<number, PlayerShot[]>();
  public gameInfo: GameInfo;
}
