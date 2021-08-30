import { Injectable } from "@nestjs/common";
import { DemoFile, IEventItemPickup, IEventItemRemove } from "demofile";
import { Inventory } from "../models/inventory.entity";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { RoundHandlerBase } from "./round-handler-base";

@Injectable()
export class InventoryHandler extends RoundHandlerBase<Inventory[]> {
  constructor() {
    super(new Array<Inventory>());
  }

  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);
    demoFile.gameEvents.on("item_pickup", (e) => this.onItemPickup(e));
    demoFile.gameEvents.on("item_remove", (e) => this.onItemRemove(e));
  }

  onItemRemove(e: IEventItemRemove): void {
    const player = this.demoFile.entities.getByUserId(e.userid);
    const userInRound = this.currentRound.find((x) => x.userId === player.userId);
    if (player.isAlive && userInRound) {
      this.currentRound.push(<Inventory>{
        tick: this.demoFile.currentTick,
        userId: player.userId,
        inventory: userInRound.inventory.filter((x) => x === e.item),
      });
    }
  }

  onItemPickup(e: IEventItemPickup): void {
    const userInRound = this.currentRound.find((x) => x.userId === e.userid);
    this.currentRound.push(<Inventory>{
      tick: this.demoFile.currentTick,
      userId: e.userid,
      inventory: userInRound ? [...userInRound.inventory, e.item] : [e.item],
    });
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.inventories = this.roundResults;
  }
}
