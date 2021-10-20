import { CosmosRepository } from "@app/cosmos-storage";
import { TeamGameStats } from "@app/demoparser/public-models/team-game-stats.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TeamstatsRepositoryService extends CosmosRepository<TeamGameStats> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getAllByTeam(side?: string, teamName?: string, map?: string): Promise<TeamGameStats[]> {
    const querySpec = {
      query:
        "SELECT u.teamName as teamName, COUNT(1) as maps, AVG(u.roundWinPct) as roundWinPct, AVG(u.multiKillPct) as multiKillPct, AVG(u.openingKillPct) as openingKillPct, AVG(u.fourVsFiveWinPct) as fourVsFiveWinPct, " +
        "AVG(u.fiveVsFourWinPct) as fiveVsFourWinPct, AVG(u.tradePct) as tradePct, AVG(u.molotovAdr) as molotovAdr, AVG(u.heAdr) as heAdr, AVG(u.flashAssists) as flashAssists " +
        "FROM games u " +
        "WHERE u.objectType = @objectType " +
        (side != undefined ? "AND u.side = @side " : "") +
        (teamName != undefined ? "AND u.teamName = @teamName " : "") +
        (map != undefined ? "AND u.map = @map " : "") +
        "GROUP BY u.teamName, u.gameId",
      parameters: [{ name: "@objectType", value: this.objectType }],
    };
    if (side) {
      querySpec.parameters.push({ name: "@side", value: side });
    }

    if (teamName) {
      querySpec.parameters.push({ name: "@teamName", value: teamName });
    }

    if (map) {
      querySpec.parameters.push({ name: "@map", value: map });
    }

    const client = await this.getContainer();
    const result = await client.items.query<TeamGameStats>(querySpec).fetchAll();
    return result.resources;
  }
}
