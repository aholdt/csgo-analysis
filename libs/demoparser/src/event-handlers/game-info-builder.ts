import { Injectable } from "@nestjs/common";
import { DemoFile, TeamNumber } from "demofile";
import { DemoOutput } from "../models/demo-output";
import { GameInfo } from "../models/game-info";
import { DemoOutputBuilder } from "./demo-output-builder";

@Injectable()
export class GameInfoBuilder implements DemoOutputBuilder {
  private demoFile!: DemoFile;
  gameInfo: GameInfo;

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;
    demoFile.gameEvents.on("cs_win_panel_match", (_) => this.onGameEnd());
  }

  onGameEnd(): void {
    const teams = this.demoFile.teams;
    const terrorists = teams[TeamNumber.Terrorists];
    const cts = teams[TeamNumber.CounterTerrorists];

    this.gameInfo = <GameInfo>{
      map: this.demoFile.header.mapName,
      tickRate: this.demoFile.tickRate,
      thumbPrint: this.demoFile.header.magic, // TODO: figure out how to thumbprint any demo
      team1: terrorists.clanName,
      team2: cts.clanName,
      team1Score: terrorists.score,
      team2Score: cts.score,
      team1FirstHalfScore: terrorists.scoreFirstHalf,
      team2FirstHalfScore: cts.scoreFirstHalf,
    };
  }

  addToOutput(demoOutput: DemoOutput): void {
    demoOutput.gameInfo = this.gameInfo;
  }
}
