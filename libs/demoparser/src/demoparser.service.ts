import { Inject, Injectable } from "@nestjs/common";
import { DemoFile } from "demofile";
import { DemoOutputHandler } from "./event-handlers/demo-output-handler";
import { ParsedDemoResult } from "./models/parsed-demo-result";
import { DemoOutput } from "./public-models/demo-output";

@Injectable()
export class DemoparserService {
  constructor(
    @Inject("demoOutputBuilders")
    private readonly demoOutputBuilders: DemoOutputHandler[]
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
          const demoOutput = demoResult.mapToOutput();
          resolve(demoOutput);
        });

        demoFile.parse(buffer);
      } catch (e) {
        reject(e);
      }
    });
  }
}
