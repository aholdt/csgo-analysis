import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerHurt } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { PlayerHurt } from "../models/player-hurt";
import { RoundBuilderBase } from "./round-builder-base";

@Injectable()
export class PlayerHurtBuilder extends RoundBuilderBase<PlayerHurt[]> {
  constructor() {
    super(new Array<PlayerHurt>());
  }
  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
  }
  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.playersHurt = this.roundResults;
  }

  onPlayerHurt(e: IEventPlayerHurt): void {
    this.currentRound.push(<PlayerHurt>{
      tick: this.demoFile.currentTick,
      healthAfterDamage: e.health,
      targetPlayerId: e.userid,
    });
  }
}
