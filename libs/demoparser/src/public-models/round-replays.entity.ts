import { BombEvent } from "../models/bomb-event.entity";
import { Inventory } from "../models/inventory.entity";
import { Kill } from "../models/kills.entity";
import { PlayerHurt } from "../models/player-hurt.entity";
import { PlayerShot } from "../models/player-shot.entity";
import { PlayerPosition } from "../models/position.entity";
import { Utility } from "../models/utility.entity";

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
