import { Injectable, Inject } from "@nestjs/common";
import { DemoFile, Player, TeamNumber } from "demofile";
import { IEventHandler } from "./event-handlers/event-handler-interface";

@Injectable()
export class DemoparserService {
  constructor(
    @Inject("eventHandlers") private readonly eventHandlers: IEventHandler[]
  ) {}
  
  public parseDemo(buffer: Buffer): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const demoFile = new DemoFile();
        this.eventHandlers.forEach((element) => {
          element.initialize(demoFile);
        });
        demoFile.on("end", (e) => {
          this.eventHandlers.forEach((element) => {
            element.demoEnd(e);
          });
          resolve();
        });
        console.log(buffer);
        demoFile.parse(buffer);
      } catch (e) {
        console.log("Error during parsing");
        console.log(e);
        reject();
      }
    });
  }
}
