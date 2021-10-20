import { TeamGameStats } from "@app/demoparser/public-models/team-game-stats.entity";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AzureADGuard } from "../auth/azure-ad.guard";
import { TeamstatsService } from "./teamstats.service";

@UseGuards(AzureADGuard)
@Controller("teamstats")
@ApiTags("teamstats")
export class TeamstatsController {
  constructor(private readonly teamStatsService: TeamstatsService) {}

  @Get("gameId/:gameId")
  get(@Param("gameId") gameId: string): Promise<TeamGameStats[]> {
    return this.teamStatsService.getAll(gameId);
  }

  @Get("all")
  getAll(): Promise<TeamGameStats[]> {
    return this.teamStatsService.getAll();
  }
  @Get("allByTeam")
  getAllByTeam(): Promise<TeamGameStats[]> {
    return this.teamStatsService.getAllByTeam();
  }

  @Get("allByTeam/side/:side")
  getAllByTeamAndSide(@Param("side") side: number): Promise<TeamGameStats[]> {
    return this.teamStatsService.getAllByTeam(side);
  }
}
