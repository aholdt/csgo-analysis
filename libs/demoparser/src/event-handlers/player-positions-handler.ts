import { Injectable } from "@nestjs/common";
import { DemoFile } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { Position } from "../models/position.entity";
import { RoundHandlerBase } from "./round-handler-base";

@Injectable()
export class PlayerPositionsHandler extends RoundHandlerBase<Position[]> {
  constructor() {
    super(new Array<Position>());
  }

  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("round_freeze_end", () => this.initializeCurrentRound());
    demoFile.on("tickstart", () => this.registerPositions());
  }

  registerPositions(): void {
    if (!this.currentRound || this.demoFile.currentTick % this.tickModulus) {
      return;
    }

    for (const player of this.demoFile.players) {
      if (player.isAlive) {
        this.currentRound.push(this.getPlayerPosition(player));
      }
    }
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.positions = this.roundResults;
  }
}
