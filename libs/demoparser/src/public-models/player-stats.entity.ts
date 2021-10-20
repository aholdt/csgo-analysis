export abstract class PlayerStats {
  playerName: string;
  playerId: number;
  gameId: string;
  side: string;
  kills = 0;
  openingKills = 0;
  deathsTraded = 0;
  deaths = 0;
  assists = 0;
  flashAssists = 0;
  molotovDamage = 0;
  heDamage = 0;
  ud = 0;
}
