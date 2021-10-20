import { TeamGameStats } from "@app/demoparser/public-models/team-game-stats.entity";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AzureADGuard } from "../auth/azure-ad.guard";
import { UrlDecodePipe } from "../url-decode.pipe";
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
  @ApiQuery({
    name: "side",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "teamName",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "map",
    required: false,
    type: String,
  })
  getAllByTeam(
    @Query("side") side?: string,
    @Query("teamName", UrlDecodePipe) teamName?: string,
    @Query("map") map?: string
  ): Promise<TeamGameStats[]> {
    return this.teamStatsService.getAllByTeam(side, teamName, map);
  }
}
