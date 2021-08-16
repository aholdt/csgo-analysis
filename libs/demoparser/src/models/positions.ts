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
