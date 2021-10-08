import { GameInfo } from "@app/demoparser/public-models/game-info.entity";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AzureADGuard } from "../auth/azure-ad.guard";
import { GamesService } from "./games.service";

@UseGuards(AzureADGuard)
@Controller("games")
@ApiTags("games")
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @Get("all")
  getAll(): Promise<GameInfo[]> {
    return this.gamesService.getAll();
  }
}
