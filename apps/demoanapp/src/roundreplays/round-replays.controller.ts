import { RoundReplay } from "@app/demoparser/public-models/round-replays.entity";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AzureADGuard } from "../auth/azure-ad.guard";
import { RoundReplaysService } from "./round-replays.service";

@UseGuards(AzureADGuard)
@ApiTags("roundreplays")
@Controller("roundreplays")
export class RoundReplaysController {
  constructor(private readonly roundReplaysService: RoundReplaysService) {}

  @Get(":gameId/:roundNumber")
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: RoundReplay,
  })
  getRoundReplay(@Param("gameId") gameId: string, @Param("roundNumber") roundNumber: number): Promise<RoundReplay> {
    return this.roundReplaysService.get(gameId, roundNumber);
  }
}
