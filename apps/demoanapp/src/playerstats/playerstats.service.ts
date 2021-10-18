import { CosmosRepository } from "@app/cosmos-storage";
import { PlayerGameStats } from "@app/demoparser/public-models/player-game-stats.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlayerstatsService {
  constructor(private readonly repository: CosmosRepository<PlayerGameStats>) {
    repository.initialize("PlayerGameStats");
  }
  getAll(gameId?: string): Promise<PlayerGameStats[]> {
    if (gameId !== undefined) {
      return this.repository.getAll((x) => x.gameId == gameId);
    }
    return this.repository.getAll();
  }
}
