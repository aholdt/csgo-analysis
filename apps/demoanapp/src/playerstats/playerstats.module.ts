import { CosmosRepository } from "@app/cosmos-storage";
import { Module } from "@nestjs/common";
import { PlayerstatsController } from "./playerstats.controller";
import { PlayerstatsService } from "./playerstats.service";

@Module({
  controllers: [PlayerstatsController],
  providers: [PlayerstatsService, CosmosRepository],
})
export class PlayerstatsModule {}
