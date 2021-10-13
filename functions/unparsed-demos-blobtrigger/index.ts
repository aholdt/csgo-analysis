import { DemoOutput } from "@app/demoparser/public-models/demo-output";
import { AzureFunction, Context } from "@azure/functions";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { BlobStorageService } from "../../libs/blob-storage/src/blob-storage.service";
import { CosmosRepository } from "../../libs/cosmos-storage/src/cosmos-storage.service";
import { DemoparserService } from "../../libs/demoparser/src/demoparser.service";
import { AppModule } from "./app.module";
import { GameInfoRepositoryItem } from "./gameinfo.repositoryitem";

const blobTrigger: AzureFunction = async function (context: Context): Promise<void> {
  const app = await initApp();
  const demoOutput = await parseDemo(app, context);
  await persistToCosmos(app, demoOutput);
  await uploadDemoOutput(app, demoOutput);
};
export default blobTrigger;

async function persistToCosmos(app: INestApplication, demoOutput: DemoOutput) {
  const cosmosStorage = app.get(CosmosRepository);
  cosmosStorage.upsert(new GameInfoRepositoryItem(demoOutput.gameInfo));
  cosmosStorage.bulkUpsert(demoOutput.playerRoundStats);
  cosmosStorage.bulkUpsert(demoOutput.playerGameStats);
}

async function uploadDemoOutput(app: INestApplication, demoOutput: DemoOutput) {
  const blobStorage = app.get(BlobStorageService);
  for (const roundReplay of demoOutput.roundReplays) {
    await blobStorage.upload(roundReplay, "round-replays", `${demoOutput.gameInfo.thumbPrint}/${roundReplay.roundNumber}`);
  }
}

async function parseDemo(app: INestApplication, context: Context) {
  const demoParser = app.get(DemoparserService);
  const buffer = context.bindings.myBlob;
  const demoOutput = await demoParser.parseDemo(buffer, context.bindingData["name"]);
  return demoOutput;
}

async function initApp() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app;
}
