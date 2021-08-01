import { Module } from '@nestjs/common';
import { DemoparserService } from './demoparser.service';

@Module({
  providers: [DemoparserService],
  exports: [DemoparserService],
})
export class DemoparserModule {}
