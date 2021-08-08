import { Injectable } from "@nestjs/common";
import { DemoFile, TeamNumber } from "demofile";
import { DemoOutputBuilder } from "./demo-output-builder";

@Injectable()
export class GameInfoBuilder implements DemoOutputBuilder {
  private demoFile!: DemoFile;

  initialize(demoFile: DemoFile): void {
    this.demoFile = demoFile;
    demoFile.on("end", (_) => this.logTeamScores());
  }

  logTeamScores(): void {
    const teams = this.demoFile.teams;

    const terrorists = teams[TeamNumber.Terrorists];
    const cts = teams[TeamNumber.CounterTerrorists];

    console.log(
      "\t%s: %s score %d\n\t%s: %s score %d",
      terrorists.teamName,
      terrorists.clanName,
      terrorists.score,
      cts.teamName,
      cts.clanName,
      cts.score
    );
  }
  addToOutput(): void {
    // do nothing
  }
}
