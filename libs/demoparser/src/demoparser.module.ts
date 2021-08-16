import { Module } from "@nestjs/common";
import { DemoparserService } from "./demoparser.service";
import { DemoOutputBuilder } from "./event-handlers/demo-output-builder";
import { GameInfoBuilder } from "./event-handlers/game-info-builder";
import { PlayerHurtBuilder } from "./event-handlers/player-hurt-builder";
import { PlayerPositionsBuilder } from "./event-handlers/player-positions-builder";
import { PlayerShotBuilder } from "./event-handlers/player-shot-builder";
import { UtilityBuilder } from "./event-handlers/utility-builder";

@Module({
  providers: [
    DemoparserService,
    GameInfoBuilder,
    PlayerPositionsBuilder,
    PlayerHurtBuilder,
    PlayerShotBuilder,
    UtilityBuilder,
    {
      provide: "demoOutputBuilders",
      useFactory: (...eventHandlers: DemoOutputBuilder[]) => eventHandlers,
      inject: [GameInfoBuilder, PlayerPositionsBuilder, PlayerPositionsBuilder, PlayerHurtBuilder, PlayerShotBuilder, UtilityBuilder],
    },
  ],
  exports: [DemoparserService],
})
export class DemoparserModule {}
