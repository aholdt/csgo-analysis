import { BlobStorageService } from "@app/blob-storage";
import { CosmosRepository } from "@app/cosmos-storage";
import { DemoparserService } from "@app/demoparser";
import { DemoOutput } from "@app/demoparser/public-models/demo-output";
import { AzureFunction, Context } from "@azure/functions";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DemoanappfuncModule } from "./demoanappfunc.module";
import { GameInfoRepositoryItem } from "./gameinfo.repositoryitem";

export const blobTrigger: AzureFunction = async function (context: Context): Promise<void> {
  const app = await initApp();
  const demoOutput = await parseDemo(app, context);
  await persistToCosmos(app, demoOutput);
  await uploadDemoOutput(app, demoOutput);
};

async function persistToCosmos(app: INestApplication, demoOutput: DemoOutput) {
  const cosmosStorage = app.get(CosmosRepository);
  cosmosStorage.upsert(new GameInfoRepositoryItem(demoOutput.gameInfo));
  cosmosStorage.bulkUpsert(demoOutput.playerRoundStats);
  cosmosStorage.bulkUpsert(demoOutput.playerGameStats);
  cosmosStorage.bulkUpsert(demoOutput.teamGameStats);
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
  const app = await NestFactory.create(DemoanappfuncModule);
  await app.init();
  return app;
}
