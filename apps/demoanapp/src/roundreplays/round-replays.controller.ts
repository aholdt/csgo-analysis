import { RoundReplay } from "@app/demoparser/models/round-replays";
import { Controller, Get, Param } from "@nestjs/common";
import { RoundReplaysService } from "./round-replays.service";

@Controller("roundreplays")
export class RoundReplaysController {
  constructor(private readonly roundReplaysService: RoundReplaysService) {}
  @Get(":gameId/:roundNumber")
  findOne(@Param("gameId") gameId: string, @Param("roundNumber") roundNumber: number): Promise<RoundReplay> {
    return this.roundReplaysService.get(gameId, roundNumber);
  }
}
