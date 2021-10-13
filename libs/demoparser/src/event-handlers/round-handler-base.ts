import { DemoFile, Player } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { PlayerPosition } from "../models/position.entity";
import { UtilityType } from "../models/utility.entity";
import { DemoOutputHandler } from "./demo-output-handler";

export abstract class RoundHandlerBase<T> implements DemoOutputHandler {
  tickModulus = 64;
  demoFile!: DemoFile;
  currentRound: T;
  roundResults: Map<number, T> = new Map<number, T>();

  utilities: UtilityType[] = ["hegrenade", "smokegrenade", "flashbang", "decoy", "molotov", "incgrenade"];
  emptyModel: T;
  gameId: string;

  constructor(ctor: T) {
    this.emptyModel = ctor;
    this.currentRound = JSON.parse(JSON.stringify(ctor)) as T;
  }

  initialize(demoFile: DemoFile, gameId?: string): void {
    this.demoFile = demoFile;
    this.gameId = gameId;
    demoFile.gameEvents.on("round_start", () => this.initializeCurrentRound());
    demoFile.gameEvents.on("round_officially_ended", () => this.endCurrentRound());
  }

  endCurrentRound(): void {
    this.roundResults.set(this.demoFile.gameRules.roundsPlayed, this.currentRound);
  }

  initializeCurrentRound(): void {
    this.currentRound = JSON.parse(JSON.stringify(this.emptyModel)) as T;
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
