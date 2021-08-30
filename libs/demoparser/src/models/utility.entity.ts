import { Position } from "./position.entity";

export type UtilityType = "hegrenade" | "smokegrenade" | "flashbang" | "decoy" | "molotov" | "incgrenade";

export class BlindedPlayer {
  playerId!: number;
  startTick!: number;
  endTick!: number;
}

export class Utility {
  playerId!: number;
  type!: UtilityType;
  tickThrown!: number;
  tickDetonated: number;
  tickExpired: number;
  throwFrom: Position;
  throwTo: Position;
  damagedPlayerIds: string[] = [];
  blindedPlayers: BlindedPlayer[] = [];
  path: Position[] = [];
  entityId: number;
}
