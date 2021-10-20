import { CosmosRepository } from "@app/cosmos-storage";
import { Module } from "@nestjs/common";
import { TeamstatsRepositoryService } from "./teamstats-repository.service";
import { TeamstatsController } from "./teamstats.controller";
import { TeamstatsService } from "./teamstats.service";

@Module({
  providers: [TeamstatsService, CosmosRepository, TeamstatsRepositoryService],
  controllers: [TeamstatsController],
})
export class TeamstatsModule {}
