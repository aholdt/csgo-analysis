import { Module } from '@nestjs/common';
import { DemoparserService } from './demoparser.service';
import { IEventHandler } from './event-handlers/event-handler-interface';
import { GameScoresBuilder } from './event-handlers/game-scores-builder';

@Module({
  providers: [
    DemoparserService,
    GameScoresBuilder,
    {
      provide: 'eventHandlers',
      useFactory: (...eventHandlers: IEventHandler[]) => eventHandlers,
      inject: [GameScoresBuilder],
    }
  ],
  exports: [DemoparserService],
})
export class DemoparserModule {}
