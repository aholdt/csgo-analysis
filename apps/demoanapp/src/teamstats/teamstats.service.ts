import { TeamGameStats } from "@app/demoparser/public-models/team-game-stats.entity";
import { Injectable } from "@nestjs/common";
import { TeamstatsRepositoryService } from "./teamstats-repository.service";

@Injectable()
export class TeamstatsService {
  constructor(private readonly repository: TeamstatsRepositoryService) {
    repository.initialize("TeamGameStats");
  }
  getAll(gameId?: string): Promise<TeamGameStats[]> {
    if (gameId !== undefined) {
      return this.repository.getAll((x) => x.gameId == gameId);
    }
    return this.repository.getAll();
  }

  getAllByTeam(side?: number): Promise<TeamGameStats[]> {
    return this.repository.getAllByTeam(side);
  }
}
