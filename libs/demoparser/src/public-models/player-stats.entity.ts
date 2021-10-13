export abstract class PlayerStats {
  playerName: string;
  playerId: number;
  gameId: string;
  kills = 0;
  deaths = 0;
  assists = 0;
  flashAssists = 0;
  molotovDamage = 0;
  heDamage = 0;
}
