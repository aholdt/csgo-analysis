import { RepositoryItem } from "../../libs/cosmos-storage/src/public-models/repository-item";
import { GameInfo } from "../../libs/demoparser/src/public-models/game-info.entity";

export class GameInfoRepositoryItem extends RepositoryItem {
  tickRate!: number;
  map!: string;
  thumbPrint!: string;
  team1!: string;
  team2!: string;
  team1Score: number;
  team2Score: number;
  team1FirstHalfScore: number;
  team2FirstHalfScore: number;
  constructor(gameInfo: GameInfo) {
    super();
    this.tickRate = gameInfo.tickRate;
    this.map = gameInfo.map;
    this.thumbPrint = gameInfo.thumbPrint;
    this.team1 = gameInfo.team1;
    this.team2 = gameInfo.team2;
    this.team1Score = gameInfo.team1Score;
    this.team2Score = gameInfo.team2Score;
    this.team1FirstHalfScore = gameInfo.team1FirstHalfScore;
    this.team2FirstHalfScore = gameInfo.team2FirstHalfScore;
    this.id = gameInfo.id;
    this.objectType = "GameInfo";
  }
}
