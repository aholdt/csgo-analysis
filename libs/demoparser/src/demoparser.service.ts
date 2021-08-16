import { Inject, Injectable } from "@nestjs/common";
import { DemoFile } from "demofile";
import { DemoOutputBuilder } from "./event-handlers/demo-output-builder";
import { ParsedDemoResult } from "./models/parsed-demo-result";
import { DemoOutput } from "./public-models/demo-output";
import { RoundReplay } from "./public-models/round-replays";

@Injectable()
export class DemoparserService {
  constructor(
    @Inject("demoOutputBuilders")
    private readonly demoOutputBuilders: DemoOutputBuilder[]
  ) {}

  public parseDemo(buffer: Buffer): Promise<DemoOutput> {
    return new Promise<DemoOutput>((resolve, reject) => {
      try {
        const demoFile = new DemoFile();

        this.demoOutputBuilders.forEach((builder) => {
          builder.initialize(demoFile);
        });

        demoFile.on("end", (_) => {
          const demoResult = new ParsedDemoResult();
          this.demoOutputBuilders.forEach((builder) => {
            builder.addToResult(demoResult);
          });
          const demoOutput = this.mapToOutput(demoResult);
          resolve(demoOutput);
        });

        demoFile.parse(buffer);
      } catch (e) {
        reject(e);
      }
    });
  }

  mapToOutput(demoResult: ParsedDemoResult): DemoOutput {
    const roundReplays: RoundReplay[] = [];
    for (let index = 1; index < demoResult.positions.size; index++) {
      roundReplays.push(<RoundReplay>{
        roundNumber: index,
        positions: demoResult.positions.get(index),
        playerShot: demoResult.playerShots.get(index),
        playersHurt: demoResult.playersHurt.get(index),
        utilities: demoResult.utilities.get(index),
      });
    }

    return <DemoOutput>{
      gameInfo: demoResult.gameInfo,
      roundReplays: roundReplays,
    };
  }
}
