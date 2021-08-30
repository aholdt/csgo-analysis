import { BlobStorageService } from "@app/blob-storage";
import { RoundReplay } from "@app/demoparser/public-models/round-replays.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoundReplaysService {
  constructor(private readonly blobStorageService: BlobStorageService) {}
  public async get(gameId: string, roundNumber: number): Promise<RoundReplay> {
    return this.blobStorageService.getBlob("round-replays", `${gameId}/${roundNumber}`);
  }
}
