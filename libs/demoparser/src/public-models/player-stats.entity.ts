export abstract class PlayerStats {
  playerName: string;
  playerId: number;
  gameId: string;
  side: number;
  kills = 0;
  openingKills = 0;
  traded = 0;
  deaths = 0;
  deathTraded = 0;
  assists = 0;
  flashAssists = 0;
  molotovDamage = 0;
  heDamage = 0;
}
