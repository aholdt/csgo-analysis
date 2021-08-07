export class RoundReplay {
  roundNumber!: number;
  startTick!: number;
  endTick!: number;
  positions!: Map<number, Position[]>;
  playersHurt!: PlayerHurt[];
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

export abstract class PlayerEvent {
  playerId!: number;
  x!: number;
  y!: number;
  z!: number;
  yaw!: number;
  firingWeapon?: string;
}

export class Position extends PlayerEvent {}
