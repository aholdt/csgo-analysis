import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [CatsModule, FilesModule],
})
export class AppModule {}
