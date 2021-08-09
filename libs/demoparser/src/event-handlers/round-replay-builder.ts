import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerHurt, IEventWeaponFire, Player } from "demofile";
import { DemoOutput } from "../models/demo-output";
import { PlayerHurt, PlayerShot, Position, RoundReplay } from "../models/round-replays";
import { DemoOutputBuilder } from "./demo-output-builder";

@Injectable()
export class RoundReplayBuilder implements DemoOutputBuilder {
  tickModulus = 64;
  currentRound: RoundReplay;
  roundReplays: Map<number, RoundReplay> = new Map<number, RoundReplay>();
  demoFile!: DemoFile;

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;
    demoFile.gameEvents.on("round_freeze_end", () => this.initializeCurrentRound());
    demoFile.gameEvents.on("round_officially_ended", () => this.endCurrentRound());
    demoFile.on("tickstart", () => this.registerPositions());
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
    demoFile.gameEvents.on("weapon_fire", (e) => this.onWeaponFire(e));
  }

  onWeaponFire(e: IEventWeaponFire): void {
    const player = this.demoFile.players.find((x) => x.userId === e.userid);
    const playerShot = this.getPlayerPosition(player) as PlayerShot;
    playerShot.firingWeapon = e.weapon;
    this.currentRound.playerShot.push(playerShot);
  }

  onPlayerHurt(e: IEventPlayerHurt): void {
    this.currentRound.playersHurt.push(<PlayerHurt>{
      tick: this.demoFile.currentTick,
      healthAfterDamage: e.health,
      targetPlayerId: e.userid,
    });
  }

  registerPositions(): void {
    if (!this.currentRound || this.demoFile.currentTick % this.tickModulus) {
      return;
    }

    for (const player of this.demoFile.players) {
      if (player.isAlive) {
        this.currentRound.positions.push(this.getPlayerPosition(player));
      }
    }
  }

  getPlayerPosition(player: Player): Position {
    return <Position>{
      tick: this.demoFile.currentTick,
      playerId: player.userId,
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
      yaw: player.eyeAngles.yaw,
    };
  }

  initializeCurrentRound(): void {
    this.currentRound = <RoundReplay>{
      startTick: this.demoFile.currentTick,
      roundNumber: this.demoFile.gameRules.roundsPlayed + 1,
      endTick: this.demoFile.currentTick,
      positions: [],
      playersHurt: [],
      playerShot: [],
    };
  }

  endCurrentRound(): void {
    this.currentRound.endTick = this.demoFile.currentTick;
    this.roundReplays.set(this.currentRound.roundNumber, this.currentRound);
    this.currentRound = undefined;
  }

  addToOutput(demoOutput: DemoOutput): void {
    demoOutput.roundReplays = Array.from(this.roundReplays.values());
  }
}
