import { Module } from "@nestjs/common";
import { DemoparserService } from "./demoparser.service";
import { DemoOutputBuilder } from "./event-handlers/demo-output-builder";
import { GameInfoBuilder } from "./event-handlers/game-info-builder";
import { RoundReplayBuilder } from "./event-handlers/round-replay-builder";

@Module({
  providers: [
    DemoparserService,
    GameInfoBuilder,
    RoundReplayBuilder,
    {
      provide: "demoOutputBuilders",
      useFactory: (...eventHandlers: DemoOutputBuilder[]) => eventHandlers,
      inject: [GameInfoBuilder, RoundReplayBuilder],
    },
  ],
  exports: [DemoparserService],
})
export class DemoparserModule {}
