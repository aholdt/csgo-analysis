import { Module } from "@nestjs/common";
import { BlobStorageService } from "libs/blob-storage/src";
import { RoundReplaysController } from "./round-replays.controller";
import { RoundReplaysService } from "./round-replays.service";

@Module({
  providers: [RoundReplaysService, BlobStorageService],
  controllers: [RoundReplaysController],
})
export class RoundReplaysModule {}
