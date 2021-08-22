import { Position } from "./positions";

export class BombEvent {
  type:
    | "bomb_beginplant_A"
    | "bomb_beginplant_B"
    | "bomb_plant_A"
    | "bomb_plant_B"
    | "bomb_begindefuse"
    | "bomb_canceldefuse"
    | "bomb_defused"
    | "bomb_dropped"
    | "bomb_pickup"
    | "bomb_exploded";
  tick: number;
  userId: number;
  position: Position;
}
