import { Module } from "@nestjs/common";
import { BlobStorageModule } from "../../libs/blob-storage/src/blob-storage.module";
import { CosmosStorageModule } from "../../libs/cosmos-storage/src/cosmos-storage.module";
import { DemoparserModule } from "../../libs/demoparser/src/demoparser.module";

@Module({
  imports: [DemoparserModule, BlobStorageModule, CosmosStorageModule],
})
export class AppModule {}
