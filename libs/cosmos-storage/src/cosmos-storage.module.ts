import { Module } from "@nestjs/common";
import { CosmosRepository } from "./cosmos-storage.service";

@Module({
  providers: [CosmosRepository],
  exports: [CosmosRepository],
})
export class CosmosStorageModule {}
