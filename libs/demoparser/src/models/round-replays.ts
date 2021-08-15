import { UtilityType } from "./utilities";

export class RoundReplay {
  roundNumber!: number;
  startTick!: number;
  endTick!: number;
  positions: PlayerPosition[] = [];
  playerShot: PlayerShot[] = [];
  playersHurt: PlayerHurt[] = [];
  utilities: Utility[] = [];
}

export class Kill {
  tick!: number;
  killer!: string;
  assister!: string;
  victim!: string;
  weapon!: string;
}

export class PlayerHurt {
  tick!: number;
  targetPlayerId!: number;
  healthAfterDamage!: number;
}

export class Position {
  tick!: number;
  x!: number;
  y!: number;
  z!: number;
}

export class PlayerPosition extends Position {
  playerId!: number;
  yaw!: number;
}

export class PlayerShot extends PlayerPosition {
  firingWeapon?: string;
}

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
