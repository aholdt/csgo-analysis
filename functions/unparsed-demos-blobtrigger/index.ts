import { DemoOutput } from "@app/demoparser/public-models/demo-output";
import { AzureFunction, Context } from "@azure/functions";
import { NestFactory } from "@nestjs/core";
import { BlobStorageService } from "../../libs/blob-storage/src/blob-storage.service";
import { DemoparserService } from "../../libs/demoparser/src/demoparser.service";
import { AppModule } from "./app.module";

const blobTrigger: AzureFunction = async function (context: Context): Promise<void> {
  const app = await initApp();
  const demoOutput = await parseDemo(app, context);
  await uploadDemoOutput(app, demoOutput);
};
export default blobTrigger;

async function uploadDemoOutput(app, demoOutput: DemoOutput) {
  const blobStorage = app.get(BlobStorageService);
  for (const roundReplay of demoOutput.roundReplays) {
    await blobStorage.upload(roundReplay, "round-replays", `${demoOutput.gameInfo.thumbPrint}/${roundReplay.roundNumber}`);
  }
}

async function parseDemo(app, context: Context) {
  const demoParser = app.get(DemoparserService);
  const buffer = context.bindings.myBlob;
  const demoOutput = await demoParser.parseDemo(buffer);
  return demoOutput;
}

async function initApp() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app;
}
