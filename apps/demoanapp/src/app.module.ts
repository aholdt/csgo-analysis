import { DemoparserModule } from "@app/demoparser";
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { FilesModule } from "./files/files.module";
import { RoundReplaysModule } from "./roundreplays/round-replays.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule, FilesModule, RoundReplaysModule, DemoparserModule, AuthModule],
})
export class AppModule {}
