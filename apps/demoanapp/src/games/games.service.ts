import { CosmosRepository } from "@app/cosmos-storage";
import { GameInfo } from "@app/demoparser/public-models/game-info.entity";
import { Injectable } from "@nestjs/common";
import { GameInfoRepositoryItem } from "functions/unparsed-demos-blobtrigger/gameinfo.repositoryitem";

@Injectable()
export class GamesService {
  constructor(private readonly gameRepository: CosmosRepository<GameInfoRepositoryItem>) {
    gameRepository.initialize("GameInfo");
  }

  public async getAll(): Promise<GameInfo[]> {
    return this.gameRepository.getAll();
  }

  public async get(gameId: string): Promise<GameInfo> {
    return this.gameRepository.get(gameId);
  }
}
