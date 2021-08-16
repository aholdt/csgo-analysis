import { Injectable } from "@nestjs/common";
import { DemoFile } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { Position } from "../models/positions";
import { DemoBuilderBase } from "./builder-base";

@Injectable()
export class PlayerPositionsBuilder extends DemoBuilderBase<Position[]> {
  constructor() {
    super(new Array<Position>());
  }

  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("round_freeze_end", () => this.initializeCurrentRound());
    demoFile.on("tickstart", () => this.registerPositions());
  }

  registerPositions(): void {
    if (!this.current || this.demoFile.currentTick % this.tickModulus) {
      return;
    }

    for (const player of this.demoFile.players) {
      if (player.isAlive) {
        this.current.push(this.getPlayerPosition(player));
      }
    }
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.positions = this.result;
  }
}
