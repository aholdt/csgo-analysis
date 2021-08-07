import { Inject, Injectable } from "@nestjs/common";
import { DemoFile } from "demofile";
import { DemoOutputBuilder } from "./event-handlers/demo-output-builder";
import { DemoOutput } from "./models/demo-output";

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
          const demoOutput = new DemoOutput();
          this.demoOutputBuilders.forEach((builder) => {
            builder.addToOutput(demoOutput);
          });
          resolve(demoOutput);
        });

        demoFile.parse(buffer);
      } catch (e) {
        reject(e);
      }
    });
  }
}
