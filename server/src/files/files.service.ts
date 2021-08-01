import { Injectable } from "@nestjs/common";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

@Injectable()
export class FilesService {
  blobServiceClient: BlobServiceClient;

  async uploadFile(file: Express.Multer.File): Promise<void> {
    this.EnsureBlobServiceClient();
    const container = await this.GetOrCreateContainer();
    console.log(file);
    const blobClient = container.getBlockBlobClient(file.originalname);
    console.log("uploading file " + file.filename);
    await blobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
  }

  private EnsureBlobServiceClient() {
    const STORAGE_CONNECTION_STRING =
      process.env.AZURE_STORAGE_CONNECTION_STRING || "";
    if (!this.blobServiceClient) {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(
        STORAGE_CONNECTION_STRING
      );
    }
  }

  private async GetOrCreateContainer(): Promise<ContainerClient> {
    const container = await this.blobServiceClient.getContainerClient(
      "unparsed-demos"
    );
    await container.createIfNotExists();
    return container;
  }
}
