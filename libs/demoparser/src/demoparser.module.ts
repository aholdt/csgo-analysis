import { Module } from "@nestjs/common";
import { DemoparserService } from "./demoparser.service";
import { BombHandler } from "./event-handlers/bomb-handler";
import { DemoOutputHandler } from "./event-handlers/demo-output-handler";
import { GameInfoHandler } from "./event-handlers/game-info-handler";
import { InventoryHandler } from "./event-handlers/inventory-handler";
import { KillHandler } from "./event-handlers/kill-handler";
import { PlayerHurtHandler } from "./event-handlers/player-hurt-handler";
import { PlayerPositionsHandler } from "./event-handlers/player-positions-handler";
import { PlayerShotHandler } from "./event-handlers/player-shot-handler";
import { RoundStatsHandler } from "./event-handlers/round-stats-handler";
import { UtilityHandler } from "./event-handlers/utility-handler";

@Module({
  providers: [
    DemoparserService,
    GameInfoHandler,
    PlayerPositionsHandler,
    PlayerHurtHandler,
    PlayerShotHandler,
    UtilityHandler,
    KillHandler,
    InventoryHandler,
    BombHandler,
    RoundStatsHandler,
    {
      provide: "demoOutputBuilders",
      useFactory: (...eventHandlers: DemoOutputHandler[]) => eventHandlers,
      inject: [
        GameInfoHandler,
        PlayerPositionsHandler,
        PlayerPositionsHandler,
        PlayerHurtHandler,
        PlayerShotHandler,
        UtilityHandler,
        KillHandler,
        InventoryHandler,
        BombHandler,
        RoundStatsHandler,
      ],
    },
  ],
  exports: [DemoparserService],
})
export class DemoparserModule {}
