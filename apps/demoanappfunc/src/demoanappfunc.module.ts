import { BlobStorageModule } from "@app/blob-storage";
import { CosmosRepository, CosmosStorageModule } from "@app/cosmos-storage";
import { DemoparserModule } from "@app/demoparser";
import { Module } from "@nestjs/common";

@Module({
  imports: [DemoparserModule, BlobStorageModule, CosmosStorageModule],
  providers: [CosmosRepository],
})
export class DemoanappfuncModule {}
