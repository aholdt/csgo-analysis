import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

@Injectable()
export class FilesService {
    blobServiceClient: BlobServiceClient;
    
    constructor() {
        // Create Blob Service Client from Account connection string or SAS connection string
        // Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
        // SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
        const STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
        this.blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
    }
    async uploadFile(file: Express.Multer.File) : Promise<void> {
        const container = await this.GetOrCreateContainer();
        console.log(file);
        const blobClient = container.getBlockBlobClient(file.originalname)
        console.log("uploading file " + file.filename);
        await blobClient.uploadData(file.buffer, {blobHTTPHeaders: { blobContentType: file.mimetype }});
    }

    private async GetOrCreateContainer(): Promise<ContainerClient> {
        const container = await this.blobServiceClient.getContainerClient("unparsed-demos");
        await container.createIfNotExists();
        return container;
    }
}
