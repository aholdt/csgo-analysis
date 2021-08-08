import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlobStorageService {
  blobServiceClient: BlobServiceClient;

  public async getBlob(containerName: string, blobId: string): Promise<NodeJS.ReadableStream> {
    this.EnsureBlobServiceClient();
    const container = await this.blobServiceClient.getContainerClient(containerName);
    const blobClient = container.getBlobClient(blobId);
    const content = await blobClient.download();
    return content.readableStreamBody;
  }

  public async uploadFile(file: Express.Multer.File, containerName: string): Promise<void> {
    this.EnsureBlobServiceClient();
    const container = await this.GetOrCreateContainer(containerName);
    const blobClient = container.getBlockBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
  }

  private EnsureBlobServiceClient() {
    if (!this.blobServiceClient) {
      const STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
      this.blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
    }
  }

  private async GetOrCreateContainer(containerName: string): Promise<ContainerClient> {
    const container = await this.blobServiceClient.getContainerClient(containerName);
    await container.createIfNotExists();
    return container;
  }
}
