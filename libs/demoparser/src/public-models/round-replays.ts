import { BombEvent } from "../models/bomb-event";
import { Inventory } from "../models/inventory";
import { Kill } from "../models/kills";
import { PlayerHurt } from "../models/player-hurt";
import { PlayerShot } from "../models/player-shot";
import { PlayerPosition } from "../models/positions";
import { Utility } from "../models/utility";

export class RoundReplay {
  roundNumber!: number;
  startTick!: number;
  endTick!: number;
  positions: PlayerPosition[] = [];
  playerShot: PlayerShot[] = [];
  playersHurt: PlayerHurt[] = [];
  utilities: Utility[] = [];
  kills: Kill[] = [];
  inventories: Inventory[] = [];
  bombEvents: BombEvent[] = [];
}
