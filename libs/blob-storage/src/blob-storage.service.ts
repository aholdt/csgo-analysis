import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";
import {} from "stream";

@Injectable()
export class BlobStorageService {
  blobServiceClient: BlobServiceClient;

  public async getBlob<T>(containerName: string, blobId: string): Promise<T> {
    this.EnsureBlobServiceClient();
    const container = await this.blobServiceClient.getContainerClient(containerName);
    const blobClient = container.getBlobClient(blobId);
    const response = await blobClient.download();
    const content = await this.streamToString(response.readableStreamBody);
    return JSON.parse(content);
  }

  public async upload<T>(content: T, containerName: string, blobId: string): Promise<void> {
    this.EnsureBlobServiceClient();
    const container = await this.GetOrCreateContainer(containerName);
    const blobClient = container.getBlockBlobClient(blobId);
    const json = JSON.stringify(content);
    await blobClient.upload(json, Buffer.byteLength(json));
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

  private streamToString(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }
}
