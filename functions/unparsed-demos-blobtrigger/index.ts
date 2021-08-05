import { AzureFunction, Context } from "@azure/functions"
import { NestFactory } from "@nestjs/core";
import { DemoparserModule } from "../../libs/demoparser/src/demoparser.module";
import { DemoparserService } from "../../libs/demoparser/src/demoparser.service";

const blobTrigger: AzureFunction = async function (context: Context): Promise<void> {
    const app = await NestFactory.create(DemoparserModule);
    await app.init();
    const test = app.get(DemoparserService);
    const buffer = context.bindings.myBlob;
    await test.parseDemo(buffer);
};

export default blobTrigger;