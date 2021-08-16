import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerHurt } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { PlayerHurt } from "../models/player-hurt";
import { DemoBuilderBase } from "./builder-base";

@Injectable()
export class PlayerHurtBuilder extends DemoBuilderBase<PlayerHurt[]> {
  constructor() {
    super(new Array<PlayerHurt>());
  }
  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
  }
  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.playersHurt = this.result;
  }

  onPlayerHurt(e: IEventPlayerHurt): void {
    this.current.push(<PlayerHurt>{
      tick: this.demoFile.currentTick,
      healthAfterDamage: e.health,
      targetPlayerId: e.userid,
    });
  }
}
