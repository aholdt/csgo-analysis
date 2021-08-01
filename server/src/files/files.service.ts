import { Injectable } from "@nestjs/common";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

@Injectable()
export class FilesService {
  blobServiceClient: BlobServiceClient;

  async uploadFile(file: Express.Multer.File): Promise<void> {
    this.EnsureBlobServiceClient();
    const container = await this.GetOrCreateContainer();
    const blobClient = container.getBlockBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
  }

  private EnsureBlobServiceClient() {
    if (!this.blobServiceClient) {
      const STORAGE_CONNECTION_STRING =
        process.env.AZURE_STORAGE_CONNECTION_STRING || "";
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
