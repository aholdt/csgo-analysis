import { CosmosRepository } from "@app/cosmos-storage";
import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

@Module({
  providers: [GamesService, CosmosRepository],
  controllers: [GamesController],
})
export class GamesModule {}
