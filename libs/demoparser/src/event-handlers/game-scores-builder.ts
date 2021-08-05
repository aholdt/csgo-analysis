import { Injectable } from "@nestjs/common";
import { DemoFile, IDemoEndEvent, TeamNumber } from "demofile";
import { IEventHandler } from "./event-handler-interface";

@Injectable()
export class GameScoresBuilder implements IEventHandler {
    demoFile: DemoFile;
    initialize(demoFile: DemoFile) {
        this.demoFile = demoFile;
    }
    demoEnd(demoEnd: IDemoEndEvent) {
        console.log("This is demo end");
        this.logTeamScores();
    }

    logTeamScores() {
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
}