import { CosmosStorageModule } from "@app/cosmos-storage";
import { DemoparserModule } from "@app/demoparser";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CatsModule } from "./cats/cats.module";
import { FilesModule } from "./files/files.module";
import { GamesModule } from "./games/games.module";
import { PlayerstatsModule } from "./playerstats/playerstats.module";
import { RoundReplaysModule } from "./roundreplays/round-replays.module";
import { TeamstatsModule } from "./teamstats/teamstats.module";

@Module({
  imports: [
    CatsModule,
    FilesModule,
    RoundReplaysModule,
    DemoparserModule,
    AuthModule,
    GamesModule,
    CosmosStorageModule,
    PlayerstatsModule,
    TeamstatsModule,
  ],
})
export class AppModule {}
