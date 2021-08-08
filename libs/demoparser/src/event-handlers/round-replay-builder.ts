import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerHurt, IEventWeaponFire } from "demofile";
import { DemoOutput } from "../models/demo-output";
import { PlayerHurt, Position, RoundReplay } from "../models/round-replays";
import { DemoOutputBuilder } from "./demo-output-builder";

@Injectable()
export class RoundReplayBuilder implements DemoOutputBuilder {
  currentRound: RoundReplay;
  roundReplays: Map<string, RoundReplay> = new Map<string, RoundReplay>();
  demoFile!: DemoFile;

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;
    demoFile.gameEvents.on("round_freeze_end", () =>
      this.initializeCurrentRound()
    );
    demoFile.gameEvents.on("round_officially_ended", () =>
      this.endCurrentRound()
    );
    demoFile.on("tickstart", () => this.registerPositions());
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
    demoFile.gameEvents.on("weapon_fire", (e) => this.onWeaponFire(e));
  }

  onWeaponFire(e: IEventWeaponFire): void {
    const player = this.currentRound.positions
      .get(this.demoFile.currentTick)
      .filter((x) => x.playerId === e.userid)[0];
    if (player) {
      player.firingWeapon = e.weapon;
    }
  }
  onPlayerHurt(e: IEventPlayerHurt): void {
    this.currentRound.playersHurt.push(<PlayerHurt>{
      tick: this.demoFile.currentTick,
      healthAfterDamage: e.health,
      targetPlayerId: e.userid,
    });
  }

  registerPositions(): void {
    if (!this.currentRound) {
      return;
    }

    const positions: Position[] = [];
    for (const player of this.demoFile.players) {
      if (player.isAlive) {
        positions.push(<Position>{
          playerId: player.userId,
          x: player.position.x,
          y: player.position.y,
          z: player.position.z,
          yaw: player.eyeAngles.yaw,
        });
      }
    }
    this.currentRound.positions.set(this.demoFile.currentTick, positions);
  }

  initializeCurrentRound(): void {
    this.currentRound = <RoundReplay>{
      startTick: this.demoFile.currentTick,
      roundNumber: this.demoFile.gameRules.roundsPlayed + 1,
      endTick: this.demoFile.currentTick,
      positions: new Map<number, Position[]>(),
      playersHurt: [],
    };
  }

  endCurrentRound(): void {
    this.currentRound.endTick = this.demoFile.currentTick;
    this.roundReplays[this.currentRound.roundNumber] = this.currentRound;
  }

  addToOutput(demoOutput: DemoOutput): void {
    demoOutput.roundReplays = Array.from(this.roundReplays.values());
  }
}
