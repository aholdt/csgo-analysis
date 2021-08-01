import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { Express } from "express";
import { ApiFile } from "./apifile.decorator";
import { FilesService } from "./files.service";

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor("file"))
  @Post("file")
  @ApiConsumes("multipart/form-data")
  @ApiFile()
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }
}
