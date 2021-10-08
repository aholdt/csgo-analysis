import { Injectable } from "@nestjs/common";
import { DemoFile, TeamNumber } from "demofile";
import { v4 as uuidv4 } from "uuid";
import { ParsedDemoResult } from "../models/parsed-demo-result";
import { GameInfo } from "../public-models/game-info.entity";
import { DemoOutputHandler } from "./demo-output-handler";

@Injectable()
export class GameInfoHandler implements DemoOutputHandler {
  gameInfo: GameInfo;
  demoFile: DemoFile;

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;
    demoFile.gameEvents.on("cs_win_panel_match", () => this.onGameEnd());
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
      id: uuidv4(),
    };
  }

  addToResult(demoResult: ParsedDemoResult): void {
    demoResult.gameInfo = this.gameInfo;
  }
}
