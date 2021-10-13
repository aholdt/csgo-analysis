import { DemoFile } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";

export interface DemoOutputHandler {
  initialize(demoFile: DemoFile, gameId?: string): void;
  addToResult(demoResult: ParsedDemoResult): void;
}
