import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerDeath } from "demofile";
import { Kill } from "../models/kills";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { RoundBuilderBase } from "./round-builder-base";

@Injectable()
export class KillBuilder extends RoundBuilderBase<Kill[]> {
  constructor() {
    super(new Array<Kill>());
  }

  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("player_death", (e) => this.onPlayerDeath(e));
  }

  onPlayerDeath(e: IEventPlayerDeath): void {
    const weaponWithoutPrefix = e.weapon.replace("weapon_", "");
    this.currentRound.push(<Kill>{
      killer: e.attacker,
      assister: e.assister,
      tick: this.demoFile.currentTick,
      victim: e.userid,
      weapon: weaponWithoutPrefix,
    });
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.kills = this.roundResults;
  }
}
