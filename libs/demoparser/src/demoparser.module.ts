import { Module } from "@nestjs/common";
import { DemoparserService } from "./demoparser.service";
import { DemoOutputHandler } from "./event-handlers/demo-output-handler";
import { GameInfoHandler } from "./event-handlers/game-info-handler";
import { PlayerHurtHandler } from "./event-handlers/player-hurt-handler";
import { PlayerPositionsHandler } from "./event-handlers/player-positions-handler";
import { PlayerShotHandler } from "./event-handlers/player-shot-handler";
import { UtilityHandler } from "./event-handlers/utility-handler";

@Module({
  providers: [
    DemoparserService,
    GameInfoHandler,
    PlayerPositionsHandler,
    PlayerHurtHandler,
    PlayerShotHandler,
    UtilityHandler,
    {
      provide: "demoOutputBuilders",
      useFactory: (...eventHandlers: DemoOutputHandler[]) => eventHandlers,
      inject: [GameInfoHandler, PlayerPositionsHandler, PlayerPositionsHandler, PlayerHurtHandler, PlayerShotHandler, UtilityHandler],
    },
  ],
  exports: [DemoparserService],
})
export class DemoparserModule {}
