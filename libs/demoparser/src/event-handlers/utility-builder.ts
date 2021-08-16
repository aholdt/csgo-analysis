import { Injectable } from "@nestjs/common";
import {
  BaseEntity,
  DemoFile,
  IEntityCreationEvent,
  IEventDecoyStarted,
  IEventFlashbangDetonate,
  IEventHegrenadeDetonate,
  IEventSmokegrenadeDetonate,
} from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { Position } from "../models/positions";
import { Utility, UtilityType } from "../models/utility";
import { RoundBuilderBase } from "./round-builder-base";

@Injectable()
export class UtilityBuilder extends RoundBuilderBase<Utility[]> {
  constructor() {
    super(new Array<Utility>());
  }
  utilityModelNames: string[] = [
    "models/Weapons/w_eq_fraggrenade_dropped.mdl",
    "models/Weapons/w_eq_smokegrenade_thrown.mdl",
    "models/Weapons/w_eq_flashbang_dropped.mdl",
    "models/Weapons/w_eq_decoy_dropped.mdl",
    "models/Weapons/w_eq_molotov_dropped.mdl",
    "models/Weapons/w_eq_incendiarygrenade_dropped.mdl",
  ];

  initialize(demoFile: DemoFile): void {
    super.initialize(demoFile);

    demoFile.gameEvents.on("hegrenade_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.gameEvents.on("flashbang_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.gameEvents.on("smokegrenade_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.gameEvents.on("decoy_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.entities.on("create", (e) => this.onCreate(e));
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.utilities = this.roundResults;
  }

  onCreate(e: IEntityCreationEvent): void {
    const entity = e.entity;
    if (!(entity instanceof BaseEntity)) {
      return;
    }

    const utilityIndex = this.utilityModelNames.findIndex((x) => x === entity.modelName);
    if (utilityIndex >= 0) {
      const mappedUtility = this.utilities[utilityIndex];
      const position = <Position>{
        x: entity.position.x,
        y: entity.position.y,
        z: entity.position.z,
      };
      this.utilityThrown(mappedUtility, position, e.entity.index);
    }
  }

  onUtilityDetonate(e: IEventHegrenadeDetonate | IEventFlashbangDetonate | IEventDecoyStarted | IEventSmokegrenadeDetonate): void {
    const utility = this.currentRound.find((x) => x.entityId === e.entityid);
    utility.tickDetonated = this.demoFile.currentTick;
    utility.playerId = e.userid;
    const thrownTo = <Position>{ x: e.x, y: e.y, z: e.z };
    utility.throwTo = thrownTo;
    utility.path.push(thrownTo);
  }

  utilityThrown(utilityType: UtilityType, position: Position, entityId: number): void {
    this.currentRound.push(<Utility>{
      tickThrown: this.demoFile.currentTick,
      throwFrom: position,
      type: utilityType,
      entityId: entityId,
      path: [position],
    });
  }
}
