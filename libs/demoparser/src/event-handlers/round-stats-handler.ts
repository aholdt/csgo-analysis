import { Injectable } from "@nestjs/common";
import { DemoFile, IEventPlayerDeath, IEventPlayerHurt, IEventRoundEnd, TeamNumber } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { RoundStats } from "../models/round-stats";
import { PlayerRoundStats } from "../public-models/player-round-stats.entity";
import { TeamRoundStats } from "../public-models/team-round-stats.entity";
import { RoundHandlerBase } from "./round-handler-base";

@Injectable()
export class RoundStatsHandler extends RoundHandlerBase<RoundStats> {
  private killsInRound = 0;

  constructor() {
    super(new RoundStats());
  }

  initialize(demoFile: DemoFile, gameId?: string): void {
    super.initialize(demoFile, gameId);
    demoFile.gameEvents.on("player_hurt", (e) => this.onPlayerHurt(e));
    demoFile.gameEvents.on("player_death", (e) => this.onPlayerDeath(e));
    demoFile.gameEvents.on("round_freeze_end", () => this.freezetimeEnded());
    demoFile.gameEvents.on("round_end", (e) => this.onRoundEnd(e));
  }

  onRoundEnd(e: IEventRoundEnd): void {
    const team1 = this.demoFile.entities.teams[TeamNumber.Terrorists];
    const team1Name = team1.clanName;
    const team2 = this.demoFile.entities.teams[TeamNumber.CounterTerrorists];
    const team2Name = team2.clanName;

    this.currentRound.team1Stats = new TeamRoundStats(
      team1Name,
      this.gameId,
      this.currentRoundNumber(),
      "T",
      e.winner === TeamNumber.Terrorists,
      team2Name,
      this.demoFile.header.mapName,
      this.currentRound.playerStats.filter((x) => x.side === "T")
    );

    this.currentRound.team2Stats = new TeamRoundStats(
      team2Name,
      this.gameId,
      this.currentRoundNumber(),
      "CT",
      e.winner === TeamNumber.CounterTerrorists,
      team1Name,
      this.demoFile.header.mapName,
      this.currentRound.playerStats.filter((x) => x.side === "CT")
    );
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.roundStats = this.roundResults;
  }

  onPlayerHurt(e: IEventPlayerHurt): void {
    if (!e.attacker) {
      return;
    }
    this.upsertStat(e.attacker, (item) => (item.damage += e.dmg_health));
    if (e.weapon.indexOf("hegrenade") >= 0) {
      this.upsertStat(e.attacker, (item) => (item.heDamage += e.dmg_health));
    } else if (e.weapon.indexOf("inferno") >= 0) {
      this.upsertStat(e.attacker, (item) => (item.molotovDamage += e.dmg_health));
    }
  }

  onPlayerDeath(e: IEventPlayerDeath): void {
    this.killsInRound++;
    if (e.attacker) {
      this.upsertStat(e.attacker, (item) => item.kills++);

      if (this.killsInRound === 1) {
        this.upsertStat(e.attacker, (item) => item.openingKills++);
      }
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
    this.killsInRound = 0;
    for (const p of this.demoFile.players) {
      if (p.isAlive) {
        this.upsertStat(p.userId);
      }
    }
  }

  private upsertStat(playerId: number, predicate?: Predicate<PlayerRoundStats>) {
    const existing = this.currentRound.playerStats.find((x) => x.playerId == playerId);
    if (!existing) {
      const player = this.demoFile.entities.getByUserId(playerId);
      if (!player) {
        return;
      }
      const playerStat = new PlayerRoundStats(
        this.currentRoundNumber(),
        player.name,
        playerId,
        this.gameId,
        this.getSide(player.teamNumber),
        this.demoFile.header.mapName
      );
      if (predicate) {
        predicate(playerStat);
      }
      this.currentRound.playerStats.push(playerStat);
    } else if (predicate) {
      predicate(existing);
    }
  }

  getSide(value: number): string {
    switch (value) {
      case 2:
        return "T";
      case 3:
        return "CT";
      default:
        return undefined;
    }
  }
}
type Predicate<T> = (item: T) => void;
