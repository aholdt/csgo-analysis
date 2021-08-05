
import { DemoFile, IDemoEndEvent } from "demofile";

export interface IEventHandler {
    initialize(demoFile: DemoFile);
    demoEnd(demoEnd: IDemoEndEvent);
  }