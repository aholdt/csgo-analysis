import { BombEvent } from "@app/demoparser/models/bomb-event.entity";
import { Inventory } from "@app/demoparser/models/inventory.entity";
import { Kill } from "@app/demoparser/models/kills.entity";
import { PlayerHurt } from "@app/demoparser/models/player-hurt.entity";
import { PlayerShot } from "@app/demoparser/models/player-shot.entity";
import { PlayerPosition } from "@app/demoparser/models/position.entity";
import { Utility } from "@app/demoparser/models/utility.entity";
import { RoundReplay } from "@app/demoparser/public-models/round-replays.entity";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoundReplaysService } from "./round-replays.service";

@ApiExtraModels(RoundReplay)
@ApiExtraModels(PlayerPosition)
@ApiExtraModels(PlayerShot)
@ApiExtraModels(PlayerHurt)
@ApiExtraModels(Utility)
@ApiExtraModels(Kill)
@ApiExtraModels(Inventory)
@ApiExtraModels(BombEvent)
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
