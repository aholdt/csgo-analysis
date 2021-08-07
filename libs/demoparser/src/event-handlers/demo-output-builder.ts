import { DemoFile } from "demofile";
import { DemoOutput } from "../models/demo-output";

export interface DemoOutputBuilder {
  initialize(demoFile: DemoFile): void;
  addToOutput(demoOutput: DemoOutput): void;
}
