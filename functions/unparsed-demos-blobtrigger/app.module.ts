import { Module } from "@nestjs/common";
import { BlobStorageModule } from "../../libs/blob-storage/src/blob-storage.module";
import { DemoparserModule } from "../../libs/demoparser/src/demoparser.module";

@Module({
  imports: [DemoparserModule, BlobStorageModule],
})
export class AppModule {}
