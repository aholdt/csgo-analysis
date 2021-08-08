import { DemoparserModule } from "@app/demoparser/demoparser.module";
import { DemoparserService } from "@app/demoparser/demoparser.service";
import { AzureFunction, Context } from "@azure/functions";
import { NestFactory } from "@nestjs/core";

const blobTrigger: AzureFunction = async function (context: Context): Promise<void> {
  const app = await NestFactory.create(DemoparserModule);
  await app.init();
  const demoParser = app.get(DemoparserService);
  const buffer = context.bindings.myBlob;
  const demoOutput = await demoParser.parseDemo(buffer);
  console.log(demoOutput.roundReplays);
};

export default blobTrigger;
