import { Injectable } from "@nestjs/common";
import {
  BaseEntity,
  DemoFile,
  IEntityCreationEvent,
  IEventDecoyStarted,
  IEventFlashbangDetonate,
  IEventHegrenadeDetonate,
  IEventPlayerHurt,
  IEventSmokegrenadeDetonate,
  IEventWeaponFire,
  Player,
} from "demofile";
import { DemoOutput } from "../models/demo-output";
import { PlayerHurt, PlayerPosition, PlayerShot, Position, RoundReplay, Utility } from "../models/round-replays";
import { UtilityType as UtilityType } from "../models/utilities";
import { DemoOutputBuilder } from "./demo-output-builder";

@Injectable()
export class RoundReplayBuilder implements DemoOutputBuilder {
  demoFile!: DemoFile;

  tickModulus = 64;
  currentRound: RoundReplay;
  roundReplays: Map<number, RoundReplay> = new Map<number, RoundReplay>();

  utilities: UtilityType[] = ["hegrenade", "smokegrenade", "flashbang", "decoy", "molotov", "incgrenade"];
  utilityModelNames: string[] = [
    "models/Weapons/w_eq_fraggrenade_dropped.mdl",
    "models/Weapons/w_eq_smokegrenade_thrown.mdl",
    "models/Weapons/w_eq_flashbang_dropped.mdl",
    "models/Weapons/w_eq_decoy_dropped.mdl",
    "models/Weapons/w_eq_molotov_dropped.mdl",
    "models/Weapons/w_eq_incendiarygrenade_dropped.mdl",
  ];

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;

    demoFile.gameEvents.on("round_start", () => this.initializeCurrentRound());
    demoFile.gameEvents.on("round_freeze_end", () => this.initializeCurrentRound());
    demoFile.gameEvents.on("round_officially_ended", () => this.endCurrentRound());
    demoFile.on("tickstart", () => this.registerPositions());
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
    demoFile.gameEvents.on("weapon_fire", (e) => this.onWeaponFire(e));
    demoFile.gameEvents.on("hegrenade_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.gameEvents.on("flashbang_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.gameEvents.on("smokegrenade_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.gameEvents.on("decoy_detonate", (e) => this.onUtilityDetonate(e));
    demoFile.entities.on("create", (e) => this.onCreate(e));
  }

  onCreate(e: IEntityCreationEvent): void {
    const entity = e.entity;
    if (!(entity instanceof BaseEntity)) {
      return;
    }

    const utilityIndex = this.utilityModelNames.findIndex((x) => x === entity.modelName);
    if (utilityIndex >= 0) {
      const mappedUtility = this.utilities[utilityIndex];
      console.log(mappedUtility);
      const position = <Position>{
        x: entity.position.x,
        y: entity.position.y,
        z: entity.position.z,
      };
      this.utilityThrown(mappedUtility, position, e.entity.index);
    }
  }

  onUtilityDetonate(e: IEventHegrenadeDetonate | IEventFlashbangDetonate | IEventDecoyStarted | IEventSmokegrenadeDetonate): void {
    const utility = this.currentRound.utilities.find((x) => x.entityId === e.entityid);
    utility.tickDetonated = this.demoFile.currentTick;
    utility.playerId = e.userid;
    const thrownTo = <Position>{ x: e.x, y: e.y, z: e.z };
    utility.throwTo = thrownTo;
    utility.path.push(thrownTo);
  }

  isUtility(weapon: string): boolean {
    return this.utilities.findIndex((x) => x === weapon) >= 0;
  }

  onWeaponFire(e: IEventWeaponFire): void {
    const player = this.demoFile.players.find((x) => x.userId === e.userid);
    const playerShot = this.getPlayerPosition(player) as PlayerShot;
    const weaponWithoutPrefix = e.weapon.replace("weapon_", "");
    playerShot.firingWeapon = weaponWithoutPrefix;
    if (!this.isUtility(weaponWithoutPrefix) && weaponWithoutPrefix.indexOf("knife") == -1) {
      this.currentRound.playerShot.push(playerShot);
    }
  }

  utilityThrown(utilityType: UtilityType, position: Position, entityId: number): void {
    this.currentRound.utilities.push(<Utility>{
      tickThrown: this.demoFile.currentTick,
      throwFrom: position,
      type: utilityType,
      entityId: entityId,
      path: [position],
    });
  }

  onPlayerHurt(e: IEventPlayerHurt): void {
    this.currentRound.playersHurt.push(<PlayerHurt>{
      tick: this.demoFile.currentTick,
      healthAfterDamage: e.health,
      targetPlayerId: e.userid,
    });
  }

  registerPositions(): void {
    if (
      !this.currentRound ||
      this.currentRound.roundNumber != this.demoFile.gameRules.roundsPlayed + 1 ||
      this.demoFile.currentTick % this.tickModulus
    ) {
      return;
    }

    for (const player of this.demoFile.players) {
      if (player.isAlive) {
        this.currentRound.positions.push(this.getPlayerPosition(player));
      }
    }
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

  initializeCurrentRound(): void {
    console.log("start round");
    this.currentRound = <RoundReplay>{
      startTick: this.demoFile.currentTick,
      roundNumber: this.demoFile.gameRules.roundsPlayed + 1,
      endTick: this.demoFile.currentTick,
      positions: [],
      playersHurt: [],
      playerShot: [],
      utilities: [],
    };
  }

  endCurrentRound(): void {
    this.currentRound.endTick = this.demoFile.currentTick;
    this.roundReplays.set(this.currentRound.roundNumber, this.currentRound);
    console.log("end round");
  }

  addToOutput(demoOutput: DemoOutput): void {
    demoOutput.roundReplays = Array.from(this.roundReplays.values());
  }
}
