import { DemoFile, Player } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { PlayerPosition } from "../models/positions";
import { UtilityType } from "../models/utility";
import { DemoOutputBuilder } from "./demo-output-builder";

export abstract class DemoBuilderBase<T> implements DemoOutputBuilder {
  tickModulus = 64;
  demoFile!: DemoFile;
  current: T;
  result: Map<number, T> = new Map<number, T>();

  utilities: UtilityType[] = ["hegrenade", "smokegrenade", "flashbang", "decoy", "molotov", "incgrenade"];
  emptyModel: T;

  constructor(ctor: T) {
    this.emptyModel = ctor;
    this.current = JSON.parse(JSON.stringify(ctor)) as T;
  }

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;
    demoFile.gameEvents.on("round_start", () => this.initializeCurrentRound());
    demoFile.gameEvents.on("round_officially_ended", () => this.endCurrentRound());
  }

  endCurrentRound(): void {
    this.result.set(this.demoFile.gameRules.roundsPlayed + 1, this.current);
  }

  initializeCurrentRound(): void {
    this.current = JSON.parse(JSON.stringify(this.emptyModel)) as T;
  }

  create<T>(type: new () => T): T {
    return new type();
  }

  isUtility(weapon: string): boolean {
    return this.utilities.findIndex((x) => x === weapon) >= 0;
  }

  getPlayerPosition(player: Player): PlayerPosition {
    return <PlayerPosition>{
      tick: this.demoFile.currentTick,
      playerId: player.userId,
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
      yaw: player.eyeAngles.yaw,
    };
  }

  abstract addToResult(demoResult: ParsedDemoResult): void;
}
