import { Injectable } from "@nestjs/common";
import { BlobStorageService } from "libs/blob-storage/src";

@Injectable()
export class FilesService {
  constructor(private readonly blobService: BlobStorageService) {}

  async uploadFile(file: Express.Multer.File): Promise<void> {
    return this.blobService.uploadFile(file, "unparsed-demos");
  }
}
