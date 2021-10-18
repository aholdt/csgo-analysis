import { CosmosRepository } from "@app/cosmos-storage";
import { Module } from "@nestjs/common";
import { TeamstatsController } from "./teamstats.controller";
import { TeamstatsService } from "./teamstats.service";

@Module({
  providers: [TeamstatsService, CosmosRepository],
  controllers: [TeamstatsController],
})
export class TeamstatsModule {}
