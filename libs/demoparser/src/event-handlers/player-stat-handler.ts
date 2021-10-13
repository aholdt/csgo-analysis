import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerDeath, IEventPlayerHurt } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { PlayerRoundStats } from "../public-models/player-round-stats.entity";
import { RoundHandlerBase } from "./round-handler-base";

@Injectable()
export class PlayerStatHandler extends RoundHandlerBase<PlayerRoundStats[]> {
  constructor() {
    super(new Array<PlayerRoundStats>());
  }
  initialize(demoFile: DemoFile, gameId?: string): void {
    super.initialize(demoFile, gameId);
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
    demoFile.gameEvents.on("player_death", (e) => this.onPlayerDeath(e));
    demoFile.gameEvents.on("round_freeze_end", () => this.freezetimeEnded());
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.playerRoundStats = this.roundResults;
  }

  onPlayerHurt(e: IEventPlayerHurt): void {
    if (!e.attacker) {
      return;
    }
    this.upsertStat(e.attacker, (item) => (item.damage += e.dmg_health));
    if (e.weapon.indexOf("hegrenade") > 0) {
      this.upsertStat(e.attacker, (item) => (item.heDamage += e.dmg_health));
    } else if (e.weapon.indexOf("molotov") > 0 || e.weapon.indexOf("incgrenade") > 0) {
      this.upsertStat(e.attacker, (item) => (item.molotovDamage += e.dmg_health));
    }
  }

  onPlayerDeath(e: IEventPlayerDeath): void {
    if (e.attacker) {
      this.upsertStat(e.attacker, (item) => item.kills++);
    }
    this.upsertStat(e.userid, (item) => item.deaths++);
    if (e.assister) {
      if (!e.assistedflash) {
        this.upsertStat(e.assister, (item) => item.assists++);
      } else {
        // todo: ensure team mate flash assist does count
        this.upsertStat(e.assister, (item) => item.flashAssists++);
      }
    }
  }

  freezetimeEnded(): void {
    for (const p of this.demoFile.players) {
      if (p.isAlive) {
        this.upsertStat(p.userId);
      }
    }
  }

  private upsertStat(playerId: number, predicate?: Predicate<PlayerRoundStats>) {
    const existing = this.currentRound.find((x) => x.playerId == playerId);
    if (!existing) {
      const playerName = this.demoFile.entities.getByUserId(playerId).name;
      const playerStat = new PlayerRoundStats(this.demoFile.gameRules.roundsPlayed + 1, playerName, playerId, this.gameId);
      if (predicate) {
        predicate(playerStat);
      }
      this.currentRound.push(playerStat);
    } else if (predicate) {
      predicate(existing);
    }
  }
}
type Predicate<T> = (item: T) => void;
