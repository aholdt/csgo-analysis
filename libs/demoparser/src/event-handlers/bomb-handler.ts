import { Injectable } from "@nestjs/common";
import { DemoFile } from "demofile";
import { BombEvent } from "../models/bomb-event.entity";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { Position } from "../models/position.entity";
import { RoundHandlerBase } from "./round-handler-base";

@Injectable()
export class BombHandler extends RoundHandlerBase<BombEvent[]> {
  constructor() {
    super(new Array<BombEvent>());
  }

  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("bomb_pickup", (e) => this.onBombEvent(e.userid, "bomb_pickup"));
    demoFile.gameEvents.on("bomb_dropped", (e) => this.onBombEvent(e.userid, "bomb_dropped"));
    demoFile.gameEvents.on("bomb_planted", (e) => this.onBombEvent(e.userid, `bomb_plant_${this.getSite(e.userid)}`));
    demoFile.gameEvents.on("bomb_beginplant", (e) => this.onBombEvent(e.userid, `bomb_beginplant_${this.getSite(e.userid)}`));
    demoFile.gameEvents.on("bomb_begindefuse", (e) => this.onBombEvent(e.userid, "bomb_begindefuse"));
    demoFile.gameEvents.on("bomb_defused", (e) => this.onBombEvent(e.userid, "bomb_defused"));
    demoFile.gameEvents.on("bomb_exploded", (e) => this.onBombEvent(e.userid, "bomb_exploded"));
    demoFile.on("tickstart", () => this.hasPlayerStoppedDefusing());
  }

  hasPlayerStoppedDefusing(): void {
    const latestDefuseEvent = this.currentRound[this.currentRound.length - 1];
    const defuseStarted = latestDefuseEvent?.type === "bomb_begindefuse";
    if (!defuseStarted) {
      return;
    }

    const player = this.demoFile.entities.getByUserId(latestDefuseEvent.userId);
    if (!player.isDefusing) {
      this.currentRound.push(<BombEvent>{
        tick: this.demoFile.currentTick,
        position: new Position(this.demoFile.currentTick, player.position),
        type: "bomb_canceldefuse",
        userId: player.userId,
      });
    }
  }

  getSite(userId: number): string {
    const player = this.demoFile.entities.getByUserId(userId);
    return player.placeName;
  }

  onBombEvent(userId: number, bombEventType: string): void {
    const player = this.demoFile.entities.getByUserId(userId);
    if (!player) {
      return;
    }
    this.currentRound.push(<BombEvent>{
      tick: this.demoFile.currentTick,
      position: new Position(this.demoFile.currentTick, player.position),
      type: bombEventType,
      userId: userId,
    });
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.bombEvents = this.roundResults;
  }
}
