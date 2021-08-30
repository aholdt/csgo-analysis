import { Vector } from "demofile";

export class Position {
  tick!: number;
  x!: number;
  y!: number;
  z!: number;

  constructor(tick: number, vector: Vector) {
    this.tick = tick;
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
  }
}

export class PlayerPosition extends Position {
  playerId!: number;
  yaw!: number;
}
