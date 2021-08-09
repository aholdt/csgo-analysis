import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { FilesModule } from "./files/files.module";
import { RoundReplaysModule } from "./roundreplays/round-replays.module";

@Module({
  imports: [CatsModule, FilesModule, RoundReplaysModule],
})
export class AppModule {}
