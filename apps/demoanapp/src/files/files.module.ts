import { Module } from "@nestjs/common";
import { BlobStorageService } from "libs/blob-storage/src";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  providers: [FilesService, BlobStorageService],
  controllers: [FilesController],
})
export class FilesModule {}
