import { PlayerGameStats } from "@app/demoparser/public-models/player-game-stats.entity";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AzureADGuard } from "../auth/azure-ad.guard";
import { PlayerstatsService } from "./playerstats.service";

@UseGuards(AzureADGuard)
@ApiTags("playerstats")
@Controller("playerstats")
export class PlayerstatsController {
  constructor(private readonly playerStatsService: PlayerstatsService) {}

  @Get("gameId/:gameId")
  get(@Param("gameId") gameId: string): Promise<PlayerGameStats[]> {
    return this.playerStatsService.getAll(gameId);
  }

  @Get("all")
  getAll(): Promise<PlayerGameStats[]> {
    return this.playerStatsService.getAll();
  }
}
