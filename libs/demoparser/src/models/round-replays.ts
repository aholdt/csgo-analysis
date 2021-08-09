export class RoundReplay {
  roundNumber!: number;
  startTick!: number;
  endTick!: number;
  positions: Position[] = [];
  playerShot: PlayerShot[] = [];
  playersHurt: PlayerHurt[] = [];
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
  playerId!: number;
  x!: number;
  y!: number;
  z!: number;
  yaw!: number;
}

export class PlayerShot extends Position {
  firingWeapon?: string;
}
