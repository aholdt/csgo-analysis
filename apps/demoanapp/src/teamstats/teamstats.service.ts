import { CosmosRepository } from "@app/cosmos-storage";
import { TeamGameStats } from "@app/demoparser/public-models/team-game-stats.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TeamstatsService {
  constructor(private readonly repository: CosmosRepository<TeamGameStats>) {
    repository.initialize("TeamGameStats");
  }
  getAll(gameId?: string): Promise<TeamGameStats[]> {
    if (gameId !== undefined) {
      return this.repository.getAll((x) => x.gameId == gameId);
    }
    return this.repository.getAll();
  }
}
