import { DemoFile } from "demofile";
import { ParsedDemoResult } from "../models/parsed-demo-result";

export interface DemoOutputHandler {
  initialize(demoFile: DemoFile): void;
  addToResult(demoResult: ParsedDemoResult): void;
}